import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../App.jsx';
import CourseCard from '../../components/course/Course.jsx';
import classNames from 'classnames/bind';
import styles from './follow.module.scss';
import { Link, useParams } from 'react-router-dom';
import StudentCard from '../../components/studentCard/StudentCard.jsx';
import LessionCard from '../../components/lessionCard/LessionCard.jsx';
import Button from '../../components/button/Button.jsx';
import Form from '../../components/form/Form.jsx';
import { useDispatch } from 'react-redux';
import { showForm } from '../../product/formSlice.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function CourseDetail() {
    const [studentsList, setStudentsList] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [courseName, setCourseName] = useState();
    const { id } = useContext(Context);
    const courseId = useParams().courseId;
    const addLessionApi = `${import.meta.env.VITE_BE_API_BASE_URL}/course/${courseId}`;
    const getLessionsApi = `${import.meta.env.VITE_BE_API_BASE_URL}/course/${courseId}/lessons`;
    const dispatch = useDispatch();

    useEffect(() => {
        //hàm lấy thông tin khóa học
        axios
            .get(`${import.meta.env.VITE_BE_API_BASE_URL}/course/${courseId}`)
            .then((res) => setCourseName(res.data.title))
            .catch((err) => console.error('Error fetching followings:', err));

        // ham fetch danh sách hoc sinh
        axios
            .get(`${import.meta.env.VITE_BE_API_BASE_URL}/me/follow/${courseId}`)
            .then((res) => setStudentsList(res.data))
            .catch((err) => console.error('Error fetching followings:', err));

        // ham fetch danh sách bai hoc
        axios
            .get(getLessionsApi)
            .then((res) => setLessons(res.data))
            .catch((err) => console.error('Error fetching lessons:', err));
    }, [id]);

    return (
        <div className="follow-page">
            <h3>
                <Link to="/">
                    <FontAwesomeIcon icon={faAngleLeft} style={{ paddingRight: '13px' }} />
                </Link>
                {courseName}
            </h3>
            <div className={cx('course-list')}>
                <h3>Danh sách học viên theo dõi khóa học</h3>
                <div className={cx('student-list')}>
                    {studentsList.map((student) => (
                        <StudentCard key={student._id} student={student} />
                    ))}
                </div>
                <h3>Danh sách các bài học</h3>
                <div className={cx('courses-list')}>
                    <div className={cx('add-lession')}>
                        <Button name="Thêm bài học" onClick={() => dispatch(showForm('Thêm khóa học mới'))} />
                    </div>
                    <div className={cx('lessons-list')}>
                        {lessons.map((lesson) => (
                            <LessionCard key={lesson._id} name={lesson.title} />
                        ))}
                    </div>
                </div>
            </div>
            <Form
                fieldsInput={['title']}
                fieldsOutput={['title']}
                formName="Thêm khóa học mới"
                method="post"
                api={addLessionApi}
            />
        </div>
    );
}

export default CourseDetail;
