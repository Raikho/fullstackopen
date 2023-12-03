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
			state.push(action.payload)
		},
	},
})

const { setBlogs, appendBlog } = blogs.actions

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

export default blogs.reducer
