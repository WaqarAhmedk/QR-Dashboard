import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
// import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Analytics} from './components/Analytics/Analytics'
import {CreateQr} from './components/CreateQr'
import {QrCodes} from './components/QrCode/QrCodes'
import {TeamCollab} from './components/TeamCollab/TeamCollab'
import {BillingPlans} from './components/BillingPlans/BillingPlans'
import {ProfileHeader} from './ProfileHeader'
import RecycleBin from './components/RecycleBin/RecycleBin'
import Billing from './components/BillingPlans/Billing'

// const profileBreadCrumbs: Array<PageLink> = [
//   {
//     title: 'Profile',
//     path: '/crafted/pages/analytics',
//     isSeparator: false,
//     isActive: false,
//   },
//   {
//     title: '',
//     path: '',
//     isSeparator: true,
//     isActive: false,
//   },
// ]

const ProfilePage = () => (
  <Routes>
    <Route
      element={
        <>
          {/* <ProfileHeader /> */}
          <Outlet />
          {/* <p>Hello</p> */}
        </>
      }
    >
      <Route
        path='analytics'
        element={
          <>
            {/* <PageTitle >Analytics</PageTitle> */}
            <Analytics />
          </>
        }
      />
      <Route
        path='create-qr'
        element={
          <>
            {/* <PageTitle >Create Qr Code</PageTitle> */}
            <CreateQr />
          </>
        }
      />
      <Route
        path='qrcodes'
        element={
          <>
            {/* <PageTitle ></PageTitle> */}
            <QrCodes />
          </>
        }
      />
      <Route
        path='teamcollab'
        element={
          <>
            {/* <PageTitle ></PageTitle> */}
            <TeamCollab />
          </>
        }
      />
      <Route
        path='plans/*'
        element={
          <>
            {/* <PageTitle ></PageTitle> */}
            <BillingPlans />
          </>
        }
      />
      <Route
        path='billing'
        element={
          <p>
            <Billing />
          </p>
        }
      />
      <Route
        path='recyclebin'
        element={
          <>
            {/* <PageTitle ></PageTitle> */}
            <RecycleBin />
          </>
        }
      />
      <Route index element={<Navigate to='/crafted/pages/analytics' />} />
    </Route>
  </Routes>
)

export default ProfilePage
