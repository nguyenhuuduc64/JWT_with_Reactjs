import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './course.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Menu from '../menu/Menu';

const cx = classNames.bind(styles);

function CourseCard({ course }) {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [menuState, setMenuState] = useState(false);
    const menuRef = useRef(null);
    const menuItems = [
        {
            label: 'Chỉnh sửa khóa học',
            action: 'get',
        },
        {
            label: 'Xóa khóa học',
            action: 'post',
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
            </div>
            <div className={cx('course-footer')}>
                <FontAwesomeIcon
                    icon={faEllipsis}
                    className={cx('icon')}
                    onClick={() => setMenuState((prev) => !prev)}
                />
            </div>
            <div ref={menuRef}>{menuState && <Menu menuItems={menuItems} course={course} />}</div>
        </div>
    );
}

export default CourseCard;
