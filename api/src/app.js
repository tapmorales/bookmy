const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('../config')

const router = express.Router()

//carrega os models
const Urls = require('./models/urls.model')
const Tags = require('./models/tags.model')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

console.log('---------', process.env.NODE_ENV, process.env.NODE_ENV.trim() === 'dev')

switch(process.env.NODE_ENV.trim()){
    case 'dev':
        mongoose.connect(config.connectionStringDb, { useNewUrlParser: true, useFindAndModify: true })
        //mongoose.set('useCreateIndex', true); //para poder usar unique no model
        break
    case 'test':
        mongoose.connect(config.connectionStringDbTest, { useNewUrlParser: true, useFindAndModify: true })
        //mongoose.set('useCreateIndex', true); //para poder usar unique no model
        break
    // default:
}



const route = router.get('/', (req, res) => {
  res.status(200).send({
    "message": "API Bookmy"
  })
})


//carrega as rotas
const urlsRoute = require('./routes/urls.routes')
const tagsRoute = require('./routes/tags.routes')

app.use('/', route)

app.use('/api/urls', urlsRoute)
app.use('/api/tags', tagsRoute)

module.exports = app