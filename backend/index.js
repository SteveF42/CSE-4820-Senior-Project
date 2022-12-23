const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.json())


// db.connect((err) => {
//     if (err) {
//         console.log('unable to connect to database, exiting...')
//     } else {
//         console.log('server running on port 5000')
//         server.listen(5000)
//     }
// })

app.use(express.static(path.join(__dirname, 'build')))
// //middleware
// app.use(session({
//     secret: process.env.SECRET_KEY,
//     store: new MongoStore({
//         mongooseConnection: mongoose.connection,
//         ttl: 1 * 24 * 60 * 60, //30 days
//     }),
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//     }
// }))


//lets react route the pages
app.use('*', (req, res) => {
    res.sendFile('build/index.html', { root: './server' })
})

app.listen(5000, () => {
    console.log('app now listening on port 5000')
})
