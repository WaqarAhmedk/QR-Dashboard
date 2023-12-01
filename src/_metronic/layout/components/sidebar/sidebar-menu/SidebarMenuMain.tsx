/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
import {useSelector} from 'react-redux'
import {RootState} from 'store'
import logo from '../../../../../assets/media/logo.svg'
import {useAuth} from 'app/modules/auth'
const SidebarMenuMain = () => {
  const {auth} = useAuth()

  const intl = useIntl()
  return (
    <>
      {/* <SidebarMenuItemWithSub
        to='/crafted/accounts'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        icon='/media/icons/duotune/sidebar/dashboards.svg'
        fontIcon='bi-person'
      >
        <SidebarMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <SidebarMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </SidebarMenuItemWithSub> */}

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1 t-text-[16px]'>
            PAGES
          </span>
        </div>
      </div>
      {auth?.role === 'superAdmin' ? (
        <>
          <SidebarMenuItem
            to='apps/admin/analytics'
            title='Analytics'
            icon='/media/icons/duotune/sidebar/analytics.svg'
          />
          <SidebarMenuItem
            to='apps/admin/subscriptions'
            title='Subscriptions'
            icon='/media/icons/duotune/sidebar/billing.svg'
          />
          <SidebarMenuItem
            to='apps/admin/clients'
            title='Clients'
            icon='/media/icons/duotune/sidebar/team.svg'
          />
          <SidebarMenuItem
            to='/apps/admin/users'
            title='Users'
            icon='/media/icons/duotune/sidebar/analytics.svg'
          />
          <SidebarMenuItem
            to='/apps/admin/recyclebin'
            title='Recycle bin'
            icon='/media/icons/duotune/sidebar/recycle.svg'
          />
        </>
      ) : (
        <>
          <SidebarMenuItem
            to='/crafted/pages/analytics'
            title='Analytics'
            icon='/media/icons/duotune/sidebar/analytics.svg'
          />
          <SidebarMenuItem
            to='/crafted/pages/create-qr'
            title='Create QR Code'
            icon='/media/icons/duotune/sidebar/create_qr.svg'
          />
          <SidebarMenuItem
            to='/crafted/pages/qrcodes'
            title='QR Codes'
            icon='/media/icons/duotune/sidebar/qr.svg'
          />
          {auth?.role === 'admin' && (
            <SidebarMenuItem
              to='/crafted/pages/teamcollab'
              title='Team Collaboration'
              icon='/media/icons/duotune/sidebar/team.svg'
            />
          )}
          {auth?.role === 'admin' && (
            <SidebarMenuItem
              to='/crafted/pages/billing'
              title='Billing and Plans'
              icon='/media/icons/duotune/sidebar/billing.svg'
            />
          )}

          <SidebarMenuItem
            to='/crafted/pages/recyclebin'
            title='Recycle bin'
            icon='/media/icons/duotune/sidebar/recycle.svg'
          />

          {/* <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1 t-text-[16px]'>
            OTHERS
          </span>
        </div>
      </div>

      <SidebarMenuItem
        to='/apps/user-management/users'
        title='White label domain'
        fontIcon='bi-layers'
      /> */}
        </>
      )}
    </>
  )
}

export {SidebarMenuMain}
