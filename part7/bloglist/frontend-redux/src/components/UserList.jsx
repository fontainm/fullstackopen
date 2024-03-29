import { useEffect } from 'react'
import { initializeUsers } from '../reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import { Table } from 'react-bootstrap'

const UserList = () => {
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
      <Table striped>
        <tbody>
          <tr>
            <th>Name</th>
            <th>blogs created</th>
          </tr>

          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default UserList
