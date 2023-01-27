require('dotenv').config()
const User = require('../models/users')
const router = require('express').Router()
const jwt = require('jsonwebtoken')

const favoriteRoutes = require('./favorite')
const historyRoutes = require('./history')


router.use('/favorite',favoriteRoutes)
router.use('/history', historyRoutes)


module.exports = router;