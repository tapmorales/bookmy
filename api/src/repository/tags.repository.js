const mongoose = require('mongoose')
const Tag = mongoose.model('Tag')

exports.get = async (id) => {
    let data = null

    if(id){
        data = await Tag.findById(id).sort({qtd: -1, tag: 1})
    } else {
        data = await Tag.find({}).sort({qtd: -1, tag: 1})
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
    return await Tag.find({tag: _tags})
}

exports.insertOrUpdate = async tags => {
    const retorno = []
    const getUpdate = async tag => {
        return await Tag.findOneAndUpdate(
            {tag: tag.tag}, 
            {
                tag: tag.tag,
                $push: {
                    urls: tag.urls
                },
                $inc: {
                    qtd: 1
                }
            }, 
            {upsert: true, new: true}) 
    }

    for(let i = 0; i < tags.length; i++){
        let tag = tags[i]
        let _tag = await getUpdate(tag)   
        retorno.push(_tag)
    }    

    return retorno    
}

exports.deleteUrlId = async _urlId => {

    await Tag.update({urls: {$all: [_urlId]} }, {
            $pull: { urls: {$in: [_urlId]} },
            $inc: {qtd: -1}
        },
        { multi: true }
    )


    await Tag.deleteMany({urls: []})
    
}