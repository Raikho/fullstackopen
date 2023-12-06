import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogs = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload
		},
		appendBlog(state, action) {
			return state.concat(action.payload)
		},
		replaceBlog(state, action) {
			const newBlog = action.payload
			return state.map(b => (b.id === newBlog.id ? newBlog : b))
		},
		deleteBlog(state, action) {
			const removedBlog = action.payload
			return state.filter(b => b.id !== removedBlog.id)
		},
		appendComment(state, action) {
			const comment = action.payload
			const blog = state.find(b => b.id === comment.blog)
			const updatedBlog = { ...blog, comments: blog.comments.concat(comment) }
			return state.map(b => (b.id === updatedBlog.id ? updatedBlog : b))
		},
		deleteComment(state, action) {
			const removedComment = action.payload
			const blog = state.find(b => b.id === removedComment.blog)
			const updatedBlog = {
				...blog,
				comments: blog.comments.filter(c => c.id !== removedComment.id),
			}
			return state.map(b => (b.id === updatedBlog.id ? updatedBlog : b))
		},
	},
})

const { setBlogs, appendBlog, replaceBlog, deleteBlog, appendComment, deleteComment } =
	blogs.actions

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const createBlog = (blogObject, user) => {
	return async dispatch => {
		const newBlog = await blogService.create(blogObject)
		dispatch(appendBlog({ ...newBlog, user }))
	}
}

export const updateBlog = (blogObject, user) => {
	return async dispatch => {
		const updatedBlog = await blogService.update(blogObject)
		dispatch(replaceBlog({ ...updatedBlog, user }))
	}
}

export const removeBlog = blogObject => {
	return async dispatch => {
		await blogService.remove(blogObject.id)
		dispatch(deleteBlog(blogObject))
	}
}

export const addComment = commentObject => {
	return async dispatch => {
		const comment = await blogService.addComment(commentObject)
		dispatch(appendComment(comment))
	}
}

export const removeComment = commentObject => {
	return async dispatch => {
		await blogService.removeComment(commentObject)
		dispatch(deleteComment(commentObject))
	}
}

export default blogs.reducer
