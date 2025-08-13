import React from 'react';
import styles from './loginForm.module.scss';
import classNames from 'classnames/bind';
import LoginOption from './../loginOption/LoginOption';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Form from '../form/Form.jsx';
import { hideForm, showForm } from '../../product/formSlice.jsx';
import { useDispatch } from 'react-redux';
const cx = classNames.bind(styles);
function LoginForm() {
    const dispatch = useDispatch();
    const [showAccountForm, setShowAccountForm] = React.useState(false);

    return (
        <>
            <Form formName={'Đăng nhập'} isSubmit={false} submitName={'Đăng nhập'}>
                <div className={cx('wrapper')}>
                    <LoginOption name="Đăng nhập bằng tài khoản Google" option="logwithgoogle" />

                    <div className={cx('loggin-btn')}>
                        <LoginOption
                            name="Đăng nhập bằng tài khoản/Mật khẩu"
                            option="logwithaccount"
                            onClick={() => {
                                setShowAccountForm(true);
                                dispatch(showForm('Đăng nhập tài khoản'));
                                dispatch(hideForm('Đăng nhập'));
                            }}
                        />
                    </div>
                </div>
            </Form>
            {showAccountForm && (
                <Form
                    formName={'Đăng nhập tài khoản'}
                    fieldsInput={['username', 'password']}
                    fieldsOutput={['username', 'password']}
                    isSubmit={true}
                    submitName="Đăng nhập"
                    api="http://localhost:5000/auth/login"
                />
            )}
        </>
    );
}

export default LoginForm;
