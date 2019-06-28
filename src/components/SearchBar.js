import React from 'react';

const SearchBar = props => (
  <form onSubmit={props.getBooks}>
    <input type='text' name='searchTerm' value={props.searchTerm}onChange={props.handleSearchChange} placeholder='Start your book search...'/>
    <button>Find Books</button>
  </form>
)

export default SearchBar;
