import React, { Component } from 'react'

export class BookDetailPage extends Component {
  // componentDidMount() {
  //   this.props.getSelectedBook(this.props.match.params.id)
  // }
  render() {
    console.log('boook!!', this.props.book);
    console.log('paramsss', this.props.match.params)
    return (
      <div>
        howdy
      </div>
    )
  }
}

export default BookDetailPage

