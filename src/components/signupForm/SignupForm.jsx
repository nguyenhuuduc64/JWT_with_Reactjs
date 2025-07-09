import React from 'react';
import classNames from 'classnames/bind';
import styles from './signupForm.module.scss';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
            })
            .then((response) => {
                alert('Tạo tài khoản thành công!');
                window.location.href = '/';
            });
    };

    return (
        <div className = {cx('wrapper-background')}>
            <div className={cx('wrapper')}>
                <div className={cx('logo')}>
                    <img src="./assets/img/logo.png" alt="" />
                    <h5 className={cx('title')}>Đăng ký tài khoản với MATHEMATICS</h5>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            User name
                        </label>
                        <input type="text" name="username" className="form-control" id="username" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input type="password" name="password" className="form-control" id="exampleInputPassword1" />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignupForm;
