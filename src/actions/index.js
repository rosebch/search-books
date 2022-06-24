import {booksFetching, booksFetched, booksFetchingError, booksFetchedMore, setTotalItems} from '../components/booksList/booksSlice';

export const fetchBooks = (getBooks, searchTerm, sorting, startIndex) => (dispatch) => {
    dispatch(booksFetching());
    getBooks(searchTerm, startIndex, sorting)
        .then(data => {
            dispatch(setTotalItems(data.totalItems)); 
            dispatch(booksFetched(data.books))
        })
        .catch(() => dispatch(booksFetchingError()))
}

export const fetchMoreBooks = (getBooks, searchTerm, sorting, startIndex) => (dispatch) => {
    getBooks(searchTerm, startIndex, sorting)
        .then(data => dispatch(booksFetchedMore(data.books)))
        .catch(() => dispatch(booksFetchingError()))
}