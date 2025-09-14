import React, { useRef, useState } from 'react';

const QuestionForm = ({ onAddQuestion, onComplete, questionCount = 0 }) => {
    const [note, setNote] = useState('');
    const [questionImage, setQuestionImage] = useState(null);
    const [answer, setAnswer] = useState('');
    const imageRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!questionImage || !answer) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        const newQuestion = {
            questionNumber: questionCount + 1, // tự động tăng
            note,
            questionImage,
            answer,
            imageUrl: imageRef.current.value,
        };

        onAddQuestion(newQuestion);

        // Reset form
        setNote('');
        setQuestionImage(null);
        setAnswer('');
        imageRef.current.value = '';
    };
    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
            <h3 className="mb-3">Thêm Câu Hỏi Trắc Nghiệm</h3>

            {/* Số thứ tự tự động */}
            <div className="mb-3">
                <label className="form-label">Số thứ tự câu hỏi</label>
                <input type="text" className="form-control" value={questionCount + 1} readOnly />
            </div>

            {/* Upload ảnh */}
            <div className="mb-3">
                <label className="form-label">Nội dung câu hỏi (ảnh)</label>
                <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setQuestionImage(e.target.files[0])}
                    required
                    ref={imageRef}
                />
            </div>

            {/* Lưu ý */}
            <div className="mb-3">
                <label className="form-label">Lưu ý</label>
                <textarea
                    className="form-control"
                    rows="2"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                ></textarea>
            </div>

            {/* Chọn đáp án */}
            <div className="mb-3">
                <label className="form-label">Đáp án đúng</label>
                <select className="form-select" value={answer} onChange={(e) => setAnswer(e.target.value)} required>
                    <option value="">-- Chọn đáp án --</option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                    <option value="d">D</option>
                </select>
            </div>

            {/* Các nút hành động */}
            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                    Thêm câu hỏi
                </button>
                <button type="button" className="btn btn-success" onClick={onComplete}>
                    Hoàn tất
                </button>
            </div>
        </form>
    );
};

export default QuestionForm;
