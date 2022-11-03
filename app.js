const express = require("express")
const cors = require("cors")
const app = express()
const mainRouter = require("./router/mainRouter")
const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.MONGO_KEY)
    .then(() => {
        console.log('ALL GOOD CONNECTION GOOD')
    }).catch((e) => {
    console.log("ERROR", e)
})

app.listen(4001)

app.use(cors())
app.use(express.json())

app.use('/', mainRouter)

