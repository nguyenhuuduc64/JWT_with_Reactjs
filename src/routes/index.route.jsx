import Signup from '../pages/signup/Signup';
import Home from '../pages/home/Home';
import CourseDetail from '../pages/follow/CourseDetail.jsx';
const publicRoutes = [
    { path: '/', component: Home },

    { path: '/follow/:courseId', component: CourseDetail },
];
export default publicRoutes;
