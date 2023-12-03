import { useSelector } from 'react-redux'

const BlogHeader = ({ handleLogout }) => {
	const nameOfUser = useSelector(state => state.user.name)

	return (
		<div>
			<h1>blogs</h1>
			<div>
				{nameOfUser} logged in
				<button onClick={handleLogout} id='logout-button'>
					logout
				</button>
			</div>
			<br />
		</div>
	)
}

export default BlogHeader
