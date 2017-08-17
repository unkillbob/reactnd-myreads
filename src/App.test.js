import React from 'react'
import { MemoryRouter } from 'react-router'
import App from './App'
import { mount } from 'enzyme'

jest.mock('./BooksAPI', () => {
  return {
    getAll: jest.fn(() => Promise.resolve([]))
  }
})

it('renders without crashing', () => {
  mount(<MemoryRouter><App /></MemoryRouter>)
})
