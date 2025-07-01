import React, { useState } from 'react';
import axios from 'axios';

function Login () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    try{
      const res = await axios.post('http://localhost:5000/auth/login', {
        username,
        password
      })
      console.log('Login successful:', res.data);
      localStorage.setItem('token', res.data.token);
      alert('Đăng nhập thành công!');
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
  return (
    <div className="login-page">
      <form>
        <div>
          <label htmlFor="username">Tên đăng nhập:</label>
          <input type="text" id="username" name="username" required onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="password">Mật khẩu:</label>
          <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button  onClick={handleLogin}>Đăng nhập</button>
      </form>
    </div>
  );
}
export default Login;