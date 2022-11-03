const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false, 
        // default: "../front/IMG-1549.JPG"
        default: "https://media.istockphoto.com/vectors/man-icon-black-icon-person-symbol-vector-id1332100919?b=1&k=20&m=1332100919&s=170667a&w=0&h=tdI7XBXQ-Yja7laUteg0v82VG6FqLlQR9TG0Ag6vyvA="
    }
})

module.exports = mongoose.model("type12usersAuth", userSchema)