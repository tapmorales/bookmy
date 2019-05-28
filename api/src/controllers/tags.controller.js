const ValidatorHttp = require('../helper/validateDataHttp')
const repository = require('../repository/tags.repository')


exports.get = async (req, res)=>{
    let _id = req.body && req.body._id ? req.body._id : null
    
    try{
        let data = await repository.get(_id)
        res.status(200).send(data)
    } catch(e){
        res.status(500).send({message: 'erro 500', erro: e})
    }
}
exports.post = async (req, res)=>{
    const validate = new ValidatorHttp()

    validate.isRequired(req.body.tag, 'tag é obrigatória')
    if(!validate.isValid()){
        return res.status(400).send(validate.errors).end()
    }

    const tag = {}
    tag.tag = req.body.tag
    tag.urls = req.body.urls
    
    try{
        let data = await repository.post(tag)
        res.status(201).send(data)
    } catch(e){
        res.status(500).send({message: 'erro 500', erro: e})
    }
}

exports.delete = async (req, res)=>{
    let id = req.params.id;

    try{
        await repository.delete(id)
        res.status(200).send({
            tag: req.body.tag,
            urls: req.body.urls
        })
    } catch(e){
        res.status(500).send({message: 'erro 500', erro: e})
    }
}

exports.put = async (req, res)=>{
    let id = req.params.id
    let newTag = {
        tag: req.body.tag,
        urls: req.body.urls
    }
    try{
        await repository.put(id, newTag)
        res.status(200).send(newTag)
    } catch(e){
        res.status(500).send({message: 'erro 500', erro: e})
    }
}

exports.getByTag = async (req, res)=>{
    let tags = req.params.tags;
        
    try{
        let data = await repository.getByTags(tags)
        res.status(200).send(data)
    } catch(e){
        res.status(500).send({'message': "erro 500", "erro": e})
    }
}