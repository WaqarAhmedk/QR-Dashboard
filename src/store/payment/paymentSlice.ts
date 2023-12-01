import {createSlice} from '@reduxjs/toolkit'
import {
  cancelSubscription,
  getSubscriptionInfo,
  getTransactions,
  updatePayment,
} from './paymentAction'

const initialState = {
  loading: false,
  transactions: [],
  nextInvoice: {},
  subscriptionInfo: {},
  billingInfo: {
    card: '',
    billingAddress: {},
    plan: 'FREE',
    amount: 0,
    appliedToCancel: true,
    stripeSubscriptionStatus: '',
  },
  trialExpirationDate: '',
  isTrialValid: false,
}

const teamSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.loading = true
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        const payload = action.payload.data
        console.log('payload.stripeSubscriptionStatus', payload.stripeSubscriptionStatus)
        state.loading = false
        state.trialExpirationDate = payload.trialExpirationDate
        state.isTrialValid = payload.isTrialValid
        state.transactions = payload.invoices
        state.nextInvoice = payload.nextInvoice
        state.billingInfo.card = payload.customerCard
        state.billingInfo.billingAddress = payload.customerBillingInfo
        state.billingInfo.plan = payload.plan
        state.billingInfo.amount = payload.amount
        state.billingInfo.appliedToCancel = payload.appliedToCancel
        state.billingInfo.stripeSubscriptionStatus = payload.stripeSubscriptionStatus
      })
      .addCase(getTransactions.rejected, (state) => {
        state.loading = false
        state.transactions = []
        state.nextInvoice = {}
        state.billingInfo = {
          card: '',
          billingAddress: {},
          plan: 'FREE',
          amount: 0,
          appliedToCancel: true,
          stripeSubscriptionStatus: '',
        }
      })
      .addCase(updatePayment.pending, (state) => {
        state.loading = true
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.loading = false
        state.transactions = action.payload.data.invoices
      })
      .addCase(updatePayment.rejected, (state) => {
        state.loading = false
      })
      .addCase(cancelSubscription.pending, (state) => {
        state.loading = true
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.loading = false
        state.billingInfo.appliedToCancel = action?.payload?.appliedToCancel
        state.nextInvoice = {}
      })
      .addCase(cancelSubscription.rejected, (state) => {
        state.loading = false
      })
      .addCase(getSubscriptionInfo.pending, (state) => {
        state.loading = true
      })
      .addCase(getSubscriptionInfo.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(getSubscriptionInfo.rejected, (state) => {
        state.loading = false
      })
  },
})

export default teamSlice.reducer
