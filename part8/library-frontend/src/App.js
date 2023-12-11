import { useState, createContext, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom'
import './style.css'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import storage from './services/storage'
import { useApolloClient } from '@apollo/client'

export const NoteContext = createContext(null)

const App = () => {
  const [note, setNote] = useState('')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const t = storage.load('library-user-token')
    if (t) setToken(t)
  }, [token])

  const logout = () => {
    setToken(null)
    storage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <NoteContext.Provider value={{ note, setNote }}>
          <h2>Login</h2>
          <Notification />
          <LoginForm setToken={setToken} />
        </NoteContext.Provider>
      </div>
    )
  }

  return (
    <NoteContext.Provider value={{ note, setNote }}>
      <Router>
        <div className='navbar'>
          <NavLink to='/authors'>Authors</NavLink>
          <NavLink to='/books'>Books</NavLink>
          <NavLink to='/addBook'>Add Book</NavLink>
          <button onClick={logout}>logout</button>
        </div>
        <Notification />
        <Routes>
          <Route path='/' element={<Authors />} />
          <Route path='/authors' element={<Authors />} />
          <Route path='/books' element={<Books />} />
          <Route path='/addBook' element={<NewBook />} />
        </Routes>
      </Router>
    </NoteContext.Provider>
  )
}

export default App
