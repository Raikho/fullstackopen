const Field = ({ name, type, value, handleChange }) => {
	return (
		<div>
			{name}:
			<input
				type={type || 'text'}
				value={value}
				name={name.charAt(0).toUpperCase() + name.slice(1)}
				onChange={({ target }) => handleChange(target.value)}
			/>
		</div>
	)
}

export default Field