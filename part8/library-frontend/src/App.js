import { useState, createContext, useEffect } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './style.css'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import storage from './services/storage'
import Nav from './components/Nav'
import { USER_INFO } from './queries'

export const NoteContext = createContext(null)

const App = () => {
  const [note, setNote] = useState('')
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const contextValues = { note, setNote, token, setToken, username, name }

  const client = useApolloClient()
  const userResult = useQuery(USER_INFO)

  useEffect(() => {
    const setupToken = async () => {
      const storedToken = storage.load('library-user-token')
      if (storedToken) {
        setToken(storedToken)
        await client.refetchQueries({ include: [USER_INFO] })
      }
    }
    setupToken()
  }, [token, client])

  useEffect(() => {
    if (!userResult || !userResult.data || !userResult.data.me) return
    setUsername(userResult.data.me.username)
    setName(userResult.data.me.name)
  }, [userResult])

  const logout = () => {
    setToken(null)
    storage.clear()
    client.resetStore()
    setUsername('')
    setName('')
  }

  return (
    <NoteContext.Provider value={contextValues}>
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
