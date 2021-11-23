const Product = require("../models/Product")
const UserSettings = require("../models/UserSettings")

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

const challengeAndWinner = (subscribers) => {
  /** Get Subscribers Auto bid settings */
}

const Bot = (product) => {
  /** Getting Product ready for the bot */
}

module.exports = { Bot }
