import { configureStore } from '@reduxjs/toolkit';
import books from '../components/booksList/booksSlice';
import filters from '../components/searchPanel/searchSlice';

const store = configureStore({
    reducer: {books, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;