const {createAsyncThunk} = require('@reduxjs/toolkit')
const {axiosInstance} = require('../../axios/index')

export const getUser = createAsyncThunk(
  'get-user-by-id',
  async (userId: any, {rejectWithValue}: any) => {
    try {
      const response = await axiosInstance.get(`/users/get-user-by-id/${userId}`)
      const user = response.user
      localStorage.setItem('role', user.role)
      return response
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const sendOpt = createAsyncThunk('send-opt', async (data: any, {rejectWithValue}: any) => {
  try {
    const response = await axiosInstance.post(`/users/sendOpt/`, data)
    return response
  } catch (err: any) {
    return rejectWithValue((err as {data: {message: string}})?.data?.message)
  }
})

export const updateUser = createAsyncThunk(
  'update-user',
  async (data: any, {rejectWithValue}: any) => {
    try {
      const response = await axiosInstance.post(`/users/update-user`, {data})
      return response
    } catch (err: any) {
      console.log('updateUser error: ' + err)
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const confirmOtp = createAsyncThunk(
  'confirm-otp',
  async (data: any, {rejectWithValue}: any) => {
    try {
      const response = await axiosInstance.post(`/users/confirmOtp`, {...data})
      return response
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const locationInfo = createAsyncThunk(
  'location-info',
  async (data: any, {rejectWithValue}: any) => {
    try {
      console.log('locationInfo', data)
      const response = await axiosInstance.post(`/users/update-user`, {...data})
      // return response
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)
