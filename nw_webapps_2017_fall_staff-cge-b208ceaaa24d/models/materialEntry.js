const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MaterialEntrySchema = new Schema({
  _id: { type: Number, required: true },
  product: {
    type: String,
    required: false,
    default: 'product'
  },
  unitcost: {
    type: Number,
    required: false,
    default: 30
  },
  coverageSquareFeetPerUnit: {
    type: Number,
    required: false,
    default: 100
  }
})
module.exports = mongoose.model('MaterialEntry', MaterialEntrySchema)
