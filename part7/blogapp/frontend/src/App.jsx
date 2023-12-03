import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification as setNote } from './reducers/notificationReducer'

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
	const [message, setMessage] = useState({ status: 'clear', text: '' })
	const blogFormRef = useRef()

	const dispatch = useDispatch()

	useEffect(() => {
		const item = storage.load('loggedBlogappUser')
		if (item) {
			setUser(item)
			blogService.setToken(item.token)
		}

		blogService //
			.getAll()
			.then(blogs => setBlogs(blogs))
	}, [])

	const handleLogin = async (username, password) => {
		try {
			const user = await loginService.login({ username, password })
			console.log('current user received is', user) // debug
			setUser(user)
			blogService.setToken(user.token)
			storage.save('loggedBlogappUser', user) // undo
			dispatch(setNote('success', `User ${user.username} successfully logged in`, 3))
		} catch (exception) {
			console.log('ERROR: ', exception.message) // debug
			dispatch(setNote('error', 'wrong username or password', 3))
		}
	}

	const handleLogout = () => {
		storage.remove('loggedBlogappUser')
		setUser(null)
	}

	const addBlog = async blogObject => {
		try {
			const blog = await blogService.create(blogObject)
			console.log('created blog:', blog) // debug
			setBlogs(blogs.concat({ ...blog, user }))
			dispatch(setNote('success', `a new blog "${blog.title}" by ${blog.author} added`, 3))
			blogFormRef.current.toggleVisibility()
		} catch (exception) {
			console.log('ERROR: ', exception.message) // debug
			dispatch(setNote('error', `blog was not able to be added, ${exception.message}`, 3))
		}
	}

	const updateBlog = async blogObject => {
		try {
			const blog = await blogService.update(blogObject)
			console.log('updated blog:', blog) // debug
			setBlogs(blogs.map(b => (b.id !== blog.id ? b : blogObject)))
			dispatch(setNote('success', `"${blog.title}" by ${blog.author} updated`, 3))
		} catch (exception) {
			console.log('ERROR: ', exception.message) // debug
			dispatch(setNote('error', `blog was not able to be updated, ${exception.message}`, 3))
		}
	}

	const removeBlog = async blogObject => {
		try {
			const id = blogObject.id
			await blogService.remove(id)
			console.log('removed blog', blogObject) // debug
			setBlogs(blogs.filter(b => b.id !== id))
			dispatch(setNote('success', `"${blogObject.title}" by ${blogObject.author} removed`, 3))
		} catch (exception) {
			console.log('ERROR: ', exception.message) // debug
			dispatch(setNote('error', `blog was not able to be remove, ${exception.message}`, 3))
		}
	}

	return (
		<div>
			<Notification message={message} />
			{user === null ? (
				<LoginForm handleLogin={handleLogin} />
			) : (
				<div>
					<BlogHeader nameOfUser={user.name} handleLogout={handleLogout} />
					<Toggleable showText='create new blog' ref={blogFormRef}>
						<BlogForm handleAddBlog={addBlog} />
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
			)}
		</div>
	)
}

export default App
