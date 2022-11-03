const express = require("express")
const router = express.Router()


const {

    loginSettings,
    registerSettings, saveSettings, setDefault
} = require("../controllers/mainController")



router.post('/loginSettings', loginSettings)
router.post('/registerSettings', registerSettings)
router.post('/saveSettings', saveSettings)
router.post('/setDefault', setDefault)





module.exports = router

