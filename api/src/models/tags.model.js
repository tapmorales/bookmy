const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    tag: {
        type: String,
        required: true,
        trim: true,
    },
    urls: [{
        type: String,
        required: true,
        trim: true
    }]
})

module.exports = mongoose.model('tags', schema)