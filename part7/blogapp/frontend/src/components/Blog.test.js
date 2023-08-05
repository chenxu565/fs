import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import thunk from 'redux-thunk'
import axios from 'axios'

import Blog from './Blog'

// Include thunk in the middlewares array
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

jest.mock('axios')

describe('Blog', () => {
  const blog = {
    title: 'Goto considered harmful',
    author: 'Edsger Dijkstra',
    url: 'google.com',
    likes: 1,
  }

  let store

  beforeEach(() => {
    store = mockStore({
      storageUser: {
        username: 'testUser',
      },
      blogs: [blog],
      notification: null,
    })

    axios.put = jest.fn().mockResolvedValue({
      data: {
        title: 'Goto considered harmful',
        author: 'Edsger Dijkstra',
        url: 'google.com',
        likes: 3,
      },
    })

    render(
      <Provider store={store}>
        <Blog blog={blog} />
      </Provider>,
    )
  })

  test('renders only title and author by default', () => {
    screen.getByText(blog.title, { exact: false })
    screen.getByText(blog.author, { exact: false })

    const urlElement = screen.queryByText(blog.url, { exact: false })
    expect(urlElement).toBeNull()

    const likesElement = screen.queryByText('likes', { exact: false })
    expect(likesElement).toBeNull()
  })

  test('renders also details when asked to be shown', async () => {
    const button = screen.getByText('show')
    await userEvent.click(button)

    screen.getByText(blog.url, { exact: false })
    screen.getByText(`likes ${blog.likes}`, { exact: false })
  })

  test('if liked twice, dispatches the likeBlog action twice', async () => {
    store.clearActions() // clear any actions that might have been dispatched in previous tests

    const showButton = screen.getByText('show')
    await userEvent.click(showButton)

    const likeButton = screen.getByText('like')
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    const actions = store.getActions()

    const updateBlogActions = actions.filter(
      (action) => action.type === 'blogs/updateBlog',
    )

    expect(updateBlogActions).toHaveLength(2)
  })
})
