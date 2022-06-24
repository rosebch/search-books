import { useHttp } from '../hooks/http.hook';

const useGoogleBooksService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://www.googleapis.com/books/v1/volumes?q=';

    const getBooks = async (searchTerm, startIndex = 0, sorting = 'relevance') => {
        const res = await request(`${_apiBase}${searchTerm}&startIndex=${startIndex}&maxResults=30&orderBy=${sorting}`); 
        return {'books': res.items?.map(item => _transformBooks(item)), 'totalItems': res.totalItems };
    }

    const getBook = async (id) => {
        const res = await request(`https://www.googleapis.com/books/v1/volumes/${id}`);
        console.log(_transformBook(res));
        return _transformBook(res);
    }

    const _transformBooks = (book) => {
        return {
            id: book.id,
            title: book.volumeInfo.title || ' ',
            thumbnail: book.volumeInfo.imageLinks,
            categories: book.volumeInfo.categories || ' ', 
            authors: book.volumeInfo.authors || ' '
        }
    }

    const _transformBook = (book) => {
        return {
            id: book.id,
            title: book.volumeInfo.title || ' ',
            thumbnail: book.volumeInfo.imageLinks.thumbnail,
            categories: book.volumeInfo.categories || ' ', 
            authors: book.volumeInfo.authors || ' ',
            description: book.volumeInfo.description || ' '
        }
    }

    return {loading, error, clearError, getBooks, getBook}
}

export default useGoogleBooksService;