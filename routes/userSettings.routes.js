const authJwt = require("../middlewares/authJwt")
const userSettings = require("../controllers/userSettings.controller")

module.exports = (app) => {
  var router = require("express").Router()

  /** Get auto bid settings  */
  router.get("/", [authJwt], userSettings.findOne)

  /** Create  or upadte */
  router.post("/", [authJwt], userSettings.findOneAndUpate)

  app.use("/api/users/settings", router)
}
