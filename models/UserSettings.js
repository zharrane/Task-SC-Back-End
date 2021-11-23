const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSettingsSchema = new Schema({
  userId: {
    type: String,
    require: true,
    unique: true,
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
  },
  amountSpent: {
    type: Number,
  },
  notification: {
    type: Number,
  },
  botIsBiding: {
    type: Boolean,
    default: false,
  },
})

module.exports = UserSettings = mongoose.model(
  "UserSettings",
  UserSettingsSchema
)
