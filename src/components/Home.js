import React, {Component} from 'react';
import SearchBar from './SearchBar';
import BookList from './BookList'
import Sort from './Sort';
import Filter from './Filter';
import BookDetailPage from './BookDetailPage';

class Home extends Component {
  state = {
    books: [],
    searchTerm: '',
    filterTerm: '',
    book: {},
    pizza: ''
  }

  componentDidMount = () => {
    const url = `https://openlibrary.org/search.json?q=${this.state.searchTerm}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('data', data.docs)
        this.setState({books: data.docs, searchTerm: ''})
      })
      .catch(err => err)
  }

  handleSearchChange = e => {
    this.setState({searchTerm: e.currentTarget.value})
  }

  handleFilterChange = e => {
    this.setState({filterTerm: e.currentTarget.value})
  }

  getBooks = e => {
    e.preventDefault();
    this.componentDidMount()
  }

  getSelectedBook = bookId => {
    const url = `https://openlibrary.org/api/books?bibkeys=OLID:${bookId}&jscmd=details&format=json`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({book: data})
      })
      .catch(err => err)
      console.log('bo1k', this.state.book)
  }

  // getSelectedBook = bookId => {
  //   //add props to book detail page

  //   //let selectedBook = {}
  //  let selectedBook = this.state.book;
  //  console.log("selectedBookkkk", selectedBook )
  // //  onclick searchterm === bookid, get all info for that book

  // this.state.books = this.state.books.filter(book => {
  //     if (book.edition_key[0] === bookId) {
  //       console.log('selectedBook', book);
  //       selectedBook = book;
  //       console.log('selectedBook2', book);
  //     }
  //     return book;
  //    })

  //    this.setState({book: selectedBook})
  //   console.log("book")
  //  // this.setState({book: 'ham'})
  // }

  filter () {
    const {books, filterTerm} = this.state;

    return books !== undefined ? books.filter(book => {
        if (filterTerm === 'ebooks') {
          return book.ebook_count_i > 0;
        }
        if (filterTerm === 'print_books') {
          return book.ebook_count_i <= 0;
        }
        if (filterTerm === 'none') {
          return books;
        }
      return true;
    }) : []
  }

  sort = e => {
    const sortTerm = e.currentTarget.value;
    let sortedBooks = this.state.books

    if (sortTerm === 'recent') {
      sortedBooks = sortedBooks.sort((bookA,bookB) => {
        return bookB.first_publish_year - bookA.first_publish_year;
      })
    }
    if (sortTerm === 'older') {
      sortedBooks = sortedBooks.sort((bookA,bookB) => {
        return bookA.first_publish_year - bookB.first_publish_year;
      })
    }
    if (sortTerm === 'editions') {
      sortedBooks = sortedBooks.sort((bookA, bookB) => {
        return bookB.edition_count - bookA.edition_count;
      })
    }

    this.setState({
      books: sortedBooks
    })
  }

  render () {
    const {books, searchTerm, filterTerm, book, pizza} = this.state
    const filter = this.filter();
    // console.log('filterFunc', filter)
    console.log('books', books)
    console.log('filter', filter)
    console.log('pizCza', pizza)


    return (
      <div>
        <SearchBar getBooks={this.getBooks} searchTerm={searchTerm} handleSearchChange={this.handleSearchChange} />
        <Filter handleFilterChange={this.handleFilterChange} filterTerm={filterTerm}/>
        <Sort sort={this.sort}/>
        <BookList books={books} filter={filter} getSelectedBook={this.getSelectedBook}/>
        <BookDetailPage book={book} books={books}/>
      </div>

    )
  }
}

export default Home;
