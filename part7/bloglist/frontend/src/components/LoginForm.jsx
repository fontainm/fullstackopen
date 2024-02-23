import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const user = useSelector((state) => {
    return state.user
  })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(
      loginUser({
        username,
        password,
      })
    )
    setUsername('')
    setPassword('')
  }

  if (user) {
    return <h1>Welcome {user.name}!</h1>
  }

  return (
    <>
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button id="login-button" type="submit">
          login
        </Button>
      </Form>
    </>
  )
}

export default LoginForm
