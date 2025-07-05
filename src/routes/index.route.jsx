import Login from '../pages/login/Login';
import Signup from '../pages/signup/Signup';
import Home from '../pages/home/Home';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/auth/login', component: Login },
    { path: '/signup', component: Signup },
];
export default publicRoutes;
