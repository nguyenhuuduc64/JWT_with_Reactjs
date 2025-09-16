// store.js
import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../product/formSlice.jsx';
import searchReducer from '../product/searchSlice.jsx';
import answerReducer from '../product/answerSlice.jsx';
export const store = configureStore({
    reducer: {
        forms: formReducer, // key 'forms' trùng với name trong slice
        search: searchReducer,
        answer: answerReducer,
    },
});

export default store;
