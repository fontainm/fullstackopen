import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('renders content', async () => {
  const user = {
    username: 'username',
    name: 'name',
  }

  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} user={user} />)

  const userE = userEvent.setup()
  const inputTitle = screen.getByPlaceholderText('Title')
  const inputAuthor = screen.getByPlaceholderText('Author')
  const inputURL = screen.getByPlaceholderText('URL')
  const button = screen.getByText('create')
  await userE.type(inputTitle, 'Blog title')
  await userE.type(inputAuthor, 'Blog author')
  await userE.type(inputURL, 'www.blog.url')
  await userE.click(button)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Blog title')
  expect(createBlog.mock.calls[0][0].author).toBe('Blog author')
  expect(createBlog.mock.calls[0][0].url).toBe('www.blog.url')
})
