import React from 'react';
import styles from './menu.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Form from '../form/Form.jsx';
import { showForm } from '../../product/formSlice.jsx';
const cx = classNames.bind(styles);

function Menu({ menuItems, course }) {
    const VITE_BE_API_BASE_URL = import.meta.env.VITE_BE_API_BASE_URL;
    const inputFields = ['Tên khóa học', 'Mô tả', 'Lớp', 'Môn học'];
    const outputFields = ['title', 'description', 'grade', 'subject', 'teacherId'];
    const dispatch = useDispatch();
    const handleClick = (label) => {
        if (label === 'Xóa khóa học') {
            console.log('Xóa khóa học:', course._id);
            axios
                .delete(`${VITE_BE_API_BASE_URL}/course/delete/${course._id}`)
                .then((res) => {
                    console.log('Xóa khóa học thành công:', res.data);
                    window.location.reload();
                })
                .catch((err) => {
                    console.error('Lỗi khi xóa khóa học:', err);
                    alert('Xóa khóa học thất bại');
                });
        }
        if (label === 'Chỉnh sửa khóa học') {
            dispatch(showForm('Chỉnh sửa khóa học'));
            console.log('Chỉnh sửa khóa học:', course);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('menu-list')}>
                {menuItems.map((item, index) => (
                    <li key={index} className={cx('menu-item')} onClick={() => handleClick(item.label)}>
                        <span className={cx('item-label')}>{item.label}</span>
                    </li>
                ))}
            </ul>
            <Form
                formName={'Chỉnh sửa khóa học'}
                fieldsInput={inputFields}
                fieldsOutput={outputFields}
                api={`${VITE_BE_API_BASE_URL}/course/update/${course._id}`}
                method="put"
                isShowValue={true}
                course={course}
            />
        </div>
    );
}

export default Menu;
