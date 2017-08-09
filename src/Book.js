import React, { Component } from 'react'

export default class Book extends Component {
  updateBookShelf (shelf) {
    if (typeof this.props.onUpdateBookShelf === 'function') {
      this.props.onUpdateBookShelf(this.props.book, shelf)
    }
  }

  render () {
    return (
      <div className='book'>
        <div className='book-top'>
          <div
            className='book-cover'
            style={{
              // @todo how to size this dynamically?
              width: 128,
              height: 193,
              backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")`
            }}
          />
          <div className='book-shelf-changer'>
            <select
              value={this.props.book.shelf}
              onChange={event => this.updateBookShelf(event.target.value)}
            >
              <option value='' disabled>Move to...</option>
              <option value='none'>None</option>
              <option value='currentlyReading'>
                Currently Reading
              </option>
              <option value='wantToRead'>Want to Read</option>
              <option value='read'>Read</option>
            </select>
          </div>
        </div>
        <div className='book-title'>{this.props.book.title}</div>
        <div className='book-authors'>
          {this.props.book.authors && this.props.book.authors.join(', ')}
        </div>
      </div>
    )
  }
}
