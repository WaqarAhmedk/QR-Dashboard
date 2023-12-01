import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getUser, updateUser, sendOpt, confirmOtp} from './userActions'

import UserState from './userProfileInitails'

const initialState: UserState = {
  loading: false,
  user: {
    picture: null,
    firstName: null,
    lastName: null,
    email: null,
    role: null,
    status: null,
    joiningDate: null,
    subscriptionId: {
      paymentStatus: null,
      selectedPlan: null,
      subscriptionId: null,
      id: null,
    },
    location: null,
    industry: null,
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = initialState.user
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
      })
      .addCase(sendOpt.pending, (state) => {
        state.loading = true
      })
      .addCase(sendOpt.rejected, (state) => {
        state.loading = false
      })
      .addCase(sendOpt.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false

        state.user = action.payload.user
      })
      .addCase(confirmOtp.pending, (state) => {
        state.loading = true
      })
      .addCase(confirmOtp.rejected, (state) => {
        state.loading = false
      })
      .addCase(confirmOtp.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
      })
  },
})

export const {clearUser} = userSlice.actions
export default userSlice.reducer
