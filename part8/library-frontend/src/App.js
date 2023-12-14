import { useState, createContext, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
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
import Nav from './components/Nav'

export const NoteContext = createContext(null)

const App = () => {
  const [note, setNote] = useState('')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    console.log('token is changed to', token)
    const t = storage.load('library-user-token')
    if (t) setToken(t)
  }, [token])

  const logout = () => {
    setToken(null)
    storage.clear()
    client.resetStore()
  }

  return (
    <NoteContext.Provider value={{ note, setNote, token, setToken }}>
      <Router>
        <Nav handleLogout={logout} />
        <Notification />
        <Routes>
          <Route path='/' element={<Authors />} />
          <Route path='/authors' element={<Authors />} />
          <Route path='/books' element={<Books />} />
          <Route path='/addBook' element={<NewBook />} />
          <Route path='/login' element={<LoginForm />} />
        </Routes>
      </Router>
    </NoteContext.Provider>
  )
}

export default App
