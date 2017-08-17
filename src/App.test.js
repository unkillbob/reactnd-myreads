import React from 'react'
import { MemoryRouter } from 'react-router'
import App from './App'
import { getAll } from './BooksAPI'
import { mount, shallow } from 'enzyme'

jest.mock('./BooksAPI', () => {
  return {
    getAll: jest.fn(() => Promise.resolve([]))
  }
})

beforeEach(() => getAll.mockClear())

it('renders without crashing', () => {
  mount(<MemoryRouter><App /></MemoryRouter>)
})

it('fetches the collection of shelved books from the API', () => {
  const books = [{ id: '1', title: 'foo' }, { id: '1', title: 'bar' }]
  getAll.mockImplementationOnce(() => Promise.resolve(books))

  const wrapper = shallow(<App />)

  return wrapper.instance().componentDidMount().then(() => {
    expect(getAll.mock.calls).toHaveLength(1)
    expect(wrapper.state('books')).toEqual(books)
  })
})
