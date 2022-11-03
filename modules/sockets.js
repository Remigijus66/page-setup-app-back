const socket = require("socket.io");
const generateDays = require("../modules/generateDays")

let rooms = [

]

module.exports = (http) => {
    const io = socket(http, {cors: {origin: "http://localhost:3000"}})

    io.on("connect", (socket) => {

        socket.on("join", data => {

            if(rooms.length === 0) {

                const user = {
                    ...data,
                    id: socket.id,
                    hp: 100,
                    turn: true
                }

                const newRoom = {
                    roomName: "room",
                    users: [user],
                    ids: [socket.id]

                }

                rooms.push(newRoom)
                socket.join(newRoom.roomName)

                socket.emit("joinedRoom", newRoom)

            } else {

                const user = {
                    ...data,
                    id: socket.id,
                    hp: 100,
                    turn: false
                }

                let roomsOccupied = 0
                let roomJoined = false

                rooms.map((room, i) => {

                    let trigger = false
                    if(room.users.length === 1 && !roomJoined) {
                        rooms[i].users.push(user)
                        rooms[i].ids.push(socket.id)
                        socket.join(rooms[i].roomName)
                        // socket.emit("joinedRoom", rooms[i])
                        io.to(rooms[i].roomName).emit('joinedRoom', rooms[i])
                        trigger = true
                        roomJoined = true
                    }

                    if(!trigger) {
                        if(room.users.length === 2) roomsOccupied++
                    }

                })

                // CREATE NEW ROOM IF ALL ROOMS OCCUPIED
                if(roomsOccupied === rooms.length) {

                    const user = {
                        ...data,
                        id: socket.id,
                        hp: 100,
                        turn: true
                    }

                    const newRoom = {
                        roomName: "room" + roomsOccupied,
                        users: [user],
                        ids: [socket.id]
                    }

                    rooms.push(newRoom)
                    socket.join(newRoom.roomName)

                    socket.emit("joinedRoom", newRoom)

                }

            }


        })


        socket.on('attack', () => {
            const damage = Math.round(Math.random()*10)

            const roomIndex = rooms.findIndex(x => x.ids.includes(socket.id))

            const myUserIndex = rooms[roomIndex].users.findIndex(x => x.id === socket.id)
            const userIndex = rooms[roomIndex].users.findIndex(x => x.id !== socket.id)

            rooms[roomIndex].users[userIndex].hp -= damage

            rooms[roomIndex].users[userIndex].turn = true
            rooms[roomIndex].users[myUserIndex].turn = false

            return io.to(rooms[roomIndex].roomName).emit('joinedRoom', rooms[roomIndex])
        })

        socket.on("disconnect", () => {


            if(rooms.length > 0) {

                // IF ONLY ONE PERSON IN ROOM, DELETE ROOM

                const roomIndex = rooms.findIndex(x => x.ids.includes(socket.id))

                if(roomIndex < 0) return

                if(rooms[roomIndex].users.length === 2) {
                    rooms[roomIndex].users = rooms[roomIndex].users.filter(x => x.id !== socket.id)
                    rooms[roomIndex].ids = rooms[roomIndex].ids.filter(x => x !== socket.id)

                    return io.to(rooms[roomIndex].roomName).emit('joinedRoom', rooms[roomIndex])
                }

                if(rooms[roomIndex].users.length === 1) {
                    rooms = rooms.filter((x, i) => i !== roomIndex)
                }


            }

        })


    })


}
