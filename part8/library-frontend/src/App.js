import { useState } from 'react'
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

const App = () => {
  return (
    <Router>
      <div className='navbar'>
        <NavLink to='/authors'>Authors</NavLink>
        <NavLink to='/books'>Books</NavLink>
        <NavLink to='/addBook'>Add Book</NavLink>
      </div>
      <Routes>
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/addBook' element={<NewBook />} />
      </Routes>
    </Router>
  )
}

export default App
