import React from 'react';
import classNames from 'classnames/bind';
import styles from './button.module.scss';

const cx = classNames.bind(styles);

function Button({ name, onClick, style }) {
    if (!style)
        return (
            <button onClick={onClick} className={cx('wrapper')}>
                {name}
            </button>
        );
    return (
        <button className={cx('button')} onClick={onClick}>
            {name}
        </button>
    );
}

export default Button;
