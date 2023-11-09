import Blog from './Blog'

const BlogList = ({ 
  blogs,
  user,
  handleUpdateBlog, 
  handleRemoveBlog, 
}) => {
  const sortedBlogs = blogs.toSorted((a, b) => {
    if (a.likes < b.likes) return 1
    else if (a.likes > b.likes) return -1
    return 0
  })
  
  return (
    <div>
      {sortedBlogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleUpdateBlog={handleUpdateBlog}
          handleRemoveBlog={handleRemoveBlog}
        />))}
    </div>
  )
}

export default BlogList