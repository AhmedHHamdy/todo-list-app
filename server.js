const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const flash = require('express-flash')
const connectDB = require('./config/database')
const logger = require('morgan')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')

// setting up env
require('dotenv').config({path: './config/.env'})

// password config
require('./config/passport')(passport)

// database connection
connectDB()

// setting up our template engine
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev')) // to log http requests

// sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING})
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


// setting up flash
app.use(flash())

// setting up what the server will hear.
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)


app.listen(process.env.PORT, () => {
  console.log('Server is running, you better catch it')
})