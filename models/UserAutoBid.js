const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserAutoBidSchema = new Schema({
  userId: {
    type: String,
    require: true,
  },

  createdOn: {
    type: Date,
    default: Date.now,
  },
  autoBidAmount: {
    type: Number,
    require: true,
  },
  remainingBidAmount: {
    type: Number,
    require: true,
  },
  notification: {
    type: Number,
  },
  botIsBiding: {
    type: Boolean,
  },
})

module.exports = UserAutoBid = mongoose.model("UserAutoBid", UserAutoBidSchema)
