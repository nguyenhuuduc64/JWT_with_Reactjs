import React from 'react';
import styles from './menu.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Form from '../form/Form.jsx';
import { showForm } from '../../product/formSlice.jsx';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Menu({ menuItems, course }) {
    const VITE_BE_API_BASE_URL = import.meta.env.VITE_BE_API_BASE_URL;
    const inputFields = ['Tên khóa học', 'Mô tả', 'Lớp', 'Môn học'];
    const outputFields = ['title', 'description', 'grade', 'subject', 'teacherId'];
    const [updateStateForm, setUpdateStateForm] = React.useState(false);
    const dispatch = useDispatch();
    const handleClick = (label) => {
        if (label === 'Xóa khóa học') {
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
            setUpdateStateForm(true);
        }
        if (label === 'Theo dõi khóa học') {
            // Implement follow course logic here
        }
        if (label == 'Đăng xuất') {
            localStorage.removeItem('token');
            window.location.reload();
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('menu-list')}>
                {menuItems.map((item, index) => {
                    return (
                        <li key={index} className={cx('menu-item')} onClick={() => handleClick(item.label)}>
                            {item.label == 'Theo dõi khóa học' ? (
                                <Link to={`/follow/${course._id}`} className={cx('link-none')}>
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={cx('item-label')}>{item.label}</span>
                            )}
                        </li>
                    );
                })}
            </ul>

            {updateStateForm && (
                <Form
                    formName={'Chỉnh sửa khóa học'}
                    fieldsInput={inputFields}
                    fieldsOutput={outputFields}
                    api={`${VITE_BE_API_BASE_URL}/course/update/${course._id}`}
                    method="put"
                    isShowValue={true}
                    course={course}
                />
            )}
        </div>
    );
}

export default Menu;
