import React from 'react';
import styles from './loginForm.module.scss';
import classNames from 'classnames/bind';
import LoginOption from './../loginOption/LoginOption';

const cx = classNames.bind(styles);

function LoginForm() {
    return (
        <div className={cx('wrapper')}>
            <LoginOption name="Đăng nhập bằng tài khoản Google" option="logwithgoogle" />
            <LoginOption name="Đăng nhập bằng tài khoản/Mật khẩu" option="logwithaccount" />
        </div>
    );
}

export default LoginForm;
