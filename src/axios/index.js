import axios from 'axios'
import * as authHelper from '../app/modules/auth/core/AuthHelpers'

export const axiosInstance = axios.create({
  baseURL: 'https://qr-api-374580be3182.herokuapp.com/v1',
})

// export const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3001/v1',
// })

axiosInstance.interceptors.request.use(
  (config) => {
    let user = JSON.parse(localStorage.getItem('userInfo'))
    let token = user.token

    if (token) {
      config.headers.Authorization = 'Bearer ' + token
      config.headers.Accept = 'application/json'
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error.response)
  }
)
