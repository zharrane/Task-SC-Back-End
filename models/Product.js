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
  createdAt: {
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
  winner: {
    type: String,
  },

  subscribers: [
    {
      userId: {
        type: String,
      },
    },
  ],
})

module.exports = Products = mongoose.model("Products", ProductSchenma)
