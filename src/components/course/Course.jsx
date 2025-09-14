import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './course.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Menu from '../menu/Menu';
import Form from '../form/Form';
import { Context } from '../../App';
import Button from '../button/Button';
import axios from 'axios';
const cx = classNames.bind(styles);

function CourseCard({ course, isJoined = false, role }) {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const VITE_BE_API_BASE_URL = import.meta.env.VITE_BE_API_BASE_URL;
    const [menuState, setMenuState] = useState(false);
    const menuRef = useRef(null);
    const { isUser } = useContext(Context);
    const joinCourseApi = `${VITE_BE_API_BASE_URL}/me/follow/${course._id}`;
    const inputFields = ['Tên khóa học', 'Mô tả', 'Lớp', 'Môn học'];
    const outputFields = ['title', 'description', 'grade', 'subject', 'teacherId'];
    const menuItems = [
        {
            label: 'Chỉnh sửa khóa học',
            method: 'put',
        },
        {
            label: 'Xóa khóa học',
            method: 'delete',
            api: `${VITE_BE_API_BASE_URL}/course/delete/${course._id}`,
        },
        {
            label: 'Theo dõi khóa học',
            method: '',
        },
    ];
    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuState(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleJoinCourse = () => {
        axios.put(
            joinCourseApi,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            },
        );
        window.location.reload();
    };
    const showCourse = () =>  {
        window.location.href = `/follow/${course._id}`;
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    src={course.coverImage}
                    alt={course.title}
                    className={cx('course-header-img')}
                    onMouseLeave={() => setMenuState(false)}
                />
            </div>
            <div className={cx('course-body')}>
                <div className={cx('course-title')}>{course.title}</div>
                <div className={cx('descripion')}>{course.description}</div>
                <div className={cx('course-footer')}>
                    {isUser == 'teacher' && (
                        <FontAwesomeIcon
                            icon={faEllipsis}
                            className={cx('icon')}
                            onClick={() => setMenuState((prev) => !prev)}
                        />
                    )}
                    {isUser == 'student' &&
                        isJoined == false &&
                            (
                                <div>
                                    <Button name={'Đăng ký'} onClick={handleJoinCourse} />
                                </div>,
                            )
                    }
                    {isUser == 'student' && isJoined == true  && (
                        <div>
                            <Button name={'Xem khóa học'} type={'show-more'} onClick={showCourse}/>
                        </div>
                    )}
                </div>
            </div>
            {isUser == 'teacher' && (
                <div ref={menuRef}>{menuState && <Menu menuItems={menuItems} course={course} />}</div>
            )}
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

export default CourseCard;
