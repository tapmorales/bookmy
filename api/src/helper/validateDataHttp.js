module.exports =  class ValidatorHttp{

   constructor(){
       this._errors = []
   }

    isRequired(value, message){
        if(!value || value === ''){
            this._errors.push({message})
        }
    }

    isUnique(value, message){
        if (value !== null && JSON.stringify(value) !== '{}' && JSON.stringify(value) !== '[]'){
            this._errors.push({message})
        }
    }

    isArray(value, message){
        console.log('value2  ', value)
        if(typeof value.isArray === 'function' && value.isArray()){
            this._errors.push({message})
        }
    }

    get errors(){
        return this._errors
    }

    isValid(){
        return this._errors.length == 0
    }    
}