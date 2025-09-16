import classNames from 'classnames/bind';
import Notification from '../notification/Notification';
import styles from './notificationList.module.scss';

const cx = classNames.bind(styles);
function NotificationList({ items }) {
    return (
        <div className={cx('notificationlist-wrapper')}>
            {items.map((item, index) => (
                <Notification
                    student={item.student}
                    message={'Yêu cầu tham gia khóa học'}
                    course={item.course}
                    id={item._id}
                    key={index}
                />
            ))}
        </div>
    );
}

export default NotificationList;
