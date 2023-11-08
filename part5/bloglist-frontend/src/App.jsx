import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogDisplay from './components/BlogDisplay'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ 
        username,
        password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('successfully logged in') // debug
      console.log(user) // debug
    } catch (exception) {
      console.log('ERROR: ', exception.message) // debug
    }
  }

  const addBlog = () => {
    console.log('adding blog...')
  }

  const blogForm = () => (
    <div>
      <div>logged in as {user.username}</div>
      <form onSubmit={addBlog}>
        <div>
          Blog Title
          <input
            type='text'
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <button type='submit'>save</button>
      </form>
    </div>
  )

  return (
    <div>
      {
        (user === null) ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        /> :
        <BlogDisplay 
          nameOfUser={user.name}
          blogs={blogs}
        />
      }
    </div>
  )
}

export default App