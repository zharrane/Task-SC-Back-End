const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  categoryTitle: {
    type: String,
    require: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Category = mongoose.model("Category", CategorySchema)
