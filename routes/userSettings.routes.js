const authJwt = require("../middlewares/authJwt")
const userSettings = require("../controllers/userSettings.controller")

module.exports = (app) => {
  var router = require("express").Router()

  /** Get auto bid settings  */
  router.get("/get", [authJwt], userSettings.findOne)

  /** Create  or upadte */
  router.put("/update", [authJwt], userSettings.updateUserSettings)
  router.post("/create", [authJwt], userSettings.createUserSettings)

  app.use("/api/users/settings", router)
}
