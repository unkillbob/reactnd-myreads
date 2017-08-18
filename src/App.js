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
    return BooksAPI.getAll().then(books => this.setState({ books }))
  }

  updateBookShelf (book, shelf) {
    BooksAPI.update(book, shelf)

    const updatedBook = Object.assign({}, book, { shelf })
    this.setState(state => ({
      books: state.books
        .filter(b => b.id !== updatedBook.id)
        .concat(updatedBook)
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
              books={this.state.books}
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
