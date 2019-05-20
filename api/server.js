const express = require('express')
const debug = require('debug')('api:server')

const app = express()
var port = normalizePort(process.env.PORT || '3000');
const router = express.Router()

const route = router.get('/', (req, res, next)=> {
    res.status(200).send({
        "message": "Olá mundo"
    })
})
app.use(route)
   
app.listen(port)


function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
  
    if (port >= 0) {
      return port;
    }
  
    return false;
  }

