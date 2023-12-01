import {message} from 'antd'

const {createAsyncThunk} = require('@reduxjs/toolkit')
const {axiosInstance} = require('../../axios/index')

interface CreatePaymentArgs {
  annualPurchase: boolean
  selectedPlan: string | null
  fromHomePage: boolean
}

export const createPayment = createAsyncThunk(
  'create/payment',
  async ({isAnnual, selectedPlan, fromHomePage}: any, {rejectWithValue}: any) => {
    try {
      const data: CreatePaymentArgs = {
        annualPurchase: isAnnual,
        selectedPlan: selectedPlan.toUpperCase(),
        fromHomePage: fromHomePage,
      }
      const response = await axiosInstance.post('/plan/create-plan', data)
      window.location.href = response.data
      return response
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const updatePayment = createAsyncThunk(
  'update/payment',
  async ({isAnnual, selectedPlan, fromHomePage}: any, {rejectWithValue}: any) => {
    try {
      const data: CreatePaymentArgs = {
        annualPurchase: isAnnual,
        selectedPlan: selectedPlan.toUpperCase(),
        fromHomePage: fromHomePage,
      }
      const response = await axiosInstance.post('/plan/update-plan', data)
      window.location.href = response.data
      return response
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const getTransactions = createAsyncThunk(
  'get/transactions',
  async (_: any, {rejectWithValue}: any) => {
    try {
      const response = await axiosInstance.get('/plan/transactions')
      return response
    } catch (err: any) {
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const cancelSubscription = createAsyncThunk(
  'cancel/subscription',
  async (_: any, {rejectWithValue}: any) => {
    try {
      const response = await axiosInstance.post('/plan/cancel-plan')
      return response
    } catch (err: any) {
      console.log('err', err)
      if (err?.data?.message) {
        message.error(err?.data.message)
      }
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)

export const getSubscriptionInfo = createAsyncThunk(
  'info/subscription',
  async (_: any, {rejectWithValue}: any) => {
    try {
      const response = await axiosInstance.get('/plan/subscription-info')
      return response
    } catch (err: any) {
      console.log('err', err)
      if (err?.data?.message) {
        message.error(err?.data.message)
      }
      return rejectWithValue((err as {data: {message: string}})?.data?.message)
    }
  }
)
