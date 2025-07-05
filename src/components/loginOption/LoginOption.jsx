import React from 'react';
import styles from './loginOption.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function LoginOption({ name, option }) {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const options = [
        { option: 'logwithgoogle', path: `${API_BASE_URL}/auth/google` },
        { option: 'logwithaccount', path: `${API_BASE_URL}/auth/login` },
    ];
    console.log('ENV CHECK:', import.meta.env.VITE_API_BASE_URL);

    const itemOption = options.find((item) => item.option === option);
    return (
        <div>
            <button
                className={cx('login-option')}
                onClick={() => {
                    window.location.href = itemOption.path;
                }}
            >
                {name}
            </button>
        </div>
    );
}

export default LoginOption;
