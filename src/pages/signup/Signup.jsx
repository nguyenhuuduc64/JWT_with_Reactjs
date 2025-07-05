import styles from './signup.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Signup() {
    return (
        <div className={cx('signup-page')}>
            <form>
                <div>
                    <label htmlFor="username">Tên đăng nhập:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div>
                    <label htmlFor="email">Địa chỉ Email:</label>
                    <input type="text" id="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="password">Mật khẩu:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Đăng ký</button>
            </form>
        </div>
    );
}
export default Signup;
