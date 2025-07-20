import React from 'react';
import { useEffect, useState } from 'react';
import styles from './header.module.scss';
import classNames from 'classnames/bind';
import Button from '../../button/Button';
import LoginForm from '../../loginForm/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginForm, toggleSignupForm } from '../../../product/formSlice';
const cx = classNames.bind(styles);

function Header() {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            console.log('token', token);
            try {
                const res = await fetch('http://localhost:5000/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                console.log('data', data);
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
                        <Button
                            name="Đăng ký"
                            style="none"
                            onClick={() => {
                                dispatch(toggleSignupForm());
                            }}
                        />
                        <Button
                            name="Đăng nhập"
                            onClick={() => {
                                dispatch(toggleLoginForm());
                            }}
                        />
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
