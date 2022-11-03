const userSchema = require("../schemas/userAuthSchema");
const bcrypt = require("bcrypt");
const { uid } = require('uid');

const userSettings = [{}]

module.exports = {
    register: async (req, res) => {
        const { email, passOne: password } = req.body

        const userExists = await userSchema.findOne({ email })
        if (userExists) return res.send({ error: true, message: "user exists", data: null })

        // REGISTER NEW USER

        const hash = await bcrypt.hash(password, 10);
        const secret = uid(30);
        const user = new userSchema({ email, password: hash, secret })
        await user.save()

        res.send({ error: false, message: null, data: user })
    },
    login: async (req, res) => {
        const { email, password } = req.body
        const user = await userSchema.findOne({ email })
        if (!user) return res.send({ error: true, message: "user not found", data: null })
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) return res.send({ error: true, message: "incorrect password", data: null })

        // console.log('user ===', user);
        // console.log('user.password ===', user.password);
        // console.log('req.password ===', password);
        // console.log('correctPassword ===', correctPassword);
        res.send({
            error: false, message: null, data: {
                secret: user.secret,
                email: user.email,
                image: user.image
            }
        })
    },
    getUserInfo: async (req, res) => {

        // console.log('getUserInfo invoced')
        const { secret } = req.params

        // console.log('secret ===', secret);

        const userIsLoggedin = await userSchema.findOne({ secret })
        if (userIsLoggedin) {
            return res.send({ error: false, message: null, data: userIsLoggedin })
        }
        res.send({ error: true, message: "autentication failure", data: null })

    },
    newPhoto: async (req, res) => {
        const { url, secret } = req.body
        const userIsLoggedin = await userSchema.findOne({ secret })
        if (userIsLoggedin) {
            await userSchema.findOneAndUpdate({ secret }, { $set: { image: url } })
            return res.send({ error: false, message: null, data: null })
        }
        res.send({ error: true, message: "autentication failure", data: null })
    },
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
