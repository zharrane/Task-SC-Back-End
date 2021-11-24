const Users = require("../dummy/users")
const { helpers } = require("../helpers")
const Category = require("../models/Category")
const Bot = require("../helpers/Bot")
const UserSettings = require("../models/UserSettings")

/**Find product by id */
exports.findOne = async (Model, req, res) => {
  const { product } = req.params
  try {
    const result = await helpers.findProductById(Model, product)
    if (!result) return res.status(404).json({ message: "product not found" })
    return res.json(result)
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(404).json({ message: "Product not found" })
    return res.status(500).json({ message: "Server Error" })
  }
}

/**
 * Update Product
 *  Add bid
 */
exports.findProductAndUpdate = async (Model, req, res) => {
  const { uid } = req
  const userId = uid.toString()
  const { product } = req.params
  const { lastBidPrice } = req.body

  const user = helpers.findOneById(Users, userId)

  if (!lastBidPrice) return res.json({ message: "Missing details" })

  if (!user) {
    return res.json({ message: "This user does not exist at all" })
  }

  try {
    const tempResult = await helpers.findProductById(Model, product)

    if (!tempResult) {
      return res.status(404).json({ message: "Product not found" })
    } else {
      const filtSubscribers = tempResult.subscribers.map((item) => item.userId)
      const alreadySubscriber = filtSubscribers.includes(uid)
      // if (alreadySubscriber)
      //   return res.status(404).json({ message: "You are already subscribed" })
      let canBid = helpers.checkDuration(
        tempResult.createdOn,
        tempResult.duration
      )
      if (!canBid) {
        return res.status(404).json({ message: "Product duration has ended" })
      }
      if (lastBidPrice <= tempResult["lastBidPrice"]) {
        return res
          .status(404)
          .json({ message: "Cannot bid low or equal to current bid" })
      }
    }
    let bids = tempResult.bids
    bids = [...bids, { userId, bid: lastBidPrice }]
    const result = await Model.findByIdAndUpdate(
      { _id: product },

      {
        winner: uid,
        lastBidPrice,
        productPrice: lastBidPrice,
        bids,
      }
    )

    if (!result) return res.status(404).json({ message: "Product not found" })
    /** Trigger the BOT */
    /**Return last subscriber money */
    const oldUserBid = helpers.returnMoneyToSubscriberSettings(
      tempResult.bids,
      tempResult.subscribers
    )
    if (oldUserBid) {
      const { userId, bid } = oldUserBid
      const userSettings = await helpers.findUserSettingsById(
        UserSettings,
        userId
      )
      const newRemaining = userSettings.remainingBidAmount + bid

      const newSpent =
        userSettings.amountSpent === 0
          ? userSettings.amountSpent
          : userSettings.amountSpent - bid

      const result = await UserSettings.findOneAndUpdate(
        { userId },
        {
          remainingBidAmount: newRemaining,
          amountSpent: newSpent,
        }
      )
    }
    Bot(tempResult, "add-product")

    /** Trigger the BOT */
    return res.json(result)
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(404).json({ message: "Product not found" })
    return res.status(500).json({ message: "Server Error" })
  }
}

/**
 * Update Product
 * Add Subscriber
 */
exports.findProductAndUpdateSubscribers = async (Model, req, res) => {
  const { uid } = req
  const userId = uid.toString()
  const { product } = req.params

  const user = helpers.findOneById(Users, userId)
  if (!user) {
    return res.json({ message: "This user does not exist at all" })
  }

  try {
    const tempResult = await helpers.findProductById(Model, product)

    if (!tempResult) {
      return res.status(404).json({ message: "Product not found" })
    }
    let canBid = helpers.checkDuration(
      tempResult.createdOn,
      tempResult.duration
    )
    if (!canBid) {
      return res.status(404).json({ message: "Product duration has ended" })
    }
    const newSubscribers = tempResult.subscribers
    const subscribers = tempResult.subscribers.map((item) => item.userId)
    let includes = subscribers.includes(uid)

    if (includes)
      return res.status(400).json({ message: "user is already subscribed" })
    console.log(newSubscribers)
    newSubscribers.push({ userId: uid })
    console.log(newSubscribers)
    const result = await Model.findByIdAndUpdate(
      { _id: product },

      {
        subscribers: newSubscribers,
      }
    )

    if (!result) return res.status(404).json({ message: "Product not found" })
    /** Trigger the BOT */

    Bot(tempResult, "add-subscriber")

    /** Trigger the BOT */
    return res.json(result)
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(404).json({ message: "Product not found" })
    return res.status(500).json({ message: "Server Error" })
  }
}
/**
 * Update Product
 * Delete subscriber
 */
