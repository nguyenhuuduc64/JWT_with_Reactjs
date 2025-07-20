import classNames from 'classnames/bind';
import styles from './sidebar.module.scss';
import axios from 'axios';
import { useState } from 'react';
import Form from '../../form/Form';
const cx = classNames.bind(styles);

function Sidebar() {
    const [createCourse, setCreateCourse] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('');
    };
    const formFieldNames = ['Tên bài học', 'Mô tả', 'Lớp', 'Môn học'];
    const formFieldsSubmit = ['title', 'description', 'grade', 'subject', 'teacherId'];
    return (
        <div className={cx('wrapper')}>
            <h2>Sidebar</h2>
            <ul className={cx('sidebar-route')}>
                <a onClick={() => setCreateCourse((prev) => !prev)}>Tạo khóa học</a>
                <a onClick={handleSubmit}>Theo dõi tiến độ</a>
            </ul>
            {createCourse && (
                <Form fieldsInput={formFieldNames} fieldsOutput={formFieldsSubmit} formName="Tạo khóa học mới" />
            )}
        </div>
    );
}

export default Sidebar;
