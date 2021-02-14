import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../../../socket';

// This component gets data about Users from server and shows how many 
// users are currently in the specific room

export const Users = () => {

    const [users, setUsers] = useState([]);
    const userData = useSelector(
        state => state.userState.userData
    )

    useEffect(() => {
        socket.on("roomData", roomData => {
            setUsers(roomData.users);
        });

        socket.on('newRoom', () => { setUsers([]) })

        return () => { setUsers([]) }
    }, [])

    return (
        <div className="all-users flex">
            <h4 className="desktop-only">Users in {userData.room}:</h4>
            <h4 className="mobile-only">Users:</h4>
            <div className="users-wrapper flex">
                {users.map((user, id) => <p className={`${userData.name === user.name ? "me" : ""}`} key={id}>{user.name}</p>)}
            </div>
        </div>
    )
}