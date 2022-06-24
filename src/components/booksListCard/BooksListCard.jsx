import { Link } from 'react-router-dom';
import './BooksListCard.scss';

const BooksListCard = ({id, title, categories, thumbnail, authors}) => {
  return (
    <Link to={`${id}`}>
      <li className='books__card' key={id}>          
              {
                thumbnail ?
                <img className='books__card-img' src={thumbnail.thumbnail} alt="book-cover" />
                :
                <div className='books__card-img'>Нет обложки</div>
              }
              <div>
                  <div className="books__card-category">{categories}</div>
                  <div className="books__card-title">{title}</div>
                  <div className="books__card-author">{authors}</div>
              </div>    
      </li>
    </Link>
  )
}

export default BooksListCard