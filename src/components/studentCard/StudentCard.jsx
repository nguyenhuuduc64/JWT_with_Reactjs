import React from 'react';
import classNames from 'classnames/bind';
import styles from './studentCard.module.scss';
const cx = classNames.bind(styles);

const StudentCard = ({ student }) => {
    if (!student) {
        return <p>Không có thông tin học sinh.</p>;
    }

    return (
        <div className={cx('student-card')}>
            <h3 className={cx('student-name')}>{student.fullname || 'Chưa cập nhật họ tên'}</h3>

            <div className={cx('student-info')}>
                <p>
                    <strong>ID:</strong> {student._id}
                </p>
                <p>
                    <strong>Tiến độ:</strong> {student.progress || 'Chưa có dữ liệu'}
                </p>
            </div>
        </div>
    );
};

export default StudentCard;
