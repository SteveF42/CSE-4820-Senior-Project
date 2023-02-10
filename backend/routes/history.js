require('dotenv').config()
const User = require('../models/users')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { authenticateToken } = require('../middleware/isAuthenticated')
const Recipe = require('../models/recipes')

// fetches the history of the user 
router.get('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('history')
        if (!user) return res.status(404)

        const history = user.history
        return res.status(200).json({
            history
        })
    } catch (e) {
        console.log(e)
        return res.status(500)
    }
})

// every time a user views a new recipe it adds it to the history
router.post('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404)

        //if the recipe is already in the users history just move it to the beginning of the array
        const history = user.history;
        const recipeID = req.body.recipeID;
        const index = history.indexOf(recipeID);

        if (index > -1) {
            history.splice(index,1)
            history.push(recipeID)
        } else {
            //if its not in the history just add it
            history.push(recipeID);
        }

        user.history = history
        await user.save()
        return res.sendStatus(201);
    } catch (e) {
        console.log(e)
        return res.status(500)
    }
})

//deletes a specific item from the user history
router.delete('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) return res.status(400);

        const history = user.history;
        const recipeID = req.body.recipeID
        const index = history.indexOf(recipeID);
        if (index < 0) return res.status(404);

        history.splice(index, 1);
        user.history = history

        await user.save()
        return res.sendStatus(200);
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

module.exports = router;