import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    books: [],
    booksLoadingStatus: 'initial',
    totalItems: 0
}

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        booksFetching: state => {state.booksLoadingStatus = 'loading'},
        booksFetched: (state, action) => {
            state.booksLoadingStatus = 'idle';
            state.books = action.payload
        },
        booksFetchingError: state => { state.booksLoadingStatus = 'error'},
        booksUpdate: state => {state.books = []},
        booksFetchedMore: (state, action) => {state.books = [...state.books, ...action.payload]},
        setTotalItems: (state, action) => { state.totalItems = action.payload}
    }
});

const {actions, reducer} = booksSlice;

export default reducer;
export const {
    booksFetching,
    booksFetched,
    booksFetchingError,
    booksUpdate,
    booksFetchedMore,
    setTotalItems
} = actions;