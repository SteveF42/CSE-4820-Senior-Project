require('dotenv').config()
const User = require('../models/users')

const fetchUser = async (req,res,next)=>{
    try{
        const user = await User.findById(req.user.id)
        if (!user) return res.status(400).json({message:"User does not exist"})

        req.userModel = user
        next()
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = fetchUser;