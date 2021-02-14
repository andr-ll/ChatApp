import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { socket } from "../../socket";
import { createUser } from "../../state/actions/user";
import './Room.scss'
import { Users } from "./Components/Users";
import { Messages } from "./Components/Messages";
import { MessageInput } from "./Components/MessageInput";
import { AllRooms } from "./Components/AllRooms";
import { ExitChat } from "./Components/ExitChat";
import { Hamburger } from "./Components/Hamburger";

// Main component of a Chat room. It renders automatically when uder joins
// chat or changing the room

export const Room = () => {

    const dispatch = useDispatch();
    const userName = useSelector(
        state => state.userState.userName
    )
    const [error, setError] = useState('');
    const [activeHamb, setActiveHamb] = useState(false)

    useEffect(() => {
        socket.emit('login', userName, (data) => {
            if (data.error !== '') {
                setError(data.error);
            } else {
                dispatch(createUser(data.user))
            }
        })
        return () => { setError('') }
    }, [])

    const onHamburgerClick = () => {
        activeHamb ? setActiveHamb(false) : setActiveHamb(true)
    }

    const onRoomClick = () => {
        setActiveHamb(false)
    }

    return (
        <React.Fragment>
            {
                error !== '' ?
                    <div className="error-window">
                        <p>{error}</p>
                        <Link to="/">Go Back</Link>
                    </div>
                    :
                    <div className="room flex">
                        <div className="sidebar flex">
                            <ExitChat />
                            <div className="container desktop-only flex">
                                <AllRooms onRoomClick={onRoomClick} />
                                <Users />
                            </div>
                            <div className={`${activeHamb ? "active" : ""} container mobile-only flex`}>
                                <AllRooms onRoomClick={onRoomClick} />
                                <Users />
                            </div>
                            <Hamburger isActive={activeHamb} setActive={onHamburgerClick} />
                        </div>
                        <div className="messages flex">
                            <Messages />
                            <MessageInput />
                        </div>
                    </div>
            }
        </React.Fragment>
    )
}