import React from 'react';
import { useEffect, useState } from 'react';
import styles from './header.module.scss';
import classNames from 'classnames/bind';
import Button from '../../button/Button';
import LoginForm from '../../loginForm/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { showForm } from '../../../product/formSlice';
import SignupForm from '../../signupForm/SignupForm';
const cx = classNames.bind(styles);

function Header() {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const res = await fetch('http://localhost:5000/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.status === 403) {
                    console.warn('Token không hợp lệ hoặc đã hết hạn.');
                    localStorage.removeItem('token');
                    setUser(null);
                    return;
                }

                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error('Lỗi lấy thông tin người dùng:', err);
            }
        };

        fetchUser();
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('logo')}></div>
            <div className={cx('auth-btns')}>
                {user ? (
                    <p className={cx('user-name')}>{user.fullname}</p>
                ) : (
                    <>
                        <Button name="Đăng ký" style="none" onClick={() => dispatch(showForm('Đăng ký tài khoản'))} />
                        <Button name="Đăng nhập" onClick={() => dispatch(showForm('Đăng nhập'))} />
                        <LoginForm />
                        <SignupForm />
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
