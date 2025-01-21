const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const morgan =  require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const path = require('path')
const session = require('express-session')
 
// Load Config
dotenv.config({path:'./config/config.env'})

// Passport Config
require('./config/passport')(passport)

connectDB()

const app = express()
// Logging 
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Handlebars
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '/views/layouts')
    
}))
app.set('view engine', '.hbs')


// Sessions
app.use(
    session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
   })
)


//Passport middleware
app.use(passport.initialize())
app.use(passport.session())


// Static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'))
app.use ('/dashboard', require('./routes/index'))
app.use('/auth', require('./routes/auth'))


//Listening
const PORT = process.env.PORT || 8080
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))