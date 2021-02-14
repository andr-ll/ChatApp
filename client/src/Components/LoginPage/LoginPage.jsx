import React from 'react';

import Form from './Form'
import './LoginPage.scss'

// First component of Login procedure.

export const LoginPage = () => {
    
    return (
        <div className="login-page flex">
            <div className="login-box">
                <h3>Hello! Please create an user name for joining the chat!</h3>
                <Form />
            </div>
        </div>
    )
}