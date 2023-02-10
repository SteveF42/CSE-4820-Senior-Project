require('dotenv').config()
const User = require('../models/users')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { authenticateToken } = require('../middleware/isAuthenticated')


//gets a users favorites list
router.get('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('favorites')
        const favorites = user.favorites
        return res.json({
            favorites
        })
    } catch (error) {
        return res.sendStatus(500)
    }
})

//adds a recipe to a users favorite list
router.post('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.sendStatus(404)

        const recipeID = req.body.recipeID
        if (user.favorites.some(x=>x.recipe.toString() === recipeID))
            return res.sendStatus(304)

        user.favorites.push({
            recipe: recipeID
        })
        await user.save()

        return res.sendStatus(201)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }

})

//removes a recipe from a users favorite list
router.delete('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.sendStatus(404)

        const recipeID = req.body.recipeID
        const arr = user.favorites.filter(x => x.recipe.toString() !== recipeID)
        user.favorites = arr
        await user.save()

        return res.sendStatus(200)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})
module.exports = router;