import { useSelector, useDispatch } from 'react-redux'
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
		<div>
			<h1>blogs</h1>
			<div>
				{nameOfUser} logged in
				<br />
				<br />
				<button onClick={handleLogout} id='logout-button'>
					logout
				</button>
			</div>
			<br />
		</div>
	)
}

export default BlogHeader
