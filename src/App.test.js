import React from 'react'
import { MemoryRouter } from 'react-router'
import { mount, shallow } from 'enzyme'
import App from './App'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { getAll, update } from './BooksAPI'

jest.mock('./BooksAPI', () => {
  return {
    getAll: jest.fn(() => Promise.resolve([])),
    update: jest.fn(() => Promise.resolve())
  }
})

it('renders without crashing', () => {
  mount(<MemoryRouter><App /></MemoryRouter>)
})

it('renders ListBooks at /', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>
  )
  expect(wrapper.find(ListBooks)).toHaveLength(1)
  expect(wrapper.find(SearchBooks)).toHaveLength(0)
})

it('renders SearchBooks at /search', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/search']}><App /></MemoryRouter>
  )
  expect(wrapper.find(ListBooks)).toHaveLength(0)
  expect(wrapper.find(SearchBooks)).toHaveLength(1)
})

describe('on component mount', () => {
  beforeAll(() => getAll.mockClear())

  it('fetches the collection of shelved books from the API and sets state', () => {
    const books = [{ id: '1', title: 'foo' }, { id: '2', title: 'bar' }]
    getAll.mockImplementationOnce(() => Promise.resolve(books))

    const wrapper = shallow(<App />)

    return wrapper.instance().componentDidMount().then(() => {
      expect(getAll).toHaveBeenCalledTimes(1)
      expect(wrapper.state('books')).toEqual(books)
    })
  })
})

describe('on update shelf', () => {
  const books = [
    { id: '1', title: 'foo', shelf: 'currentlyReading' },
    { id: '2', title: 'bar', shelf: 'read' }
  ]

  beforeAll(() => {
    getAll.mockImplementation(() => Promise.resolve(books))
  })

  describe('of an existing book', () => {
    const book = books[0]
    const originalShelf = book.shelf
    const shelf = 'read'

    let wrapper

    beforeAll(() => {
      wrapper = shallow(<App />)
      update.mockClear()

      const app = wrapper.instance()
      return app
        .componentDidMount()
        .then(() => app.updateBookShelf(book, shelf))
    })

    it('should update the shelf of the given book via the API', () => {
      expect(update).toHaveBeenCalledTimes(1)
      expect(update).toHaveBeenCalledWith(book, shelf)
    })

    it('should update the shelf of the book in the state', () => {
      const books = wrapper.state('books')
      expect(books).toHaveLength(2)
      expect(books).toContainEqual({
        id: book.id,
        title: book.title,
        shelf
      })
    })

    it('should not modify the original book instance', () => {
      expect(book.shelf).toEqual(originalShelf)
    })
  })

  describe('of a new book', () => {
    const book = {
      id: '3',
      title: 'baz',
      shelf: 'none'
    }
    const originalShelf = book.shelf
    const shelf = 'currentlyReading'

    let wrapper

    beforeAll(() => {
      wrapper = shallow(<App />)
      update.mockClear()

      const app = wrapper.instance()
      return app
        .componentDidMount()
        .then(() => app.updateBookShelf(book, shelf))
    })

    it('should update the shelf of the given book via the API', () => {
      expect(update).toHaveBeenCalledTimes(1)
      expect(update).toHaveBeenCalledWith(book, shelf)
    })

    it('should add the book to the state with the correct shelf', () => {
      const books = wrapper.state('books')
      expect(books).toHaveLength(3)
      expect(books).toContainEqual({
        id: book.id,
        title: book.title,
        shelf
      })
    })

    it('should not modify the original book instance', () => {
      expect(book.shelf).toEqual(originalShelf)
    })
  })
})
