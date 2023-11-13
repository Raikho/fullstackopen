import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
  }
})


const printStore =  () => console.log('updated state:', store.getState()) // debug
printStore() // debug
store.subscribe(printStore)

export default store