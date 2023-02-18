const express = require('express');
const bodyParser = require('body-parser')
const api = require('./routes/api.js')
const db = require('./mongoDB')
const path = require('path')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger-ui-express')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')))

app.use('/api/v1', api)

//lets react route the pages
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('*', (req, res) => {
    res.sendFile('../frontend/build/index.html', { root: './server' })
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