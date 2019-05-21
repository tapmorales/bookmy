const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

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