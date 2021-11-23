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
    type: Schema.Types.ObjectId,
    ref: "Category",
  },

  pictures: [
    {
      url: {
        type: String,
      },
    },
  ],
  createdOn: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number,
    require: true,
  },
  bidStartPrice: {
    type: Number,
    require: true,
  },
  lastBidPrice: {
    type: Number,
  },
  productPrice: {
    type: Number,
    require: true,
  },
  winner: {
    type: String,
  },
  bids: [
    {
      userId: {
        type: String,
      },
      bid: {
        type: Number,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  subscribers: [
    {
      userId: {
        type: String,
        unique: true,
      },
    },
  ],
})

module.exports = Products = mongoose.model("Products", ProductSchenma)
