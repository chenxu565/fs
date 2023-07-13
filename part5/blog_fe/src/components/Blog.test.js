import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import Blog from './Blog'

test ('renders content', () => {
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

  const { container } = render(
    <Blog blog={blog} />
  )

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