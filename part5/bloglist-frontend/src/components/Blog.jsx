import Toggleable from "./Toggleable"

const Blog = ({ blog }) => {
  const blogStyle = {
    padding: '5px',
    border: '1px solid black',
    margin: '5px',
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Toggleable showText='view' hideText='hide'>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} 
          <button onClick={() => {}}>like</button>
        </div>
        <div>{blog.user.username}</div>
      </Toggleable>
    </div>  
  )
}

export default Blog