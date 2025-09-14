import axios from 'axios';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './resultForm.module.scss';
import Button from '../button/Button';
const cx = classNames.bind(styles);

function ResultForm({ lesson }) {
    const answerCountApi = `${import.meta.env.VITE_BE_API_BASE_URL}/answer/count/${lesson._id}`;
    const [questionCount, setQuestionCount] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState({});
    useEffect(() => {
        axios.get(answerCountApi).then((res) => setQuestionCount(res.data.questionsCount));
        return () => {};
    }, []);
    const handleChangeAnswer = (index) => (e) => {
        const newAnswers = [...answers];
        newAnswers[index] = e.target.value;
        setAnswers(newAnswers);
    };
    const handleSubmitAnswer = (answers) => {
        axios
            .post(`${import.meta.env.VITE_BE_API_BASE_URL}/answer/check/${lesson._id}`, { userAnswers: answers })
            .then((res) => {
                setResult(res.data);
            });
    };
    console.log('result', result);
    return (
        <div className={cx('question-count-wrapper')}>
            <span>Số câu hỏi: {questionCount}</span>
            <div className={cx('question-item')}>
                {Array.from({ length: questionCount }).map((_, index) => (
                    <div key={index} className={cx('col-3')}>
                        <input type="text" placeholder={`${index + 1}`} onChange={handleChangeAnswer(index)} />
                    </div>
                ))}
            </div>
            <Button name={'Gửi đáp án'} onClick={() => handleSubmitAnswer(answers)} />
            <div>
                <div>
                    <p>Điểm số của bạn: {Math.floor(10 * (result.score / result.maxScore), 2)}</p>
                    <p>
                        Số câu đúng: {result.score}/{result.maxScore}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ResultForm;
