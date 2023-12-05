import Toggleable from './Toggleable'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification as setNote } from '../reducers/notificationReducer'
import { updateBlog, removeBlog } from '../reducers/blogReducer'

const BlogSummary = ({ blog }) => {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	const handleLikeBlog = async () => {
		const updatedBlog = { ...blog, likes: blog.likes + 1 }

		try {
			dispatch(updateBlog(updatedBlog, user))
			dispatch(setNote('success', `"${updatedBlog.title}" by ${updatedBlog.author} updated`))
		} catch (exception) {
			dispatch(setNote('error', `blog was not able to be updated, ${exception.message}`))
		}
	}

	const handleRemoveBlog = async () => {
		if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) return //handleRemoveBlog(blog)

		try {
			dispatch(removeBlog(blog))
			dispatch(setNote('success', `"${blog.title}" by ${blog.author} removed`))
		} catch (exception) {
			dispatch(setNote('error', `blog was not able to be remove, ${exception.message}`))
		}
	}

	return (
		<li className='blog'>
			<span>{blog.title}</span>
			<span> </span>
			<span>{blog.author}</span>
			<Toggleable showText='view' hideText='hide'>
				<div>{blog.url}</div>
				<div>
					<span>likes </span>
					<span className='likes'>{blog.likes}</span>
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
			</Toggleable>
		</li>
	)
}

export default BlogSummary
