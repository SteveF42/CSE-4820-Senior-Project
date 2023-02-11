require('dotenv').config()
const User = require('../models/users')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { authenticateToken } = require('../middleware/isAuthenticated')
const fetchUser = require('../middleware/fetchUser')


//gets a users favorites list
//same issue as the histroy one, find a way to get first 10, 20 whatever parts
// right now this is grabing the ENTIRE list from the users favorites. 
// Maybe I can change this to grab the first 10-15 and use pagenation on the frontend
router.get('/', authenticateToken, fetchUser, async (req, res) => {
    try {
        const favorites = await req.userModel.favorites.populate('favorites.recipes')
        return res.status(200).json({
            favorites
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

//adds a recipe to a users favorite list
router.post('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.sendStatus(404)

        const recipeID = req.body.recipeID
        if (user.favorites.some(x => x.recipe.toString() === recipeID))
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