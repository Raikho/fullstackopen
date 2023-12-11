import { useState, createContext } from 'react'
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

export const NoteContext = createContext(null)

const App = () => {
  const [note, setNote] = useState('')
  const [token, setToken] = useState(null)
  console.log('running')
  if (!token) {
    return (
      <div>
        <NoteContext.Provider value={{ note, setNote }}>
          <h2>login</h2>
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
        </div>
        <Notification />
        <Routes>
          <Route path='/authors' element={<Authors />} />
          <Route path='/books' element={<Books />} />
          <Route path='/addBook' element={<NewBook />} />
        </Routes>
      </Router>
    </NoteContext.Provider>
  )
}

export default App
