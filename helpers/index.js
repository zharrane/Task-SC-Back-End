const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

require("dotenv").config()

/**To Export */
const { hashPassword, checkPassword } = require("./passwordManagement")
const {
  findOneByUsername,
  filterUsers,
  filterUser,
  findOneById,
  findUserSettingsById,
  findProductById,
  compareAndSort,
  checkDuration,
  returnMoneyToSubscriberSettings,
} = require("./utilities")

const CONSTS = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGODB_DB: process.env.MONGODB_DB,
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(CONSTS.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("MongoDb Connected!")
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}
//generate signed token maybe will change from jwt later
const generateToken = (uid) =>
  jwt.sign(uid, CONSTS.JWT_SECRET, { expiresIn: 86400 })

/**Exports */
const helpers = {
  CONSTS,
  hashPassword,
  checkPassword,
  findOneByUsername,
  generateToken,
  connectToDatabase,
  filterUsers,
  filterUser,
  findOneById,
  findUserSettingsById,
  findProductById,
  compareAndSort,
  checkDuration,
  returnMoneyToSubscriberSettings,
}
module.exports = { helpers }
