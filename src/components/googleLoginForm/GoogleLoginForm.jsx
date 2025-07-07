import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function GoogleLoginForm() {
    return (
        <div>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    const decoded = jwtDecode(credentialResponse.credential);

                    console.log('Thông tin người dùng:', decoded);
                    // Gửi token này về backend để xác thực (nếu có backend)
                }}
                onError={() => {
                    console.log('Đăng nhập thất bại');
                }}
            />
        </div>
    );
}

export default GoogleLoginForm;
