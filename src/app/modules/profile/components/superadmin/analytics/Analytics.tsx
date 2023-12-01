/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  ANALYSIS_DURATION,
  ANALYSIS_CITY,
  ANALYSIS_TIME,
  ANALYSIS_TOP_PERFORMING,
  ANALYSIS_WEEKLY,
  ANALYTICS_BROWSER,
  ANALYTICS_DEVICE,
  ANALYTICS_LOCATION,
  ANALYSIS_BEST_PERFORMING,
} from 'mock'

import DoughnutChart from './Doughnut'
import BarChart from './BarChart'
import MapAnalysis from './MapAnalysis'
import {HorizontalBarChart} from './BarChartHorizontal'
import {useGetCountByUserQuery, useGetTimeBasedAnalyticsQuery} from 'app/api/api'
import {useDispatch, useSelector} from 'react-redux'
import {setTimePeriod} from 'store/configStore/configSlice'
import {RootState} from 'store'
import useUserInfo from 'hooks/userUserInfo'
import {Spin} from 'antd'
import {Dropdown} from '_metronic/partials/qrComponents'
import {Bar} from 'react-chartjs-2'
import QrsPerFunction from './components/qrsperfunction'
import SubPerPlan from './components/subsperplan'
import ActiveUserQrQunatity from './components/topactiveuserQrquantity'
import TopQrsPerFunction from './components/topqrscanperfunction'
import TopActiveUsersByScan from './components/topactiveusersbyscan'
import TopCityOfAdminsn from './components/topcity'
import TopIndustryAdmins from './components/topindustryifadmins'
import TopCountryOfAdmins from './components/topcountry'

