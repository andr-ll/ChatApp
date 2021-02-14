const app = require('express')();
const server = require('http').createServer(app);
const router = require('./router');
const options = {
    transports: ['websocket', 'polling', 'flashsocket'],
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
};
const io = require('socket.io')(server, options);

let { rooms } = require('./classes/room');
const { User } = require('./classes/user');
let { users } = require('./classes/user');
const { Time } = require('./classes/time');
let mainRoom = rooms[0];
const admin = users[0];

app.use(router);

io.on('connection', (socket) => {

    // Login into the chat
    socket.on('login', (userName, callback) => {
        const newUser = new User(userName, socket.id);
        if (newUser.doesExist(users)) {
            return callback({ error: `User "${newUser.name}" already exists, select another name.` })
        } else if (userName === '') {
            return callback({ error: `The page was refreshed. Please login again to continue.` })
        } else {
            // Joining the chat
            users.push(newUser)
            mainRoom.users.push(newUser)
            callback({ error: "", user: newUser })
            newUser.joinRoom(socket, io, mainRoom)
            socket.emit('allRooms', rooms);
        }

        callback();
    })

    // Changing room
    socket.on('changeRoom', (id, roomName, callback) => {

        //Leaving old room
        const user = users.find(user => user.id === id);
        const newRoom = user.changeRoom(rooms, roomName, socket, io);
        callback(user);

        //Joining new room
        user.joinRoom(socket, io, newRoom)
        callback();
    })

    // Sending message
    socket.on('sendMessage', (userData, message, callback) => {
        let time = new Time().getTime()
        io.to(userData.room).emit('adminMessage', { user: userData.name, text: message, time: time });
        callback();
    })

    // Leaving the chat
    socket.on('leaveChat', (id, callback) => {
        let user = users.find(user => user.id === id);
        if (!user) return
        users = user.leaveChat(users, rooms, socket, io);
        callback();
    })
});

server.listen((process.env.PORT || '5000'), () => {
    console.log(`Server has been started...`)
});
