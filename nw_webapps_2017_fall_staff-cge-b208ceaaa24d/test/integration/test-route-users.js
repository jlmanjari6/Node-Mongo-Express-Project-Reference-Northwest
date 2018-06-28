const supertest = require('supertest')
const app = require('../../app.js')

exports.main_app = function test1 (done) {
  supertest(app)
  .get('/')
  .expect(200)
  .end(done)
}

exports.about_page = function test2 (done) {
  supertest(app)
  .get('/about')
  .expect(200)
  .end(done)
}
