const ValidatorHttp = require('../helper/validateDataHttp')
const repository = require('../repository/urls.repository')
const tagsRepository = require('../repository/tags.repository')
const axios = require('axios')
//const mongoose = require('mongoose')
//const Url = mongoose.model('Url')

exports.get = async (req, res)=>{

    const _id = req.body && req.body._id ? req.body._id : null
     
    try{
        let data = await repository.get(_id)
        res.status(200).send(data)
    } catch(e){
        res.status(500).send({message: 'erro 500', erro: e})
    }    
}

const updateTags = async (urlId, _tags) => {
    const tags = []
    _tags.forEach(tag => {
        tags.push({tag, urls: [urlId]})
    });
    return await tagsRepository.insertOrUpdate(tags)
}

const getTitleAndDescription =  (url) => {
    return axios.get(url)
        .then(function(response){
            
            let titleRegex = /<title>([\s\S]*?)<\/title>/i
            let title = titleRegex.exec(response.data.toLowerCase())[1] || 'untitled'
            
            //let descRegex = /<meta(.*?)name=["']description["'](.*?)?>/i
            let descRegex = /<meta[\s\S]*?name=["']description["'][\s\S]*?content=["']([\s\S]*?)["'].*?>|<meta[\s\S]*?content=["']([\s\S]*?)["'][\s\S]*?name=["']description["'][\s\S]*?>/i
            let description = descRegex.exec(response.data.toLowerCase())[1] || 'no description'

            return {
                title,
                description
            }
        })
        .catch( function(err){
            return {
                title: '- untitled - ',
                description: '- no description -'
            }
        })
}

exports.post = async (req, res)=>{

    let validate = new ValidatorHttp()
    validate.isRequired(req.body.url, 'URL is required')
    //validate.isUnique(await Url.findOne({url: req.body.url}), 'A URL precisa ser única')
    validate.isArray(req.body.tags, 'As tags precisam ser array')   

    if(!validate.isValid()){
        res.status(400).send(validate.errors).end()
        return
    }

    getTitleAndDescription(req.body.url)
        .then(async (data) => {
            const url = {}
            url.url = req.body.url
            url.tags = req.body.tags || ["untaggled"]
            url.title = data.title
            url.description = data.description
            url.private = req.body.private || false

            try{
                let dataUrl = await repository.post(url)
                let urlId = dataUrl.id;
                let dataTag = await updateTags(urlId, url.tags)
              
                res.status(201).send({...dataUrl._doc, urlsByTag: dataTag})
            } catch(e){
                res.status(400).send({'Erro': e})
            }
        })
}

exports.delete = async (req, res)=>{
    let _id = req.params.id
    try{
        await repository.delete(_id)

        await tagsRepository.deleteUrlId(_id)

        res.status(200).send({
            url: req.body.url,
            tags: req.body.tags,
            title: req.body.title,
            description: req.body.description
        })
    } catch(e){
        res.status(500).send({'Erro': e})
    }
}

exports.put = async (req, res)=>{
    let _id = req.params.id
    let newUrl = {
        url: req.body.url,
        tags: req.body.tags,
        title: req.body.title,
        description: req.body.description,
        private: req.body.private || false
    }
    try{
        await repository.put(_id, newUrl)
        
        //deletar e depois atualizar
        await tagsRepository.deleteUrlId(_id)
        await updateTags(_id, newUrl.tags)
        //newUrl.urlsByTag = dataTag
        
        res.status(200).send(newUrl)
    } catch(e){
        res.status(500).send({'Erro': e})
    }
}

exports.getByTag = async (req, res)=>{

    const _tags = req.params.tags
    try{
        let data = await repository.getByTag(_tags)
        res.status(200).send(data)
    } catch(e){
        res.status(500).send({'Erro': e})
    }
    
}