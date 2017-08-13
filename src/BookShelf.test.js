import React from 'react'
import ReactDOM from 'react-dom'
import BookShelf from './BookShelf'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BookShelf books={[]} />, div)
})
