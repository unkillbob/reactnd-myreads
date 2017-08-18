import React from 'react'
import { mount } from 'enzyme'
import Book from './Book'

it('renders without crashing', () => {
  const book = {
    title: '',
    authors: [],
    imageLinks: {
      thumbnail: []
    }
  }
  mount(<Book book={book} />)
})
