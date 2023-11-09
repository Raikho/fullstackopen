import Toggleable from "./Toggleable"

const Blog = ({ blog, handleUpdateBlog }) => {
  const blogStyle = {
    padding: '5px',
    border: '1px solid black',
    margin: '5px',
  }

  const likeBlog = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    handleUpdateBlog(updatedBlog)
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
      </Toggleable>
    </div>  
  )
}

export default Blog