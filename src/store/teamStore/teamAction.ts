const {createAsyncThunk} = require('@reduxjs/toolkit')
const {axiosInstance} = require('../../axios/index')
interface inviteUser {
  role: string
  email: string
  fullName: string
}
export const sendInvite = createAsyncThunk(
  'send-user-invite',
  async (data: inviteUser, {rejectWithValue}: any) => {
    try {
      const user = JSON.parse(localStorage.getItem('userInfo') || '{}')
      const createdBy = user.userId
      const newdata = {
        ...data,
        createdBy,
      }
      const res = await axiosInstance.post(`/users`, newdata)
      return res
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const getTeamMembers = createAsyncThunk(
  'get-team-members',
  async (type: string, {rejectWithValue}: any) => {
    try {
      const user = JSON.parse(localStorage.getItem('userInfo') || '{}')
      const userId = user.userId
      const res = await axiosInstance.get(`/users/`, {
        params: {
          userId,
        },
      })
      return res
    } catch (err: any) {
      console.log('getTeamMembers err', err)
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)
export const searchTeamMembers = createAsyncThunk(
  'search-team-members',
  async (searchTerm: string, {rejectWithValue}: any) => {
    try {
      const user = JSON.parse(localStorage.getItem('userInfo') || '{}')
      const userId = user.userId
      const res = await axiosInstance.get(`/users/teamsearch/${userId}?searchTerm=${searchTerm}`)
      return res
    } catch (err) {
      console.log('Error searching team members:', err)
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)
