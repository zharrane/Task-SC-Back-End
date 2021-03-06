const Products = require("../models/Product")
const Category = require("../models/Category")
const handler = require("./handler.controller")

/** Products */
exports.findAllProducts = (req, res) => {
  handler.findAllProducts(Products, req, res)
}

exports.findOne = (req, res) => {
  handler.findOne(Products, req, res)
}
exports.findOneAndUpate = (req, res) => {
  handler.findProductAndUpdate(Products, req, res)
}
exports.findProductAndUpdateSubscribers = (req, res) => {
  handler.findProductAndUpdateSubscribers(Products, req, res)
}
exports.findProductAndDeleteSubscriber = (req, res) => {
  handler.findProductAndDeleteSubscriber(Products, req, res)
}

/** Categories */
exports.findAllCategories = (req, res) => {
  handler.findAllCategories(Category, req, res)
}

///////////////////////// ADMIN //////////////////////////////
// No find one because this is slowly mutable and small
exports.putCategoryItem = (req, res) => {
  handler.createCategory(Category, req, res)
}

exports.putIProductItem = (req, res) => {
  handler.createProduct(Products, req, res)
}
