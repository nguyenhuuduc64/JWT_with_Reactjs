import styles from './header.module.scss';
import classNames from 'classnames/bind';
import Button from '../../button/Button';
import LoginForm from '../../loginForm/LoginForm';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginForm, toggleSignupForm } from '../../../product/formSlice';
const cx = classNames.bind(styles);

function Header() {
    const buttonStyle = {
        display: 'inline-block',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100px',
        height: '40px',
        margin: '10px',
    };
    const dispatch = useDispatch();
    return (
        <header className={cx('wrapper')}>
            <div className={cx('logo')}></div>
            <div>
                <Button
                    name="Đăng nhập"
                    styles={buttonStyle}
                    onClick={() => {
                        dispatch(toggleLoginForm());
                    }}
                />
                <Button
                    name="Đăng ký"
                    styles={buttonStyle}
                    onClick={() => {
                        dispatch(toggleSignupForm());
                    }}
                />
            </div>
        </header>
    );
}

export default Header;
