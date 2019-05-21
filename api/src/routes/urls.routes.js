const express = require('express')
const router = express.Router()

const controller = require('../controllers/urls.controller')

router.get('/', controller.get)
router.post('/', controller.post)
router.delete('/:id', controller.delete)
router.put('/:id', controller.put)
router.get('/:tags', controller.getByTag)

module.exports = router