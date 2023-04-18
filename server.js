'use strict'
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
//mongoose connecting to mongoDB
mongoose.connect(process.env.DATABASE_URL, 
{ useNewUrlParser: true }) 
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to database'))
//routes
const indexRouter = require('./routes/index')
const authorsRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
const userRouter = require('./routes/user')



//view setting
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayout)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '30mb', extended: false}))
app.use(methodOverride('_method'))

app.use('/', indexRouter)
app.use('/authors', authorsRouter)
app.use('/books', bookRouter)
app.use('/user', userRouter)



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

