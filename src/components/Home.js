import React, {Fragment, Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Logo from './Logo';
import SearchBar from './SearchBar';
import BookList from './BookList'
import Sort from './Sort';
import Filter from './Filter';
import BookDetailPage from './BookDetailPage';

class Home extends Component {
  state = {
    books: [],
    book: {},
    loading: false,
    filterTerm: '',
    alert: null
  }

  //Get books on search
  getBooks = searchTerm => {
    const url = `https://openlibrary.org/search.json?q=${searchTerm}`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('data', data.docs);
        this.setState({books: data.docs, loading: false});
    })
    .catch(err => err);
  }

  //Clear Books
  clearBooks = () => this.setState({ books: [], loading: false });

  //Set alert when required fields are blank
  setAlert = (msg) => {
    this.setState({ alert: msg })
    setTimeout(() => this.setState({ alert: null }), 5000);
  }

  //Get individual book info
  getSelectedBook = bookId => {
    const url = `https://openlibrary.org/api/books?bibkeys=OLID:${bookId}&jscmd=details&format=json`
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('bookDeatilData', data)
        this.setState({book: data, loading: false})
      })
      .catch(err => err)
      console.log('bookItem', this.state.book)
  }

  //Handle change for filtered items
  handleFilterChange = e => this.setState({filterTerm: e.currentTarget.value});

  //Filter books
  filter = () => {
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

  //Sort Books
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
    const {books, filterTerm, book, alert, loading} = this.state
    const filter = this.filter();
    const showClear = books.length > 0 ? true : false;
    const headerClass = showClear ? 'header' : 'container all-center';

    return (
      <Router>
          <Switch>
          <Route exact path='/' render={props => (
            <Fragment>
              <div className={headerClass}>
                 <Logo showClear={showClear}/>
                 <SearchBar getBooks={this.getBooks} clearBooks={this.clearBooks} showClear={showClear} setAlert={this.setAlert}/>
              </div>

              <div className='container'>
              {showClear && (
                <div>
                  <Filter handleFilterChange={this.handleFilterChange} filterTerm={filterTerm}/>
                  <Sort sort={this.sort}/>
                </div>)}
                <BookList books={books} filter={filter} />
              </div>
            </Fragment>
          )}/>
          <Route exact path='/book/:id' render={props => (
            <BookDetailPage {...props} getSelectedBook={this.getSelectedBook} book={book} loading={loading}/>
          )}/>
        </Switch>
        <div>{alert}</div>
      </Router>
    )
  }
}

export default Home;
