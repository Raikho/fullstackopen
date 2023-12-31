import { useState } from 'react'
import Field from './Field'

const BlogForm = ({ handleAddBlog }) => {
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

	return (
		<div>
			<h1>create new blog</h1>
			<form onSubmit={handleSubmit}>
				<Field
					id='title-input'
					name='title'
					value={title}
					handleChange={setTitle}
				/>
				<Field
					id='author-input'
					name='author'
					value={author}
					handleChange={setAuthor}
				/>
				<Field
					id='url-input'
					name='url'
					value={url}
					handleChange={setUrl}
				/>
				<button type='submit' id='create-button'>create</button>
			</form>
		</div>
	)
}

export default BlogForm