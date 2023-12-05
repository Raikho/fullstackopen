import { useEffect } from 'react'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import blogService from './services/blogs'
import storage from './services/storage'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogHeader from './components/BlogHeader'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/userList'
import User from './components/User'
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
		<Router>
			<Notification />

			{user === null ? (
				<LoginForm />
			) : (
				<>
					<BlogHeader />
					<h1>blog app</h1>
					<Routes>
						<Route path='/' element={<BlogList />} />
						<Route path='/users' element={<UserList />} />
						<Route path='/users/:id' element={<User />} />
						<Route
							path='/blogs'
							element={
								<>
									<BlogForm />
									<BlogList />
								</>
							}
						/>
						<Route path='/blogs/:id' element={<Blog />} />
					</Routes>
				</>
			)}
		</Router>
	)
}

export default App
