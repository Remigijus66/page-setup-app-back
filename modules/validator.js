const validator = require("email-validator")
const sendRes = require("../modules/sendRes")


module.exports = {
    validateRegister: (req, res, next) => {
        const {email, passOne, passTwo} = req.body

        if(passOne !== passTwo) return sendRes(res, "bad password", true)

        if(!validator.validate(email)) return sendRes(res, "bad email", true)

        next()
    }
}