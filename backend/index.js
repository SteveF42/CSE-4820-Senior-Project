const express = require('express');
const bodyParser = require('body-parser')
const api = require('./routes/api.js')
const db = require('./mongoDB')
const path = require('path')
const app = express()


// April 7th
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')))

app.use('/api/v1', api)

//lets react route the pages
app.use('*', (req, res) => {
    res.sendFile('../frontend/build/index.html', { root: './server' })
})


//connects to the db before app launches
db.connect((err) => {
    if (err) {
        console.log('[ERROR] unable to connect to db, exiting...')
        return
    }

    app.listen(process.env.BACKEND_PORT, () => {
        console.log('app now listening on port 5000')
    })
})