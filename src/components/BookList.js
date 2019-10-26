import React from 'react';
import {Link} from 'react-router-dom';

const BookList = (props) => {
  return (
    <div id='book-list'>
      {props.filter && props.filter.map((book, i) => (
          <ul key={i}>
            <li id='book-list-items'>
              <Link to={`/book/${book.cover_edition_key}`}>{book.title}</Link>
              <p>{book.title}</p>
              <p>{book.author_name && book.author_name[0]}</p>
              <p>First Year Published: {book.first_publish_year}</p>
            </li>
          </ul>
        ))}
    </div>
  )
}

export default BookList;
