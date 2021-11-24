const Product = require("../models/Product")
const UserSettings = require("../models/UserSettings")
const { helpers } = require("../helpers")
/***
 *
 *  Bot Logic here
 *  This bot will trigger post Product update / post user auto bid settings update
 *  Will handle how user can bid
 *  Looking for a way for concurency
 *
 */

/**RULE ONE
 * When some one Activate auto bid without making a bid
 */
/**RULE TWO
 * When some one not subscribed makes a new bid
 */
/**RULE THREE
 * When some who is already subscriber in any products changes his auto bidding settings
 * Requires the reactivation
 */

const challengeAndWinner = async (subscribers, price) => {
  /** Get Subscribers Auto bid settings */
  // Destruct userId from subscription array
  let newUsers = subscribers.map((item) => {
    const { userId, ...rest } = item
    return userId
  })
  // Destruct userId and remaining bid amout from user settings
  let usersSettings = await Promise.all(
    newUsers.map(async (item) => {
      let setting
      let counter = 0
      do {
        setting = await helpers.findUserSettingsById(UserSettings, item)
        counter++
        console.log(`Try : ${counter}`)
      } while (setting.botIsBiding)

      const { remainingBidAmount, userId, amountSpent, ...rest } = setting

      return { remainingBidAmount, userId, amountSpent }
    })
  )

  // Filter and get who can out bid the current bid only

  let filtredBidders = usersSettings.filter(
    (user) => user.remainingBidAmount >= price
  )
  const elements = filtredBidders.length
  switch (true) {
    case elements == 1:
      // I have only one subscriber and he can outbid since he passed the filter
      const theWinner = filtredBidders[0].userId

      console.log(`theWinner : ${theWinner} did an outbid of : ${++price}`)
      return {
        userId: theWinner,
        newBid: ++price,
        spent: filtredBidders[0].amountSpent,
        remaining: filtredBidders[0].remainingBidAmount,
      }

    case elements >= 2:
      // I have more than one subscriber so i can sort them and make the first outbid the second one only by one [+1]
      let sortedChallengers = filtredBidders.sort(helpers.compareAndSort)

      const winner = sortedChallengers[0].userId
      const competitor = sortedChallengers[1]
      let outbid = competitor.remainingBidAmount + 1
      console.log(`theWinner : ${winner} did an outbid of : ${outbid}`)
      return {
        userId: winner,
        newBid: outbid,
        spent: sortedChallengers[0].amountSpent,
        remaining: sortedChallengers[0].remainingBidAmount,
      }

    default:
      return null
      break
  }
}

const Bot = async (product = [], calledFrom) => {
  switch (calledFrom) {
    case "add-product":
    case "add-subscriber":
      const canBid = helpers.checkDuration(product.createdOn, product.duration)
      if (canBid) {
        let winner = await challengeAndWinner(
          product.subscribers,
          product.productPrice
        )
        // update winner settings
        if (winner) {
          userId = winner.userId
          newBid = winner.newBid
          spent = winner.spent
          remaining = winner.remaining
          // Update product
          const bids = product.bids
          bids.push({ userId, bid: newBid })
          const tempProd = await Product.findByIdAndUpdate(
            { _id: product.id },
            {
              winner: userId,
              bids,
              productPrice: newBid,
              lastBidPrice: newBid,
            }
          )
          amountSpent = spent + newBid
          remainingBidAmount = remaining - newBid
          if (tempProd) {
            const tempSettings = await UserSettings.findOneAndUpdate(
              { userId },
              {
                amountSpent,
                remainingBidAmount,
                botIsBiding: false,
              }
            )
          }
        }
      }

      break

    case "update-settings":
      break

    default:
      break
  }

  /** Getting Product ready for the bot */
}

module.exports = Bot
