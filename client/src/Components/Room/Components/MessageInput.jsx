import { useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../../socket"

// This component sends message to the server.

export const MessageInput = () => {

    const [message, setMessage] = useState('');
    const userData = useSelector(
        state => state.userState.userData
    )

    const onSendMessage = () => {
        if (message !== '') {
            socket.emit('sendMessage', userData, message, () => {
                setMessage('')
            })}
    }

    return (
        <form action="submit" className="flex" onSubmit={evt => evt.preventDefault()}>
            <input placeholder="Enter your message..." type="textarea" value={message} onChange={evt => setMessage(evt.target.value)} />
            <button onClick={onSendMessage}>Send</button>
        </form>
    )
}