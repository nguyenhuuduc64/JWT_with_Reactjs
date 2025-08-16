import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
import CourseCard from '../../components/course/Course';
import classNames from 'classnames/bind';
import styles from './follow.module.scss';
import { useParams } from 'react-router-dom';
import StudentCard from '../../components/studentCard/StudentCard.jsx';
import LessionCard from '../../components/lessionCard/LessionCard.jsx';
import Button from '../../components/button/Button';
import Form from '../../components/form/Form';
import { useDispatch } from 'react-redux';
import { showForm } from '../../product/formSlice.jsx';
const cx = classNames.bind(styles);

function CourseDetail() {
    const [studentsList, setStudentsList] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [formSubmitAction, setFormSubmitAction] = useState(false);
    const { id } = useContext(Context);
    const courseId = useParams().courseId;
    const addLessionApi = `${import.meta.env.VITE_BE_API_BASE_URL}/course/${courseId}`;
    const getLessionsApi = `${import.meta.env.VITE_BE_API_BASE_URL}/course/${courseId}/lessons`;
    const dispatch = useDispatch();

    useEffect(() => {
        //hàm lấy thông tin khóa học
        axios.get('');
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
            <h3>{}</h3>
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
