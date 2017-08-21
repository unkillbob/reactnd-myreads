import React from 'react'
import { mount, shallow } from 'enzyme'
import BookShelf from './BookShelf'
import Book from './Book'

it('renders without crashing', () => {
  mount(<BookShelf books={[]} />)
})

describe('on render', () => {
  const imageLinks = { thumbnail: [] }
  const books = [
    {
      id: 1,
      shelf: 'read',
      imageLinks
    },
    {
      id: 2,
      shelf: 'currentlyReading',
      imageLinks
    },
    {
      id: 3,
      shelf: 'read',
      imageLinks
    }
  ]
  const title = 'My Book Shelf'
  const shelf = 'read'
  const onUpdate = jest.fn()
  let wrapper

  beforeAll(() => {
    wrapper = shallow(
      <BookShelf
        title={title}
        shelf={shelf}
        books={books}
        onUpdateBookShelf={onUpdate}
      />
    )
  })

  it('displays the book shelf title', () => {
    expect(wrapper).toIncludeText(title)
  })

  it('only renders the books with the specified shelf', () => {
    expect(wrapper).toContainReact(
      <Book book={books[0]} onUpdateBookShelf={onUpdate} />
    )
    expect(wrapper).toContainReact(
      <Book book={books[2]} onUpdateBookShelf={onUpdate} />
    )
    expect(wrapper).not.toContainReact(
      <Book book={books[1]} onUpdateBookShelf={onUpdate} />
    )
  })
})
