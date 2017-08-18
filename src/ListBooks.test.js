import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import ListBooks from './ListBooks'

it('renders without crashing', () => {
  mount(<MemoryRouter><ListBooks books={[]} /></MemoryRouter>)
})
