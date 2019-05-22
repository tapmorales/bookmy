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

mongoose.connect(config.connectionString, { useNewUrlParser: true, useFindAndModify: true })
//mongoose.set('useCreateIndex', true); //para poder usar unique no model

const route = router.get('/', (req, res, next) => {
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