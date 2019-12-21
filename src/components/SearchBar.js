import React, { Component } from 'react'

export class SearchBar extends Component {
  state = {
    searchTerm: ''
  }

  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.searchTerm === '') {
      this.props.setAlert('Please enter some book terms!');
    } else {
      this.props.getBooks(this.state.searchTerm);
      this.setState({searchTerm: ''});
    }
  }

  handleSearchChange = (e) => this.setState({ searchTerm: e.target.value });

  render() {
    const {showClear, clearBooks} = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input type='text' className='form-search' name='searchTerm' placeholder='Search Books...' value={this.state.searchTerm} onChange={this.handleSearchChange}/>
          <input type='submit' value='Search' className='btn btn-dark btn-block'/>
        </form>
        {showClear && (<button className='btn btn-light btn-block' onClick={clearBooks}>Clear</button>)}
      </div>
    )
  }
}

export default SearchBar



