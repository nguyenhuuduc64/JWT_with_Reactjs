import React, { Children, useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './form.module.scss';
import axios from 'axios';
import { Context } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { hideForm } from '../../product/formSlice.jsx';
const cx = classNames.bind(styles);
function Form({
    fieldsInput = [],
    fieldsOutput,
    isSubmit = true,
    formName,
    children,
    submitName,
    api,
    method,
    isShowValue = false,
    course,
}) {
    const { id, setId } = useContext(Context);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const isVisible = useSelector((state) => state.forms.visibleForms[formName] || false);

    useEffect(() => {
        const getTeacherId = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const response = await axios.get(`${import.meta.env.VITE_BE_API_BASE_URL}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } catch (error) {
                console.error('Error fetching teacher ID:', error);
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
    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (method === 'put') {
            axios
                .put(api, {
                    ...formData,
                    teacherId: id ? id : '',
                })
                .then((res) => {
                    console.log('Cập nhật khóa học thành công:', res.data);
                })
                .catch((err) => {
                    console.error('Lỗi khi cập nhật khóa học:', err);
                    alert('Cập nhật khóa học thất bại');
                });
            window.location.reload();
            return;
        }
        if (method == 'post') {
            axios
                .post(api, {
                    ...formData,
                    teacherId: id ? id : '',
                })
                .then((res) => {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        window.location.reload();
                    } else {
                        console.log('res', res);
                    }
                })
                .catch(() => alert('Đăng ký thất bại'));
        }
    };
    if (!isVisible) return null;

    return (
        <div className={cx('wrapper', 'col-md-6', 'col-lg-4')}>
            <h2 className={cx('title')}>{formName}</h2>
            <form className={cx('login-form', '')}>
                {fieldsInput.map((name, index) => {
                    return (
                        <div className={cx('input-group')} key={index}>
                            <label htmlFor={fieldsOutput[index]} className={cx('label')}>
                                {name}
                            </label>
                            {keysList[index] === 'role' ? (
                                <select onChange={handleInputChange} className={cx('input')} name="role" id="role">
                                    <option value="">Chọn vai trò</option>
                                    <option value="teacher">Giáo viên</option>
                                    <option value="student">Học sinh</option>
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    id={keysList[index]}
                                    name={keysList[index]}
                                    className={cx('input')}
                                    required
                                    autoComplete={keysList[index]}
                                    placeholder={`Nhập ${name}`}
                                    onChange={handleInputChange}
                                    value={
                                        formData[keysList[index]] ?? (isShowValue ? course[fieldsOutput[index]] : '')
                                    }
                                />
                            )}
                        </div>
                    );
                })}
                {children}

                {isSubmit && (
                    <button type="submit" className={cx('login-btn')} onClick={handleSubmitForm}>
                        {submitName || 'Submit'}
                    </button>
                )}
            </form>
            <div className={cx('close-btn')} onClick={() => dispatch(hideForm(formName))}>
                <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
            </div>
        </div>
    );
}

export default Form;
