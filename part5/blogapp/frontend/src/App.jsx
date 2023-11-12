import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import storage from './services/storage'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogHeader from './components/BlogHeader'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState({ status: 'clear', text: ''})
	const blogFormRef = useRef()

	useEffect(() => {
		const item = storage.load('loggedBlogappUser')
		if (item) {
			setUser(item)
			blogService.setToken(item.token)
		}

		blogService
			.getAll()
			.then(blogs => setBlogs(blogs))
	}, [])

	const handleLogin = async (username, password) => {
		try {
			const user = await loginService.login({
				username,
				password,
			})
			console.log('current user received is', user)
			setUser(user)
			blogService.setToken(user.token)
			storage.save('loggedBlogappUser', user) // undo
			sendTempMessage('success', `User ${user.username} successfully logged in`)
		}
		catch (exception) {
			sendTempMessage('error', 'wrong username or password')
			console.log('ERROR: ', exception.message)
		}
	}

	const sendTempMessage = (status, text) => {
		setMessage({ status, text })
		setTimeout(() => setMessage({ status: 'clear', text: '' }), 3000)
	}

	const handleLogout = () => {
		storage.remove('loggedBlogappUser')
		setUser(null)
	}

	const addBlog = async blogObject => {
		try {
			const blog = await blogService.create(blogObject)
			console.log('created blog:', blog)
			setBlogs(blogs.concat({ ...blog, user }))
			sendTempMessage('success', `a new blog "${blog.title}" by ${blog.author} added`)
			blogFormRef.current.toggleVisibility()
		}
		catch (exception) {
			sendTempMessage('error', `blog was not able to be added, ${exception.message}`)
			console.log('ERROR: ', exception.message)
		}
	}

	const updateBlog = async blogObject => {
		try {
			const blog = await blogService.update(blogObject)
			console.log('updated blog:', blog)
			setBlogs(blogs.map(b => (b.id !== blog.id) ? b : blogObject))
			sendTempMessage('success', `"${blog.title}" by ${blog.author} updated`)
		}
		catch (exception) {
			sendTempMessage('error', `blog was not able to be updated, ${exception.message}`)
			console.log('ERROR: ', exception.message)
		}
	}

	const removeBlog = async blogObject => {
		try {
			const id = blogObject.id
			await blogService.remove(id)
			console.log('removed blog', blogObject)
			setBlogs(blogs.filter(b => b.id !== id))
			sendTempMessage('success', `"${blogObject.title}" by ${blogObject.author} removed`)
		}
		catch (exception) {
			sendTempMessage('error', `blog was not able to be remove, ${exception.message}`)
			console.log('ERROR: ', exception.message)
		}
	}

	return (
		<div>
			<Notification message={message} />
			{
				(user === null) ?
					<LoginForm handleLogin={handleLogin} /> :
					<div>
						<BlogHeader
							nameOfUser={user.name}
							handleLogout={handleLogout}
						/>
						<Toggleable showText='create new blog' ref={blogFormRef}>
							<BlogForm handleAddBlog={addBlog}/>
						</Toggleable>
						<br />
						<br />
						<BlogList
							blogs={blogs}
							user={user}
							handleUpdateBlog={updateBlog}
							handleRemoveBlog={removeBlog}
						/>
					</div>
			}
		</div>
	)
}

export default App