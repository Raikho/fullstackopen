import { createSlice } from '@reduxjs/toolkit'

const notification = createSlice({
	name: 'notification',
	initialState: { message: '', status: 'hidden' },
	reducers: {
		setMessage(state, action) {
			return { ...state, message: action.payload }
		},
		setStatus(state, action) {
			return { ...state, status: action.payload }
		},
	},
})

const { setMessage, setStatus } = notification.actions

export const setNotification = (status, msg, seconds = 3) => {
	return async dispatch => {
		dispatch(setMessage(msg))
		dispatch(setStatus(status))
		setTimeout(() => dispatch(setStatus('hidden')), seconds * 1000)
	}
}

export default notification.reducer
