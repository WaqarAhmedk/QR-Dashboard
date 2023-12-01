import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {logOut, verifyToken} from './authAction'

interface AuthState {
  loading: boolean
  user?: {
    userId: string
    email: string
    token: string
  }
}

const initialState: AuthState = {
  loading: false,
  user: {
    userId: '',
    email: '',
    token: '',
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logOut.pending, (state) => {
        state.loading = true
      })
      .addCase(logOut.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(logOut.rejected, (state) => {
        state.loading = false
      })
      .addCase(verifyToken.pending, (state) => {
        state.loading = true
      })
      .addCase(verifyToken.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(verifyToken.rejected, (state) => {
        state.loading = false
      })
  },
})

export const {setAuthUser} = authSlice.actions
export default authSlice.reducer
