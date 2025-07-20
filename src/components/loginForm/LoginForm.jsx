import React from 'react';
import styles from './loginForm.module.scss';
import classNames from 'classnames/bind';
import LoginOption from './../loginOption/LoginOption';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function LoginForm() {
    return (
        <div className={cx('wrapper')}>
            <LoginOption name="Đăng nhập bằng tài khoản Google" option="logwithgoogle" />
            <div className={cx('loggin-btn')}>
                <div className={cx('icon')}>
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <LoginOption name="Đăng nhập bằng tài khoản/Mật khẩu" option="logwithaccount" />
            </div>
        </div>
    );
}

export default LoginForm;
