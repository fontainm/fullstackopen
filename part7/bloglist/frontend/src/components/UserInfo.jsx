import { useSelector, useDispatch } from 'react-redux'
import LoginForm from './LoginForm'
import { logoutUser } from '../reducers/userReducer'

const UserInfo = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => {
    return state.user
  })

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  if (!user) {
    return <LoginForm />
  }

  return (
    <p>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </p>
  )
}

export default UserInfo
