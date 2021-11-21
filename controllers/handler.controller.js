const mongoose = require("mongoose")

exports.findOne = async (Model, req, res) => {
  const { id } = req.params
  try {
    const product = await Model.findById(id)
    if (!product) res.status(404).json({ message: "product not found" })
    res.json(post)
  } catch (error) {
    console.error(error)
    if (error.kind === "ObjectId")
      res.status(404).json({ message: "Product not found" })
    res.status(500).json({ message: "Server Error" })
  }
}

exports.findAll = async (Model, req, res) => {
  try {
    const products = await Model.find().sort({ date: -1 })
    if (products) res.json(products)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

exports.putItem = async (Model, req, res) => {
  const {
    title,
    description,
    category,
    duration,
    bidStartAmount,
    lastBidAmount = 0,
    pictures,
  } = req.body
  console.log(
    title,
    description,
    category,
    duration,
    bidStartAmount,
    lastBidAmount,
    pictures
  )
  if (
    !title ||
    !description ||
    !category ||
    !duration ||
    !bidStartAmount ||
    !pictures
  )
    res.json({ message: "Missing details" })
  try {
    const newProduct = new Model({
      title,
      description,
      category,
      duration,
      bidStartAmount,
      lastBidAmount,
      pictures,
    })
    const product = await newProduct.save()
    res.json({ product })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}
