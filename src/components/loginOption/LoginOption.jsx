import React from 'react';
import styles from './loginOption.module.scss';
import classNames from 'classnames/bind';
import { showLoginGoogleForm, toggleLoginForm } from '../../product/formSlice';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
const cx = classNames.bind(styles);

function LoginOption({ name, option }) {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const options = [{ option: 'logwithgoogle' }, { option: 'logwithaccount', path: `${API_BASE_URL}/auth/login` }];
    const dispatch = useDispatch();

    const itemOption = options.find((item) => item.option === option);
    return (
        <div>
            {option == 'logwithgoogle' && (
                <div style={{ width: '288px', height: '38px' }}>
                    <GoogleLogin
                        onSuccess={async (credentialResponse) => {
                            const token = credentialResponse.credential;
                            try {
                                const res = await axios.post('http://localhost:5000/auth/google', { token });
                                console.log('Đăng nhập thành công:', res.data);
                            } catch (err) {
                                console.error('Lỗi xác thực Google: ', err);
                            }
                        }}
                        onError={() => {
                            console.log('Đăng nhập thất bại');
                        }}
                    />
                </div>
            )}
            {option != 'logwithgoogle' && (
                <button
                    className={cx('login-option')}
                    onClick={() => {
                        if (itemOption.path) {
                            window.location.href = itemOption.path;
                        } else {
                            dispatch(showLoginGoogleForm());
                        }
                    }}
                >
                    {name}
                </button>
            )}
        </div>
    );
}

export default LoginOption;
