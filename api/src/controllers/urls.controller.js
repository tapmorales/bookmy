const mongoose = require('mongoose')
const Url = mongoose.model('Url')
const ValidatorHttp = require('../helper/validateDataHttp')
//const Url = require('../models/urls.model')

exports.get = async (req, res, next)=>{
     
    try{
        let data = null
        if(req.body._id){
            data = await Url.findById(req.body._id, 'url tags title description private')
        }else {
            data = await Url.find({}, 'url tags title description private')
        }

        res.status(200).send(data)
    } catch(e){
        res.status(500).send({message: 'erro 500', erro: e})
    }    
}

exports.post = async (req, res, next)=>{

    let validate = new ValidatorHttp()
    validate.isRequired(req.body.url, 'URL is required')
    validate.isUnique(await Url.findOne({url: req.body.url}), 'A URL precisa ser única')
    validate.isArray(req.body.tags, 'As tags precisam ser array')

    if(!validate.isValid()){
        res.status(400).send(validate.errors).end()
        return
    }

    const url = new Url()
    url.url = req.body.url
    url.tags = req.body.tags || ["untaggled"]
    url.title = req.body.title
    url.description = req.body.description
    url.private = req.body.private || false    

    try{
        let data = await url.save()
        res.status(201).send(data)
    } catch(e){
        res.status(400).send({'Erro': e})
    }
}

exports.delete = async (req, res, next)=>{
    let _id = req.params.id
    try{
        await Url.findByIdAndRemove(_id)
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

exports.put = async (req, res, next)=>{
    let _id = req.params.id
    let newUrl = {
        url: req.body.url,
        tags: req.body.tags,
        title: req.body.title,
        description: req.body.description,
        private: req.body.private
    }
    try{
        let data = await Url.findByIdAndUpdate(_id, {
            $set: newUrl
        })
        //data são os dados antigos
        res.status(200).send(newUrl)
    } catch(e){
        res.status(500).send({'Erro': e})
    }
}

exports.getByTag = async (req, res, next)=>{

    const _tags = (req.params.tags).split(',')
    try{
        let data = await Url.find({ 
            tags: {
                $all:  _tags
            } 
        })
        res.status(200).send(data)
    } catch(e){
        res.status(500).send({'Erro': e})
    }
    
}