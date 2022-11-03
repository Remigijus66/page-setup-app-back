const express = require("express")
const cors = require("cors")
const app = express()
const mainRouter = require("./router/mainRouter")


app.listen(4001)

app.use(cors())
app.use(express.json())

app.use('/', mainRouter)

