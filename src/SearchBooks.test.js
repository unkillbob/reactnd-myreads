import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import Book from './Book'
import SearchBooks from './SearchBooks'
import { search } from './BooksAPI'

jest.mock('./BooksAPI', () => {
  return {
    search: jest.fn(() => Promise.resolve([]))
  }
})

it('renders without crashing', () => {
  mount(<MemoryRouter><SearchBooks books={[]} /></MemoryRouter>)
})

it('provides a search field to search for books on', () => {
  const wrapper = mount(<MemoryRouter><SearchBooks books={[]} /></MemoryRouter>)
  expect(wrapper.find('.search-books-input-wrapper input')).toBePresent()
})

describe('on search query change', () => {
  const imageLinks = { thumbnail: [] }
  const books = [
    { id: '1', title: 'foo', shelf: 'currentlyReading', imageLinks },
    { id: '2', title: 'bar', shelf: 'read', imageLinks }
  ]
  const results = [
    { id: '7', title: 'Fantastic Beasts and Where to Find Them', imageLinks },
    { id: '1', title: 'foo', imageLinks },
    { id: '12', title: 'How to Cook Nice Food', imageLinks } // lol
  ]

  const onShelfUpdate = jest.fn()
  let wrapper

  beforeAll(() => {
    search.mockImplementation(() => Promise.resolve(results))

    wrapper = mount(
      <MemoryRouter>
        <SearchBooks books={books} onUpdateBookShelf={onShelfUpdate} />
      </MemoryRouter>
    )
    wrapper
      .find('.search-books-input-wrapper input')
      .simulate('change', { target: { value: 'f' } })
  })

  it('searches the API for books matching the current query', () => {
    expect(search).toHaveBeenCalledTimes(1)
    expect(search).toHaveBeenCalledWith('f')
  })

  it('renders the books returned by the API', () => {
    expect(wrapper).toContainReact(
      <Book book={results[0]} onUpdateBookShelf={onShelfUpdate} />
    )
    expect(wrapper).toContainReact(
      <Book book={results[2]} onUpdateBookShelf={onShelfUpdate} />
    )
  })

  it('renders books with the appropriate shelf if applicable', () => {
    expect(wrapper).toContainReact(
      <Book book={books[0]} onUpdateBookShelf={onShelfUpdate} />
    )
    expect(wrapper).not.toContainReact(
      <Book book={results[1]} onUpdateBookShelf={onShelfUpdate} />
    )
  })
})
