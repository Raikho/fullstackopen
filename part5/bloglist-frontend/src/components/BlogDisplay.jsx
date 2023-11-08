import Blog from './Blog'

const BlogDisplay = ({ nameOfUser, blogs }) => {
	return (
		<div>
			<h1>blogs</h1>
			<div>{nameOfUser} logged in</div>
			<br />
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