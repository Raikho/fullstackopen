import { NavLink, Link } from 'react-router-dom'
import Hidable from './Hidable'
import { NoteContext } from '../App'
import { useContext } from 'react'

const Nav = ({ handleLogout }) => {
  const { name } = useContext(NoteContext)

  return (
    <div className='navbar'>
      <NavLink to='/authors'>Authors</NavLink>
      <NavLink to='/books'>Books</NavLink>
      <Hidable showOn='loggedIn'>
        <NavLink to='/addBook'>Add Book</NavLink>
        <NavLink to='/recommend'>Recommend</NavLink>
        <span>{name} logged in</span>
        <Link onClick={handleLogout}>logout</Link>
      </Hidable>
      <Hidable showOn='loggedOut'>
        <NavLink to='/login'>Login</NavLink>
      </Hidable>
    </div>
  )
}

export default Nav
