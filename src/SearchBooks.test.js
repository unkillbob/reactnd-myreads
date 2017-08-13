import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router'
import SearchBooks from './SearchBooks'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter><SearchBooks books={[]} /></MemoryRouter>, div)
})
