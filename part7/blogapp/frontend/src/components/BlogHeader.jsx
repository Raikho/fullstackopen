import Blog from './Blog'

const BlogHeader = ({ nameOfUser, handleLogout }) => {
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
