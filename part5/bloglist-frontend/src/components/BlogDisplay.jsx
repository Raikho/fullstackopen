import Blog from './Blog'

const BlogDisplay = ({ nameOfUser, blogs, handleLogout, children }) => {
	return (
		<div>
			<h1>blogs</h1>
			<div>
				{nameOfUser} logged in
				<button onClick={handleLogout}>logout</button>
			</div>
			<br />
			{children}
			{blogs.map(blog => (
				<Blog 
					key={blog.id}
					blog={blog}
				/>
			))}
		</div>
	)
}

export default BlogDisplay