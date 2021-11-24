const UserSettings = require("../models/UserSettings")
const handler = require("./settingsHandler.contoller")

exports.findOne = (req, res) => {
  console.log("findOne setting called")
  handler.findUserSettings(UserSettings, req, res)
}

exports.updateUserSettings = (req, res) => {
  console.log("findOneAndUpate setting called")
  handler.updateUserSettings(UserSettings, req, res)
}
exports.createUserSettings = (req, res) => {
  console.log("Create setting called")
  handler.createUserSettings(UserSettings, req, res)
}
