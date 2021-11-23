const Products = require("../models/Product")
const Category = require("../models/Category")
const handler = require("./handler.controller")
const Product = require("../models/Product")

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

/** Categories */
exports.findAllCategories = (req, res) => {
  handler.findAllCategories(Category, req, res)
}

///////////////////////// ADMIN //////////////////////////////
// No find one because this is slowly mutable and small
exports.putCategoryItem = (req, res) => {
  handler.putCategoryItem(Category, req, res)
}

exports.putIProductItem = (req, res) => {
  handler.putIProductItem(Products, req, res)
}
