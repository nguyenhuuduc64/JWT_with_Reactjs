import React from 'react';
import classNames from 'classnames/bind';
import styles from './button.module.scss';

const cx = classNames.bind(styles);

function Button({ name, onClick, style, type }) {
    switch (type) {
        case 'submit':
            return (
                <button type="submit" onClick={onClick} className={cx('wrapper')}>
                    {name}
                </button>
            );
        case 'button':
            return (
                <button onClick={onClick} className={cx('wrapper')}>
                    {name}
                </button>
            );
        case 'show-more':
            return (
                <button onClick={onClick} className={cx('show-more')}>
                    {name}
                </button>
            );
        default:
            return (
                <button onClick={onClick} className={cx('wrapper')}>
                    {name}
                </button>
            );
            break;
    }
}

export default Button;
