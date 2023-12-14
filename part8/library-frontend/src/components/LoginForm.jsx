import { useContext, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { NoteContext } from '../App'
import { LOGIN } from '../queries'
import { useField } from '../hooks'
import storage from '../services/storage'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('text') // todo: change to pass
  const navigate = useNavigate()

  const { setNote, token, setToken } = useContext(NoteContext)
  const [login, result] = useMutation(LOGIN, {
    onError: error =>
      setNote(error.graphQLErrors.map(e => e.message).join('\n')),
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      // TODO: add and set name and username values
      setToken(token)
      console.log('login completed!', token)
      storage.save('library-user-token', token)
      navigate('/')
    }
  }, [result.data])

  const handleLogin = async event => {
    event.preventDefault()

    console.log(`logging in with ${username.value}, ${password.value}`)
    login({
      variables: {
        // TODO: restore
        username: 'bob_smith',
        password: '1234',
        // username: username.value,
        // password: password.value,
      },
    })
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
