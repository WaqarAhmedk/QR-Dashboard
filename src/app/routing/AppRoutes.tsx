/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC, useEffect} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout, AuthPage, useAuth} from '../modules/auth'
import {App} from '../App'
import {clearUser} from 'store/userStore/userSlice'
import {useDispatch} from 'react-redux'

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const {PUBLIC_URL} = process.env

const NavigateTo = ({dispatch}: any) => {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window &&
      window.location &&
      typeof window.location.href === 'string'
    ) {
      // window.close()
      // localStorage.clear()
      const qrAppUrl = process.env.REACT_APP_QR_APP ?? ''
      window.location.href = qrAppUrl
    }
  }, [])
  return null
}
const AppRoutes: FC = () => {
  const {auth} = useAuth()

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          {/* <Route path='logout' element={<Logout />} /> */}
          {auth && auth.role !== 'superAdmin' ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/crafted/pages/qrcodes' />} />
            </>
          ) : auth && auth.role === 'superAdmin' ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/apps/admin/users' />} />
            </>
          ) : (
            <>
              <Route path='*' element={<NavigateTo />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
