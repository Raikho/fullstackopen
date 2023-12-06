import { useSelector, useDispatch } from 'react-redux'
import { useParams, Navigate } from 'react-router-dom'
import { setNotification as setNote } from '../reducers/notificationReducer'
import { updateBlog, removeBlog, addComment } from '../reducers/blogReducer'
import { useField } from '../hooks'

const Blog = () => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
	const user = useSelector(state => state.user)
	const commentField = useField()

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

	const handleAddComment = () => {
		const commentObject = {
			blogId: blog.id,
			text: commentField.value,
		}
		dispatch(addComment(commentObject))
	}

	return (
		<li className='blog'>
			<h1>{blog.title}</h1>
			<span>by {blog.author}</span>
			<div>
				<a href={blog.url}>{blog.url}</a>
			</div>
			<div>
				<span className='likes'>{blog.likes} likes </span>
				<button onClick={handleLikeBlog} className='like-button'>
					like
				</button>
			</div>
			<div>added by {blog.user.username}</div>
			{user.username === blog.user.username ? (
				<button className='remove-button' onClick={handleRemoveBlog}>
					remove
				</button>
			) : null}
			<h1>comments</h1>
			<input {...commentField} />
			<button onClick={handleAddComment}>add Comments</button>
			{blog.comments ? (
				<ul>
					{blog.comments.map(c => (
						<li className='decorated' key={c.id}>
							{c.text}
						</li>
					))}
				</ul>
			) : null}
		</li>
	)
}

export default Blog
