import React, { useContext, useReducer, useRef } from 'react';
import { useEffect, useState } from 'react';
import styles from './header.module.scss';
import classNames from 'classnames/bind';
import Button from '../../button/Button';
import LoginForm from '../../loginForm/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { showForm } from '../../../product/formSlice';
import SignupForm from '../../signupForm/SignupForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faDownLong, faSortDown, faUpDown } from '@fortawesome/free-solid-svg-icons';
import Menu from '../../menu/Menu';
import Search from '../../search/Search';
import { Context } from '../../../App';
import { use } from 'react';
import NotificationList from '../../notificationList/NotificationList';
import axios from 'axios';
const cx = classNames.bind(styles);

function Header() {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [menuState, setMenuState] = useState(false);
    const menuRef = useRef(null);
    const [searchResults, setSearchResults] = useState([]);
    const [notificationState, setNotificationState] = useState(false);
    const { isUser, setIsUser } = useContext(Context);
    const [joinRequests, setJoinRequests] = useState([]);
    const VITE_BE_API_BASE_URL = import.meta.env.VITE_BE_API_BASE_URL;

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
    useEffect(() => {
        if (user) setIsUser(user.role);
        const getRequestJointCourse = () => {
            axios
                .get(`${VITE_BE_API_BASE_URL}/me/request`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then((res) => setJoinRequests(res.data));
        };
        getRequestJointCourse();
    }, [user]);
    console.log('join req', joinRequests);
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
                {user && user.role == 'teacher' && (
                    <div className={cx('user-info')} ref={menuRef}>
                        <p className={cx('user-name')}>{user.fullname}</p>
                        <FontAwesomeIcon icon={faSortDown} onClick={() => setMenuState((prev) => !prev)} />
                        <FontAwesomeIcon icon={faBell} onClick={() => setNotificationState((prev) => !prev)} />
                        <div ref={menuRef}>
                            {menuState && <Menu menuItems={[{ label: 'Đăng xuất', action: '' }]} />}
                            {notificationState && <NotificationList items={joinRequests} />}
                        </div>
                    </div>
                )}
                {user && user.role == 'student' && (
                    <div style={{ display: 'flex' }} ref={menuRef}>
                        <Search />
                        <div className={cx('user-info')}>
                            <p className={cx('user-name')}>{user.fullname}</p>
                            <FontAwesomeIcon icon={faSortDown} onClick={() => setMenuState((prev) => !prev)} />
                            <div ref={menuRef}>
                                {menuState && <Menu menuItems={[{ label: 'Đăng xuất', action: '' }]} />}
                            </div>
                        </div>
                    </div>
                )}
                {!user && (
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
