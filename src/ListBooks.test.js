import React from 'react'
import { mount, shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import ListBooks from './ListBooks'
import BookShelf from './BookShelf'

it('renders without crashing', () => {
  mount(<MemoryRouter><ListBooks books={[]} /></MemoryRouter>)
})

describe('on render', () => {
  const books = []
  const onUpdate = jest.fn()
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<ListBooks books={books} onUpdateBookShelf={onUpdate} />)
  })

  it('displays a Currently Reading book shelf', () => {
    expect(wrapper).toContainReact(
      <BookShelf
        title='Currently Reading'
        shelf='currentlyReading'
        books={books}
        onUpdateBookShelf={onUpdate}
      />
    )
  })

  it('displays a Want to Read book shelf', () => {
    expect(wrapper).toContainReact(
      <BookShelf
        title='Want to Read'
        shelf='wantToRead'
        books={books}
        onUpdateBookShelf={onUpdate}
      />
    )
  })

  it('displays a Read book shelf', () => {
    expect(wrapper).toContainReact(
      <BookShelf
        title='Read'
        shelf='read'
        books={books}
        onUpdateBookShelf={onUpdate}
      />
    )
  })
})
