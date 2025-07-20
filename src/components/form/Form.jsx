import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './form.module.scss';
import axios from 'axios';
import { Context } from '../../App';
const cx = classNames.bind(styles);
function Form({ fieldsInput = [], fieldsOutput, onSubmit, formName }) {
    const { id, setId } = useContext(Context);
    const [formData, setFormData] = useState({});
    useEffect(() => {
        const getTeacherId = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const res = await fetch('http://localhost:5000/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                setId(data._id);
            } catch (err) {
                console.error('Lỗi lấy thông tin người dùng:', err);
            }
        };
        getTeacherId();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const keysList = fieldsOutput;
    const handleSubmitForm = () => {
        axios.post('http://localhost:5000/course/create', {
            ...formData,
            teacherId: id,
        });
        alert('da submit');
    };
    return (
        <div className={cx('wrapper', 'col-md-6', 'login-form')}>
            <h4>{formName}</h4>
            <form className={cx('login-form', 'wrapper')} onSubmit={handleSubmitForm}>
                <h2 className={cx('title')}>{formName}</h2>
                {fieldsInput.map((name, index) => {
                    return (
                        <div className={cx('input-group')} key={index}>
                            <label htmlFor={fieldsOutput[index]} className={cx('label')}>
                                {name}
                            </label>
                            <input
                                type="text"
                                id={keysList[index]}
                                name={keysList[index]}
                                className={cx('input')}
                                required
                                autoComplete={keysList[index]}
                                placeholder={`Nhập ${name}`}
                                onChange={handleInputChange}
                                value={formData[keysList[index]] || ''}
                            />
                        </div>
                    );
                })}
                <button type="submit" className={cx('login-btn')}>
                    Đăng nhập
                </button>
            </form>
        </div>
    );
}

export default Form;
