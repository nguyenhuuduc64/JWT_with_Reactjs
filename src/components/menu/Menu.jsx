import React, { useContext, useState } from 'react';
import styles from './menu.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Form from '../form/Form.jsx';
import { showForm } from '../../product/formSlice.jsx';
import { Link } from 'react-router-dom';
import Chat from '../chat/Chat.jsx';
const cx = classNames.bind(styles);

function Menu({ menuItems, course, lesson, onClick }) {
    const VITE_BE_API_BASE_URL = import.meta.env.VITE_BE_API_BASE_URL;
    const [answerCount, setAnswerCount] = useState(0);
    const [updateStateForm, setUpdateStateForm] = React.useState(false);
    const dispatch = useDispatch();
    const handleClick = (item) => {
        if (course) {
            if (item.method == 'delete') {
                axios
                    .delete(item.api)
                    .then((res) => {
                        console.log('Xóa khóa học thành công:', res.data);
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.error('Lỗi khi xóa khóa học:', err);
                        alert('Xóa khóa học thất bại');
                    });
            }
            if (item.label === 'Chỉnh sửa khóa học') {
                dispatch(showForm('Chỉnh sửa khóa học'));
                setUpdateStateForm(true);
            }
            if (item.label === 'Theo dõi khóa học') {
                // Implement follow course logic here
            }
        }
        if (item.label == 'Đăng xuất') {
            localStorage.removeItem('token');
            window.location.reload();
        }
        if (lesson) {
            if (item.method == 'delete') {
                axios
                    .delete(item.api)
                    .then((res) => {
                        console.log('Xóa bài học thành công:', res.data);
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.error('Lỗi khi xóa bài học:', err);
                        alert('Xóa bài học thất bại');
                    });
            }
            if (item.label === 'Chinh sửa tài liệu') {
                console.log('Chỉnh sửa bài học');
                dispatch(showForm(`Chỉnh sửa bài học ${lesson._id}`));
                setUpdateStateForm(true);
            }
            if (item.label === 'Thêm đáp án') {
                dispatch(showForm('Thêm đáp án'));
            }
        }
    };

    return (
        <div className={cx('wrapper')} onClick={onClick}>
            <ul className={cx('menu-list')}>
                {menuItems.map((item, index) => {
                    return (
                        <li key={index} className={cx('menu-item')} onClick={() => handleClick(item)}>
                            {item.label == 'Theo dõi khóa học' && course?._id ? (
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
            <Form
                formName={'Thêm đáp án'}
                method="post"
                api={`${VITE_BE_API_BASE_URL}/lesson/create/${lesson?._id}`}
                isSubmit={false}
            >
                <div className={cx('update-answers')}>
                    <Chat lesson={lesson} />
                </div>
            </Form>
        </div>
    );
}

export default Menu;
