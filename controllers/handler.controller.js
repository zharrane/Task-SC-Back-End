/**Find product by id */
exports.findOne = async (Model, req, res) => {
  const { product } = req.params
  try {
    const result = await Model.findById({ _id: product })
    if (!result) return res.status(404).json({ message: "product not found" })
    return res.json(result)
  } catch (error) {
    console.error(error)
    if (error.kind === "ObjectId")
      return res.status(404).json({ message: "Product not found" })
    return res.status(500).json({ message: "Server Error" })
  }
}

/**Find user auto bid settings */
exports.findAutoBid = async (Model, req, res) => {
  const { username } = req.params

  try {
    const result = await Model.findOne({ userId: username })
    if (!result)
      return res.status(404).json({ message: "User auto bid not found" })
    return res.json(result)
  } catch (error) {
    console.error(error)

    return res.status(500).json({ message: "Server Error" })
  }
}

/**update Product */
exports.findProductAndUpdate = async (Model, req, res) => {
  const { product } = req.params
  const { subscribers, lastBidPrice, winner } = req.body

  if (!subscribers || !lastBidPrice || !winner)
    return res.json({ message: "Missing details" })

  try {
    const result = await Model.findByIdAndUpdate(
      { _id: product },
      {
        subscribers,
        lastBidPrice,
        winner,
      }
    )
    if (!result) return res.status(404).json({ message: "Product not found" })
    return res.json(result)
  } catch (error) {
    console.error(error)
    if (error.kind === "ObjectId")
      return res.status(404).json({ message: "Product not found" })
    return res.status(500).json({ message: "Server Error" })
  }
}

/**Create or update Auto bid */
exports.findAutoBidAndUpdate = async (Model, req, res) => {
  const { username } = req.params
  const { autoBidAmount, notification } = req.body
  const options = { upsert: true, new: true, setDefaultsOnInsert: true }
  const update = { expire: new Date() }

  console.log(username)
  console.log(autoBidAmount)
  console.log(notification)

  try {
    const result = await Model.findOneAndUpdate(
      { userId: username, autoBidAmount, notification },
      update,
      options
    )
    if (!result) return res.status(404).json({ message: "No Auto bid found" })
    return res.json(result)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Server Error" })
  }
}

/** Get all Datas */
exports.findAllProducts = async (Model, req, res) => {
  const { page, limit } = req.query

  const lim = parseInt(limit)
  const pg = parseInt(page)

  const startIndex = (pg - 1) * lim
  const endIndex = pg * lim

  try {
    //const products = await Model.find().limit().sort({ date: -1 })
    const preProducts = await Model.find().sort({ date: -1 })
    /**Prepare to send */
    const products = preProducts.slice(startIndex, endIndex)

    const Totalepages = Math.ceil(preProducts.length / lim)
    const Counts = products.length
    const ScannedCounts = preProducts.length
    let result = {
      Totalepages,
      Limit: lim,
      Counts,
      ScannedCounts,
      Items: products,
    }
    if (pg > Totalepages) {
      result = { Exceeded: true, Page: pg, ...result }
    } else {
      result = { Page: pg, ...result }
    }
    /**Send */
    if (products) return res.json(result)
  } catch (error) {
    console.error(error)
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
    console.error(error)
    return res.status(500).json({ message: "Server Error" })
  }
}

/** For admin purposes */
/** For admin purposes */
/** For admin purposes */
exports.putIProductItem = async (Model, req, res) => {
  const { title, description, category, duration, bidStartPrice, pictures } =
    req.body

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
      pictures,
    })
    const product = await newProduct.save()
    return res.json({ product })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Server Error" })
  }
}

exports.putCategoryItem = async (Model, req, res) => {
  const { categoryTitle } = req.body

  if (!categoryTitle) return res.json({ message: "Missing details" })
  try {
    const newCategory = new Model({
      categoryTitle,
    })
    const category = await newCategory.save()
    return res.json({ category })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Server Error" })
  }
}
