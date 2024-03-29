require('dotenv').config()
const router = require('express').Router()
const Recipes = require('../models/recipes')

//gets a users favorites list
//poential parameters count
router.get('/search', async (req, res) => {
    let count = req.query.count || 15;
    let skip = req.query.skip || 0;
    let categories = req.query.categories || "";
    let ingredients = req.query.ingredients || "";
    let cookingTime = req.query.cookingTime || null;
    let recipeID = req.query.recipeID || null;

    count = parseInt(count)

    ingredients = ingredients.split(',')
        .map(x => {
            x = x.trim()
            return {
                ingredients: {
                    $regex: `\\b${x}\\b`,
                    $options: 'i'
                }
            }
        })

    categories = categories.split(',')
        .map(x => x.trim())
        .join('')

    const payLoad = {
        ...req.query.ingredients ? {
            $and:ingredients
        } : {},
        ...req.query.categories ? {
            categories: {
                $regex: categories,
                $options: 'i'
            }
        } : {},
        ...recipeID ? {
            _id: recipeID
        } : {},
        ...cookingTime ? {
            total_time: cookingTime
        } : {}
    }

    console.log(ingredients)

    try {
        // if (!categories && !ingredients)
        //     return res.status(200).json([])

        const menu = await Recipes.find(payLoad)
            .skip(skip)
            .limit(count)
            .exec()
        const querryCount = await Recipes.find(payLoad).count()
        return res.status(200).json({ menu: menu, maxCount: querryCount })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

})

module.exports = router;