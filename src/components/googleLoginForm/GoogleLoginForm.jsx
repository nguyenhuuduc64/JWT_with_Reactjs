import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import Button from '../button/Button';

function GoogleLoginForm() {
    return (
        <GoogleLogin
            onSuccess={(credentialResponse) => {
                const decoded = jwtDecode(credentialResponse.credential);

                // Gửi token này về backend để xác thực (nếu có backend)
            }}
            onError={() => {
                console.log('Đăng nhập thất bại');
            }}
            containerProps={{
                style: {
                    width: '300px',
                    height: '40px',
                    margin: 'auto',
                },
                className: 'my-google-container',
            }}
        />
    );
}

export default GoogleLoginForm;
