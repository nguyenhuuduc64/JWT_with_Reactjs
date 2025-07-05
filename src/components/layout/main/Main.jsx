import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../../loginForm/LoginForm';

function Main({ children }) {
    const isFormVisible = useSelector((state) => state.form.isFormVisible);
    return (
        <div>
            {isFormVisible && <LoginForm />}
            {children}
        </div>
    );
}

export default Main;
