import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  }
})

anecdoteService
  .getAll()
  .then(anecdotes => store.dispatch(setAnecdotes(anecdotes)))
  .finally(() => {
    const printStore =  () => console.log('updated state:', store.getState()) // debug
    printStore() // debug
    store.subscribe(printStore) // debug
  })

export default store