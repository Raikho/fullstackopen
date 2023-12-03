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
	},
})

const { setBlogs, appendBlog, replaceBlog, deleteBlog } = blogs.actions

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

export default blogs.reducer
