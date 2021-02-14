import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { animateScroll } from "react-scroll";
import { socket } from "../../../socket";

// This component renders all messages. Once user changed room - 
// all messages will be unmouned and user gets fresh messages window
// for new room

export const Messages = () => {

    const [messages, setMessages] = useState([]);
    const userName = useSelector(
        state => state.userState.userName
    )

    useEffect(() => {
        socket.on('adminMessage', message => {
            setMessages(messages => [...messages, message]);
        });

        socket.on('newRoom', () => {
            setMessages([]);
        });

        return () => { setMessages([]) }
    }, []);

    const scrollToBottom = () => {
        animateScroll.scrollToBottom({
            containerId: "messages",
            smooth: true,
            duration: 180
        });
    }

    useEffect(() => {
        scrollToBottom()
        return () => { }
    }, [messages])


    return (
        <div className="messages-window flex" id="messages">
            {
                messages.map((item, i) =>
                    <div key={i} className={`${item.user === userName ? "my-message message" : ""} ${item.user === "admin" ? "admin" : "chat-message message"}`}>
                        <span style={{ display: item.user === "admin" && "none" }} >{item.user === userName ? 'Me' : item.user}</span>
                        <p> {item.text}</p> <span className="time">{item.time}</span>
                    </div>
                )
            }
        </div>
    )
}