import Chooses from '../chooses/Chooses';
import style from './answerForm.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);
function AnswerForm({ questions }) {
    return (
        <div className={cx('answer-form-wrapper')}>
            {questions.map((question, index) => (
                <Chooses key={index} question={question} />
            ))}
        </div>
    );
}

export default AnswerForm;
