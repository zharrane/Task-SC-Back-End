const UserSettings = require("../models/UserSettings")
const handler = require("./handler.controller")

exports.findOne = (req, res) => {
  console.log("findOne setting called")
  handler.findUserSettings(UserSettings, req, res)
}

exports.findOneAndUpate = (req, res) => {
  console.log("findOneAndUpate setting called")
  handler.findAutoBidAndUpdate(UserSettings, req, res)
}
