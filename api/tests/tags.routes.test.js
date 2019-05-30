process.env.NODE_ENV = 'test';

const chai = require('chai')
const chaihttp = require('chai-http')
const app = require('../src/app')

chai.use(chaihttp)

const expect = chai.expect

const Tags = require('../src/models/tags.model')
const urlapi = '/api/tags'

describe('API - Tags Routes', function(){
    let tagObject = {
        "tag": "tag1",
        "urls": [
            "http://1", "http://2"
        ]
    }

    beforeEach(done => {
        Tags.deleteMany({}, err => done())
    })

    it('shoud return status 200', function(done){
        this.timeout(500000)
        chai.request(app)
            .get(urlapi)
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.status(200)
                done()
            })

    })

    it('should return 400 if we try to post new tag without tag', function(done){
        chai.request(app)
            .post(urlapi)
            .send({urls: ["http1"]})
            .end(function(err, res) {
                if(err) done(err)
                expect(res).to.have.status(400)
                done()
            })
    })

    it('shoud return 201 when post a new tag', function(done){
        chai.request(app)
            .post(urlapi)
            .send(tagObject)
            .end(function(err, res){
                if(err) done(err)
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('tag').to.be.a('string')
                done()
            })
    })

    it('should update a tag if we pass id in url', function(done){
        this.timeout(500000)
        let tag = new Tags(tagObject)
        let objClone = JSON.parse(JSON.stringify(tag))
        objClone.tag = 'editado'
        objClone.urls.push('url-adicionada')
        tag.save( (err, res) => {
            chai.request(app)
                .put(urlapi + '/'+ tag.id)
                .send(objClone)
                .end((err, res) => {
                    if(err) done(err)
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('tag').to.be.eql('editado')
                    expect(res.body).to.have.property('urls').to.be.an('array').to.include('url-adicionada')
                    done()
                })
        } )
    } )



    it('should delete a tag', function(done){
        let tag = new Tags(tagObject)
        tag.save( (err, res)=>{
            chai.request(app)
                .delete(urlapi + '/'+ tag.id)
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