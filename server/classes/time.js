class Time {
    constructor(){
        this.now = "";
    }

    // Method gets current time of message that was sent.
    getTime() {
        let minutes = new Date().getMinutes() < 10 ? "0"+new Date().getMinutes().toString() : new Date().getMinutes()
        this.now = `${new Date().getHours()}:${minutes}`
        return this.now
    }
}

module.exports = { Time }