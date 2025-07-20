import React from 'react';
import classNames from 'classnames/bind';
import styles from './course.module.scss';

const cx = classNames.bind(styles);

function Course({ course }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img src={course.coverImage} alt={course.title} className={cx('course-header-img')} />
            </div>
            <div className={cx('course-body')}>
                <div className={cx('course-title')}>{course.title}</div>
                <div className={cx('descripion')}>{course.description}</div>
            </div>
        </div>
    );
}

export default Course;
