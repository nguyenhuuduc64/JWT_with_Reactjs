import { useEffect, useState } from 'react';
import Chooses from '../chooses/Chooses';
import style from './answerForm.module.scss';
import classNames from 'classnames/bind';
import Button from '../button/Button';
import { setAnswer } from '../../product/answerSlice';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(style);

function AnswerForm({ questions }) {
    const [chooses, setChooses] = useState([]);
    const dispatch = useDispatch();
    const handleChoose = ({ questionId, answer }) => {
        setChooses((prev) => {
            // nếu đã có câu này, update; nếu chưa, thêm mới
            const exists = prev.find((c) => c.questionId === questionId);
            if (exists) {
                return prev.map((c) => (c.questionId === questionId ? { questionId, answer } : c));
            } else {
                return [...prev, { questionId, answer }];
            }
        });
    };
    useEffect(() => {
        dispatch(setAnswer(chooses));
    }, [chooses, dispatch]);
    return (
        <div className={cx('answer-form-wrapper')}>
            <div>
                {questions.map((question, index) => (
                    <Chooses key={index} question={question} onChoose={handleChoose} />
                ))}
            </div>
        </div>
    );
}

export default AnswerForm;
