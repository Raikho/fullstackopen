import { useState } from "react"
import Field from "./Field"

const LoginForm = ({ handleLogin }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = event => {
		event.preventDefault()
		handleLogin(username, password)
		setUsername('')
		setPassword('')
	}

	return (
	  <div>
		<h1>log in to application</h1>
		<form onSubmit={handleSubmit}>
			<Field 
				name='username'
				value={username}
				handleChange={setUsername}
			/>
			<Field 
				name='password'
				type='password'
				value={password}
				handleChange={setPassword}
			/>
		  <button type="submit">login</button>
		</form>
	  </div>
	)
  }

export default LoginForm