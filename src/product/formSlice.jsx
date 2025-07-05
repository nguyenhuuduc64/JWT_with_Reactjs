// src/features/form/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
    name: 'form',
    initialState: {
        isFormVisible: false,
    },
    reducers: {
        toggleForm: (state) => {
            state.isFormVisible = !state.isFormVisible;
        },
        showForm: (state) => {
            state.isFormVisible = true;
        },
        hideForm: (state) => {
            state.isFormVisible = false;
        },
    },
});

export const { toggleForm, showForm, hideForm } = formSlice.actions;
export default formSlice.reducer;
