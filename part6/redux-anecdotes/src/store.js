import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  }
})

const printStore = () => console.log('updated state:', store.getState()) // debug
store.subscribe(printStore) // debug

store.dispatch(initializeAnecdotes())

export default store