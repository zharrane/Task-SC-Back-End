const authJwt = require("../middlewares/authJwt")
const users = require("../controllers/users.controller")

module.exports = (app) => {
  var router = require("express").Router()
  /** Get all users */
  // router.get("/", [authJwt], users.findAll)

  /** Certin user */
  router.get("/", [authJwt], users.findOne)

  app.use("/api/users", router)
}
