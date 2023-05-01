require('dotenv').config()
const User = require('../models/users')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { authenticateToken } = require('../middleware/isAuthenticated')
const Recipe = require('../models/recipes')
const fetchUser = require('../middleware/fetchUser')


// fetches the history of the user 
// right now this is grabing the ENTIRE list from the users favorites. 
// Maybe I can change this to grab the first 10-15 and use pagenation on the frontend
router.get('/', authenticateToken, fetchUser, async (req, res) => {
    const count = req.query.count || 10
    const start = req.query.skip || 0
    const end = start + count

    try {
        req.userModel.history = req.userModel.history.slice(start,end)
        const userModel = await req.userModel.populate('history.recipe')
        let history = userModel.history
        console.log('history length: ',history.length)
        return res.status(200).json({
            history
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({'message':e.message})
    }
})

// every time a user views a new recipe it adds it to the history
router.post('/', authenticateToken, fetchUser, async (req, res) => {
    try {
        const userModel = req.userModel
        //filter the array and append the latest viewed object to the end
        const history = userModel.history;
        const recipeID = req.body.recipeID;
        if (userModel.history.some(x => x.recipe.toString() === recipeID)) {
            const arr = history.filter(x => x.recipe.toString() !== recipeID);
            arr.unshift({ recipe: recipeID })
            userModel.history = arr
        } else {
            userModel.history.unshift({ recipe: recipeID })
        }

        await userModel.save()
        return res.sendStatus(201);
    } catch (e) {
        console.log(e)
        return res.status(500)
    }
})

//deletes a specific item from the user history
router.delete('/', authenticateToken, fetchUser, async (req, res) => {
    try {
        const userModel = req.userModel
        const recipeID = req.body.recipeID
        const arr = userModel.history.filter(x => x.recipe.toString() !== recipeID)

        userModel.history = arr
        await userModel.save()
        return res.sendStatus(200);
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

module.exports = router;