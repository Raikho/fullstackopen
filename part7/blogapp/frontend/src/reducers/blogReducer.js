import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogs = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload
		},
	},
})

const { setBlogs } = blogs.actions

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export default blogs.reducer
