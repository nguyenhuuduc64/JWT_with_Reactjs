import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setResults } from '../../product/searchSlice.jsx';
const cx = classNames.bind(styles);

function Search({ placeholder = 'Tìm kiếm...', onSearch }) {
    const query = useSelector((state) => state.search.query);
    const VITE_BE_API_BASE_URL = import.meta.env.VITE_BE_API_BASE_URL;
    const searchApi = `${VITE_BE_API_BASE_URL}/course/search?query=${query}`;
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(setQuery(e.target.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Searching for:', query);
        axios.get(searchApi).then((res) => {
            console.log('Kết quả tìm kiếm:', res.data);
            dispatch(setResults(res.data));
        });
    };

    return (
        <form className={cx('search-wrapper')} onSubmit={handleSubmit}>
            <input
                type="text"
                className={cx('search-input')}
                placeholder={placeholder}
                value={query}
                onChange={handleChange}
            />
            <button type="submit" className={cx('search-button')} onClick={handleSubmit}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </form>
    );
}

export default Search;
