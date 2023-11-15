import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    replaceAnecdote(state, action) {
      const newAnecdote = action.payload
      return state.map(a => (a.id === newAnecdote.id) ? newAnecdote : a)
    }
  }
})

export const { appendAnecdote, setAnecdotes, replaceAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
    return async (dispatch) => {
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(appendAnecdote(newAnecdote))
    }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(a => a.id === id)
    const changedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const newAnecdote = await anecdoteService.replace(changedAnecdote)
    dispatch(replaceAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer