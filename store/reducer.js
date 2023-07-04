import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
  name: "general",
  initialState: {
    user: null,
    page: 'vote',
    upperPopup: ''
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setUpperPopup: (state, action) => {
      state.upperPopup = action.payload
    },
    resetState: (state) => {
      state.user = null
      state.page = 'vote'
      state.upperPopup = ''
    },
  },
})

export const {
  setUser,
  setPage,
  setUpperPopup,
} = slice.actions

export default slice.reducer
