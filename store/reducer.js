import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
  name: "general",
  initialState: {
    user: null,
    page: 'vote'
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    resetState: (state) => {
      state.user = null
      state.page = 'vote'
    },
  },
})

export const {
  setUser,
  setPage,
} = slice.actions

export default slice.reducer
