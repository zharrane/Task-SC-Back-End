const UserAutoBid = require("../models/UserAutoBid")
const handler = require("./handler.controller")

exports.findOneAndUpate = (req, res) => {
  handler.findAutoBidAndUpdate(UserAutoBid, req, res)
}
exports.findOne = (req, res) => {
  handler.findAutoBid(UserAutoBid, req, res)
}
