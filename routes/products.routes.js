const authJwt = require("../middlewares/authJwt")
const products = require("../controllers/products.controller")

module.exports = (app) => {
  var router = require("express").Router()

  /**Get */
  router.post("/", [authJwt], products.findAllProducts)
  router.get("/categories", [authJwt], products.findAllCategories)
  router.get("/:product", [authJwt], products.findOne)
  /**Update existing Product */
  router.patch("/bid/:product", [authJwt], products.findOneAndUpate)
  router.patch(
    "/subscribe/:product",
    [authJwt],
    products.findProductAndUpdateSubscribers
  )
  router.patch(
    "/unsubscribe/:product",
    [authJwt],
    products.findProductAndDeleteSubscriber
  )

  /**Create product or category for admin */
  router.post("/product", [authJwt], products.putIProductItem)
  router.post("/category", [authJwt], products.putCategoryItem)

  app.use("/api/products", router)
}
