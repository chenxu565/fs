import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import NewBlog from './NewBlog'

describe('NewBlog', () => {
  test('if liked twice, ', async () => {
    const createHandler = jest.fn()
    render(<NewBlog createBlog={createHandler} />)

    const input = {
      title: 'Goto considered useful',
      author: 'Edsger Dijkstra',
      url: 'acm.com/goto'
    }

    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    const showButton = screen.getByText('create')

    await act(async() => {
      await user.type(titleInput, input.title)
      await user.type(authorInput, input.author)
      await user.type(urlInput, input.url)
      await user.click(showButton)
    })

    const calls = createHandler.mock.calls

    expect(calls).toHaveLength(1)
    expect(calls[0][0]).toEqual(input)
  })
})