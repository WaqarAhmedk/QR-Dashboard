const {createAsyncThunk} = require('@reduxjs/toolkit')
const {axiosInstance} = require('../../axios/index')

export const logOut = createAsyncThunk('logout', async (_: any, {rejectWithValue}: any) => {
  try {
    const response = await axiosInstance.post('/auth/logout')
    localStorage.removeItem('userInfo')
    return response
  } catch (err: any) {
    return rejectWithValue((err as {data: {message: string}})?.data?.message)
  }
})

export const verifyToken = createAsyncThunk(
  'verify-user-blacklist',
  async (token: any, {rejectWithValue}: any) => {
    try {
      if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
      const response = await axiosInstance.post('/auth/verify-user-blacklist')
      return response
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)
