import { useDispatch } from 'react-redux'

import loginService from '../services/login'
import blogService from '../services/blogs'
import storage from '../services/storage'
import { setUser } from '../reducers/userReducer'
import { setNotification as setNote } from '../reducers/notificationReducer'
import { useField } from '../hooks'

import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
	const username = useField('text')
	const password = useField('text')
	const dispatch = useDispatch()

	const handleSubmit = event => {
		event.preventDefault()
		handleLogin(username.value, password.value)
		username.reset()
		password.reset()
	}

	const handleLogin = async (username, password) => {
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
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>username:</Form.Label>
					<Form.Control {...username.atts} />
					<Form.Label>password:</Form.Label>
					<Form.Control {...password.atts} />
					<Button variant='primary' type='submit'>
						login
					</Button>
				</Form.Group>
			</Form>
		</div>
	)
}

export default LoginForm
