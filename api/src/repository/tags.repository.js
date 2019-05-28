const mongoose = require('mongoose')
const Tag = mongoose.model('Tag')

exports.get = async (id) => {
    let data = null

    if(id){
        data = await Tag.findById(id)
    } else {
        data = await Tag.find({})
    }
    return data;

}

exports.post = async (data) => {
    return await Tag.init().then(function(){
        return Tag.create(data)
    })
}

exports.put = async(id, data) => {
    return await Tag.findByIdAndUpdate(id, {
        $set: data
    })
}

exports.delete = async _id => {
    return await Tag.findByIdAndRemove(_id)
}

exports.getByTags = async tags => {
    let _tags = (tags).split(',')
    console.log(_tags)
    return await Tag.find({tag: _tags})
}