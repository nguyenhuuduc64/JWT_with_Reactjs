import { useState } from 'react';
import './App.css';

import GlobalStyles from './globalStyles/GlobalStyles.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import publicRoutes from './routes/index.route.jsx';
import DefautLayout from './components/layout/defaultLayout/DefaultLayout.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
function App() {
    const [count, setCount] = useState(0);

    return (
        <GoogleOAuthProvider clientId="1080788604306-0hieg9rt038dscm1m3ig4fmcbels91em.apps.googleusercontent.com">
            <GlobalStyles>
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
            </GlobalStyles>
        </GoogleOAuthProvider>
    );
}

export default App;
