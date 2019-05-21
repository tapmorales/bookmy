const express = require('express')
const app = express()

const router = express.Router()

const route = router.get('/', (req, res, next) => {
  res.status(200).send({
    "message": "API Bookmy"
  })
})


//carrega as rotas
const urlsRoute = require('./routes/urls.routes')
const tagsRoute = require('./routes/tags.routes')

app.use('/', route)

app.use('/urls', urlsRoute)
app.use('/tags', tagsRoute)

module.exports = app