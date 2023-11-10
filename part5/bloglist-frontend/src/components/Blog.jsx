import Toggleable from './Toggleable'

const Blog = ({ blog, user, handleUpdateBlog, handleRemoveBlog }) => {
	const likeBlog = () => {
		const updatedBlog = { ...blog, likes: blog.likes + 1 }
		handleUpdateBlog(updatedBlog)
	}

	const removeBlog = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
			handleRemoveBlog(blog)
	}

	return (
		<li className='blog'>
			<span>{blog.title}</span>
			<span> </span>
			<span>{blog.author}</span>
			<Toggleable showText='view' hideText='hide'>
				<div>{blog.url}</div>
				<div>
					likes {blog.likes}
					<button onClick={likeBlog}>like</button>
				</div>
				<div>{blog.user.username}</div>
				{(user.username === blog.user.username) ?
					<button className='remove' onClick={removeBlog}>remove</button> :
					null
				}
			</Toggleable>
		</li>
	)
}

export default Blog