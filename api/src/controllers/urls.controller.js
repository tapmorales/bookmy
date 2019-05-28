const ValidatorHttp = require('../helper/validateDataHttp')
const repository = require('../repository/urls.repository')
const tagsRepository = require('../repository/tags.repository')
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

exports.post = async (req, res)=>{

    let validate = new ValidatorHttp()
    validate.isRequired(req.body.url, 'URL is required')
    //validate.isUnique(await Url.findOne({url: req.body.url}), 'A URL precisa ser única')
    validate.isArray(req.body.tags, 'As tags precisam ser array')
    

    if(!validate.isValid()){
        res.status(400).send(validate.errors).end()
        return
    }

    const url = {}
    url.url = req.body.url
    url.tags = req.body.tags || ["untaggled"]
    url.title = req.body.title
    url.description = req.body.description
    url.private = req.body.private || false

    

    try{
        let dataUrl = await repository.post(url)
        let urlId = dataUrl.id;
        const tags = []
        url.tags.forEach(tag => {
            tags.push({tag, urls: [urlId]})
        });
        let dataTag = await tagsRepository.insertOrUpdate(tags)
      
        res.status(201).send({...dataUrl._doc, urlsByTag: dataTag})
    } catch(e){
        res.status(400).send({'Erro': e})
    }
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
        //data são os dados antigos
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