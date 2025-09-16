// src/redux/searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const answerSlice = createSlice({
    name: 'search',
    initialState: {
        answers: [],
    },
    reducers: {
        setAnswer(state, action) {
            state.answers = action.payload;
        },
        dropAnswer(state) {
            state.answers = [];
        },
    },
});

export const { setAnswer, dropAnswer } = answerSlice.actions;
export default answerSlice.reducer;
