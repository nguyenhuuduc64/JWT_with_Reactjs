import classNames from 'classnames/bind';
import styles from './chooses.module.scss';
const cx = classNames.bind(styles);
function Chooses({ question }) {
    return (
        <div className={cx('chooses-wrapper')}>
            <div>
                <img src={question.imageUrl} alt="" className={cx('question-img')} />
            </div>
            <div className={cx('form-result')}>
                <div className={cx('answer')}>A</div>
                <div className={cx('answer')}>B</div>
                <div className={cx('answer')}>C</div>
                <div className={cx('answer')}>D</div>
            </div>
        </div>
    );
}

export default Chooses;
