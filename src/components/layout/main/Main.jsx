import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../../loginForm/LoginForm';
import GoogleLoginForm from '../../googleLoginForm/GoogleLoginForm';
import SignupForm from '../../signupForm/SignupForm';
import LoginAcountForm from '../../login/LoginAcountForm';
import { isSignupFormVisible } from '../../../product/formSlice';
function Main({ children }) {
    const isFormVisible = useSelector((state) => state.form.isFormVisible);
    const isLoginGoogleFormVisible = useSelector((state) => state.form.isLoginGoogleFormVisible);
    const isLoginAccountFormVisible = useSelector((state) => state.form.isLoginAccountFormVisible);
    const isSignupFormVisible = useSelector((state) => state.form.isSignupFormVisible);
    return (
        <div style={{ display: 'flex' }}>
            {isFormVisible && <LoginForm />}
            {isLoginGoogleFormVisible && <GoogleLoginForm />}
            {isLoginAccountFormVisible && <LoginAcountForm />}
            {isSignupFormVisible && <SignupForm />}
            {children}
        </div>
    );
}

export default Main;
