import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('Blog', () => {
  let container
  const mockUpdateHandler = jest.fn()
  const mockRemovalHandler = jest.fn()

  beforeEach(() => {
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

    Storage.prototype.getItem = jest.fn((key) => {
      if (key === 'loggedBlogappUser') {
        return JSON.stringify(user)
      }
      return null
    })

    container = render(
      <Blog blog={blog}
        handleBlogUpdate={mockUpdateHandler}
        handleBlogRemoval={mockRemovalHandler} />
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
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(
      'http://www.testurl.com'
    )

    expect(div).toHaveTextContent(
      '0'
    )

    expect(div).toHaveTextContent(
      'likes'
    )
  })

  test('clicking the like button twice calls event handler twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateHandler.mock.calls).toHaveLength(2)
  })
})