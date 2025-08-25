import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
    name: 'forms',
    initialState: {
        visibleForms: {}, // { formName: true/false }
    },
    reducers: {
        showForm: (state, action) => {
            state.visibleForms[action.payload] = true;
        },
        hideForm: (state, action) => {
            state.visibleForms[action.payload] = false;
        },
        toggleForm: (state, action) => {
            state.visibleForms[action.payload] = !state.visibleForms[action.payload];
        },
    },
});

export const { showForm, hideForm, toggleForm } = formSlice.actions;

export default formSlice.reducer;
