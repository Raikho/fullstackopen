import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = ({ user, handleUpdateBlog, handleRemoveBlog }) => {
	const blogs = useSelector(state => state.blogs)

	const sortedBlogs = blogs.toSorted((a, b) => {
		if (a.likes < b.likes) return 1
		else if (a.likes > b.likes) return -1
		return 0
	})

	return (
		<ul className='blog-container'>
			{sortedBlogs.map(blog => (
				<Blog
					key={blog.id}
					blog={blog}
					user={user}
					handleUpdateBlog={handleUpdateBlog}
					handleRemoveBlog={handleRemoveBlog}
				/>
			))}
		</ul>
	)
}

export default BlogList
