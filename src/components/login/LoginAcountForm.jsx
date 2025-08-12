import React, { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './loginAcountForm.module.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Form from '../form/Form.jsx';
const cx = classNames.bind(styles);
function LoginAcountForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của form
        try {
            const res = await axios.post('http://localhost:5000/auth/login', {
                username,
                password,
            });
            console.log('Login successful:', res.data);
            localStorage.setItem('token', res.data.token);
            alert('Đăng nhập thành công!');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };
    return (
        <Form
            className={cx('wrapper')}
            formName={'Đăng nhập tài khoản'}
            fieldsInput={['username', 'password']}
            fieldsOutput={['username', 'password']}
            isSubmit={true}
            submitName="Đăng nhập"
        ></Form>
    );
}
export default LoginAcountForm;
