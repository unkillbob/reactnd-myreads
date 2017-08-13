import React from 'react'
import ReactDOM from 'react-dom'
import Book from './Book'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const book = {
    title: '',
    authors: [],
    imageLinks: {
      thumbnail: []
    }
  }
  ReactDOM.render(<Book book={book} />, div)
})
