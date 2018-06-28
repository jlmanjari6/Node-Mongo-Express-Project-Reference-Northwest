var express = require('express')
var request = require('supertest')  // request
var expect = require('chai').expect // expectations
const appport = 8081
const appname = 'cge'
const testId = 1
const resourceName = 'estimatePartFootage'
var app = express()

expect.describe('Parts - PartFootage estimate unit test', function () {
  expect.it('should return index page', function (done) {
    request(app)
    .get(resourceName + '/')
    .expect(200) // expected HTTP response
    .end(function (err, res) {
      done()
    })
  })
  expect.it('should return create page', function (done) {
    request(app)
    .get(resourceName + '/create')
    .expect(200) // expected HTTP response
    .end(function (err, res) {
      done()
    })
  })
  expect.it('should return delete page for id', function (done) {
    request(app)
    .get(resourceName + '/delete/' + testId)
    .expect(200) // expected HTTP response
    .end(function (err, res) {
      done()
    })
  })
  expect.it('should return details page for id', function (done) {
    request(app)
    .get(resourceName + '/details/' + testId)
    .expect(200) // expected HTTP response
    .end(function (err, res) {
      done()
    })
  })
  expect.it('should return edit page for id', function (done) {
    request(app)
    .get(resourceName + '/edit/' + testId)
    .expect(200) // expected HTTP response
    .end(function (err, res) {
      done()
    })
  })
})
