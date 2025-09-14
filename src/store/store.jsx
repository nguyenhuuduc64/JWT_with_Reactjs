// store.js
import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../product/formSlice.jsx';
import searchReducer from '../product/searchSlice.jsx';
export const store = configureStore({
    reducer: {
        forms: formReducer, // key 'forms' trùng với name trong slice
        search: searchReducer,
    },
});

export default store;
