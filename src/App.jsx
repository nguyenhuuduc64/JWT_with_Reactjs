import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Login from './pages/login/Login.jsx';
import GlobalStyles from './globalStyles/GlobalStyles.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import publicRoutes from './routes/index.route.jsx';
import DefautLayout from './components/layout/defaultLayout/DefaultLayout.jsx';
function App() {
    const [count, setCount] = useState(0);

    return (
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
    );
}

export default App;
