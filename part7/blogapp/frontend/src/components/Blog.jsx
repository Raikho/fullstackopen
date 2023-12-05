import { useSelector, useDispatch } from 'react-redux'
import { useParams, Navigate } from 'react-router-dom'
import { setNotification as setNote } from '../reducers/notificationReducer'
import { updateBlog, removeBlog } from '../reducers/blogReducer'

const Blog = () => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
	const user = useSelector(state => state.user)

	if (!blog) return <Navigate replace to='/blogs' />

	const handleLikeBlog = () => {
		const updatedBlog = { ...blog, likes: blog.likes + 1 }
		try {
			dispatch(updateBlog(updatedBlog, user))
			dispatch(setNote('success', `"${updatedBlog.title}" by ${updatedBlog.author} updated`))
		} catch (exception) {
			dispatch(setNote('error', `blog was not able to be updated, ${exception.message}`))
		}
	}

	const handleRemoveBlog = () => {
		if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) return //handleRemoveBlog(blog)
		try {
			dispatch(removeBlog(blog))
			dispatch(setNote('success', `"${blog.title}" by ${blog.author} removed`))
		} catch (exception) {
			dispatch(setNote('error', `blog was not able to be remove, ${exception.message}`))
		}
	}

	const { title, author, url, likes } = blog

	return (
		<li className='blog'>
			<span>{title}</span> <span> </span>
			<span>{author}</span>
			<div>{url}</div>
			<div>
				<span>likes </span>
				<span className='likes'>{likes}</span>
				<button onClick={handleLikeBlog} className='like-button'>
					like
				</button>
			</div>
			<div>{blog.user.username}</div>
			{user.username === blog.user.username ? (
				<button className='remove-button' onClick={handleRemoveBlog}>
					remove
				</button>
			) : null}
		</li>
	)
}

export default Blog
