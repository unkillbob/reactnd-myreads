import React from 'react'
import { mount, shallow } from 'enzyme'
import Book from './Book'

const book = {
  title: 'My Book Title',
  authors: ['Author N One', 'Book Author-Two'],
  shelf: 'currentlyReading',
  imageLinks: {
    thumbnail: []
  }
}

it('renders without crashing', () => {
  mount(<Book book={book} />)
})

describe('on render', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<Book book={book} />)
  })

  it('displays the book title', () => {
    expect(wrapper).toIncludeText(book.title)
  })

  it('lists the book authors separated by comma', () => {
    expect(wrapper).toIncludeText(book.authors.join(', '))
  })

  it('displays the current book shelf', () => {
    expect(wrapper.find('.book-shelf-changer select')).toHaveValue(book.shelf)
  })
})

describe('on shelf change', () => {
  it('invokes the onUpdateBookShelf prop hook with the book instance and new shelf', () => {
    const onUpdate = jest.fn()
    const wrapper = shallow(<Book book={book} onUpdateBookShelf={onUpdate} />)

    wrapper.find('.book-shelf-changer select').simulate('change', {
      target: { value: 'read' }
    })

    expect(onUpdate).toHaveBeenCalledTimes(1)
    expect(onUpdate).toHaveBeenCalledWith(book, 'read')
  })

  it('does not error if no onUpdateBookShelf prop is supplied', () => {
    const wrapper = shallow(<Book book={book} />)
    wrapper.find('.book-shelf-changer select').simulate('change', {
      target: { value: 'read' }
    })
  })
})
