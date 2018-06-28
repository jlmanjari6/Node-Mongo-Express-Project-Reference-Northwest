/**
 * @index.js - manages all routing
 *
 * router.get when assigning to a single request
 * router.use when deferring to a controller
 *
 * @requires express
 */

const express = require('express')
global.userController = require('../controllers/user.js')
global.contactController = require('../controllers/contact')
const passportConfig = require('../config/passportConfig.js')
const LOG = require('../utils/logger.js')

LOG.debug('START routing')
const router = express.Router()

// Manage top-level request first
router.get('/', (req, res, next) => {
  LOG.debug('Request to /')
  res.render('index.ejs', { title: 'CGE' })
})

// Defer path requests to a particular controller
router.use('/about_2017_fall_04', require('../controllers/about_2017_fall_04.js'))
router.use('/estimate', require('../controllers/estimate.js'))

// handle specific requests
router.get('/login', global.userController.getLogin)
router.post('/login', global.userController.postLogin)
router.get('/logout', global.userController.logout)
router.get('/forgot', global.userController.getForgot)
router.post('/forgot', global.userController.postForgot)
router.get('/reset/:token', global.userController.getReset)
router.post('/reset/:token', global.userController.postReset)
router.get('/signup', global.userController.getSignup)
router.post('/signup', global.userController.postSignup)
router.get('/contact', global.contactController.getContact)
router.post('/contact', global.contactController.postContact)
router.get('/account', passportConfig.isAuthenticated, global.userController.getAccount)
router.post('/account/profile', passportConfig.isAuthenticated, global.userController.postUpdateProfile)
router.post('/account/password', passportConfig.isAuthenticated, global.userController.postUpdatePassword)
router.post('/account/delete', passportConfig.isAuthenticated, global.userController.postDeleteAccount)
router.get('/account/unlink/:provider', passportConfig.isAuthenticated, global.userController.getOauthUnlink)

LOG.debug('END routing')
module.exports = router
