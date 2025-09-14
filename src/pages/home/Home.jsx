import React, { useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './home.module.scss';
import { useState } from 'react';
import axios from 'axios';
import Course from '../../components/course/Course';
import { Context } from '../../App';
import CourseCard from '../../components/course/Course';
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';
import { useSelector } from 'react-redux';
const VITE_BE_API_BASE_URL = import.meta.env.VITE_BE_API_BASE_URL;
const cx = classNames.bind(styles);

function Home() {
    const { id } = useContext(Context);
    const [courses, setCourses] = useState([]);
    const [courseJoined, setCourseJoined] = useState([]);
    const { isUser } = useContext(Context);
    const courseResults = useSelector((state) => state.search.results);
    useEffect(() => {
        if (!id) {
            return;
        }
        const fetchCourses = async () => {
            try {
                if (!id) {
                    return;
                }
                const response = await axios.get(`${VITE_BE_API_BASE_URL}/course/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                const data = response.data;
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
        const getCourseJoined = () => {
            axios
                .get(`${VITE_BE_API_BASE_URL}/me/courses-joined/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then((res) => setCourseJoined(res.data));
        };
        getCourseJoined();
    }, [id]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider container')}>
                <div id="carouselExampleIndicators" className={cx('carousel slide')} data-ride="carousel">
                    <ol className={cx('carousel-indicators')} style={{ zIndex: 9 }}>
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className={cx('active')}></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>

                    <div className={cx('carousel-inner')}>
                        <div className={cx('carousel-item active')}>
                            <div className={cx('elearning-slide')}>
                                <div className={cx('elearning-text')}>
                                    <h2>Học Toán Trực Tuyến Hiệu Quả</h2>
                                    <p>
                                        Nâng cao tư duy logic và kỹ năng giải quyết vấn đề với các khóa học Toán học
                                        trực tuyến. Từ cơ bản đến nâng cao, phù hợp cho mọi lứa tuổi.
                                    </p>
                                    <button className={cx('btn')}>XEM KHÓA HỌC</button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('carousel-item')}>
                            <div className={cx('elearning-slide')}>
                                <div className={cx('elearning-text')}>
                                    <h2>Luyện Thi Toán Chuyên Sâu</h2>
                                    <p>
                                        Hệ thống bài tập chọn lọc, bám sát đề thi, giúp học viên luyện tập và nâng cao
                                        kỹ năng giải toán một cách hiệu quả.
                                    </p>
                                    <button className={cx('btn')}>XEM BÀI TẬP</button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('carousel-item')}>
                            <div className={cx('elearning-slide')}>
                                <div className={cx('elearning-text')}>
                                    <h2>Khóa Học Tương Tác Trực Tuyến</h2>
                                    <p>
                                        Tham gia lớp học trực tiếp với giáo viên, trao đổi và giải đáp thắc mắc ngay
                                        trong buổi học, giúp tiếp thu nhanh hơn.
                                    </p>
                                    <button className={cx('btn')}>THAM GIA NGAY</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a
                        className={cx('carousel-control-prev')}
                        href="#carouselExampleIndicators"
                        role="button"
                        data-slide="prev"
                    >
                        <span className={cx('carousel-control-prev-icon')} aria-hidden="true"></span>
                        <span className={cx('sr-only')}>Previous</span>
                    </a>
                    <a
                        className={cx('carousel-control-next')}
                        href="#carouselExampleIndicators"
                        role="button"
                        data-slide="next"
                    >
                        <span className={cx('carousel-control-next-icon')} aria-hidden="true"></span>
                        <span className={cx('sr-only')}>Next</span>
                    </a>
                </div>
            </div>
            <div className={cx('created-courses')}>
                {isUser == 'teacher' && (
                    <div>
                        <h3>Các khóa học đã tạo</h3>
                        <div className={cx('course-list')}>
                            {courses.map((course) => (
                                <CourseCard key={course._id} course={course} />
                            ))}
                        </div>
                    </div>
                )}
                {isUser == 'student' && (
                    <div>
                        <div className={cx('course-list')}>
                            {courseResults.map((course) => {
                                let isJoined = false;
                                if (courseJoined.some((courseItem) => courseItem._id === course._id)) isJoined = true;
                                return <CourseCard key={course._id} course={course} isJoined={isJoined} />;
                            })}
                        </div>
                        <h3>Các khóa học đã tham gia</h3>
                        <div className={cx('course-list')}>
                            {courseJoined.map((course) => (
                                <CourseCard key={course._id} course={course} isJoined={true} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
