const Users = require("../dummy/users")
const { helpers } = require("../helpers")

exports.findOne = (req, res) => {
  console.log("called")
  const { uid } = req

  if (!uid) return res.json({ message: "No username provided" })
  try {
    const user = helpers.filterUser(Users, uid)
    console.log(user)
    res.status(200).json(helpers.filterUser(Users, uid))
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
