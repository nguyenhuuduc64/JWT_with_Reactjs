import React from 'react';
import styles from './loginOption.module.scss';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Button from '../button/Button';
const cx = classNames.bind(styles);

function LoginOption({ name, option, onClick }) {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const options = [{ option: 'logwithgoogle' }, { option: 'logwithaccount', path: `${API_BASE_URL}/auth/login` }];

    const itemOption = options.find((item) => item.option === option);
    return (
        <div className={cx('wrapper')} onClick={onClick}>
            {option == 'logwithgoogle' && (
                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        const token = credentialResponse.credential;
                        try {
                            console.log('Đang giải mã token...');
                            const res = await axios.post('http://localhost:5000/auth/google', { token });
                            console.log('Đăng nhập thành công:', res.data);
                        } catch (err) {
                            console.error('Lỗi xác thực Google: ', err);
                        }
                    }}
                    onError={() => {
                        console.log('Đăng nhập thất bại');
                    }}
                    width="400px"
                />
            )}
            {option == 'logwithaccount' && <p className={cx('login-button')}>{name}</p>}
        </div>
    );
}

export default LoginOption;
