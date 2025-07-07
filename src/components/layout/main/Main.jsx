import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../../loginForm/LoginForm';
import GoogleLoginForm from '../../googleLoginForm/GoogleLoginForm';

function Main({ children }) {
    const isFormVisible = useSelector((state) => state.form.isFormVisible);
    const isLoginGoogleFormVisible = useSelector((state) => state.form.isLoginGoogleFormVisible);
    const isLoginAccountFormVisible = useSelector((state) => state.form.isLoginAccountFormVisible);
    console.log(isFormVisible, isLoginGoogleFormVisible, isLoginAccountFormVisible);
    return (
        <div>
            {isFormVisible && <LoginForm />}
            {isLoginGoogleFormVisible && <GoogleLoginForm />}
            {isLoginAccountFormVisible && <div>Account Login Form Placeholder</div>}
            {children}
        </div>
    );
}

export default Main;
