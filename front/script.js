const inputs = document.querySelectorAll("input")
const buttons = document.querySelectorAll("button")
const errorDivs = document.querySelectorAll(".err")
const authDiv = document.querySelector(".auth")
const profileDiv = document.querySelector(".profile")

const userImage = document.querySelector("img")
const photoUpdateInput = document.querySelector(".photoUpdateInput")
const photoUpdateButton = document.querySelector(".photoUpdateButton")
const email = document.querySelector("h3")



const post = async (data, url) => {
    const options = {
        method: 'POST',
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify(data)
    }
      const res = await fetch("http://localhost:4001/"+url, options)
    return await res.json()
}

buttons[0].onclick = async () => {
    const user = {
        email: inputs[0].value,
        passOne: inputs[1].value,
        passTwo: inputs[2].value
    }

    const res = await post(user, "register")

    if(res.error) return errorDivs[0].innerHTML = res.message
    errorDivs[0].innerHTML = ""

    console.log(res)
}

buttons[1].onclick = async () => {
    const user = {
        email: inputs[3].value,
        password: inputs[4].value,
    }

    const res = await post(user, "login")

    if(res.error) return errorDivs[1].innerHTML = res.message
    errorDivs[1].innerHTML = ""
localStorage.setItem('secret', res.data.secret);
    console.log(res)
    authDiv.style.display = "none"
    profileDiv.style.display = "block"
    email.innerHTML = res.data.email
    // userImage.src = "../front/IMG-4379.JPG"
    userImage.src = res.data.image
}

photoUpdateButton.onclick = async () => {
    const item = {
        url: photoUpdateInput.value,
        secret: localStorage.getItem('secret')
    }
    console.log(item)
    const res = await post(item, 'newPhoto')
    if (res.error) return console.log("error", res)
    userImage.src = photoUpdateInput.value
    photoUpdateInput.value= ''
}

// async function getUserData() {
//     const secret = localStorage.getItem('secret')
// const res = await fetch('http://localhost:4001/getUserInfo/'+secret)
// const data = await res.json()
// console.log('data ===', data);
// }
// getUserData();



// REGISTRATION
// in front end user register
// provides email, passone, passtwo
// take user data from registration, send it to back and
// create middleware to validate user email, and match both passwords
// also validate password length min 5 max 20 symbols
// when data validated, user can be written to database
// create new user records in database (has: email, password)

// also do not let user to create duplicated email
// if email exists in database, send error to user

// LOGIN
// in front end get user email and password
// send it to back end
// validate email, password length (min5, max 20)
// if data passes validator it goes to login controller
// find user in database by email and password
// if user found, send to front end user ID
// if user not found, send error message
