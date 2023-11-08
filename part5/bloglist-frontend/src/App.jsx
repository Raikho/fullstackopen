import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import storage from './services/storage'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogDisplay from './components/BlogDisplay'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')

  const USERNAME = 'bob_smith' // debug
  const PASSWORD = 'bob_smith_1234' // debug
 
  useEffect(() => {
    const item = storage.load('loggedBlogappUser')
    if (item) {
      setUser(item)
      blogService.setToken(item.token)
    }
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ 
        username: USERNAME, // debug
        password: PASSWORD, // debug
      })
      setUser(user)
      storage.save('loggedBlogappUser', user)
      setUsername('')
      setPassword('')
      console.log('successfully logged in')
    } catch (exception) {
      console.log('ERROR: ', exception.message)
    }
  }

  const handleLogout = () => {
    storage.remove('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = () => {
    console.log('adding blog...')
  }

  const blogForm = () => (
    <div>
      <div>logged in as {user.username}</div>
    </div>
  )

  return (
    <div>
      {
        (user === null) ?
        <LoginForm
          handleSubmit={handleLogin}
          username={username}
          handleUsernameChange={setUsername}
          password={password}
          handlePasswordChange={setPassword}
        /> :
        <BlogDisplay 
          nameOfUser={user.name}
          blogs={blogs}
          handleLogout={handleLogout}
        />
      }
      <BlogForm />
    </div>
  )
}

export default App