const authJwt = require("../middlewares/authJwt")
const users = require("../controllers/users.controller")

module.exports = (app) => {
  var router = require("express").Router()
  /** Get all users */
  router.get("/", [authJwt], users.findOne)

  /** Certin user */
  // router.get("/:username", [authJwt], users.findOne)

  app.use("/api/user", router)
}
