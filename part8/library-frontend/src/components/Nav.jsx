import { NavLink, Link, useNavigate } from 'react-router-dom'
import Hidable from './Hidable'
import { NoteContext } from '../App'
import { useContext } from 'react'

const Nav = ({ handleLogout }) => {
  const { user } = useContext(NoteContext)
  const navigate = useNavigate()

  return (
    <div className='navbar'>
      <NavLink to='/authors'>Authors</NavLink>
      <NavLink to='/books'>Books</NavLink>
      <Hidable showOn='loggedIn'>
        <NavLink to='/addBook'>Add Book</NavLink>
        <NavLink to='/recommend'>Recommend</NavLink>
        <span>{user.name} logged in</span>
        <button
          onClick={() => {
            handleLogout()
            navigate('/')
          }}
        >
          logout
        </button>
      </Hidable>
      <Hidable showOn='loggedOut'>
        <NavLink to='/login'>Login</NavLink>
      </Hidable>
    </div>
  )
}

export default Nav
