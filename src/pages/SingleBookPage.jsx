import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';

import useGoogleBooksService from '../service/GoogleBooksService';
import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import BookCard from '../components/bookCard/BookCard';

const SingleBookPage = () => {
    const {bookId} = useParams();
    const [book, setBook] = useState(null);
    const {loading, error, getBook, clearError} = useGoogleBooksService();

    useEffect(() => {
        updateBook()
    }, [bookId])

    const updateBook = () => {
      clearError();
        getBook(bookId)
            .then(onBookLoaded)
    }

    const onBookLoaded = (book) => {
        setBook(book);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !book) ? <BookCard book={book}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SingleBookPage;