import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
  name: "general",
  initialState: {
    user: null,
    page: 'home'
  },
  reducers: {
    setUser: (state, action) => {
      state.stats = action.payload
    },
    setPage: (state, action) => {
      state.stats = action.payload
    },
    resetState: (state) => {
      state.user = null
      state.page = 'home'
    },
  },
})

export const {
  setUser,
  setPage,
} = slice.actions

export default slice.reducer
