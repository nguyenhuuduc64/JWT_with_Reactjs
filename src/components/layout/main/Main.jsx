import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../../loginForm/LoginForm';
import GoogleLoginForm from '../../googleLoginForm/GoogleLoginForm';
import SignupForm from '../../signupForm/SignupForm';

function Main({ children }) {
    const isFormVisible = useSelector((state) => state.form.isFormVisible);
    const isLoginGoogleFormVisible = useSelector((state) => state.form.isLoginGoogleFormVisible);
    const isLoginAccountFormVisible = useSelector((state) => state.form.isLoginAccountFormVisible);
    return (
        <div>
            {isFormVisible && <LoginForm />}
            {isLoginGoogleFormVisible && <GoogleLoginForm />}
            {isLoginAccountFormVisible && <SignupForm />}
            {children}
        </div>
    );
}

export default Main;
