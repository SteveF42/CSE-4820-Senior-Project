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
    let count = req.query.count || 15;
    let skip = req.query.skip || 0
    let categories = req.query.categories || "";
    let ingredients = req.query.ingredients || "";

    count = parseInt(count)

    ingredients = ingredients.split(',')
        .map(x => x.trim())
        .join('|')

    categories = categories.split(',')
        .map(x => x.trim())
        .join('|')
    console.log(ingredients)

    const payLoad = {
        ...req.query.ingredients ? {
            ingredients: {
                $regex: ingredients,
                $options: 'i'
            }
        } : {},
        ...req.query.categories ? {
            categories: {
                $regex: categories,
                $options: 'i'
            }
        } : {}
    }

    console.log(payLoad)

    try {
        if (!categories && !ingredients)
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