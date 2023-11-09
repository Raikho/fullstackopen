import Field from "./Field"

const BlogForm = ({ 
  handleSubmit,
  url,
  title,
  author,
  handleChangeUrl,
  handleChangeTitle,
  handleChangeAuthor,
}) => {
	return (
		<div>
			<h1>create new blog</h1>
      <form onSubmit={handleSubmit}>
        <Field 
          name='Title'
          value={title}
          handleChange={handleChangeTitle}
        />
        <Field 
          name='author'
          value={author}
          handleChange={handleChangeAuthor}
        />
        <Field 
          name='url'
          value={url}
          handleChange={handleChangeUrl}
        />
        <button type='submit'>create</button>
      </form>
		</div>
	)
}

export default BlogForm