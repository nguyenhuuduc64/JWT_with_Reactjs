import React, { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './loginAcountForm.module.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
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
    const dispatch = useDispatch();
    const isLoginAccountFormVisible = useSelector((state) => state.form.isLoginAccountFormVisible);

    return (
        <div className={cx('wrapper')}>
            <form onSubmit={handleLogin} className={cx('login-form')}>
                <h2 className={cx('title')}>Đăng nhập vào Pi</h2>
                <div className={cx('input-group')}>
                    <label htmlFor="username" className={cx('label')}>
                        Tên đăng nhập
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className={cx('input')}
                        required
                        autoComplete="username"
                        placeholder="Nhập tên đăng nhập"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={cx('input-group')}>
                    <label htmlFor="password" className={cx('label')}>
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={cx('input')}
                        required
                        autoComplete="current-password"
                        placeholder="Nhập mật khẩu"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className={cx('login-btn')}>
                    Đăng nhập
                </button>
            </form>
        </div>
    );
}
export default LoginAcountForm;
