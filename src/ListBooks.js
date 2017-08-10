import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

export default function ListBooks (props) {
  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <BookShelf
          title='Currently Reading'
          shelf='currentlyReading'
          books={props.books}
          onUpdateBookShelf={props.onUpdateBookShelf}
        />
        <BookShelf
          title='Want to Read'
          shelf='wantToRead'
          books={props.books}
          onUpdateBookShelf={props.onUpdateBookShelf}
        />
        <BookShelf
          title='Read'
          shelf='read'
          books={props.books}
          onUpdateBookShelf={props.onUpdateBookShelf}
        />
      </div>
      <div className='open-search'>
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}
