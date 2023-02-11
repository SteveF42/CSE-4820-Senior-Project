require('dotenv').config()
const User = require('../models/users')
const router = require('express').Router()
const jwt = require('jsonwebtoken')

const favoriteRoutes = require('./favorite')
const historyRoutes = require('./history')
const create = require('./create')
const recipe = require('./recipe')

router.use('/favorite',favoriteRoutes)
router.use('/history', historyRoutes)
router.use('/create', create)
router.use('/recipe',recipe)


module.exports = router;