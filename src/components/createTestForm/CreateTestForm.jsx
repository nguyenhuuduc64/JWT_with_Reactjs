import { current } from '@reduxjs/toolkit';
import axios from 'axios';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';

function CreateTestForm({ onAddQuestion }) {
    const courseId = useParams().courseId;
    const inputRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        const numberQuestion = inputRef.current.value;
        const createTestApi = `${import.meta.env.VITE_BE_API_BASE_URL}/question/${courseId}?n=${numberQuestion}`;
        axios.get(createTestApi).then((res) => console.log(res));
        window.location.reload();
    };
    return (
        <div>
            <form action="">
                <input type="number" ref={inputRef} placeholder="Chọn số lượng câu hỏi" />
                <button onClick={handleSubmit}>Tạo đề thi</button>
            </form>
        </div>
    );
}

export default CreateTestForm;
