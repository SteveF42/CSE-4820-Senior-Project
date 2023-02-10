require('dotenv').config()
const User = require('../models/users')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const {authenticateToken} = require('../middleware/isAuthenticated')



router.get('/create', authenticateToken, (req,res) =>{

})

router.put('/create',authenticateToken, (req,res) =>{

})

router.post('/create',authenticateToken, (req,res) =>{

})

router.delete('/create', authenticateToken, (req,res) =>{

})
module.exports = router;