import { useEffect, useRef } from 'react'
import { setNotification as setNote } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, updateBlog, removeBlog } from './reducers/blogReducer'
import { setUser, removeUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

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
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const blogFormRef = useRef()

	useEffect(() => {
		const item = storage.load('loggedBlogappUser')
		if (item) {
			dispatch(setUser(item))
			blogService.setToken(item.token)
		}

		dispatch(initializeBlogs())
	}, [])

	const handleLogin = async (username, password) => {
		try {
			const user = await loginService.login({ username, password })
			blogService.setToken(user.token)
			storage.save('loggedBlogappUser', user)

			dispatch(setUser(user))
			dispatch(setNote('success', `User ${user.username} successfully logged in`))
		} catch (exception) {
			dispatch(setNote('error', 'wrong username or password'))
		}
	}

	const handleLogout = () => {
		storage.remove('loggedBlogappUser')
		dispatch(removeUser())
	}

	return (
		<div>
			<Notification />
			{user === null ? (
				<LoginForm handleLogin={handleLogin} />
			) : (
				<div>
					<BlogHeader handleLogout={handleLogout} />
					<BlogForm />
					<br />
					<br />
					<BlogList />
				</div>
			)}
		</div>
	)
}

export default App
