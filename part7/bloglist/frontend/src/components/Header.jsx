import { useSelector, useDispatch } from 'react-redux'
import LoginForm from './LoginForm'
import { logoutUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Header = () => {
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
    <div className="header">
      <Link to="/blogs">blogs</Link>
      <Link to="/users">users</Link>
      <div>{user.name} logged in</div>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Header
