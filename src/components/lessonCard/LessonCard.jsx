import { useState } from 'react';
import styles from './lessonCard.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function LessonCard({ lesson }) {
    const [showEmbed, setShowEmbed] = useState(false);

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

            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'webp':
                return (
                    <div className={cx('embed-container')}>
                        <img src={lesson.fileUrl} alt={lesson.title} className={cx('embed-image')} />
                    </div>
                );

            case 'mp4':
            case 'webm':
            case 'ogg':
                return (
                    <div className={cx('embed-container')}>
                        <video controls width="100%">
                            <source src={lesson.fileUrl} type={`video/${fileExtension}`} />
                            Trình duyệt của bạn không hỗ trợ video.
                        </video>
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

    return (
        <div className={cx('lesson-card')}>
            {/* Phần thông tin lesson - Click để mở/đóng embed */}
            <div className={cx('lesson-header')} onClick={() => setShowEmbed(!showEmbed)} style={{ cursor: 'pointer' }}>
                <p className={cx('name')}>{lesson.title}</p>
                <p className={cx('file-name')}>
                    📁 {getFileNameFromUrl(lesson.fileUrl)}
                    <span className={cx('toggle-icon')}>{showEmbed ? '▲' : '▼'}</span>
                </p>
            </div>

            {/* Phần embed hiển thị khi click */}
            {showEmbed && lesson.fileUrl && <div className={cx('embed-wrapper')}>{renderEmbed()}</div>}
        </div>
    );
}

export default LessonCard;
