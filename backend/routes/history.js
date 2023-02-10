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

        //filter the array and append the latest viewed object to the end
        const history = user.history;
        const recipeID = req.body.recipeID;
        if(user.history.some(x=>x.recipe.toString() === recipeID)){
            const arr = history.filter(x=> x.recipe.toString() !== recipeID);
            arr.push({recipe: recipeID})
            user.history = arr 
        }else{
            user.history.push({recipe:recipeID})
        }

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
        const arr = user.history.filter(x=> x.recipe.toString() !== recipeID)
        
        user.history = arr
        await user.save()
        return res.sendStatus(200);
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

module.exports = router;