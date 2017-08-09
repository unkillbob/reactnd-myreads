import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

export default class SearchBooks extends Component {
  state = {
    results: []
  }

  searchBooks (query) {
    this.setState(() => ({ results: [] }))
    BooksAPI.search(query)
      .then(results => this.setState(() => ({ results })))
      .catch(e => {})
  }

  render () {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link className='close-search' to='/'>Close</Link>
          <div className='search-books-input-wrapper'>
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type='text'
              placeholder='Search by title or author'
              onChange={event => this.searchBooks(event.target.value)}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.state.results.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  onUpdateBookShelf={this.props.onUpdateBookShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}
