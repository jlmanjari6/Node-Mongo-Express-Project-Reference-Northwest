// set up a temporary (in memory) database
const Datastore = require('nedb')
const LOG = require('../utils/logger.js')
const userController = require('../controllers/user')
const users = require('../data/users.json')
const estimates = require('../data/estimates.json')

module.exports = (app) => {
  LOG.info('START seeder.')
  const db = new Datastore()
  db.loadDatabase()

  // insert the sample data into our data store
  db.insert(estimates)

  // initialize app.locals (these objects will be available to our controllers)
  app.locals.estimates = db.find(estimates)

  users.data.forEach((user) => {
    userController.newUser(user)
  })
  LOG.debug(`${estimates.length} estimates`)
  LOG.info('END Seeder. Sample data read and verified.')
}
