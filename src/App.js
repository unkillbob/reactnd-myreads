import React from 'react'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount () {
    BooksAPI.getAll().then(books => this.setState({ books }))
  }

  updateBookShelf (book, shelf) {
    BooksAPI.update(book, shelf)

    book.shelf = shelf
    this.setState(state => ({
      books: state.books.filter(b => b.id !== book.id).concat(book)
    }))
  }

  render () {
    return (
      <div className='app'>
        <Route
          exact
          path='/'
          render={() => (
            <ListBooks
              books={this.state.books}
              onUpdateBookShelf={(book, shelf) =>
                this.updateBookShelf(book, shelf)}
            />
          )}
        />
        <Route
          path='/search'
          render={() => (
            <SearchBooks
              onUpdateBookShelf={(book, shelf) =>
                this.updateBookShelf(book, shelf)}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
