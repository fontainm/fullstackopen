import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
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
