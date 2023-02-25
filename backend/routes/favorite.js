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
    const count = req.query.count || 10
    const start = req.query.skip || 0
    const end = start + count
    console.log(count)

    try {
        req.userModel.history = req.userModel.history.slice(start,end)
        const userModel = await req.userModel.populate('favorites.recipe')
        const favorite = userModel.favorites
        return res.status(200).json({
            favorite
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({'message':e.message})
    }
})

//adds a recipe to a users favorite list
router.post('/', authenticateToken, fetchUser, async (req, res) => {
    try {
        const userModel = req.userModel
        //filter the array and append the latest viewed object to the end
        const favorites = userModel.favorites;
        const recipeID = req.body.recipeID;
        if (userModel.favorites.some(x => x.recipe.toString() === recipeID)) {
            const arr = favorites.filter(x => x.recipe.toString() !== recipeID);
            arr.push({ recipe: recipeID })
            userModel.favorites = arr
        } else {
            userModel.favorites.push({ recipe: recipeID })
        }

        await userModel.save()
        return res.sendStatus(201);
    } catch (e) {
        console.log(e)
        return res.status(500)
    }
})

//removes a recipe from a users favorite list
router.delete('/', authenticateToken, fetchUser, async (req, res) => {
    try {
        const userModel = req.userModel
        const recipeID = req.body.recipeID
        const arr = userModel.favorites.filter(x => x.recipe.toString() !== recipeID)

        userModel.favorites = arr
        await userModel.save()
        return res.sendStatus(200);
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})
module.exports = router;