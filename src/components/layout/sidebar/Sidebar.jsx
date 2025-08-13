import classNames from 'classnames/bind';
import styles from './sidebar.module.scss';
import axios from 'axios';
import { useState } from 'react';
import Form from '../../form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { showForm } from '../../../product/formSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faPlus, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
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
            <ul className={cx('sidebar-route')}>
                <div className={cx('sidebar-item')} onClick={() => dispatch(showForm('Tạo khóa học mới'))}>
                    <FontAwesomeIcon icon={faPlusSquare} className={cx('icon')} />
                    <a>Tạo</a>
                </div>
                <div className={cx('sidebar-item')}>
                    <FontAwesomeIcon icon={faCalendar} className={cx('icon')} />

                    <a onClick={handleSubmit}>Theo dõi</a>
                </div>
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
