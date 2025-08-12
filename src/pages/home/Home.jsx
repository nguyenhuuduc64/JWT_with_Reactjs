import React, { useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './home.module.scss';
import { useState } from 'react';
import axios from 'axios';
import Course from '../../components/course/Course';
import { Context } from '../../App';
import CourseCard from '../../components/course/Course';
const VITE_BE_API_BASE_URL = import.meta.env.VITE_BE_API_BASE_URL;
const cx = classNames.bind(styles);

function Home() {
    const { id } = useContext(Context);
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        if (!id) {
        }
        const fetchCourses = async () => {
            try {
                if (!id) {
                    console.error('User ID is not available');
                    return;
                }
                const response = await axios.get(`${VITE_BE_API_BASE_URL}/course/user/${id}`);
                const data = response.data;
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, [id]);
    return (
        <div className={cx('wrapper')}>
            {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
            ))}
        </div>
    );
}

export default Home;
