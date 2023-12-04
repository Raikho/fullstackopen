import Field from './Field'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import loginService from '../services/login'
import blogService from '../services/blogs'
import storage from '../services/storage'
import { setUser } from '../reducers/userReducer'
import { setNotification as setNote } from '../reducers/notificationReducer'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()

	const handleSubmit = event => {
		event.preventDefault()
		handleLogin(username, password)
		setUsername('')
		setPassword('')
	}

	const handleLogin = async () => {
		try {
			const user = await loginService.login({ username, password })
			blogService.setToken(user.token)
			storage.save('loggedBlogappUser', user)

			dispatch(setUser(user))
			dispatch(setNote('success', `User ${user.username} successfully logged in`))
		} catch (exception) {
			dispatch(setNote('error', 'Failed to login with username and password'))
			console.log(`LOGIN ERROR: ${exception}`)
		}
	}

	return (
		<div>
			<h1>log in to application</h1>
			<form onSubmit={handleSubmit}>
				<Field name='username' id='username' value={username} handleChange={setUsername} />
				<Field
					name='password'
					id='password'
					type='password'
					value={password}
					handleChange={setPassword}
				/>
				<button id='login-button' type='submit'>
					login
				</button>
			</form>
		</div>
	)
}

export default LoginForm
