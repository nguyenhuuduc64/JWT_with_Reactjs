import React from 'react';
import classNames from 'classnames/bind';
import styles from './signupForm.module.scss';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from '../form/Form.jsx';

const cx = classNames.bind(styles);

function SignupForm() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('http://localhost:5000/auth/create', {
                username: event.target.username.value,
                email: event.target.email.value,
                password: event.target.password.value,
                fullname: event.target.fullname.value,
                role: event.target.role.value,
            })
            .then((response) => {
                alert('Tạo tài khoản thành công!');
                window.location.href = '/';
            });
    };

    return (
        <Form
            className={cx('wrapper')}
            formName={'Đăng ký tài khoản'}
            fieldsInput={['fullname', 'username', 'email', 'password']}
            fieldsOutput={['fullname', 'username', 'email', 'password', 'role']}
            isSubmit={true}
            submitName="Đăng ký tài khoản"
            api={'http://localhost:5000/auth/create'}
        ></Form>
    );
}

export default SignupForm;
