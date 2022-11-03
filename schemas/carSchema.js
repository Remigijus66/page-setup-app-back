const mongoose = require("mongoose")
const Schema = mongoose.Schema

const carSchema = new Schema({
    model: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    consumption: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("type12Cars", carSchema)
