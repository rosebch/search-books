import { useDispatch, useSelector } from 'react-redux';

import { filtersChanged, valueChanged, searchTermChanged, sortingChanged, startIndexChanged } from './searchSlice';
import { booksUpdate } from '../booksList/booksSlice';
import { fetchBooks } from '../../actions';
import useGoogleBooksService from '../../service/GoogleBooksService';
import './SearchPanel.scss';
import image from '../../assets/images/search.svg';

const SearchPanel = () => {
    const { activeFilter, value, searchTerm, sorting } = useSelector(state => state.filters);

    const { getBooks } = useGoogleBooksService();    
    const dispatch = useDispatch();

    const onHandleChangeValue = (e) => {       
        dispatch(valueChanged(e.target.value));
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();  

        dispatch(searchTermChanged(value));      
        dispatch(fetchBooks(getBooks, value, sorting, 0));
        dispatch(booksUpdate());
        dispatch(startIndexChanged(0))
        dispatch(valueChanged(''));
    }

    const onHandleChangeCategory= (event) => {
        dispatch(filtersChanged(event.target.value));
    }

    const onHandleChangeSorting= (event) => {
        dispatch(sortingChanged(event.target.value));
        dispatch(fetchBooks(getBooks, searchTerm, event.target.value, 0));
    }

    const optionsCategories = ['All', 'Art', 'Biography', 'Computers', 'History', 'Medical', 'Poetry'];

    return (
        <div className="books__search-panel">
            <h1 className="books__title">Search for books</h1>
            <form action="submit" onSubmit={onHandleSubmit} className="books__search-form">
                <input type="text" value={value} onChange={onHandleChangeValue} />
                <div type='submit' onClick={onHandleSubmit} className="books__search-btn">
                    <img src={image} alt="search" />
                </div>
            </form>
            <div className="books__filter-form">
                <form>
                    <span>Categories</span>
                    <select value={activeFilter} onChange={onHandleChangeCategory}>
                        {
                            optionsCategories.map((option,i) => {
                                return <option key={i} value={option}>{option}</option>
                            })
                        }
                    </select>
                </form>
                <form>
                    <span>Sorting by</span>
                    <select value={sorting} onChange={onHandleChangeSorting}>
                        <option value="relevance">Relevance</option>
                        <option value="newest">Newest</option>
                    </select>
                </form>
            </div>
        </div>
    )
}

export default SearchPanel