exports.findProductAndDeleteSubscriber = async (Model, req, res) => {
  const { uid } = req
  const userId = uid.toString()
  const { product } = req.params

  const user = helpers.findOneById(Users, userId)
  if (!user) {
    return res.json({ message: "This user does not exist at all" })
  }

  try {
    const tempResult = await helpers.findProductById(Model, product)
    if (!tempResult) {
      return res.status(404).json({ message: "Product not found" })
    }

    const subscribers = tempResult.subscribers.filter(
      (item) => item.userId !== uid
    )

    const result = await Model.findByIdAndUpdate(
      { _id: product },

      {
        subscribers,
      }
    )

    if (!result) return res.status(404).json({ message: "Product not found" })
    return res.json(result)
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(404).json({ message: "Product not found" })
    return res.status(500).json({ message: "Server Error" })
  }
}

/** Get all Datas */
exports.findAllProducts = async (Model, req, res) => {
  const { categories, minimumPrice } = req.body
  const { page, limit } = req.query

  const lim = limit ? +limit : 15
  const pg = page ? +page : 1
  const startIndex = (pg - 1) * lim
  const skip = pg > 0 ? startIndex : 0
  const minimum = minimumPrice ? minimumPrice : 0

  try {
    let categoryList = await Category.find()

    let includes = categories && false

    /** Get categories Ids */
    categoryList = categoryList.map((item) => {
      return item.id
    })
    /** Get categories Ids */

    if (categories) {
      includes = categories.every((item) => categoryList.includes(item))
    }
    if (categories && !includes)
      return res
        .status(404)
        .json({ message: "One of the category is not valid" })

    categoryList = categories && includes ? categories : categoryList
    console.log(categoryList)

    let products = await Model.where({
      productPrice: {
        $lte: minimum,
      },
      category: {
        $in: categoryList,
      },
    })
      .sort()
      .skip(skip)
      .limit(lim)
    /**Prepare to send */
    const Counts = products.length
    const ScannedCounts = products.length
    let result = {
      Limit: lim,
      Counts,
      ScannedCounts,
      Items: products,
    }
    if (ScannedCounts === 0) {
      result = { Exceeded: true, Page: pg, ...result }
    } else {
      result = { Page: pg, ...result }
    }
    /**Send */
    if (products) return res.json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Server Error" })
  }
}

/** Get all Categories */
exports.findAllCategories = async (Model, req, res) => {
  try {
    const categories = await Model.find().sort({ date: -1 })
    if (categories)
      return res.json({ Total: categories.length, Items: categories })
  } catch (error) {
    return res.status(500).json({ message: "Server Error" })
  }
}

/** For admin purposes */
/** For admin purposes */
/** For admin purposes */
exports.createProduct = async (Model, req, res) => {
  const { title, description, category, duration, bidStartPrice, pictures } =
    req.body
  console.log(bidStartPrice)
  if (
    !title ||
    !description ||
    !category ||
    !duration ||
    !bidStartPrice ||
    !pictures
  )
    return res.json({ message: "Missing details" })
  try {
    const newProduct = new Model({
      title,
      description,
      category,
      duration,
      bidStartPrice,
      productPrice: bidStartPrice,
      pictures,
    })
    const product = await newProduct.save()
    return res.json({ product })
  } catch (error) {
    return res.status(500).json({ message: "Server Error" })
  }
}

exports.createCategory = async (Model, req, res) => {
  const { categoryTitle } = req.body

  if (!categoryTitle) return res.json({ message: "Missing details" })
  try {
    const newCategory = new Model({
      categoryTitle,
    })
    const category = await newCategory.save()
    return res.json({ category })
  } catch (error) {
    return res.status(500).json({ message: "Server Error" })
  }
}
