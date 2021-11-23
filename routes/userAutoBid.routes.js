const authJwt = require("../middlewares/authJwt")
const autoBid = require("../controllers/userAutoBid.controller")

module.exports = (app) => {
  var router = require("express").Router()

  /** Get auto bid settings  */
  router.get("/", [authJwt], autoBid.findOne)

  /** Create   */
  router.post("/", [authJwt], autoBid.findOneAndUpate)

  app.use("/api/users/autobid", router)
}
