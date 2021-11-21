const authJwt = require("../middlewares/authJwt")
const users = require("../controllers/users.controller")

module.exports = (app) => {
  var router = require("express").Router()
  router.get("/", [authJwt], users.findAll)
  router.get("/:username", [authJwt], users.findOne)

  app.use("/api/users", router)
}
