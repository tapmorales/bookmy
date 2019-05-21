const express = require('express')
const router = express.Router()

router.get('/', (req, res, next)=>{
    res.status(200).send({
        "json": "lista de urls do usuario"
    })
})

module.exports = router