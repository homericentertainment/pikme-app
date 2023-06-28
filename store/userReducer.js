import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: "user",
  initialState: {
    about: "",
    history: null,
    nickName: "",
    address: "",
    userBalance: "",
    isConnected: false,
    image: '',
    events:null,
    stats:null
  },
  reducers: {
    setAbout: (state, action) => {
      state.about = action.payload
    },
    setHistory: (state, action) => {
      state.history = action.payload
    },
    setNickName: (state, action) => {
      state.nickName = action.payload
    },
    setAddress: (state, action) => {
      state.address = action.payload
    },
    setBalance: (state, action) => {
      state.userBalance = action.payload
    },
    setImage: (state, action) => {
      state.image = action.payload
    },
    setIsConnected: (state, action) => {
      state.isConnected = action.payload
    },
    setEvents: (state, action) => {
      state.events = action.payload
    },
    setStats: (state, action) => {
      state.stats = action.payload
    },
    resetState: (state, action) => {
      state.address = ""
      state.nickName = ""
      state.isConnected = false
      state.image = ""
      state.userBalance = ""
      state.about = ""
      state.history = []
    },
  },
})

export const {
  setAbout,
  setHistory,
  setNickName,
  setAddress,
  setBalance,
  setImage,
  setIsConnected,
  resetState,
  setEvents,
  setStats,
} = userSlice.actions

export default userSlice.reducer
