import Field from "./Field"

const LoginForm = ({
	handleSubmit,
	handleUsernameChange,
	handlePasswordChange,
	username,
	password,
}) => {
	return (
	  <div>
		<h1>log in to application</h1>
		<form onSubmit={handleSubmit}>
			<Field 
				name='username'
				value={username}
				handleChange={handleUsernameChange}
			/>
			<Field 
				name='password'
				type='password'
				value={password}
				handleChange={handlePasswordChange}
			/>
		  <button type="submit">login</button>
		</form>
	  </div>
	)
  }

export default LoginForm