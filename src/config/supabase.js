// src/configs/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);
export const uploadQuestionsToSupabase = async (questions) => {
    const uploadedQuestions = [];

    for (const q of questions) {
        let imagePath = null;

        if (q.questionImage) {
            // Tạo tên file duy nhất (vd: userId_timestamp.png)
            const fileName = `${Date.now()}_${q.questionImage.name}`;
            const { data, error } = await supabase.storage
                .from('questions') // bucket bạn đã tạo
                .upload(`files/${fileName}`, q.questionImage);

            if (error) {
                console.error('Upload error:', error.message);
                continue;
            }

            imagePath = data.path; // tên file trong supabase
        }

        uploadedQuestions.push({
            questionNumber: q.questionNumber,
            note: q.note,
            questionImage: imagePath, // chỉ lưu path
            answer: q.answer,
        });
    }

    return uploadedQuestions;
};
