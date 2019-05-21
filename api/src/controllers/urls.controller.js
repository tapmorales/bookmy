exports.get = (req, res, next)=>{
    res.status(200).send({
        "json": "lista de urls do usuario"
    })
}