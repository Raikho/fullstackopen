import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userList = createSlice({
	name: 'userList',
	initialState: [],
	reducers: {
		setUserList(state, action) {
			return action.payload
		},
	},
})

const { setUserList } = userList.actions

export const initializeUsersList = () => {
	return async dispatch => {
		const users = await userService.getAll()
		dispatch(setUserList(users))
	}
}

export const removeUserList = () => {
	return dispatch => {
		dispatch(setUserList([]))
	}
}

export default userList.reducer
