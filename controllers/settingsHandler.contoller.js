const { helpers } = require("../helpers")
const Users = require("../dummy/users")
const Bot = require("../helpers/Bot")

/**update Auto bid */
exports.updateUserSettings = async (Model, req, res) => {
  const { uid } = req
  const userId = uid && uid.toString()
  const { autoBidAmount, notification } = req.body

  const user = helpers.findOneById(Users, userId)
  if (!user) {
    return res.json({ message: "This user does not exist at all" })
  }
  if (autoBidAmount > user.balance)
    return res
      .status(400)
      .json({ message: "Cannot set more than your balance" })
  if (notification > 100) {
    return res.status(400).json({ message: "Cannot exceed 100%" })
  }
  try {
    const userSettings = await helpers.findUserSettingsById(Model, userId)
    let remainingBalance = 0
    if (userSettings) {
      remainingBalance = userSettings.remainingBidAmount
    }
    remainingBalance += +autoBidAmount
    const result = await Model.findOneAndUpdate(
      { userId },
      {
        autoBidAmount,
        remainingBidAmount: autoBidAmount,
        notification,
        amountSpent: 0,
      }
    )
    if (!result) return res.status(404).json({ message: "No Auto bid found" })

    /** Trigger the BOT */
    setTimeout(() => {
      Bot()
    })
    /** Trigger the BOT */

    return res.json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Server Error" })
  }
}

/**Find user auto bid settings */
exports.findUserSettings = async (Model, req, res) => {
  const { uid } = req
  const userId = uid && uid.toString()

  try {
    const result = await Model.findOne({ userId })
    if (!result)
      return res.status(404).json({ message: "User auto bid not found" })
    return res.json(result)
  } catch (error) {
    return res.status(500).json({ message: "Server Error" })
  }
}

exports.createUserSettings = async (Model, req, res) => {
  const { uid } = req
  const userId = uid && uid.toString()

  try {
    const userSet = new Model({
      userId,
      autoBidAmount: 0,
      remainingBidAmount: 0,
      amountSpent: 0,
      notification: 0,
    })
    const userSetRes = userSet.save()
    return res.json({ userSetRes })
  } catch (error) {
    return res.status(500).json({ message: "Server Error" })
  }
}
