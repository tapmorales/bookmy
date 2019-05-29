const mongoose = require('mongoose')

const schema = new mongoose.Schema({    
    url: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true
    },
    // tags: [{
    //     tag: {
    //         type: String,
    //         required: true,
    //         default: "untaggled",
    //         trim: true
    //     }
    // }],
    tags: [{        
        type: String,
        required: true,
        default: "untaggled",
        trim: true      
    }],
    title: {
        type: String
    },
    description: {
        type: String
    },
    private : {
        type: Boolean,
        //required: true,
        default: false
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }

})

module.exports = mongoose.model('Url', schema)