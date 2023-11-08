import Field from "./Field"

const BlogForm = ({ handleAddBlog }) => {
	return (
		<div>
			<h1>create new</h1>
      <form onSubmit={ handleAddBlog }>
        <div>
          Blog Title
          <Field 
            name='Title'
          />
          <input
            type='text'
            value={'a'}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <button type='submit'>save</button>
      </form>
		</div>
	)
}

export default BlogForm