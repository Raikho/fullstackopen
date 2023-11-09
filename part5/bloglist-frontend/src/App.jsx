import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import storage from './services/storage'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogHeader from './components/BlogHeader'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState({ status: 'clear', text: ''})

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
      sendTempMessage('success', `User ${user.username} successfully logged in`)
    } catch (exception) {
      sendTempMessage('error', `wrong username or password`)
      console.log('ERROR: ', exception.message)
    }
  }

  const sendTempMessage = (status, text) => {
    setMessage({ status, text })
    setTimeout(() => setMessage({ status: 'clear', text: '' }), 3000)
  }

  const handleLogout = () => {
    storage.remove('loggedBlogappUser')
    setUser(null)
  }

  const handleAddBlog = async event => {
    event.preventDefault()

    try {
      const obj = { title, author, url }
      const blog = await blogService.create(obj)
      setBlogs(blogs.concat(blog))
      sendTempMessage('success', `a new blog "${blog.title}" by ${author} added`)
    } catch (exception) {
      sendTempMessage('error', `blog was not able to be added, ${exception.message}`)
      console.log('ERROR: ', exception.message)
    }
  }

  return (
    <div>
      <Notification message={message} />
      {
        (user === null) ?
        <LoginForm
          handleSubmit={handleLogin}
          username={username}
          handleUsernameChange={setUsername}
          password={password}
          handlePasswordChange={setPassword}
        /> :
        <div>
          <BlogHeader
            nameOfUser={user.name}
            handleLogout={handleLogout}
          />
          <Toggleable showText='new blog'>
            <BlogForm
              handleSubmit={handleAddBlog}
              title={title}
              handleChangeTitle={setTitle}
              author={author}
              handleChangeAuthor={setAuthor}
              url={url}
              handleChangeUrl={setUrl}
            />
          </Toggleable>
          <BlogList blogs={blogs} />
        </div>
      }
    </div>
  )
}

export default App