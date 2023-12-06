import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink, useLocation } from 'react-router-dom'
import storage from '../services/storage'
import { Navbar, Nav, Button } from 'react-bootstrap'

import { removeUser } from '../reducers/userReducer'
import { removeUserList } from '../reducers/userListReducer'

const BlogHeader = () => {
	const nameOfUser = useSelector(state => state.user.name)
	const dispatch = useDispatch()
	const beginningPath = '/' + useLocation().pathname.split('/')[1]

	const handleLogout = () => {
		storage.remove('loggedBlogappUser')
		dispatch(removeUser())
		dispatch(removeUserList())
	}

	return (
		<Navbar collapseOnSelect expand='sm' bg='dark' variant='dark'>
			<Navbar.Brand>BlogApp</Navbar.Brand>
			<Navbar.Toggle aria-controls='responsive-navbar-nav' />
			<Navbar.Collapse id='responsive-navbar-nav'>
				<Nav variant='underline' activeKey={beginningPath}>
					<Nav.Item>
						<Nav.Link href='/'>Home</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href='/users'>Users</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href='/blogs'>Blogs</Nav.Link>
					</Nav.Item>
					<Navbar.Text>{nameOfUser} logged in</Navbar.Text>
					<Button variant='secondary' size='sm' onClick={handleLogout} id='logout-button'>
						logout
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default BlogHeader
