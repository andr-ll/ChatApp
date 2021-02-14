import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { socket } from '../../../socket';
import { userLogout } from "../../../state/actions/user";

// This component checks for leaving the Chat.
// Also, if the page was refreshed - user will be automatically 
// logged out.

export const ExitChat = () => {

    const dispatch = useDispatch();
    const userData = useSelector(
        state => state.userState.userData
    )

    const onChatLeave = () => {
        socket.emit('leaveChat', userData.id, () => {
            dispatch(userLogout())
        })
    }

    window.onunload = () => {
        onChatLeave()
    };

    return (
        <div className="exit flex">
            <Link className="desktop-only" onClick={onChatLeave} to="/"><i className="far fa-times-circle"></i>leave the chat</Link>
            <Link className="mobile-only" onClick={onChatLeave} to="/"><i className="far fa-times-circle"></i></Link>
        </div>
    )
}