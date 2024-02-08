import { useState } from 'react'

const Blog = ({ blog }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
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
        likes {blog.likes} <button>like</button>
      </div>
      <div>{blog.author}</div>
    </div>
  )
}

export default Blog
