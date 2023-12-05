import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import storage from '../services/storage'

import { removeUser } from '../reducers/userReducer'
import { removeUserList } from '../reducers/userListReducer'

const BlogHeader = () => {
	const nameOfUser = useSelector(state => state.user.name)
	const dispatch = useDispatch()

	const handleLogout = () => {
		storage.remove('loggedBlogappUser')
		dispatch(removeUser())
		dispatch(removeUserList())
	}

	return (
		<div className='navBar'>
			<NavLink to='/' className='navLink'>
				Home
			</NavLink>
			<NavLink to='/users' className='navLink'>
				Users
			</NavLink>
			<NavLink to='/blogs' className='navLink'>
				Blogs
			</NavLink>
			<span>{nameOfUser} logged in</span>
			<button onClick={handleLogout} id='logout-button'>
				logout
			</button>
		</div>
	)
}

export default BlogHeader
