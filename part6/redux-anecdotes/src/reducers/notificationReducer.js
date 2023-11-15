import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      if (state === action.payload)
        return null
      return state
    },
    clearNotification() {
      return null
    }
  },
})

export const { addNotification, removeNotification, clearNotification } = filterSlice.actions

export const setNotification = (msg, seconds) => {
  return async (dispatch) => {
    dispatch(addNotification(msg))
    setTimeout(() => {
      dispatch(removeNotification(msg))
    }, seconds * 1000)
  }
}

export default filterSlice.reducer