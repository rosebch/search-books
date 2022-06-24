import {Link} from 'react-router-dom';

import './BookCard.scss';

const BookCard = ({book}) => {
    const {title, description, authors, thumbnail, categories} = book;
    return (
        <div className="book">
            <div className="book__img">
                <img src={thumbnail} alt={title}/>
            </div>
            <div className="book__info">
                <p className="book__category">{categories}</p>
                <h2 className="book__title">{title}</h2>
                <p className="book__author">{authors}</p>                
                <p className="book__descr">{description}</p>
            </div>
            <Link to="/" className="book__back">Back to main</Link>
        </div>
    )
}

export default BookCard