import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification as setNote } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, updateBlog as updateBlog2 } from './reducers/blogReducer'

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

		dispatch(initializeBlogs())
	}, [])

	const handleLogin = async (username, password) => {
		try {
			const user = await loginService.login({ username, password })
			console.log('current user received is', user) // debug
			setUser(user)
			blogService.setToken(user.token)
			storage.save('loggedBlogappUser', user) // undo
			dispatch(setNote('success', `User ${user.username} successfully logged in`))
		} catch (exception) {
			console.log('ERROR: ', exception.message) // debug
			dispatch(setNote('error', 'wrong username or password'))
		}
	}

	const handleLogout = () => {
		storage.remove('loggedBlogappUser')
		setUser(null)
	}

	const addBlog = async blog => {
		try {
			dispatch(createBlog(blog, user))
			dispatch(setNote('success', `A new blog "${blog.title}" by ${blog.author} was added`))
			blogFormRef.current.toggleVisibility()
		} catch (exception) {
			dispatch(setNote('error', `blog was not able to be added, ${exception.message}`))
		}
	}

	const updateBlog = async blog => {
		try {
			dispatch(updateBlog2(blog, user))
			dispatch(setNote('success', `"${blog.title}" by ${blog.author} updated`))
		} catch (exception) {
			dispatch(setNote('error', `blog was not able to be updated, ${exception.message}`))
		}
	}

	const removeBlog = async blogObject => {
		try {
			const id = blogObject.id
			await blogService.remove(id)
			console.log('removed blog', blogObject) // debug
			setBlogs(blogs.filter(b => b.id !== id)) // TODO: create action
			dispatch(setNote('success', `"${blogObject.title}" by ${blogObject.author} removed`))
		} catch (exception) {
			console.log('ERROR: ', exception.message) // debug
			dispatch(setNote('error', `blog was not able to be remove, ${exception.message}`))
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
					<BlogList user={user} handleUpdateBlog={updateBlog} handleRemoveBlog={removeBlog} />
				</div>
			)}
		</div>
	)
}

export default App
