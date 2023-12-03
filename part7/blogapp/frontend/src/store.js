import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
	reducer: {
		user: userReducer,
		blogs: blogReducer,
		notification: notificationReducer,
	},
})

console.log('initial state: ', store.getState())
store.subscribe(() => console.log('updated state: ', store.getState())) // debug

export default store
