import React from 'react'
import { mount } from 'enzyme'
import BookShelf from './BookShelf'

it('renders without crashing', () => {
  mount(<BookShelf books={[]} />)
})
