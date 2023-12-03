import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		set(state, action) {
			return action.payload
		},
	},
})

const { set } = user.actions

export const setUser = user => {
	return dispatch => {
		dispatch(set(user))
	}
}

export const removeUser = () => {
	return dispatch => {
		dispatch(set(null))
	}
}

export default user.reducer
