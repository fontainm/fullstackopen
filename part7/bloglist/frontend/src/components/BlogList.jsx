import { useSelector } from 'react-redux'
import Blog from './Blog'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector((state) => {
    return state.blogs
  })

  return (
    <>
      <h2>Blogs</h2>
      <Table striped>
        <tbody>
          {blogs
            // .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </tbody>
      </Table>
    </>
  )
}

export default BlogList
