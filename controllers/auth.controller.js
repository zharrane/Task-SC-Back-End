const Users = require("../dummy/users")
const { helpers } = require("../helpers")

exports.signin = (req, res) => {
  const { username, password } = req.body
  if (!username || !password)
    res.status(404).send({ message: "No sign in credentials" })
  const user = helpers.findOneByUsername(Users, username)
  try {
    if (!user) return res.status(404).send({ message: "User Not found." })
    const passwordIsValid = helpers.checkPassword(password, user.password)
    if (!passwordIsValid)
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      })

    const token = helpers.generateToken({ id: user.id })
    /** */

    res.status(200).send({
      id: user.id,
      username: user.username,
      accessToken: token,
    })
  } catch (error) {
    res.status(500).send({ message: err.message })
  }
}
