import {createSlice} from '@reduxjs/toolkit'
import {getTeamMembers, sendInvite, searchTeamMembers} from './teamAction'

interface teamState {
  loading: boolean
  team: any
  error: any
}
const team = {
  role: '',
  status: false,
  joiningDate: null,
  email: '',
  name: '',
  createdBy: {},
  id: '',
}
const initialState: teamState = {
  loading: false,
  team: [{...team}],
  error: '',
}

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeamMembers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getTeamMembers.fulfilled, (state, action) => {
        state.loading = false
        state.team = action.payload
      })
      .addCase(getTeamMembers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(searchTeamMembers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchTeamMembers.fulfilled, (state, action) => {
        state.loading = false
        state.team = action.payload
      })
      .addCase(searchTeamMembers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(sendInvite.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(sendInvite.fulfilled, (state, action) => {
        state.loading = false
        state.team.push(action.payload)
      })
      .addCase(sendInvite.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default teamSlice.reducer
