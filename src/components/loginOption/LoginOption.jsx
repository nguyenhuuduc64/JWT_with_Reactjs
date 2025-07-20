import React from 'react';
import styles from './loginOption.module.scss';
import classNames from 'classnames/bind';
import { showLoginAccountForm, showLoginGoogleForm, toggleLoginForm } from '../../product/formSlice';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Button from '../button/Button';
const cx = classNames.bind(styles);

function LoginOption({ name, option }) {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const options = [{ option: 'logwithgoogle' }, { option: 'logwithaccount', path: `${API_BASE_URL}/auth/login` }];
    const dispatch = useDispatch();

    const itemOption = options.find((item) => item.option === option);
    return (
        <div className={cx('wrapper')}>
            {option == 'logwithgoogle' && (
                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        const token = credentialResponse.credential;
                        console.log('Token:', token);
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
            {option == 'logwithaccount' && (
                <button
                    className={cx('login-button')}
                    onClick={() => {
                        dispatch(showLoginAccountForm());
                    }}
                >
                    {name}
                </button>
            )}
        </div>
    );
}

export default LoginOption;
