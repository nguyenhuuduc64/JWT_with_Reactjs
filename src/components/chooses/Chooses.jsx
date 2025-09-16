import classNames from 'classnames/bind';
import styles from './chooses.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Chooses({ question, onChoose }) {
    const [choose, setChoose] = useState('');

    const handleClick = (option) => {
        setChoose(option);
        onChoose({
            questionId: question._id,
            answer: option,
        });
    };

    return (
        <div className={cx('chooses-wrapper')}>
            <div>
                <img src={question.imageUrl} alt="" className={cx('question-img')} />
            </div>
            <div className={cx('form-result')}>
                {['A', 'B', 'C', 'D'].map((opt) => (
                    <div
                        key={opt}
                        className={cx('answer', { selected: choose === opt })}
                        onClick={() => handleClick(opt)}
                    >
                        {opt}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Chooses;
