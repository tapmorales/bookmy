const express = require('express')
const router = express.Router()

const controller = require('../controllers/tags.controller')

router.get('/', controller.get)
router.post('/', controller.post)
router.delete('/', controller.delete)
router.put('/', controller.put)
router.get('/:tags', controller.getByTag)

module.exports = router