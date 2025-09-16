import { useEffect, useRef, useState } from 'react';
import styles from './lessonCard.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faFile } from '@fortawesome/free-solid-svg-icons';
import Menu from '../menu/Menu';
import Form from '../form/Form';
import AnswerForm from '../aswerForm/AnswerForm';
import ResultForm from '../resultForm/ResultForm';

const cx = classNames.bind(styles);

function LessonCard({ lesson, role }) {
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

    const getFileExtension = (url) => {
        if (!url) return '';
        return url.split('.').pop().toLowerCase();
    };

    const renderEmbedPDF = () => {
        const fileExtension = getFileExtension(lesson.fileUrl);

        switch (fileExtension) {
            case 'pdf':
                return (
                    <div className={cx('embed-container col-8')}>
                        <iframe src={lesson.fileUrl} width="100%" height="500px" title={`PDF Viewer - ${lesson.title}`}>
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
        {
            label: 'Thêm đáp án',
        },
    ];

    const renderEmbedMul = () => {
        return (
            <div className={cx('answer-form', 'col-8')}>
                <AnswerForm questions={lesson.questions} />
            </div>
        );
    };

    return (
        <div className={cx('lesson-card')} key={lesson._id}>
            <div className={cx('lesson-header')} onClick={() => setShowEmbed(!showEmbed)} style={{ cursor: 'pointer' }}>
                <div className={cx('lesson-main')}>
                    <FontAwesomeIcon icon={faFile} />
                    <div className={cx('name')}>{lesson.title}</div>
                </div>
                {role == 'teacher' && (
                    <FontAwesomeIcon
                        icon={faEllipsis}
                        className={cx('icon')}
                        onClick={() => setMenuState((prev) => !prev)}
                    />
                )}
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
            <div className={cx('lesson-body')}>
                {showEmbed && lesson.type == 'pdf' && renderEmbedPDF()}
                {showEmbed && lesson.type == 'multiple' && renderEmbedMul()}
                {showEmbed && <ResultForm lesson={lesson} />}
            </div>
        </div>
    );
}

export default LessonCard;
