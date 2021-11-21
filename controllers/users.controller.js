const Users = require("../dummy/users")
const { helpers } = require("../helpers")

exports.findAll = (req, res) => {
  try {
    res.status(200).json({ Users: helpers.filterUsers(Users) })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.findOne = (req, res) => {
  const { username } = req.params
  if (!username) return res.json({ message: "No username provided" })
  try {
    res.status(200).json(helpers.filterUser(Users, username))
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
