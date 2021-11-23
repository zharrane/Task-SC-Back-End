/**Core */
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

/**Helpers */
const { helpers } = require("./helpers")

/** */
helpers.connectToDatabase()
const app = express()

const corsOptions = {
  origin: "*",
  exposedHeaders: ["Content-Range"],
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

require("./routes/auth.routes")(app)
require("./routes/users.routes")(app)
require("./routes/products.routes")(app)
require("./routes/userAutoBid.routes")(app)

const PORT = helpers.CONSTS.PORT || 4000
app.listen(PORT, () => console.log(`Listening : ${PORT}`))
