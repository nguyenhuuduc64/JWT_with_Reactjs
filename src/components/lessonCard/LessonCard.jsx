import { useEffect, useRef, useState } from 'react';
import styles from './lessonCard.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faFile } from '@fortawesome/free-solid-svg-icons';
import Menu from '../menu/Menu';
import Form from '../form/Form';

const cx = classNames.bind(styles);

function LessonCard({ lesson }) {
    const VITE_BE_API_BASE_URL = import.meta.env.VITE_BE_API_BASE_URL;
    const [menuState, setMenuState] = useState(false);
    const menuRef = useRef(null);
    const [showEmbed, setShowEmbed] = useState(false);
    const updateLessonApi = `${VITE_BE_API_BASE_URL}/lesson/${lesson._id}`;
    const deleteLessonApi = `${VITE_BE_API_BASE_URL}/lesson/${lesson._id}`;
    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuState(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getFileNameFromUrl = (url) => {
        if (!url) return 'No file attached';
        return url.split('/').pop().replace(/%20/g, ' ');
    };

    const getFileExtension = (url) => {
        if (!url) return '';
        return url.split('.').pop().toLowerCase();
    };

    const renderEmbed = () => {
        if (!lesson.fileUrl) return null;

        const fileExtension = getFileExtension(lesson.fileUrl);

        switch (fileExtension) {
            case 'pdf':
                return (
                    <div className={cx('embed-container')}>
                        <iframe
                            src={lesson.fileUrl}
                            width="100%"
                            height="500px"
                            frameBorder="0"
                            title={`PDF Viewer - ${lesson.title}`}
                        >
                            Trình duyệt của bạn không hỗ trợ iframe.
                            <a href={lesson.fileUrl} target="_blank" rel="noopener noreferrer">
                                Tải file PDF về
                            </a>
                        </iframe>
                    </div>
                );

            default:
                return (
                    <div className={cx('embed-container')}>
                        <p>Không thể xem trực tiếp file {fileExtension}</p>
                        <a
                            href={lesson.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cx('download-link')}
                        >
                            ⬇️ Tải file về
                        </a>
                    </div>
                );
        }
    };
    const menuItems = [
        {
            label: 'Chinh sửa tài liệu',
            api: updateLessonApi,
            method: 'put',
            formname: `Chỉnh sửa bài học ${lesson._id}`,
            //do khi render tạo ra nhiều form có cùng tên nên id chỉ lấy của leson cuối cùng nên gây lỗi
        },
        {
            label: 'Xoá tài liệu',
            api: deleteLessonApi,
            method: 'delete',
        },
    ];
    return (
        <div className={cx('lesson-card')}>
            <div className={cx('lesson-header')} onClick={() => setShowEmbed(!showEmbed)} style={{ cursor: 'pointer' }}>
                <div className={cx('lesson-main')}>
                    <FontAwesomeIcon icon={faFile} />
                    <div className={cx('name')}>{lesson.title}</div>
                </div>
                <FontAwesomeIcon
                    icon={faEllipsis}
                    className={cx('icon')}
                    onClick={() => setMenuState((prev) => !prev)}
                />
            </div>
            <div ref={menuRef} className={cx('lesson-menu')}>
                {menuState && <Menu menuItems={menuItems} lesson={lesson} />}
            </div>
            <Form
                fieldsInput={['title', 'Chọn đề bài']}
                fieldsOutput={['title', 'file']}
                formName={`Chỉnh sửa bài học ${lesson._id}`}
                method="put"
                lesson={lesson}
                api={updateLessonApi}
            />
        </div>
    );
}

export default LessonCard;
