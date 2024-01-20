import { useState, createContext, useEffect } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './style.css'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import storage from './services/storage'
import Nav from './components/Nav'
import Recommend from './components/Recommend'
import { USER_INFO, AUTHOR_ADDED, BOOK_ADDED } from './queries'

export const NoteContext = createContext(null)
const clearedUser = { name: '', username: '', favoriteGenre: '' }

const App = () => {
  const [note, setNote] = useState('')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(clearedUser)
  const contextValues = { note, setNote, token, setToken, user, setUser }

  const client = useApolloClient()
  const userResult = useQuery(USER_INFO)
  useSubscription(AUTHOR_ADDED, {
    onData: ({ data }) => {
      console.log('subscription: author added: ', data) // debug
    },
  })
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log('subscription: book added: ', data) // debug
    },
  })

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
    setUser(userResult.data.me)
    console.log('user:', userResult.data.me) // debug
  }, [userResult])

  const logout = () => {
    setToken(null)
    storage.clear()
    client.resetStore()
    setUser(clearedUser)
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
          <Route path='/recommend' element={<Recommend />} />
          <Route path='/addBook' element={<NewBook />} />
          <Route path='/login' element={<LoginForm />} />
        </Routes>
      </Router>
    </NoteContext.Provider>
  )
}

export default App
