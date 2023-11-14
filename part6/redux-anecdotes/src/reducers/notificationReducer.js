import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return null
    }
  },
})

export const { setNotification, removeNotification } = filterSlice.actions
export default filterSlice.reducer