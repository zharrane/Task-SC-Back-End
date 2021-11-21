const Products = require("../models/Product")
const handler = require("./handler.controller")
exports.findAll = (req, res) => {
  handler.findAll(Products, req, res)
}

exports.findOne = (req, res) => {
  handler.findOne(Products, req, res)
}
exports.putItem = (req, res) => {
  handler.putItem(Products, req, res)
}
