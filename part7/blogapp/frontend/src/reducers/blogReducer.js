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
			state.append(action.payload)
		},
		replaceBlog(state, action) {
			const newBlog = action.payload
			return state.map(b => (b.id === newBlog.id ? newBlog : b))
		},
	},
})

const { setBlogs, appendBlog, replaceBlog } = blogs.actions

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

export default blogs.reducer
