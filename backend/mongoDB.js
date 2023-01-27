const mongoose = require('mongoose')
require('dotenv').config()

const mongo = {
    connection: null
}

options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false
}
mongoose.set('strictQuery', false)
const connect = async (cb) => {   
    mongoose.connect(process.env.MONGODB_URL,options)
    console.log('connecting...')
    const conn = mongoose.connection
    conn.on('err',(err)=>cb(err))
    conn.once('open',()=>{
        if(conn.connection == null){
            mongo.connection = conn
            cb()
        }
    })
}
    
module.exports = {connect,mongo}