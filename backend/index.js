const express = require('express');
const bodyParser = require('body-parser')
const api = require('./routes/api.js')
const auth = require('./routes/auth')
const db = require('./mongoDB')
const path = require('path')
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')))

app.use('/api', api)
app.use('/auth',auth)

//lets react route the pages
app.use('*', (req, res) => {
    res.sendFile('build/index.html', { root: './server' })
})


//connects to the db before app launches
db.connect((err) => {
    if (err) {
        console.log('[ERROR] unable to connect to db, exiting...')
        return
    }

    app.listen(5000, () => {
        console.log('app now listening on port 5000')
    })
})