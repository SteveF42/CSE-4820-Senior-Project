require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/users')
const router = require('express').Router()
const Token = require('../models/tokens')
const { authenticateToken } = require('../middleware/isAuthenticated')
const jwt = require('jsonwebtoken')

// logs a user in and sends valid access tokens
router.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    console.log(req.body)
    //encrypt passwords

    try {
        const user = await User.findOne({ $or:[{email: email},{username:email}], password: password })
        //a user is found with credentials
        if (user) {
            //send token
            const { accessToken, refreshToken } = signToken(user._id.toString())
            await new Token({
                refreshToken: refreshToken,
                previous: []
            }).save()

            return res.json({
                accessToken,
                refreshToken
            })
        } else {
            // login not found
            return res.sendStatus(404);
        }

    } catch (err) {
        return res.sendStatus(500)
    }

})

// adds an account to the databse and sends a new access token
router.post('/register', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const username = req.body.username

    try {
        const user = await User.findOne({$or:[{email: email},{username:username}]})
        //checks if that username is already in use
        if (user) {
            return res.status(409).json({message:"User already exists"})
        }

        //create a new user and sign tokens
        const newUser = new User({
            email: email,
            password: password,
            username: username
        })

        const savedUser = await newUser.save()
        //create access tokens
        const { accessToken, refreshToken: rf } = signToken(savedUser._id.toString());
        const token = new Token({
            refreshToken: rf,
            previous: []
        })
        token.save()
        //object created
        res.status(201).json({
            accessToken,
            refreshToken: rf
        })

    } catch (err) {
        //internal server error
        console.log(err)
        return res.status(500).json({message: err.message})
    }
})

// invalidates current refresh tokens 
router.post('/logout', async (req, res) => {
    const refreshToken = req.body.refreshToken

    try {
        const query = await Token.deleteOne({ refreshToken: refreshToken })
        if (query.deletedCount == 1) {
            return res.sendStatus(200)
        }

        return res.sendStatus(404)
    } catch (err) {
        return res.sendStatus(500)
    }
})

// refreshes API tokens while invalidating old refresh tokens
router.post('/refresh', async (req, res) => {
    const refreshToken = req.body.refreshToken
    //verifys the refresh token

    try {
        //if a refresh token is found in the previous, the whole family gets invalidated
        const staleToken = await Token.findOne({ previous: refreshToken })
        if (staleToken) {
            // nullifies the whole family if an old refresh token is used
            await staleToken.delete()
            return res.sendStatus(401)
        }
        const validToken = await Token.findOne({ refreshToken: refreshToken })
        if (!validToken) {
            return res.sendStatus(401)
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }

            if (decoded !== undefined) {
                const { accessToken, refreshToken: newrf } = signToken(decoded.id)

                //pushes old token to the previous array and updates the current valid token
                validToken.previous.push(validToken.refreshToken)
                validToken.refreshToken = newrf
                await validToken.save();
                // await Token.updateOne({ refreshToken: refreshToken }, { refreshToken: newrf })
                return res.status(200).json({
                    accessToken: accessToken,
                    refreshToken: newrf
                })
            }
        })
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
})

// checks if a token is valid
router.post('/valid', authenticateToken, async (req, res) => {
    const refreshToken = req.body.refreshToken

    try {
        const token = await Token.findOne({ refreshToken: refreshToken })
        if (token) {
            return res.sendStatus(200)
        }

        return res.sendStatus(404)
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
})

const signToken = (userID) => {
    const accessToken = jwt.sign({ id: userID }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
    const refreshToken = jwt.sign({ id: userID }, process.env.REFRESH_TOKEN_SECRET)

    return { accessToken, refreshToken }
}

module.exports = router;