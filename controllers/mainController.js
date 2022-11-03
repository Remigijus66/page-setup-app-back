// const userSchema = require("../schemas/userAuthSchema");
// const bcrypt = require("bcrypt");
// const { uid } = require('uid');

const userSettings = [{}]

module.exports = {

    loginSettings: (req, res) => {
        const { name } = req.body
        console.log(userSettings)

        if (userSettings.filter(e => e.name === name).length > 0) {
            const i = userSettings.findIndex((e) => e.name === name)
            return res.send({ error: false, message: null, data: userSettings[i] });
        }
        return res.send({ error: true, message: "No such user, please register ", data: null })

    },
    registerSettings: (req, res) => {
        const { name } = req.body
        console.log(name)
        console.log(userSettings)
        if (userSettings.filter(e => e.name === name).length > 0)
            return res.send({ error: true, message: "User alerady exists, please login", data: null });
        userSettings.push({ name: name })
        return res.send({ error: false, message: "User registered", data: null })
    },
    saveSettings: (req, res) => {
        const { name } = req.body
        console.log('req', req.body)
        userSettings.forEach((e, i) => { if (e.name == name) userSettings[i] = req.body })
        console.log('usersettings', userSettings)
        return res.send({ error: false, message: "Settings saved", data: null })
    },
    setDefault: (req, res) => {
        const { name } = req.body
        if (userSettings.filter(e => e.name === name).length > 0)
            return res.send({ error: false, message: "", data: null });
        userSettings.push(req.body)

        console.log('usersettings', userSettings)
        return res.send({ error: false, message: "User registered", data: null })
    }
}
