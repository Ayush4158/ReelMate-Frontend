import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: 'auth',

  initialState:{
    user: null,
    partner: null
  },

  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.partner = null;
    },
    loginPartner: (state, action) => {
      state.partner = action.payload,
      state.user = null
    },
    logoutUser: (state) => {
      state.user = null
    },
    logoutPartner: (state) => {
      state.partner = null
    }

  }
})

export const {loginUser, loginPartner, logoutUser, logoutPartner} = authSlice.actions
export default authSlice.reducer