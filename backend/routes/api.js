require('dotenv').config()
const User = require('../models/users')
const router = require('express').Router()
const jwt = require('jsonwebtoken')

const favoriteRoutes = require('./favorite')
const historyRoutes = require('./history')
const create = require('./create')
const recipe = require('./recipe')
const auth = require('./auth')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger-ui-express')

router.use('/auth',auth)
router.use('/favorite',favoriteRoutes)
router.use('/history', historyRoutes)
router.use('/create', create)
router.use('/recipe',recipe)
router.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument))


module.exports = router;