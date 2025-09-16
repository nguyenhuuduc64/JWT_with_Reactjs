import { useRef, useState } from 'react';
import Button from '../button/Button';
import style from './chat.module.scss';
import classNames from 'classnames/bind';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker?url';
import axios from 'axios';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
const cx = classNames.bind(style);
function Chat({ lesson }) {
    const API_GEMINI = 'AIzaSyAiorW6hMSH5WOQs-Czv2HN--oMzb41zeI';
    const API_KEY = API_GEMINI;
    const [question, setQuestion] = useState([]);
    const [currentAnswer, setCurrentAnswer] = useState();
    const [answer, setAnswer] = useState([]);
    const [textContentForChat, setTextContentForChat] = useState();
    const inputRef = useRef(null);
    const fileRef = useRef(null);
    const VITE_BE_API_BASE_URL = import.meta.env.VITE_BE_API_BASE_URL;
    const addAnswerApi = `${VITE_BE_API_BASE_URL}/answer/create/${lesson?._id}`;
    const handleSubmitFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Đọc file thành ArrayBuffer
        const reader = new FileReader();
        reader.onload = async function () {
            const typedArray = new Uint8Array(this.result);

            // Load PDF
            const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

            let textContent = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const text = await page.getTextContent();
                const pageText = text.items.map((s) => s.str).join(' ');

                // Regex tìm "số. A-D"
                const matches = pageText.match(/\d+\.\s*([A-D])/g);

                if (matches) {
                    // Lấy chỉ chữ cái A-D
                    const answers = matches.map((m) => m.match(/\d+\.\s*([A-D])/)[1]);
                    textContent += answers.join(',') + ','; // nếu bạn vẫn muốn ghép string
                    // Hoặc bạn có thể push vào mảng riêng
                    setTextContentForChat((prev) => [...(prev || []), ...answers]);
                }
            }
        };
        reader.readAsArrayBuffer(file);
    };
    const handleSubmitAnswer = (e) => {
        e.preventDefault();
        console.log('them dap an');
        axios
            .post(addAnswerApi, { lessonId: lesson?._id, answerText: textContentForChat })
            .then((res) => console.log('Thêm đáp án thành công:', res.data));
    };

    console.log('textcontentForchat', textContentForChat);
    return (
        <div className={cx('chat-wrapper')}>
            <div>
                <input type="file" ref={fileRef} onChange={handleSubmitFile} />
            </div>
            <div>
                <Button name={'Thêm đáp án'} onClick={handleSubmitAnswer} />
            </div>
        </div>
    );
}

export default Chat;
