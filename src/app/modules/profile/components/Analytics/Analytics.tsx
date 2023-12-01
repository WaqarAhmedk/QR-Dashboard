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
  getCurrentDateRange,
} from '../../../../../mock'

import Dropdown from '../../../../../_metronic/partials/qrComponents/Dropdown'
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
import {useEffect, useState} from 'react'

export function Analytics() {
  const dispatch = useDispatch()
  const storedUserInfo = localStorage.getItem('userInfo')
  const user = storedUserInfo ? JSON.parse(storedUserInfo) : {}
  const [timeRange, setTimeRange] = useState<string>('')
  const timePeriod = useSelector((state: RootState) => state.config.analytics.timePeriod)

  const {
    data: countData,
    error: countDataError,
    isLoading: isLoadingCountData,
  } = useGetCountByUserQuery({
    userId: user?.userId,
    timePeriod,
  })

  useEffect(() => {
    const time = getCurrentDateRange('year')
    setTimeRange(time)
  }, [])

  const onSelect = (item: string) => {
    dispatch(setTimePeriod(item))
    const time = getCurrentDateRange(item)
    setTimeRange(time)
  }

  return (
    <Spin spinning={isLoadingCountData}>
      <div className='t-text-t2 t-flex t-flex-col t-gap-7'>
        <div className='t-flex t-flex-col t-gap-8'>
          <div className=''>
            <div className='t-flex t-items-center t-justify-between t-flex-wrap t-flex-stack '>
              <h3 className='t-font-bold t-my-2 t-text-[18.7px]'>Analytics</h3>

              <div className='t-flex t-items-center t-gap-6 t-my-2 t-w-[150px]'>
                <Dropdown
                  title='This Year'
                  listItems={ANALYSIS_DURATION}
                  primary={true}
                  onSelect={onSelect}
                />
              </div>
            </div>
            <div className='t-grid t-grid-cols-1 500:t-grid-cols-3 t-gap-8 md:t-w-[85%]'>
              <div className='t-bg-white t-p-7 t-rounded-xl t-shadow-sm t-text-[16px] t-flex t-flex-col  t-items-center t-gap-3 t-font-medium t-border'>
                <h3 className='t-self-start'>Dynamic QR's</h3>
                <div className='t-w-full t-flex t-flex-col t-items-center t-gap-3'>
                  <h4 className='t-font-bold t-text-[24px] sm:t-text-[32px]'>
                    {countData ?? '--'}
                  </h4>
                  <h4 className='t-text-[14px] sm:t-text-[16px] t-whitespace-nowrap'>
                    {timeRange}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className='t-grid t-grid-cols-1 500:t-grid-cols-2 md:t-grid-cols-3 md:t-w-[85%] t-gap-8 '>
            <div className='t-bg-white t-rounded-xl t-shadow-sm t-border t-p-8 t-flex t-flex-col t-items-center t-gap-6'>
              <h2 className='t-text-[14px] 500:t-text-[18.7px] t-font-medium t-text-center'>
                Device Analysis
              </h2>
              <DoughnutChart type={'device'} />
            </div>
            <div className='t-bg-white t-rounded-lg t-shadow-sm t-border t-p-8 t-flex t-flex-col t-items-center t-gap-6'>
              <h2 className='t-text-[14px] 500:t-text-[18.7px] t-font-medium t-text-center'>
                Browser Analysis
              </h2>
              <DoughnutChart type={'browser'} />
            </div>
            <div className='t-bg-white t-rounded-lg t-shadow-sm t-border t-p-8 t-flex t-flex-col t-items-center t-gap-6'>
              <h2 className='t-text-[14px] 500:t-text-[18.7px] t-font-medium t-text-center'>
                Location Analysis
              </h2>
              <DoughnutChart type={'city'} />
            </div>
          </div>
        </div>
        <div className='t-flex t-flex-col t-gap-4'>
          <h3 className='t-font-bold t-my-2 t-text-[18.7px]'>Day-Wise Analysis</h3>
          <div className='t-grid t-grid-cols-1 md:t-grid-cols-2 t-gap-8 '>
            <div className='t-bg-white t-rounded-lg t-shadow-sm t-border t-p-2 500:t-p-6 t-flex t-flex-col t-items-center t-gap-3'>
              <h2 className='t-text-[14px] 500:t-text-[18.7px] t-font-medium t-text-center'>
                Weekly Analysis
              </h2>
              <BarChart granularity='day' barColor='#FFA189' title='Weekly Analysis' />
            </div>
            <div className='t-bg-white t-rounded-lg t-shadow-sm t-border t-p-2 500:t-p-6 t-flex t-flex-col t-items-center t-gap-3'>
              <h2 className='t-text-[14px] 500:t-text-[18.7px] t-font-medium t-text-center'>
                Monthly Analysis
              </h2>
              <BarChart granularity='month' barColor='#6589E6' title='Monthly Analysis' />
            </div>
            <div className='t-bg-white t-rounded-lg t-shadow-sm t-border t-p-2 500:t-p-6 t-flex t-flex-col t-items-center t-gap-3'>
              <h2 className='t-text-[14px] 500:t-text-[18.7px] t-font-medium t-text-center'>
                Yearly Analysis
              </h2>
              <BarChart granularity='year' barColor='#FFD059' title='Yearly Analysis' />
            </div>
            <div className='t-bg-white t-rounded-lg t-shadow-sm t-border t-p-2 500:t-p-6 t-flex t-flex-col t-items-center t-gap-3'>
              <h2 className='t-text-[14px] 500:t-text-[18.7px] t-font-medium t-text-center'>
                Time Analysis
              </h2>
              <BarChart granularity='hour' barColor='#23C967' title='Time Analysis' />
            </div>
            <div className='t-bg-white t-rounded-lg t-shadow-sm t-border t-p-2 500:t-p-6 t-flex t-flex-col t-items-center t-gap-3'>
              <h2 className='t-text-[14px] 500:t-text-[18.7px] t-font-medium t-text-center'>
                Top City Analysis
              </h2>
              <HorizontalBarChart type='city' barColor='#6589E6' title='Top City Analysis' />
            </div>
            <div className='t-bg-white t-rounded-lg t-shadow-sm t-border t-p-2 500:t-p-6 t-flex t-flex-col t-items-center t-gap-3'>
              <h2 className='t-text-[14px] 500:t-text-[18.7px] t-font-medium t-text-center'>
                Top Performance QR Code Type
              </h2>
              <HorizontalBarChart
                type='qrType'
                barColor='#FFA189'
                title='Top Performance QR Code Type'
              />
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
    </Spin>
  )
}
