const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    tag: {
        type: String,
        required: true,
        trim: true
    },
    qtd: {
        type: Number,
        required: true,
        default: 0
    },
    urls: [{
        type: String,
        required: true,
        trim: true
    }]
}, { versionKey: false })

module.exports = mongoose.model('Tag', schema)