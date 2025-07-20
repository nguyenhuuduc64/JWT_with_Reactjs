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
                fullname: event.target.fullname.value,
                role: event.target.role.value,
            })
            .then((response) => {
                alert('Tạo tài khoản thành công!');
                window.location.href = '/';
            });
    };

    return (
        <div className={cx('wrapper-background')}>
            <div className={cx('wrapper')}>
                {/*<div className={cx('logo')}>
                    <img src="./assets/img/logo.png" alt="" />
                </div>*/}
                <h5 className={cx('title')}>Đăng ký tài khoản mới</h5>

                <form onSubmit={handleSubmit}>
                    <div className={cx('input-group')}>
                        <label htmlFor="fullname" className="form-label">
                            Họ và tên
                        </label>
                        <input type="text" name="fullname" id="fullname" />
                    </div>
                    <div className={cx('input-group')}>
                        <label htmlFor="username" className="form-label">
                            Tên đăng nhập
                        </label>
                        <input type="text" name="username" id="username" />
                    </div>
                    <div className={cx('input-group')}>
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Địa chỉ Email
                        </label>
                        <input type="email" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className={cx('input-group')}>
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Mật khẩu
                        </label>
                        <input type="password" name="password" id="exampleInputPassword1" />
                    </div>
                    <div className={cx('input-group')}>
                        <label htmlFor="username" className="form-label">
                            Bạn là
                        </label>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ margin: '0 20px' }}>
                                <label htmlFor="" style={{ margin: '0 10px' }}>
                                    Học sinh
                                </label>
                                <input type="radio" name="role" value="student" />
                            </div>
                            <div style={{ margin: '0 20px' }}>
                                <label htmlFor="" style={{ margin: '0 10px' }}>
                                    Giáo viên
                                </label>
                                <input type="radio" name="role" value="teacher" />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className={cx('login-btn')}>
                        Đăng ký tài khoản
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignupForm;
