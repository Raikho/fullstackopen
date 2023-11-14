import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'notification',
  initialState: 'some notification...',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
  },
})

export const { setNotification } = filterSlice.actions
export default filterSlice.reducer