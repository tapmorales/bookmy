process.env.NODE_ENV = 'test';

const chai = require('chai')
const chaihttp = require('chai-http')
const app = require('../src/app')
//const server = require('../bin/server')

chai.use(chaihttp)
const should = chai.should()
var expect = chai.expect;

//Models
const Urls = require('../src/models/urls.model')

const urlapi = '/api/urls'


describe('API - URLS Routes', function () {
    let urlObject = {
        "tags": [
            "tag1", "tag2"
        ],
        "private": true,
        "url": "http://2",
        "title": "titulo 2",
        "description": "descrição"
    }
    
    beforeEach( done => {
        Urls.remove({}, err => done() )
    })
    it('shoud return status 200', function(done) {
        this.timeout(100000)
        chai.request(app)
            .get(urlapi)
            .end( function(err, res) {
                if (err) done(err);
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('array')
                expect(res.body).to.have.lengthOf(0)
                done()
            } )
    })

    it('should return 400 if we try to post a new url withou url', function(done){
        chai.request(app)
            .post(urlapi)
            .send({
                "title": "titulo 2",
	            "description": "descrição",
	            "tags": ["tag1", "tag2", "tag3"]
            })
            .end(function(err, res){
                if (err) done(err);
                expect(res).to.have.status(400)
                done()
            })
    })

    it('should post a untagled tag without tag', function(done){
        chai.request(app)
        .post(urlapi)
        .send({
            "url": "http://",
	        "title": "titulo 2",
	        "description": "descrição"
        })
        .end(function(err, res){
            if (err) done(err);
            expect(res).to.have.status(201) //created
            expect(res.body).to.have.property("tags")
            expect(res.body).to.have.property("tags").eql(["untaggled"])
            done()
        })
    })

    it('should return 500 if pass the id in url', function(done){
        let url = new Urls(urlObject)
        url.save( (err, res) => {
            chai.request(app)
                .get(urlapi + '/'+ url.id)
                .end( (err, res)=>{
                    expect(res).to.have.status(500)
                } )
                done()
        } ) 
    })

    it('should return 200 if pass the id in req.body', function(done){
        let url = new Urls(urlObject)
        url.save( (err, res) => {
            chai.request(app)
                .get(urlapi)
                .send({"_id": url.id})
                .end( (err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).is.a('object')
                    expect(res.body).have.property('url')
                    expect(res.body).have.property('title')
                    expect(res.body).have.property('description')
                    expect(res.body).have.property('private')
                    expect(res.body).have.property('tags')
                    expect(res.body).have.property('tags').is.an('array')
                })
                done()
        } )
    })

    it('should return 400 if post same url twice', function(done){

        
        let url = new Urls(urlObject)

        url.save( (err, res)=> {
            chai.request(app)
                .post(urlapi)
                .send(urlObject)
                .end( (err, res)=>{
                    expect(res).to.have.status(400)
                    done()
                } )
        })
    })

    it('should update an url if pass id as parameter in url', function(done){
        let url = new Urls(urlObject)
        let newUrl = JSON.parse(JSON.stringify(url))
        newUrl.url = 'new-url'
        url.save( (err, res)=> {
            chai.request(app)
            .put(urlapi + '/'+ url.id)
            .send(newUrl)
            .end( (err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property("url").to.be.eql('new-url')
                done()
            })
        })
    })

    it('should return 500 if try to put same url with url that already exists', function(done){
        let url = new Urls(urlObject)
        let newUrl = JSON.parse(JSON.stringify(urlObject))        
        newUrl.url = 'new-url'
        newUrl.description = 'new-description'
        let url2 = new Urls(newUrl)

        url.save( (err, res)=> {
            url2.save( (err, res)=> {

                newUrl.url = urlObject.url

                chai.request(app)
                    .put(urlapi + '/'+ url2.id)
                    .send(newUrl)
                    .end( (err, res) => {
                        expect(res).to.have.status(500)
                        //expect(res.body).to.have.property("url").to.be.eql(url.description)
                        done()
                    })
            } )
        })
    })

    it('should delete an url', function(done){
        let url = new Urls(urlObject)
        url.save( (err, res)=>{
            chai.request(app)
                .delete(urlapi + '/'+ url.id)
                .end( (err, res)=>{
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('object')

                    chai.request(app)
                        .get(urlapi)
                        .end( (err, res)=> {
                            expect(res).to.have.status(200)
                            expect(res.body).to.have.lengthOf(0)
                            done()
                        } )
                } )
        })
    })
})

