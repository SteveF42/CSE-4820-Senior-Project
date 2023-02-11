require('dotenv').config()
const User = require('../models/users')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { authenticateToken } = require('../middleware/isAuthenticated')
const recipeParams = require('../middleware/fetchUser')
const Recipe = require('../models/recipes')

//gets a users favorites list
//poential parameters count
router.get('/search', async (req, res) => {
    let count = req.body.count || 15;
    let skip = req.body.skip || 0

    count = parseInt(count)
    const categoriesRegex = req.body.categories?.join('|')
    const ingredientsRegex = req.body.ingredients?.join('|')

    const payLoad = {
        ...req.body.categories ? {
            categories: {
                $regex: categoriesRegex,
                $options: 'i'
            }
        } : {},
        ...req.body.ingredients ? {
            categories: {
                $regex: ingredientsRegex,
                $options: 'i'
            }
        } : {}
    }

    console.log(payLoad)

    try {
        if(categoriesRegex.length === 0 && ingredientsRegex.length === 0)
            return res.status(200).json([])

        const menu = await Recipe.find(payLoad)
            .skip(skip)
            .limit(count)
        return res.status(200).json(menu)
    } catch (error) {
    return res.status(500).json({ message: error.message })
}

})

module.exports = router;