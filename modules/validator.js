const validator = require("email-validator")
const sendRes = require("../modules/sendRes")


module.exports = {
    validateRegister: (req, res, next) => {
        const {passOne, passTwo} = req.body

        if(passOne !== passTwo) return sendRes(res, "bad password", true)

        next()
    }
}