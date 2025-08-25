import React, { useReducer, useRef } from 'react';
import { useEffect, useState } from 'react';
import styles from './header.module.scss';
import classNames from 'classnames/bind';
import Button from '../../button/Button';
import LoginForm from '../../loginForm/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { showForm } from '../../../product/formSlice';
import SignupForm from '../../signupForm/SignupForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownLong, faSortDown, faUpDown } from '@fortawesome/free-solid-svg-icons';
import Menu from '../../menu/Menu';
const cx = classNames.bind(styles);

function Header() {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [menuState, setMenuState] = useState(false);
    const menuRef = useRef(null);
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

        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuState(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img
                    src="/assets/img/logo.png"
                    alt="Logo"
                    onClick={() => (window.location.href = '/')}
                    style={{ cursor: 'pointer' }}
                />
                <p>Học toán để ứng dụng</p>
            </div>
            <div className={cx('auth-btns')}>
                {user ? (
                    <div className={cx('user-info')} ref={menuRef}>
                        <p className={cx('user-name')}>{user.fullname}</p>
                        <FontAwesomeIcon icon={faSortDown} onClick={() => setMenuState((prev) => !prev)} />
                        <div ref={menuRef}>
                            {menuState && <Menu menuItems={[{ label: 'Đăng xuất', action: '' }]} />}
                        </div>
                    </div>
                ) : (
                    <div>
                        <Button name="Đăng ký" style="none" onClick={() => dispatch(showForm('Đăng ký tài khoản'))} />
                        <Button name="Đăng nhập" onClick={() => dispatch(showForm('Đăng nhập'))} />
                        <LoginForm />
                        <SignupForm />
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
