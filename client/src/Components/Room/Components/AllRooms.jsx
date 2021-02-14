import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../../socket"
import { userChangeRoom } from "../../../state/actions/user";

// This component renders all rooms that user can join.
// Also it changes current room, when user moved to another chat room.

export const AllRooms = ({onRoomClick}) => {

    const [rooms, setRooms] = useState([]);
    const dispatch = useDispatch();
    const userData = useSelector(
        state => state.userState.userData
    )

    useEffect(() => {
        socket.on('allRooms', roomsData => {
            setRooms(roomsData)
        })
        return () => { setRooms([]) }
    }, [])

    const onRoomChange = (room) => {
        socket.emit('changeRoom', userData.id, room, (user) => {
            dispatch(userChangeRoom(user));
            onRoomClick();
        })
    }

    return (
        <div className="rooms flex">
            <h4>Rooms:</h4>
            { rooms.map((item, id) => <a onClick={() => onRoomChange(item.name)} className={`${userData.room === item.name ? "my-room" : ""}`} key={id}>{item.name}</a>)}
        </div>
    )
}