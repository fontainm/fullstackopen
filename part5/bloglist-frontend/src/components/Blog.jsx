import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const likeBlog = (event) => {
    event.preventDefault()
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  if (!blogVisible) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title}
          <button onClick={() => setBlogVisible(true)}>view</button>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={() => setBlogVisible(false)}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} <button onClick={likeBlog}>like</button>
      </div>
      <div>{blog.author}</div>
      <div>{blog.user?.name}</div>
    </div>
  )
}

export default Blog
