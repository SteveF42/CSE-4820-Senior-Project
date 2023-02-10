const mongoose = require('mongoose')
const cryptic = require('crypto')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        default: ()=> cryptic.randomBytes(8).toString('hex')
    },
    password:{
        type:String,
        required: true
    },
    favorites:[{type: mongoose.SchemaTypes.ObjectId, ref:'recipes'}],
    history : [{type: mongoose.SchemaTypes.ObjectId, ref:'recipes'}]
})

const User = mongoose.model('users',userSchema)
module.exports = User