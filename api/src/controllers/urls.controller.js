exports.get = (req, res, next)=>{
    res.status(200).send({
        "json": "lista de urls do usuario"
    })
}

exports.post = (req, res, next)=>{
    res.status(201).send(req.body)
}

exports.delete = (req, res, next)=>{
    res.status(200).send({
        "json": "lista de urls do usuario"
    })
}

exports.put = (req, res, next)=>{
    let _id = req.params.id
    res.status(200).send({
        _id, 
        "item": req.body        
    })
}

exports.getByTag = (req, res, next)=>{
    res.status(200).send({
        "json": "lista de urls do usuario"
    })
}