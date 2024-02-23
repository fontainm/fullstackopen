import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Header = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => {
    return state.user
  })

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <div className="container">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="w-100">
            <Nav.Link href="#" as="span">
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/blogs">Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/users">Users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="div" className="ms-auto">
              {user ? (
                <>
                  <em> {user.name} logged in</em>
                  <Button variant="secondary" onClick={handleLogout}>
                    logout
                  </Button>
                </>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  )
}

export default Header
