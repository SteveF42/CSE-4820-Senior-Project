require('dotenv').config()
const User = require('../models/users')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const {authenticateToken} = require('../middleware/isAuthenticated')



router.get('/favorites', authenticateToken, (req,res) =>{

})

router.put('/favorites',authenticateToken, (req,res) =>{

})
router.delete('/favorites', authenticateToken, (req,res) =>{

})
module.exports = router;