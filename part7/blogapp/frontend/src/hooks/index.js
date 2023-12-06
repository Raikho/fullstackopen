import { useState } from 'react'

export const useField = type => {
	const [value, setvalue] = useState('')
	const onChange = event => setvalue(event.target.value)
	return {
		type,
		value,
		onChange,
	}
}
