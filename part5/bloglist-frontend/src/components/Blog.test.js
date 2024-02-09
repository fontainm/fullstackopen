import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: '123',
    likes: 8,
  }

  const { container } = render(<Blog blog={blog} />)

  expect(container).toHaveTextContent('Test Title')

  const element = screen.queryByText('Test Author')
  expect(element).toBeNull()
})

test('url and likes are shown after click', async () => {
  let container

  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'https://123',
    likes: 8,
    user: {
      username: 'username',
      name: 'name name',
    },
  }

  const user = {
    username: 'username',
    name: 'name name',
  }

  container = render(<Blog blog={blog} user={user} />).container

  const userE = userEvent.setup()
  const button = screen.getByText('view')

  expect(container).not.toHaveTextContent('https://123')

  await userE.click(button)

  expect(container).toHaveTextContent('https://123')
})
