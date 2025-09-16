import React, { Children, useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './form.module.scss';
import axios from 'axios';
import { Context } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { hideForm } from '../../product/formSlice.jsx';
import { supabase } from '../../config/supabase.js';
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
    lesson = null,
}) {
    const { id, setId } = useContext(Context);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const isVisible = useSelector((state) => state.forms.visibleForms[formName] || false);
    const [filePath, setFilePath] = useState('');

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
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };
    const keysList = fieldsOutput;
    const handleSubmitForm = async (e) => {
        e.preventDefault();

        try {
            let fileUrl = null;
            let fileName = null;
            // Nếu có file trong formData thì upload lên supabase
            if (formData.file) {
                const file = formData.file;
                const path = `${Date.now()}_${file.name}`;
                const { data, error } = await supabase.storage
                    .from('documents') // bucket name
                    .upload(`files/${Date.now()}_${file.name}`, file);

                if (error) {
                    console.error('Upload error:', error);
                    alert('Upload file thất bại');
                    return;
                }

                // Lấy URL public của file
                const { data: publicUrl } = supabase.storage.from('documents').getPublicUrl(data.path);

                fileUrl = publicUrl.publicUrl;
                fileName = path;
            }
            const payload = {
                ...formData,
                teacherId: id || '',
            };
            if (fileUrl) {
                payload.fileUrl = fileUrl; // chỉ thêm khi có link file
                payload.fileName = fileName;
            }
            // Gửi API backend với dữ liệu + link file
            if (method === 'post') {
                const res = await axios.post(api, payload);
                if (res.data.token) localStorage.setItem('token', res.data.token);
                window.location.reload();
            } else if (method === 'put') {
                const res = await axios.put(api, payload);
                window.location.reload();
            }

            //alert('Thành công!');
            //window.location.reload();
        } catch (err) {
            console.error('Error:', err);
            alert('Thất bại!');
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
                            ) : keysList[index] === 'file' ? (
                                <input
                                    type="file"
                                    id={keysList[index]}
                                    name={keysList[index]}
                                    className={cx('input')}
                                    onChange={handleInputChange}
                                />
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
