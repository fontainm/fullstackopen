import { useEffect } from 'react'
import { initializeUsers } from '../reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserInfo = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const users = useSelector((state) => {
    return state.users
  })

  const id = useParams().id

  const user = users.find((user) => user.id === id)

  if (!user) return null

  return (
    <>
      <h2>{user.name}</h2>
      <h3>blogs added</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default UserInfo
