const authJwt = require("../middlewares/authJwt")
const products = require("../controllers/products.controller")

module.exports = (app) => {
  var router = require("express").Router()

  /**Get */
  router.get("/", [authJwt], products.findAllProducts)
  router.get("/categories", [authJwt], products.findAllCategories)
  router.get("/:product", [authJwt], products.findOne)
  /**Update existing Product */
  router.patch("/:product", [authJwt], products.findOneAndUpate)

  /**Create product or category for admin */
  router.post("/product", [authJwt], products.putIProductItem)
  router.post("/category", [authJwt], products.putCategoryItem)

  app.use("/api/products", router)
}