export function AdminAnalytics() {
  const dispatch = useDispatch()
  const storedUserInfo = localStorage.getItem('userInfo')
  const user = storedUserInfo ? JSON.parse(storedUserInfo) : {}
  const timePeriod = useSelector((state: RootState) => state.config.analytics.timePeriod)

  return (
    <div>
      <div className='t-text-t2 t-flex t-flex-col t-gap-7'>
        <div className='t-flex t-flex-col t-gap-8'>
          <div className=''>
            <div className='t-flex t-items-center t-justify-between t-flex-wrap t-flex-stack '>
              <h3 className='t-font-bold t-my-2 t-text-[18.7px]'>Analytics</h3>

              <div className='t-flex t-items-center t-gap-6 t-my-2 t-w-[150px]'>
                <Dropdown title='This Year' listItems={ANALYSIS_DURATION} primary={true} />
              </div>
            </div>
            <div className='t-grid t-grid-cols-1 500:t-grid-cols-3 t-gap-8 md:t-w-[85%]'>
              <div className='t-bg-white t-p-7 t-rounded-xl t-shadow-sm t-text-[16px] t-flex t-flex-col  t-items-center t-gap-3 t-font-medium t-border'>
                <h3 className='t-self-start'>Total Users</h3>
                <div className='t-w-full t-flex t-flex-col t-items-center t-gap-3'>
                  <h4 className='t-font-bold t-text-[24px] sm:t-text-[32px]'>{12}</h4>
                </div>
              </div>
              <div className='t-bg-white t-p-7 t-rounded-xl t-shadow-sm t-text-[16px] t-flex t-flex-col  t-items-center t-gap-3 t-font-medium t-border'>
                <h3 className='t-self-start'>Total Sub-Users</h3>
                <div className='t-w-full t-flex t-flex-col t-items-center t-gap-3'>
                  <h4 className='t-font-bold t-text-[24px] sm:t-text-[32px]'>{30}</h4>
                </div>
              </div>
              <div className='t-bg-white t-p-7 t-rounded-xl t-shadow-sm t-text-[16px] t-flex t-flex-col  t-items-center t-gap-3 t-font-medium t-border'>
                <h3 className='t-self-start'>Total Subscriptions</h3>
                <div className='t-w-full t-flex t-flex-col t-items-center t-gap-3'>
                  <h4 className='t-font-bold t-text-[24px] sm:t-text-[32px]'>{43}</h4>
                </div>
              </div>
            </div>

            <div className='t-grid t-grid-cols-1 500:t-grid-cols-3 t-gap-8 md:t-w-[85%] t-mt-5'>
              <div className='t-bg-white t-p-7 t-rounded-xl t-shadow-sm t-text-[16px] t-flex t-flex-col  t-items-center t-gap-3 t-font-medium t-border'>
                <h3 className='t-self-start'>Total QRs</h3>
                <div className='t-w-full t-flex t-flex-col t-items-center t-gap-3'>
                  <h4 className='t-font-bold t-text-[24px] sm:t-text-[32px]'>12</h4>
                </div>
              </div>
              <div className='t-bg-white t-p-7 t-rounded-xl t-shadow-sm t-text-[16px] t-flex t-flex-col  t-items-center t-gap-3 t-font-medium t-border'>
                <h3 className='t-self-start'>Total Sub-Users</h3>
                <div className='t-w-full t-flex t-flex-col t-items-center t-gap-3'>
                  <h4 className='t-font-bold t-text-[24px] sm:t-text-[32px]'>{33}</h4>
                </div>
              </div>
              <div className='t-bg-white t-p-7 t-rounded-xl t-shadow-sm t-text-[16px] t-flex t-flex-col  t-items-center t-gap-3 t-font-medium t-border'>
                <h3 className='t-self-start'>Total Subscriptions</h3>
                <div className='t-w-full t-flex t-flex-col t-items-center t-gap-3'>
                  <h4 className='t-font-bold t-text-[24px] sm:t-text-[32px]'>{32}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='t-flex t-flex-col t-gap-4'>
          <div className='t-grid t-grid-cols-1 md:t-grid-cols-2 t-gap-8 '>
            <div className='t-bg-white t-rounded-lg t-shadow-sm t-border t-p-2 500:t-p-6 t-flex t-flex-col t-items-center t-gap-3'>
              <h2 className='t-text-[14px] 500:t-text-[18.7px] t-font-medium t-text-center'>
                Total Qrs Scan (Per Function)
              </h2>
              <QrsPerFunction />
            </div>
            <div className='t-bg-white t-rounded-lg t-shadow-sm t-border t-p-2 500:t-p-6 t-flex t-flex-col t-items-center t-gap-3'>
              <h2 className='t-text-[14px] 500:t-text-[18.7px] t-font-medium t-text-center'>
                Subscriptions (Per Plan)
              </h2>
              <SubPerPlan />
            </div>
            <div className='t-bg-white t-rounded-lg t-shadow-sm t-border t-p-2 500:t-p-6 t-flex t-flex-col t-items-center t-gap-3'>
              <h2 className='t-text-[14px] 500:t-text-[18.7px] t-font-medium t-text-center'>
                Top Qr Scan (By-Function)
              </h2>
              <TopQrsPerFunction />
            </div>
            <div className='t-bg-white t-rounded-lg t-shadow-sm t-border t-p-2 500:t-p-6 t-flex t-flex-col t-items-center t-gap-3'>
              <h2 className='t-text-[14px] 500:t-text-[18.7px] t-font-medium t-text-center'>
                Top Active Users (Qr-Quantity)
              </h2>
              <ActiveUserQrQunatity />
            </div>
            <div className='t-bg-white t-rounded-lg t-shadow-sm t-border t-p-2 500:t-p-6 t-flex t-flex-col t-items-center t-gap-3'>
              <h2 className='t-text-[14px] 500:t-text-[18.7px] t-font-medium t-text-center'>
                Top Active Users (By-Scan)
              </h2>
              <TopActiveUsersByScan />
            </div>
            <div className='t-bg-white t-rounded-lg t-shadow-sm t-border t-p-2 500:t-p-6 t-flex t-flex-col t-items-center t-gap-3'>
              <h2 className='t-text-[14px] 500:t-text-[18.7px] t-font-medium t-text-center'>
                Top Cities of Admins
              </h2>
              <TopCityOfAdminsn />
            </div>
            <div className='t-bg-white t-rounded-lg t-shadow-sm t-border t-p-2 500:t-p-6 t-flex t-flex-col t-items-center t-gap-3'>
              <h2 className='t-text-[14px] 500:t-text-[18.7px] t-font-medium t-text-center'>
                Top Countries of Admins
              </h2>
              <TopCountryOfAdmins />
            </div>
            <div className='t-bg-white t-rounded-lg t-shadow-sm t-border t-p-2 500:t-p-6 t-flex t-flex-col t-items-center t-gap-3'>
              <h2 className='t-text-[14px] 500:t-text-[18.7px] t-font-medium t-text-center'>
                Top Industry of Admins
              </h2>
              <TopIndustryAdmins />
            </div>
            {/* <div className='t-bg-white t-rounded-lg t-shadow-sm t-border t-p-2 500:t-p-6 t-flex t-flex-col t-items-center t-gap-3'>
            <h2 className='t-text-[14px] 500:t-text-[18.7px] t-font-medium t-text-center'>
              Best Performance QR Codes
            </h2>
            <HorizontalBarChart
              data={ANALYSIS_BEST_PERFORMING}
              barColor='#FFA189'
              title='Best Performance QR Codes'
            />
          </div> */}
          </div>
        </div>
        <div>
          <MapAnalysis />
        </div>
      </div>
    </div>
  )
}
