class User {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.room = 'Main Room';
    }

    // This method checks for an existing user and returns true if user exists, then socket sends an error to the client side.
    doesExist(users) {
        let existingUser = users.find(user => user.name === this.name)
        return existingUser === undefined ? false : true
    }

    // This method adds new user to the main room in the Chat.
    joinRoom(socket, io, room) {
        socket.join(this.room)
        socket.emit('adminMessage', { user: 'admin', text: `${this.name}, welcome to the ${this.room}.` });
        socket.broadcast.to(this.room).emit('adminMessage', { user: 'admin', text: `${this.name} has joined ${this.room}.`});
        io.to(this.room).emit('roomData', room);
    }

    // This method changes current user room to new one which user selected on the client side.
    changeRoom(rooms, roomName, socket, io) {
        const newRoom = rooms.find(room => room.name === roomName);
        const previousRoom = rooms.find(room => room.name === this.room);

        socket.leave(this.room);
        previousRoom.users = previousRoom.users.filter(item => item.id !== this.id);

        io.to(previousRoom.name).emit('roomData', previousRoom);
        socket.broadcast.to(previousRoom.name).emit('adminMessage', { user: "admin", text: `${this.name} has moved to new room.` });

        this.room = roomName;
        newRoom.users.push(this);
        socket.emit('newRoom', newRoom)

        return newRoom
    }

    // this method removes user from users array and from the room where user was before leaving.
    leaveChat(users, rooms, socket, io) {
        let userRoom = rooms.find(room => room.name === this.room);
        socket.broadcast.to(this.room).emit('adminMessage', { user: 'admin', text: `${this.name} has left the chat.` });
        users = users.filter(user => user.id !== this.id);
        userRoom.users = userRoom.users.filter(user => user.id !== this.id);
        io.to(userRoom.name).emit('roomData', userRoom);
        return users
    }
}

// users array for the app.
let users = [ {name: "admin", id: "007", room: "all"} ]

module.exports = { User, users }