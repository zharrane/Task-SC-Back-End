const authJwt = require("../middlewares/authJwt")
const users = require("../controllers/products.controller")

module.exports = (app) => {
  var router = require("express").Router()
  router.get("/", [authJwt], users.findAll)
  router.get("/:product", [authJwt], users.findOne)
  router.post("/", [authJwt], users.putItem)

  app.use("/api/products", router)
}
