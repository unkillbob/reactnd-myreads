import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import SearchBooks from './SearchBooks'

it('renders without crashing', () => {
  mount(<MemoryRouter><SearchBooks books={[]} /></MemoryRouter>)
})
