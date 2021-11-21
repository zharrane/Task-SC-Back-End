const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchenma = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },

  pictures: [
    {
      url: {
        type: String,
      },
    },
  ],
  startBidDate: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number,
    require: true,
  },
  bidStartAmount: {
    type: Number,
    require: true,
  },
  lastBidAmount: {
    type: Number,
  },
  //Saving bids of users
  bids: [
    {
      user: {
        type: String,
      },
      amount: {
        type: Number,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
})

module.exports = Products = mongoose.model("Products", ProductSchenma)
