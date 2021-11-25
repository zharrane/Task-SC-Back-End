//Assuming we have unique usernames so this return array of 1 item
const findOneByUsername = (array, element) => {
  return array.find((e) => e.username === element)
}
const findOneById = (array, element) => {
  return array.find((e) => e.id === element)
}

const filterUsers = (array) => {
  return array.map((element) => {
    const { password, ...rest } = element
    return rest
  })
}

const filterUser = (array, element) => {
  return filterUsers(array).find((e) => e.id === element)
}

function compareAndSort(a, b) {
  if (a.remainingBidAmount < b.remainingBidAmount) {
    return 1
  }
  if (a.remainingBidAmount > b.remainingBidAmount) {
    return -1
  }
  return 0
}
const checkDuration = (date, duration) => {
  const storedDate = new Date(date)
  const currentDate = new Date()

  const diffTimeStamp = Math.abs(storedDate.getTime() - currentDate.getTime())
  const diffTime = Math.ceil(diffTimeStamp / 1000)
  const res = duration > diffTime ? true : false

  return res
}
const returnMoneyToSubscriberSettings = (bids, subscribers) => {
  const userBid = bids[bids.length - 1]

  if (userBid) {
    const { userId } = userBid
    const filteredSubscribers = subscribers.map((item) => item.userId)
    const oldWinner = filteredSubscribers.includes(userId)

    console.log(userBid)

    if (oldWinner) return userBid
    return null
  } else {
    return null
  }
}
const findUserSettingsById = async (Model, id) => {
  try {
    const result = await Model.findOne({ userId: id })
    if (result) return result
    else return null
  } catch (e) {
    return null
  }
}

const findProductById = async (Model, id) => {
  try {
    const result = await Model.findById({ _id: id })
    if (result) return result
    else return null
  } catch (e) {
    return null
  }
}
module.exports = {
  findOneByUsername,
  filterUsers,
  filterUser,
  findOneById,
  findUserSettingsById,
  findProductById,
  compareAndSort,
  checkDuration,
  returnMoneyToSubscriberSettings,
}
