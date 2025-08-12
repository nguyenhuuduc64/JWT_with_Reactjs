import classNames from 'classnames/bind';
import styles from './sidebar.module.scss';
import axios from 'axios';
import { useState } from 'react';
import Form from '../../form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { showForm } from '../../../product/formSlice';
const cx = classNames.bind(styles);

function Sidebar() {
    const dispatch = useDispatch();
    const formFieldNames = ['Tên bài học', 'Mô tả', 'Lớp', 'Môn học'];
    const formFieldsSubmit = ['title', 'description', 'grade', 'subject', 'teacherId'];

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className={cx('wrapper')}>
            <h2>Sidebar</h2>
            <ul className={cx('sidebar-route')}>
                <a onClick={() => dispatch(showForm('Tạo khóa học mới'))}>Tạo khóa học mới</a>
                <a onClick={handleSubmit}>Theo dõi tiến độ</a>
            </ul>

            <Form
                fieldsInput={formFieldNames}
                fieldsOutput={formFieldsSubmit}
                formName="Tạo khóa học mới"
                submitName={'Tạo khóa học'}
                isSubmit={true}
                api="http://localhost:5000/course/create"
            />
        </div>
    );
}

export default Sidebar;
