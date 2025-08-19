import { createContext, useState, useEffect } from 'react';
import './App.css';

import GlobalStyles from './globalStyles/GlobalStyles.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import publicRoutes from './routes/index.route.jsx';
import DefautLayout from './components/layout/defaultLayout/DefaultLayout.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Provider } from 'react-redux';
import store from './store/store.jsx';
import axios from 'axios';
function App() {
    const [id, setId] = useState();

    useEffect(() => {
        const getTeacherId = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const response = await axios.get(`${import.meta.env.VITE_BE_API_BASE_URL}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setId(response.data._id);
            } catch (err) {
                console.error('Error fetching user info:', err);
            }
        };
        getTeacherId();
    }, []);

    return (
        <GoogleOAuthProvider clientId="1080788604306-0hieg9rt038dscm1m3ig4fmcbels91em.apps.googleusercontent.com">
            <GlobalStyles>
                <Provider store={store}>
                    <Context.Provider value={{ id, setId }}>
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
                    </Context.Provider>
                </Provider>
            </GlobalStyles>
        </GoogleOAuthProvider>
    );
}
export const Context = createContext();
export default App;
