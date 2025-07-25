import { createContext, useState, useEffect } from 'react';
import './App.css';

import GlobalStyles from './globalStyles/GlobalStyles.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import publicRoutes from './routes/index.route.jsx';
import DefautLayout from './components/layout/defaultLayout/DefaultLayout.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
function App() {
    const [id, setId] = useState();
    useEffect(() => {
        const getTeacherId = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const res = await fetch('http://localhost:5000/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                setId(data._id);
            } catch (err) {
                console.error('Lỗi lấy thông tin người dùng:', err);
            }
        };
        getTeacherId();
    }, []);
    return (
        <GoogleOAuthProvider clientId="1080788604306-0hieg9rt038dscm1m3ig4fmcbels91em.apps.googleusercontent.com">
            <GlobalStyles>
                <Context.Provider value={{ id, setId }}>
                    {id ? (
                        <Router>
                            <Routes>
                                {publicRoutes.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={<DefautLayout>{<route.component />}</DefautLayout>}
                                    />
                                ))}
                            </Routes>
                        </Router>
                    ) : (
                        <div>Loading...</div> // hoặc spinner, v.v.
                    )}
                </Context.Provider>
            </GlobalStyles>
        </GoogleOAuthProvider>
    );
}
export const Context = createContext();
export default App;
