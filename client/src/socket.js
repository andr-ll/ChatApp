import { io } from 'socket.io-client';

const PORT = "http://localhost:5000";

export const socket = io(PORT, {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});