import { useState } from 'react'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const atts = {
    type,
    value,
    onChange,
  }

  const adjustedValue = type === 'number' ? Number(value) : value

  return { atts, reset, value: adjustedValue }
}

export const resetFields = arr => arr.forEach(i => i.reset())
