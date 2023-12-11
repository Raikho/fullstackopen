import { useContext } from 'react'
import { NoteContext } from '../App'

import { useField } from '../hooks'

const LoginForm = ({ setToken }) => {
  const username = useField('text')
  const password = useField('text') // todo: change to pass

  const { setNote } = useContext(NoteContext)

  const handleLogin = event => {
    event.preventDefault()
    setNote('logging in...')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input {...username.atts} />
      </div>
      <div>
        password:
        <input {...password.atts} />
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm
