import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../../loginForm/LoginForm';
import GoogleLoginForm from '../../googleLoginForm/GoogleLoginForm';
import SignupForm from '../../signupForm/SignupForm';
import LoginAcountForm from '../../login/LoginAcountForm';
import Chat from '../../chat/Chat';
function Main({ children }) {
    return (
        <div style={{ display: 'flex', marginTop: '20px' }}>
            {children} <Chat></Chat>
        </div>
    );
}

export default Main;
