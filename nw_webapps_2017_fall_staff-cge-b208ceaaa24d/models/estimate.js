const mongoose = require('mongoose')

const EstimateSchema = new mongoose.Schema({

  // unit 01

  _id: { type: Number, required: true },
  name: {
    type: String,
    required: true,
    default: 'name/description'
  },
  location: {
    type: String,
    required: true,
    default: 'location'
  },
  squareFeet: {
    type: Number,
    required: true,
    default: 10000
  },

  // unit 03

  materials: {
    type: Array,
    required: false,
    default: [
      {
        product: 'A',
        unitcost: 65,
        coverageSquareFeetPerUnit: 300
      },
      {
        product: 'B',
        unitcost: 65,
        coverageSquareFeetPerUnit: 300
      },
      {
        product: 'C',
        unitcost: 65,
        coverageSquareFeetPerUnit: 300
      }
    ]
  },

  // unit 04

  numberOfPeople: {
    type: Number,
    required: false,
    default: 2
  },
  numberOfDays: {
    type: Number,
    required: false,
    default: 2
  },
  hoursWorkedPerDay: {
    type: Number,
    required: false,
    default: 8
  },
  laborDollarsPerHour: {
    type: Number,
    required: false,
    default: 25
  },

  // unit 05

  numberHotelRooms: {
    type: Number,
    required: false,
    default: 2
  },
  numberHotelNights: {
    type: Number,
    required: false,
    default: 2
  },
  hotelDollarsPerNight: {
    type: Number,
    required: false,
    default: 85
  },

  // unit 06

  foodDollarsPerDay: {
    type: Number,
    required: false,
    default: 25
  },

  // unit 07

  numberOfVehicles: {
    type: Number,
    required: false,
    default: 2
  },
  milesPerVehicle: {
    type: Number,
    required: false,
    default: 50
  },
  dollarsPerMile: {
    type: Number,
    required: false,
    default: 0.50
  },

  // unit 09

  miscellaneous: {
    type: Array,
    required: false,
    default: [
      {
        misc: 'A',
        cost: 10
      },
      {
        misc: 'B',
        cost: 10
      },
      {
        misc: 'C',
        cost: 10
      }
    ]
  },

  // unit 11

  multiplier: {
    type: Number,
    required: true,
    default: 0.40
  },
  materialCost: {
    type: Number,
    readonly: true
  },
  laborCost: {
    type: Number,
    readonly: true
  },
  hotelCost: {
    type: Number,
    readonly: true
  },
  foodCost: {
    type: Number,
    readonly: true
  },
  gasCost: {
    type: Number,
    readonly: true
  },
  miscellaneousCost: {
    type: Number,
    readonly: true
  },
  totalCost: {
    type: Number,
    readonly: true
  },
  totalCostPerSquareFoot: {
    type: Number,
    readonly: true
  },
  bidPrice: {
    type: Number,
    readonly: true
  },
  bidPricePerSquareFoot: {
    type: Number,
    readonly: true
  }
})
module.exports = mongoose.model('Estimate', EstimateSchema)
