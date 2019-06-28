import React from 'react';
import {Link} from 'react-router-dom';

const BookDetailPage = (props) => {
  const {book, books} = props;
  console.log('book', book);
  console.log('books', books);
  return (
    <h1>hello world</h1>
  )
}

export default BookDetailPage;
