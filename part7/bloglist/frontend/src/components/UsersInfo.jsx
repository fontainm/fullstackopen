import { useEffect } from 'react'
import { initializeUsers } from '../reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'

const UsersInfo = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const users = useSelector((state) => {
    return state.users
  })

  return (
    <>
      <h2>Users</h2>
      <table>
        <tr>
          <th>Name</th>
          <th>blogs created</th>
        </tr>

        {users.map((user) => (
          <tr>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </>
  )
}

export default UsersInfo
