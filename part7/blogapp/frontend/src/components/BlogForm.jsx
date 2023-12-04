import Field from './Field'
import Toggleable from './Toggleable'
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification as setNote } from '../reducers/notificationReducer'

const BlogForm = () => {
	const toggleRef = useRef()
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleSubmit = event => {
		event.preventDefault()
		handleAddBlog({ title, author, url })
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	const handleAddBlog = async blog => {
		try {
			dispatch(createBlog(blog, user))
			dispatch(setNote('success', `A new blog "${blog.title}" by ${blog.author} was added`))
			toggleRef.current.toggleVisibility()
		} catch (exception) {
			dispatch(setNote('error', `blog was not able to be added, ${exception.message}`))
		}
	}

	return (
		<Toggleable showText='create new blog' ref={toggleRef}>
			<div>
				<h1>create new blog</h1>
				<form onSubmit={handleSubmit}>
					<Field id='title-input' name='title' value={title} handleChange={setTitle} />
					<Field id='author-input' name='author' value={author} handleChange={setAuthor} />
					<Field id='url-input' name='url' value={url} handleChange={setUrl} />
					<button type='submit' id='create-button'>
						create
					</button>
				</form>
			</div>
		</Toggleable>
	)
}

export default BlogForm
