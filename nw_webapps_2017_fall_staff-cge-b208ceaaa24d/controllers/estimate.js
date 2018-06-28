const express = require('express')
const api = express.Router()
const find = require('lodash.find')
const remove = require('lodash.remove')
const Model = require('../models/estimate.js')
const LOG = require('../utils/logger.js')
const passportConfig = require('../config/passportConfig.js')

const notfoundstring = 'estimates'

// GET to this controller root URI
api.get('/', passportConfig.isAuthenticated, (req, res) => {
  res.render('estimate/index.ejs')
})

api.get('/findall', passportConfig.isAuthenticated, (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const data = req.app.locals.estimates.query
  res.send(JSON.stringify(data))
})

api.get('/findone/:id', passportConfig.isAuthenticated, (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const id = parseInt(req.params.id, 10) // base 10
  const data = req.app.locals.estimates.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  res.send(JSON.stringify(item))
})

// GET create
api.get('/create', passportConfig.isAuthenticated, (req, res) => {
  LOG.info(`Handling GET /create${req}`)
  const item = new Model()
  LOG.debug(JSON.stringify(item))
  res.render('estimate/create',
    {
      title: 'Create Estimate',
      layout: 'layout.ejs',
      estimate: item
    })
})

// GET /delete/:id
api.get('/delete/:id', passportConfig.isAuthenticated, (req, res) => {
  LOG.info(`Handling GET /delete/:id ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  const data = req.app.locals.estimates.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
  return res.render('estimate/delete.ejs',
    {
      title: 'Delete Estimate',
      layout: 'layout.ejs',
      estimate: item
    })
})

// GET /details/:id
api.get('/details/:id', passportConfig.isAuthenticated,  (req, res) => {
  LOG.info(`Handling GET /details/:id ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  const data = req.app.locals.estimates.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
  return res.render('estimate/details.ejs',
    {
      title: 'Estimate Details',
      layout: 'layout.ejs',
      estimate: item
    })
})

// GET one
api.get('/edit/:id', passportConfig.isAuthenticated, (req, res) => {
  LOG.info(`Handling GET /edit/:id ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  const data = req.app.locals.estimates.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`RETURNING VIEW FOR${JSON.stringify(item)}`)
  return res.render('estimate/edit.ejs',
    {
      title: 'Estimates',
      layout: 'layout.ejs',
      estimate: item
    })
})

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', passportConfig.isAuthenticated, (req, res) => {
  LOG.info(`Handling POST ${req}`)
  LOG.debug(JSON.stringify(req.body))
  const data = req.app.locals.estimates.query
  const item = new Model()
  LOG.info(`NEW ID ${req.body._id}`)
  item._id = parseInt(req.body._id, 10) // base 10
  item.name = req.body.name
  item.location = req.body.location
  item.squarefeet = parseInt(req.body.squarefeet, 10)
  item.numberOfDays = parseInt(req.body.numberOfDays, 10)
  item.hoursWorkedPerDay = parseInt(req.body.hoursWorkedPerDay, 10)
  item.laborDollarsPerHour = parseInt(req.body.laborDollarsPerHour, 10)
  item.numberHotelRooms = parseInt(req.body.numberHotelRooms, 10)
  item.numberHotelNights = parseInt(req.body.numberHotelNights, 10)
  item.hotelDollarsPerNight = parseInt(req.body.hotelDollarsPerNight, 10)
  item.foodDollarsPerDay = parseInt(req.body.foodDollarsPerDay, 10)
  item.numberOfVehicles = parseInt(req.body.numberOfVehicles, 10)
  item.milesPerVehicle = parseInt(req.body.milesPerVehicle, 10)
  item.dollarsPerMile = parseFloat(req.body.dollarsPerMile, 10)
  item.multiplier = parseFloat(req.body.multiplier)
  item.materials = []
  item.materials.length = 0
  if (req.body.product.length > 0) {
    for (let count = 0; count < req.body.product.length; count++) {
      if (typeof (parseInt(req.body.unitcost[count], 10)) === 'number' && typeof (parseInt(req.body.coverageSquareFeetPerUnit[count], 10)) === 'number') {
        item.materials.push(
          {
            product: req.body.product[count],
            unitcost: parseInt(req.body.unitcost[count], 10),
            coverageSquareFeetPerUnit: parseInt(req.body.coverageSquareFeetPerUnit[count], 10)
          }
        )
      }
    }
  }
  item.miscellaneous = []
  if (req.body.misc.length > 1) {
    for (let count = 0; count < req.body.misc.length - 1; count++) {
      item.miscellaneous.push(
        {
          misc: req.body.misc[count],
          cost: parseInt(req.body.cost[count], 10)
        }
      )
    }
  }
  data.push(item)
  LOG.info(`SAVING NEW ESTIMATE ${JSON.stringify(item)}`)
  return res.redirect('/estimate')
})

// POST update
api.post('/save/:id', passportConfig.isAuthenticated, (req, res) => {
  LOG.info(`Handling SAVE request ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  LOG.info(`Handling SAVING ID=${id}`)
  const data = req.app.locals.estimates.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`ORIGINAL VALUES ${JSON.stringify(item)}`)
  LOG.info(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
  item.name = req.body.name
  item.location = req.body.location
  item.squarefeet = parseInt(req.body.squarefeet, 10)
  item.numberOfDays = parseInt(req.body.numberOfDays, 10)
  item.hoursWorkedPerDay = parseInt(req.body.hoursWorkedPerDay, 10)
  item.laborDollarsPerHour = parseInt(req.body.laborDollarsPerHour, 10)
  item.numberHotelRooms = parseInt(req.body.numberHotelRooms, 10)
  item.numberHotelNights = parseInt(req.body.numberHotelNights, 10)
  item.hotelDollarsPerNight = parseInt(req.body.hotelDollarsPerNight, 10)
  item.foodDollarsPerDay = parseInt(req.body.foodDollarsPerDay, 10)
  item.numberOfVehicles = parseInt(req.body.numberOfVehicles, 10)
  item.milesPerVehicle = parseInt(req.body.milesPerVehicle, 10)
  item.dollarsPerMile = parseFloat(req.body.dollarsPerMile, 10)
  item.multiplier = parseFloat(req.body.multiplier)
  item.materials = []
  item.materials.length = 0 // replace with new array
  if (req.body.product.length > 0) {
    for (let count = 0; count < req.body.product.length; count++) {
      if (typeof (parseInt(req.body.unitcost[count], 10)) === 'number' && typeof (parseInt(req.body.coverageSquareFeetPerUnit[count], 10)) === 'number') {
        item.materials.push(
          {
            product: req.body.product[count],
            unitcost: parseInt(req.body.unitcost[count], 10),
            coverageSquareFeetPerUnit: parseInt(req.body.coverageSquareFeetPerUnit[count], 10)
          }
        )
      }
    }
  }
  item.miscellaneous = []
  item.miscellaneous.length = 0  // replace with new array
  if (req.body.misc.length > 1) {
    for (let count = 0; count < req.body.misc.length; count++) {
      if (typeof (parseInt(req.body.cost[count], 10)) === 'number' && parseInt(req.body.cost[count], 10) > 0) {
        item.miscellaneous.push(
          {
            misc: req.body.misc[count],
            cost: parseInt(req.body.cost[count], 10)
          }
        )
      }
    }
  }
  LOG.info(`SAVING UPDATED ESTIMATE ${JSON.stringify(item)}`)
  return res.redirect('/estimate')
})

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', passportConfig.isAuthenticated, (req, res) => {
  LOG.info(`Handling DELETE request ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  LOG.info(`Handling REMOVING ID=${id}`)
  const data = req.app.locals.estimates.query
  const item = find(data, { _id: id })
  if (!item) {
    return res.end(notfoundstring)
  }
  if (item.isActive) {
    item.isActive = false
    console.log(`Deacctivated item ${JSON.stringify(item)}`)
  } else {
    const item = remove(data, { _id: id })
    console.log(`Permanently deleted item ${JSON.stringify(item)}`)
  }
  return res.redirect('/estimate')
})

// GET to this controller select
api.get('/select', passportConfig.isAuthenticated, (req, res) => {
  res.render('estimate/select.ejs')
})

// GET copyfrom ID
api.get('/copyfrom/:id', passportConfig.isAuthenticated, (req, res) => {
  LOG.info(`Handling COPY FROM request ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  LOG.info(`Handling COPYFROM ID=${id}`)
  const data = req.app.locals.estimates.query
  const item = find(data, { _id: id })
  item.name = item.name + ' (new)'
  if (!item) {
    return res.end(notfoundstring)
  }
  LOG.debug(`Copying from item ${JSON.stringify(item)}`)
  res.render('estimate/create',
    {
      title: 'Create From Existing',
      layout: 'layout.ejs',
      estimate: item
    })
})

module.exports = api
