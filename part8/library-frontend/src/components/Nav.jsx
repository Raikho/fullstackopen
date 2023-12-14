import { NavLink } from 'react-router-dom'
import Hidable from './Hidable'

const Nav = ({ handleLogout }) => {
  return (
    <div className='navbar'>
      <NavLink to='/authors'>Authors</NavLink>
      <NavLink to='/books'>Books</NavLink>
      <Hidable showOn='loggedIn'>
        <NavLink to='/addBook'>Add Book</NavLink>
      </Hidable>
      <Hidable showOn='loggedIn'>
        <NavLink onClick={handleLogout}>logout</NavLink>
      </Hidable>
      <Hidable showOn='loggedOut'>
        <NavLink to='/login'>Login</NavLink>
      </Hidable>
    </div>
  )
}

export default Nav
