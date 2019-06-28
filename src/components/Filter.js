import React from 'react';

const Filter = props => (
  <div>
    <label>Filter By:</label>
    <select onChange={props.handleFilterChange} value={props.filterTerm}>
      <option value='none'>None</option>
      <option value='ebooks'>E-Books</option>
      <option value='print_books'>Print Books</option>
    </select>
  </div>
)

export default Filter;

