import classNames from 'classnames/bind';
import styles from './lessionCard.module.scss';
const cx = classNames.bind(styles);

function LessionCard({ name }) {
    return (
        <div className={cx('lesson')}>
            <p className={cx('name')} style={{ marginBottom: 0 }}>
                {name}
            </p>
        </div>
    );
}

export default LessionCard;
