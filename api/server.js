const express = require('express')
const debug = require('debug')('api:server')

const app = express()
const port = 3000
const router = express.Router()

const route = router.get('/', (req, res, next)=> {
    res.status(200).send({
        "message": "Olá mundo"
    })
})
app.use(route)
   
app.listen(port)

