import { useRef, useState } from 'react';
import Button from '../button/Button';
import style from './chat.module.scss';
import classNames from 'classnames/bind';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
const cx = classNames.bind(style);
function Chat() {
    const API_GEMINI = 'AIzaSyAiorW6hMSH5WOQs-Czv2HN--oMzb41zeI';
    const API_KEY = API_GEMINI;
    const [question, setQuestion] = useState([]);
    const [currentAnswer, setCurrentAnswer] = useState();
    const [answer, setAnswer] = useState([]);
    const [textContentForChat, setTextContentForChat] = useState();
    const inputRef = useRef(null);
    const fileRef = useRef(null);
    const handleChange = (e) => {
        setCurrentAnswer(e.target.value);
    };
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
                textContent += `\n--- Trang ${i} ---\n` + pageText;
            }
            setTextContentForChat(textContent);
        };
        reader.readAsArrayBuffer(file);
    };
    const handleSubmit = () => {
        callGemini(currentAnswer);
        setQuestion([...question, currentAnswer]);
    };
    async function callGemini(answer) {
        const response = await fetch(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + API_KEY,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Định dạng lại nội dung sau cho đẹp mắt, kết quả trả về bỏ đi các dấu * trong toàn bộ text trả về: ${textContentForChat}`,
                                },
                            ],
                        },
                    ],
                }),
            },
        );

        const data = await response.json();
        setAnswer(data.candidates[0].content.parts[0].text);
    }
    console.log('textcontentForchat', textContentForChat);
    console.log('answer:', answer);
    return (
        <div className={cx('chat-wrapper')}>
            <div>
                <input type="file" ref={fileRef} onChange={handleSubmitFile} />
            </div>
            <div>
                <input ref={inputRef} accept="application/pdf" onChange={handleChange} />
                <Button name={'Gửi'} onClick={handleSubmit} />
            </div>
        </div>
    );
}

export default Chat;
