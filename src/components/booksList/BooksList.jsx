import { useSelector, useDispatch } from 'react-redux';

import BooksListCard from '../booksListCard/BooksListCard';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import { fetchMoreBooks } from '../../actions';
import { startIndexChanged } from '../searchPanel/searchSlice';
import useGoogleBooksService from '../../service/GoogleBooksService';

import './BooksList.scss';


const BooksList = () => {

    const { booksLoadingStatus,totalItems } = useSelector(state => state.books);
    const { searchTerm, sorting, startIndex } = useSelector(state => state.filters);

    const { getBooks } = useGoogleBooksService();    
    const dispatch = useDispatch();
    
    const onLoadMoreBooks = () => {
        dispatch(startIndexChanged(startIndex + 30));
        dispatch(fetchMoreBooks(getBooks, searchTerm, sorting, startIndex));
    }

    const filteredBooks = useSelector(state => {
        if (state.filters.activeFilter === 'All') {
            return state.books.books;
        } else {
            return state.books.books.filter(item => item.categories[0] === state.filters.activeFilter);
        }
    });

    const renderBooksList = filteredBooks?.map(book => {
        return <BooksListCard 
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    thumbnail={book.thumbnail}
                    categories={book.categories[0]}
                    authors={book.authors}
                />
    });

    const booksList = <ul className="books__grid">{renderBooksList}</ul>
    const errorMessage = booksLoadingStatus === 'error' ? <ErrorMessage/> : null;
    const spinner = booksLoadingStatus === 'loading' ? <Spinner/> : null;
    const books = booksLoadingStatus === 'loading' ? null : booksList;
    const button = booksLoadingStatus === 'initial' || booksLoadingStatus === 'loading' ? null : <button className="books__button" onClick={() => onLoadMoreBooks()}>Load more</button>;

    return (
        <div className='books__list'>
            <div className="books__total-count">{totalItems} books were founded</div>
            {errorMessage}
            {spinner}
            {books}
            {button}
        </div>
    )
}

export default BooksList