import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
    name: 'form',
    initialState: {
        isFormVisible: false, // Hiện form chọn phương thức
        isLoginGoogleFormVisible: false, // Có thể không cần nếu dùng redirect
        isLoginAccountFormVisible: false, // Hiện form đăng nhập account
    },
    reducers: {
        toggleLoginForm: (state) => {
            state.isFormVisible = !state.isFormVisible;
            state.isLoginGoogleFormVisible = false;
            state.isLoginAccountFormVisible = false;
        },
        showForm: (state) => {
            state.isFormVisible = true;
            state.isLoginGoogleFormVisible = false;
            state.isLoginAccountFormVisible = false;
        },
        hideForm: (state) => {
            state.isFormVisible = false;
            state.isLoginGoogleFormVisible = false;
            state.isLoginAccountFormVisible = false;
        },
        showLoginAccountForm: (state) => {
            state.isFormVisible = false;
            state.isLoginGoogleFormVisible = false;
            state.isLoginAccountFormVisible = true;
        },
        showLoginGoogleForm: (state) => {
            state.isFormVisible = false;
            state.isLoginGoogleFormVisible = true;
            state.isLoginAccountFormVisible = false;
        },
        toggleSignupForm: (state) => {
            state.isFormVisible = false;
            state.isLoginGoogleFormVisible = false;
            state.isLoginAccountFormVisible = !state.isLoginAccountFormVisible;
        },
    },
});

export const { toggleLoginForm, showForm, hideForm, showLoginAccountForm, showLoginGoogleForm, toggleSignupForm } =
    formSlice.actions;

export default formSlice.reducer;
