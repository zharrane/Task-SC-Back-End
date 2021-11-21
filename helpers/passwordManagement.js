const bcrypt = require("bcryptjs")

const hashPassword = (password) => bcrypt.hashSync(password, 8)

const checkPassword = (sentPassword, storedPassword) =>
  bcrypt.compareSync(sentPassword, storedPassword)

module.exports = { hashPassword, checkPassword }
