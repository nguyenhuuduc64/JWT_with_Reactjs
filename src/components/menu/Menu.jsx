import React from 'react';
import styles from './menu.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
const cx = classNames.bind(styles);

function Menu({ menuItems, course }) {
    const VITE_BE_API_BASE_URL = import.meta.env.VITE_BE_API_BASE_URL;
    const handleClick = (e) => {
        if (e.target.textContent == 'Xóa khóa học') {
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
    };
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('menu-list')}>
                {menuItems.map((item, index) => (
                    <li key={index} className={cx('menu-item')}>
                        <span className={cx('item-label')} onClick={handleClick}>
                            {item.label}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Menu;
