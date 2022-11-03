const express = require("express")
const router = express.Router()
const { validateRegistration } = require("../middleware/validator")

const {
    register,
    login,
    getUserInfo,
    newPhoto,
    loginSettings,
    registerSettings, saveSettings, setDefault
} = require("../controllers/mainController")


router.post('/register', validateRegistration, register)
router.post('/login', login)
router.get('/getUserInfo/:secret', getUserInfo)
router.post('/newPhoto', newPhoto)
router.post('/loginSettings', loginSettings)
router.post('/registerSettings', registerSettings)
router.post('/saveSettings', saveSettings)
router.post('/setDefault', setDefault)





module.exports = router

