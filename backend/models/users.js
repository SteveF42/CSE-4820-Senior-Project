const mongoose = require('mongoose')
const cryptic = require('crypto')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        default: () => cryptic.randomBytes(8).toString('hex')
    },
    password: {
        type: String,
        required: true
    },
    favorites: [{
        recipe: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'recipes'
        },
        lastModified: {
            type: Date,
            default: () => Date.now()
        }
    }],
    history: [{
        recipe: {
            type: mongoose.SchemaTypes.ObjectId, 
            ref:'recipes'
        },
        lastModified:{
            type: Date,
            default: ()=> Date.now()
        }
    }]
})

const User = mongoose.model('users', userSchema)
module.exports = User