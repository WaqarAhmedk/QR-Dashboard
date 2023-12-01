import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authSlice from './authStore/authSlice'
import qrSlice from './qrStore/qrSlice'
import configSlice from './configStore/configSlice'

import api from '../app/api/api'
import userSlice from './userStore/userSlice'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'
import teamSlice from './teamStore/teamSlice'
import paymentSlice from './payment/paymentSlice'

const PersistConfig = {
  key: 'root',
  storage,
}
const persistedUserReducer = persistReducer(PersistConfig, userSlice)
const persistedPaymentReducer = persistReducer(PersistConfig, paymentSlice)
export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: persistedUserReducer,
    team: teamSlice,
    config: configSlice,
    api: api.reducer,
    qr: qrSlice,
    payment: persistedPaymentReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware), //
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
