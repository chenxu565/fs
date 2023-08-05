import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'

import NewBlog from './NewBlog'

// Include thunk in the middlewares array
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('axios')

describe('For NewBlog', () => {
  const input = {
    title: 'Goto considered useful',
    author: 'Edsger Dijkstra',
    url: 'acm.com/goto',
  }

  let store

  beforeEach(() => {
    axios.post = jest.fn().mockResolvedValue({
      data: {
        title: 'Goto considered useful',
        author: 'Edsger Dijkstra',
        url: 'acm.com/goto',
      },
    })

    store = mockStore({
      storageUser: {
        username: 'testUser',
      },
      blogs: [],
      notification: null,
    })

    const mockRef = {
      current: {
        toggleVisibility: jest.fn(),
      },
    }
    render(
      <Provider store={store}>
        <NewBlog blogFormRef={mockRef} />
      </Provider>,
    )
  })

  test('Adding a new blog should invoke action', async () => {
    store.clearActions()

    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText('title')
    await user.type(titleInput, input.title)

    const authorInput = screen.getByPlaceholderText('author')
    await user.type(authorInput, input.author)

    const urlInput = screen.getByPlaceholderText('url')
    await user.type(urlInput, input.url)

    const showButton = screen.getByText('create')
    await user.click(showButton)

    const actions = store.getActions()

    expect(actions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'blogs/addBlog' }),
      ]),
    )
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
