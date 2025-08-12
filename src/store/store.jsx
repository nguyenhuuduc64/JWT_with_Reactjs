// store.js
import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../product/formSlice.jsx';

export const store = configureStore({
    reducer: {
        forms: formReducer, // key 'forms' trùng với name trong slice
    },
});

export default store;
