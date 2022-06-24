import { useHttp } from '../hooks/http.hook';

const useGoogleBooksService = () => {
    const {request} = useHttp();

    const _apiBase = 'https://www.googleapis.com/books/v1/volumes?q=';

    const getBooks = async (searchTerm, startIndex = 0, sorting = 'relevance') => {
        const res = await request(`${_apiBase}${searchTerm}&startIndex=${startIndex}&maxResults=30&orderBy=${sorting}`); 
        return {'books': res.items?.map(item => _transformBooks(item)), 'totalItems': res.totalItems };
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

    return {getBooks}
}

export default useGoogleBooksService;