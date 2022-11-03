const mongoose = require("mongoose")
const Schema = mongoose.Schema

const itemModel = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("reservationUser", itemModel)