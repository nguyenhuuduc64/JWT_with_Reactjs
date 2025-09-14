import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../App.jsx';
import CourseCard from '../../components/course/Course.jsx';
import classNames from 'classnames/bind';
import styles from './follow.module.scss';
import { Link, useParams } from 'react-router-dom';
import StudentCard from '../../components/studentCard/StudentCard.jsx';
import LessonCard from '../../components/lessonCard/LessonCard.jsx';
import Button from '../../components/button/Button.jsx';
import Form from '../../components/form/Form.jsx';
import { useDispatch } from 'react-redux';
import { showForm } from '../../product/formSlice.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import QuestionForm from '../../components/questionForm/QuestionForm.jsx';
import { uploadQuestionsToSupabase } from '../../config/supabase.js';
import { supabase } from '../../config/supabase.js';
import CreateTestForm from '../../components/createTestForm/CreateTestForm.jsx';
const cx = classNames.bind(styles);

function CourseDetail({}) {
    const [studentsList, setStudentsList] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [courseName, setCourseName] = useState();
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [showTestForm, setShowTestForm] = useState(false);

    const [questions, setQuestions] = useState([]);
    const { id, role } = useContext(Context);
    const courseId = useParams().courseId;
    const addLessionApi = `${import.meta.env.VITE_BE_API_BASE_URL}/lesson/${courseId}`;
    const getLessionsApi = `${import.meta.env.VITE_BE_API_BASE_URL}/course/${courseId}/lessons`;
    const addQuestionsApi = `${import.meta.env.VITE_BE_API_BASE_URL}/question/add/${courseId}`;
    const getReqJoinCourseApi = `${import.meta.env.VITE_BE_API_BASE_URL}/me/request/${courseId}`;
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

    const handleAddQuestion = (newQuestion) => {
        setQuestions([...questions, newQuestion]);
    };
    const handleComplete = async (finalQuestions) => {
        try {
            const uploadedQuestions = [];

            for (let q of finalQuestions) {
                let imageUrl = null;

                if (q.questionImage) {
                    const file = q.questionImage;
                    const filePath = `images/${Date.now()}-${file.name}`;

                    // Upload file lên Supabase Storage bucket "questions/images"
                    const { data, error } = await supabase.storage.from('questions').upload(filePath, file);

                    if (error) {
                        console.error('Upload error:', error.message);
                        continue;
                    }

                    // Lấy public URL
                    const { data: publicUrlData } = supabase.storage.from('questions').getPublicUrl(filePath);

                    imageUrl = publicUrlData.publicUrl;
                }

                uploadedQuestions.push({
                    questionNumber: q.questionNumber,
                    note: q.note,
                    answer: q.answer,
                    imageUrl, // chỉ gửi URL thay vì file
                });
            }

            // Gửi lên BE để lưu DB
            await axios
                .post(addQuestionsApi, {
                    courseId,
                    questions: uploadedQuestions,
                })
                .then((res) => console.log(res.data));

            alert('Đã lưu câu hỏi thành công!');
        } catch (err) {
            console.error(err);
            alert('Có lỗi khi lưu câu hỏi!');
        }
    };

    console.log('questions', questions);
    switch (role) {
        case 'student':
            return (
                <div className="follow-page">
                    <h3>
                        <Link to="/">
                            <FontAwesomeIcon icon={faAngleLeft} style={{ paddingRight: '13px' }} />
                        </Link>
                        {courseName}
                    </h3>
                    <div className={cx('course-list')}>
                        {role == 'teacher' && (
                            <div>
                                <h3>Danh sách học viên theo dõi khóa học</h3>
                                <div className={cx('student-list')}>
                                    {studentsList.map((student) => (
                                        <StudentCard key={student._id} student={student} />
                                    ))}
                                </div>
                            </div>
                        )}
                        <h3>Danh sách các bài học</h3>
                        <div className={cx('courses-list')}>
                            <div className={cx('add-lession')}></div>
                            <div className={cx('lessons-list')}>
                                {lessons.map((lesson) => (
                                    <LessonCard key={lesson._id} lesson={lesson} role={role} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
            break;
        case 'teacher':
            return (
                <div className="follow-page">
                    <h3>
                        <Link to="/">
                            <FontAwesomeIcon icon={faAngleLeft} style={{ paddingRight: '13px' }} />
                        </Link>
                        {courseName}
                    </h3>
                    <div className={cx('course-list')}>
                        <h3>Các yêu cầu tham gia khóa học</h3>

                        <h3>Danh sách học viên theo dõi khóa học</h3>
                        <div className={cx('student-list')}>
                            {studentsList.map((student) => (
                                <StudentCard key={student._id} student={student} />
                            ))}
                        </div>
                        <h3>Danh sách các bài học</h3>
                        <div className={cx('courses-list')}>
                            <div className={cx('add-lession')}>
                                <Button name="Thêm bài học" onClick={() => dispatch(showForm('Thêm bài học mới'))} />
                                <Button
                                    name={'Thêm bài trắc nghiệm mới'}
                                    onClick={() => setShowQuestionForm((prev) => !prev)}
                                />
                                <Button name={'Tạo bài trắc nghiệm'} onClick={() => setShowTestForm((prev) => !prev)} />
                            </div>
                            <div className={cx('lessons-list')}>
                                {lessons.map((lesson) => (
                                    <LessonCard key={lesson._id} lesson={lesson} role={role} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <Form
                        fieldsInput={['title', 'Chọn đề bài']}
                        fieldsOutput={['title', 'file']}
                        formName="Thêm bài học mới"
                        method="post"
                        api={addLessionApi}
                    />
                    {showQuestionForm && (
                        <QuestionForm
                            onAddQuestion={handleAddQuestion}
                            questionCount={questions.length}
                            onComplete={() => handleComplete(questions)}
                        />
                    )}
                    {showTestForm && (
                        <CreateTestForm
                            onAddQuestion={handleAddQuestion}
                            questionCount={questions.length}
                            onComplete={() => handleComplete(questions)}
                        />
                    )}
                </div>
            );
            break;
        default:
            console.log('no access');
            return <div>Không có quyền truy cậpC</div>;
            break;
    }
}

export default CourseDetail;
