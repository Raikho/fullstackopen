import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

const store = configureStore({
	reducer: {
		blogs: blogReducer,
		notification: notificationReducer,
	},
})

store.subscribe(() => console.log('updated state: ', store.getState())) // debug

export default store
