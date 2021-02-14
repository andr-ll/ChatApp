import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../../state/actions/user';

// Form which is used for getting to the chat.

const Form = () => {

    const dispatch = useDispatch();
    const [userName, setUserName] = useState('')

    const onLogin = () => {
        dispatch(loginUser(userName))
    }

    return (
        <form action="submit" className="flex" onSubmit={evt => evt.preventDefault()}>
            <input placeholder="Create an user name..." type="text" value={userName} onChange={evt => setUserName(evt.target.value)} />
            <Link onClick={onLogin} to="/room" className={`${userName.trim() === '' || userName.length > 20 ? "disabled" : ""}`}>
                Login
                <i className="fas fa-comments"></i>
            </Link>
            {userName.length > 20 && <span><i className="fas fa-exclamation-triangle"></i>User name should be less than 20 symbols!</span>}
        </form>
    )
}

export default Form;