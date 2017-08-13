import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router'
import App from './App'

jest.mock('./BooksAPI', () => {
  return {
    getAll: jest.fn(() => Promise.resolve([]))
  }
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, div)
})
