const mongoose = require('mongoose')
const Url = mongoose.model('Url')

exports.get = async (_id)=>{     
    
    let data = null
    if(_id){
        data = await Url.findById(_id, 'url tags title description private')
    }else {
        data = await Url.find({}, 'url tags title description private')
    }

    return data      
}

exports.post = async data=>{
    const url = new Url(data)
    return await url.save()
}

exports.delete = async _id =>{    
    return await Url.findByIdAndRemove(_id)        
}

exports.put = async (_id, data)=>{    
    return await Url.findByIdAndUpdate(_id, {
        $set: data
    })        
}

exports.getByTag = async (tags)=>{

    const _tags = (tags).split(',')
    
        return await Url.find({ 
            tags: {
                $all:  _tags
            } 
        })   
    
}