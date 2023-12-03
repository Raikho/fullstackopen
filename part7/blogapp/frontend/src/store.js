import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
	reducer: {
		notification: notificationReducer,
	},
})

store.subscribe(() => console.log('updated state: ', store.getState())) // debug

export default store
