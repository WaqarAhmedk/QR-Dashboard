import {useEffect, useRef, useState} from 'react'
import {Button, DropdownCheckbox, Search2} from '../../../../../../_metronic/partials/qrComponents'
import {PERMISSION_LEVEL, TEAM_COLLAB} from '../../../../../../mock'
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useDispatch, useSelector} from 'react-redux'
import {getTeamMembers, searchTeamMembers, sendInvite} from 'store/teamStore/teamAction'
import {RootState} from 'store'
import {useDebounceSearch} from 'hooks/useDebounceSearch'
import {Calendar, DatePicker, Switch} from 'antd'
import {useNavigate} from 'react-router-dom'
import {FormattedDateTimeRange} from 'react-intl'

export function AllSubscriptions() {
  const [searchTerm, setSearchTerm] = useDebounceSearch('', 50)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (searchTerm.length > 0) {
      dispatch(searchTeamMembers(searchTerm))
    } else {
      dispatch(getTeamMembers())
    }
  }, [searchTerm])

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value)
  }

  let data = [
    {
      id: '12121',
      username: 'Waqar',
      subcription: '3232323232',
      amount: '23',
      startdate: '3232323',
      enddate: '232323',
      status: 'active',
    },
    {
      id: '12121',
      username: 'Waqar',
      subcription: '3232323232',
      amount: '23',
      startdate: '3232323',
      enddate: '232323',
      status: 'active',
    },
    {
      id: '12121',
      username: 'Waqar',
      subcription: '3232323232',
      amount: '23',
      startdate: '3232323',
      enddate: '232323',
      status: 'active',
    },
  ]

  const list = [
    {label: 'Essential', value: 'ddd'},
    {label: 'Professional', value: ''},
    {label: 'Free Plan', value: ''},
  ]
  const status = [
    {label: 'Active', value: 'ddd'},
    {label: 'Block', value: ''},
  ]

  return (
    <div className='t-relative t-flex t-h-full t-justify-center t-w-full t-overflow-hidden'>
      <div className=' t-w-full t-bg-white t-shadow-lg t-border t-py-4 t-px-4 500:t-px-8 sm:t-px-12 t-rounded-lg t-text-t2'>
        <div className='t-flex t-flex-col md:t-flex-row t-items-center t-justify-between t-flex-wrap t-flex-stack t-mb-3 md:t-px-5'>
          <h3 className='t-font-bold t-my-2 t-text-[18.7px]'>Subscriptions </h3>

          <div className='t-flex t-flex-col 500:t-flex-row t-gap-3 md:t-gap-6 t-my-2  t-w-full 500:t-w-auto'>
            <div className='t-w-full 500:t-w-[205px] font-inter'>
              <DropdownCheckbox listItems={list} title='Subscription' />
            </div>
            <div className='t-w-full 500:t-w-[205px] font-inter'>
              <DropdownCheckbox listItems={status} title='Status' />
            </div>
          </div>
        </div>
        <table
          className='t-rounded-xl t-table-auto t-w-full t-border t-text-black font-inter  t-text-[12px] md:t-text-[16px] t-whitespace-nowrap'
          style={{borderCollapse: 'separate', borderSpacing: '0 0px'}}
        >
          <thead className='t-rounded-xl '>
            <tr className='t-rounded-xl t-bg-[#FAFAFA]  t-font-semibold t-w-full'>
              <td className='t-px-4 t-py-7 t-text-center t-rounded-tl-lg '>User Name</td>
              <td className='t-px-4 t-py-7 t-text-center  '>Subscriptions</td>
              <td className='t-px-4 t-py-7 t-text-center  '>Amount</td>
              <td className='t-px-4 t-py-7 t-text-center  '>Start Date</td>
              <td className='t-px-4 t-py-7 t-text-center  '>End Date</td>
              <td className='t-px-4 t-py-7 t-text-center  '>Status</td>
              <td className='t-px-4 t-py-7 t-text-center t-rounded-tr-lg '>Action</td>
            </tr>
          </thead>
          <tbody className='t-rounded-xl t-bg-white '>
            {data.length > 0
              ? data?.map((row) => {
                  return (
                    <tr key={row.id} className='t-border-t t-rounded-xl'>
                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>{row?.username}</td>

                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                        {row?.subcription}
                      </td>

                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>{row.amount}</td>
                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>{row?.startdate}</td>
                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>{row?.enddate}</td>
                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                        <Switch
                          // checked={row?.status}
                          // onChange={() => handleToggleChange(index)}
                          checkedChildren='Active'
                          unCheckedChildren='Pending'
                          style={{backgroundColor: row?.status ? '#55B659' : '#FF6461'}}
                        />
                      </td>
                      <td
                        className='t-border-b t-pl-14 t-py-7 t-text-center t-cursor-pointer  '
                        onClick={() => {
                          navigate('/apps/admin/subscriptions/details')
                        }}
                      >
                        <img
                          src={require('../../../../../../assets/media/dotsmenu.png')}
                          height={10}
                          width={10}
                        />
                      </td>
                    </tr>
                  )
                })
              : ''}
          </tbody>
        </table>
      </div>
    </div>
  )
}
