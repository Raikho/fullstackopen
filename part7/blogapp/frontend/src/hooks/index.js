import { useState } from 'react'

export const useField = type => {
	const [value, setValue] = useState('')
	const onChange = event => setValue(event.target.value)
	const atts = { type, value, onChange }
	const reset = () => setValue('')
	return {
		atts,
		value,
		reset,
	}
}
