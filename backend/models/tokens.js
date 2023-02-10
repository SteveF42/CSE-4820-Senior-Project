const mongoose = require('mongoose')


const tokenSchema = new mongoose.Schema({
    refreshToken: { 
        type: String,
        required:true
    },
    previous:{
        type:[String],
        default: []
    }
})


const Token = mongoose.model('tokens', tokenSchema)
module.exports = Token