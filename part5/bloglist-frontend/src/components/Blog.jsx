import Toggleable from "./Toggleable"

const Blog = ({ blog, user, handleUpdateBlog, handleRemoveBlog }) => {
  const blogStyle = {
    padding: '5px',
    border: '1px solid black',
    margin: '5px',
  }
  const removeStyle = {
    backgroundColor: 'slateblue',
    color: 'white',
    borderRadius: '4px',
  }

  const likeBlog = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    handleUpdateBlog(updatedBlog)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      handleRemoveBlog(blog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Toggleable showText='view' hideText='hide'>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} 
          <button onClick={likeBlog}>like</button>
        </div>
        <div>{blog.user.username}</div>
        {(user.username === blog.user.username) ? 
          <button style={removeStyle} onClick={removeBlog}>remove</button> :
          null
        }
      </Toggleable>
    </div>  
  )
}

export default Blog