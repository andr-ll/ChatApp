class Room {
    constructor (name) {
        this.name = name;
        this.users = [];
    }    
}

const mainRoom = new Room("Main Room");
const roomDev = new Room("Room for developers");
const roomDes = new Room("Room for designers");
const roomHR = new Room("Room for HR team");
const roomJokes = new Room("Room for jokes")

let rooms = [ mainRoom, roomDev, roomDes, roomHR, roomJokes ];

module.exports = { Room, rooms }