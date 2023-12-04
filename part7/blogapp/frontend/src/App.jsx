import { useEffect } from 'react'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, removeUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import blogService from './services/blogs'
import storage from './services/storage'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogHeader from './components/BlogHeader'
import BlogList from './components/BlogList'
import Notification from './components/Notification'

const App = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	useEffect(() => {
		const item = storage.load('loggedBlogappUser')
		if (item) {
			dispatch(setUser(item))
			blogService.setToken(item.token)
		}

		dispatch(initializeBlogs())
	}, [])

	return (
		<div>
			<Notification />
			{user === null ? (
				<LoginForm />
			) : (
				<div>
					<BlogHeader />
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
