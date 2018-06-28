const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MiscellaneousEntrySchema = new Schema({
  _id: { type: Number, required: true },
  misc: {
    type: String,
    required: false,
    default: 'misc'
  },
  cost: {
    type: Number,
    required: false,
    default: 100
  }
})
module.exports = mongoose.model('MiscellaneousEntry', MiscellaneousEntrySchema)
