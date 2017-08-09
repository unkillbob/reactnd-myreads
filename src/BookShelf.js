import React from 'react'
import Book from './Book'

export default function BookShelf (props) {
  const books = props.books.filter(book => book.shelf === props.shelf)
  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{props.title}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {books.map(book => (
            <li key={book.id}>
              <Book book={book} onUpdateBookShelf={props.onUpdateBookShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
