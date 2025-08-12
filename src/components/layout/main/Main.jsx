import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../../loginForm/LoginForm';
import GoogleLoginForm from '../../googleLoginForm/GoogleLoginForm';
import SignupForm from '../../signupForm/SignupForm';
import LoginAcountForm from '../../login/LoginAcountForm';
function Main({ children }) {
    return <div style={{ display: 'flex' }}>{children}</div>;
}

export default Main;
