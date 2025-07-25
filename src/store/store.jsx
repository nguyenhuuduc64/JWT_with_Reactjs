// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import formReducer from './../product/formSlice';
export const store = configureStore({
    reducer: {
        form: formReducer,
    },
});
