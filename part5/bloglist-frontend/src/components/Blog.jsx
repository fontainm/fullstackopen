import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
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

  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      removeBlog(blog.id)
  }

  return (
    <div style={blogStyle}>
      <div>
        Title: {blog.title}
        <button onClick={() => setBlogVisible(!blogVisible)}>
          {blogVisible ? 'close' : 'view'}
        </button>
      </div>
      {blogVisible ? (
        <>
          <div>URL: {blog.url}</div>
          <div>
            Likes: <span id="likes">{blog.likes}</span>
            <button onClick={likeBlog}>like</button>
          </div>
          <div>Author: {blog.author}</div>
          <div>Username: {blog.user.name}</div>
          {blog.user.name === user.name ? (
            <button onClick={deleteBlog}>remove</button>
          ) : null}
        </>
      ) : null}
    </div>
  )
}

export default Blog
