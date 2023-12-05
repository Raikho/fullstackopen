import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
	const blogs = useSelector(state => state.blogs)

	const sortedBlogs = blogs.toSorted((a, b) => {
		if (a.likes < b.likes) return 1
		else if (a.likes > b.likes) return -1
		return 0
	})

	return (
		<ul className='blog-container'>
			{sortedBlogs.map(blog => (
				<li key={blog.id} className='blogItem'>
					<Link to={`/blogs/${blog.id}`}>
						{blog.title} ({blog.author})
					</Link>
				</li>
			))}
		</ul>
	)
}

export default BlogList
