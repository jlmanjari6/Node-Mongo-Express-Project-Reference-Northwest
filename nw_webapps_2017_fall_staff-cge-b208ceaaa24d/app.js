/**
 * @file app.js
 * The starting point of the application.
 * Loads the app and begins listening for events.
 *
 */

// Module dependencies
const express = require('express')
const http = require('http')
const expressLayouts = require('express-ejs-layouts')
const favicon = require('serve-favicon')
const path = require('path')
const bodyParser = require('body-parser')
const engines = require('consolidate')
const compression = require('compression')
const session = require('express-session')
const chalk = require('chalk')
const errorHandler = require('errorhandler')
const dotenv = require('dotenv')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
const expressStatusMonitor = require('express-status-monitor')
const LOG = require('./utils/logger.js')
global.passport = require('passport')
const MongoClient = require('mongodb').MongoClient

// Load environment variables from .env file, where API keys and passwords are configured.
// dotenv.load({ path: '.env.example' })
dotenv.load({ path: '.env' })
LOG.info('Environment variables loaded.')

// app variables
const port = 8089
const isProduction = process.env.NODE_ENV === 'production'
LOG.info('Environment isProduction = ', isProduction)

// global config files
global.ensureAuthenticated = require('./config/ensureAuthenticated')

// Connect to MongoDB............................
if (isProduction) {
  mongoose.Promise = global.Promise
  mongoose.connect(process.env.MONGODB_URI_ATLAS)
  mongoose.connection.on('error', () => {
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'))
    process.exit()
  })
  LOG.info('Connected to MongoDB')
} else {
  mongoose.Promise = global.Promise
  mongoose.connect(process.env.MONGODB_URI)
  mongoose.connection.on('error', () => {
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'))
    process.exit()
  })
  LOG.info('Connected to MongoDB')
}

// create express app ..................................

const app = express()

// configure app.settings.............................

app.set('port', process.env.PORT || port)

// set the root view folder
app.set('views', path.join(__dirname, 'views'))

// specify desired view engine
app.set('view engine', 'ejs')
app.engine('ejs', engines.ejs)

// configure middleware.....................................................

app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')))
app.use(expressStatusMonitor())
app.use(compression())

// log calls
app.use((req, res, next) => {
  LOG.debug('%s %s', req.method, req.url)
  next()
})

// specify various resources and apply them to our application
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(express.static(`${__dirname}/public/`))  // works for views in root view folder
app.use(expressLayouts)

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI_ATLAS || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}))
app.use(global.passport.initialize())
app.use(global.passport.session())

app.use(flash())

app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
    req.path !== '/login' &&
    req.path !== '/signup' &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)) {
    req.session.returnTo = req.path
  } else if (req.user &&
    req.path === '/account') {
    req.session.returnTo = req.path
  }
  next()
})

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))

const routes = require('./routes/index.js')

app.use('/', routes)  // load routing
LOG.info('Loaded routing.')

app.use(errorHandler()) // load error handler

// handle page not found errors
app.use((req, res) => { res.status(404).render('404.ejs') })

// initialize data ............................................
require('./utils/seeder.js')(app)  // load seed data

// start Express app
app.listen(app.get('port'), () => {
  console.log('PULL new code before any modifications.')
  console.log('Pull, make a SMALL change, test, commit.')
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'))
  console.log('  Press CTRL-C to stop\n')
})

module.exports = app
