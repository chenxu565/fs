import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('Blog', () => {
  let container
  const likeHandler = jest.fn()

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://www.testurl.com',
    likes: 0,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  // Mock the localStorage
  const user = {
    username: 'testuser',
    name: 'Test User'
  }

  beforeEach(() => {

    Storage.prototype.getItem = jest.fn((key) => {
      if (key === 'loggedBlogappUser') {
        return JSON.stringify(user)
      }
      return null
    })

    container = render(
      <Blog
        blog={blog}
        remove={jest.fn()}
        canRemove={true}
        like={likeHandler}
      />
    ).container
  })

  test ('renders content', () => {
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )

    expect(div).toHaveTextContent(
      'Test Author'
    )

    expect(div).not.toHaveTextContent(
      'http://www.testurl.com'
    )

    expect(div).not.toHaveTextContent(
      '0'
    )

    expect(div).not.toHaveTextContent(
      'likes'
    )
  })

  test('clicking the button shows url and likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await act(async() => {
      await user.click(button)
    })

    screen.getByText(blog.url, { exact: false })
    screen.getByText(`likes ${blog.likes}`, { exact: false })
  })

  test('if liked twice, ', async () => {
    const user = userEvent.setup()

    const showButton = screen.getByText('show')
    await act(async() => {
      await user.click(showButton)
    })

    const likeButton = screen.getByText('like')
    await act(async() =>
    {
      await user.click(likeButton)
      await user.click(likeButton)
    })

    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})