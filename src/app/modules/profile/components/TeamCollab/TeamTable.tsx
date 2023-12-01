import {Tag} from 'antd'
import React, {useEffect, useState} from 'react'
import {format, parseISO} from 'date-fns'
import {enGB} from 'date-fns/locale'
import TextToggle from '../../../../../_metronic/partials/qrComponents/TextToggle'
import {Switch} from 'antd'
import './TeamTable.css'
import {handleAccess} from 'utils/functions'
interface TableProps {
  data: {
    id: number
    firstName: string
    lastName: string
    email: string
    createdBy: any
    role: string
    action: string
    status: boolean
    joiningDate: any
    active: boolean
  }[]
}

const TeamTable: React.FC<TableProps> = ({data}) => {
  console.log('TeamTable data', data)
  // const [activeStates, setActiveStates] = useState<boolean[]>(data.map((row) => row.status))
  const handleToggleChange = (index: number) => {
    // const newActiveStates = [...activeStates]
    // newActiveStates[index] = !newActiveStates[index]
    // setActiveStates(newActiveStates)
  }

  return (
    <table
      className='t-rounded-xl t-table-auto t-w-full t-border t-text-black font-inter  t-text-[12px] md:t-text-[16px] t-whitespace-nowrap'
      style={{borderCollapse: 'separate', borderSpacing: '0 0px'}}
    >
      <thead className='t-rounded-xl '>
        <tr className='t-rounded-xl t-bg-[#FAFAFA]  t-font-semibold t-w-full'>
          <td className='t-px-4 t-py-7 t-text-center t-rounded-tl-lg '>Full Name</td>
          <td className='t-px-4 t-py-7 t-text-center  '>Email</td>
          <td className='t-px-4 t-py-7 t-text-center  '>Invited By</td>
          <td className='t-px-4 t-py-7 t-text-center  '>Permission</td>
          <td className='t-px-4 t-py-7 t-text-center  '>Actions</td>
          <td className='t-px-4 t-py-7 t-text-center  '>Status</td>
          <td className='t-px-4 t-py-7 t-text-center t-rounded-tr-lg '>Joining Date</td>
        </tr>
      </thead>
      <tbody className='t-rounded-xl t-bg-white '>
        {data.length > 0 &&
          data?.map((row, index) => (
            <tr key={row.id} className='t-border-t t-rounded-xl'>
              <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                {row?.firstName + ' ' + row?.lastName}
              </td>

              <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                <Tag color='blue' className='t-text-[12px] md:t-text-[16px] t-py-0.5'>
                  {row.email}
                </Tag>
              </td>
              <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                <Tag color='red' className='t-text-[12px] md:t-text-[16px] t-py-0.5'>
                  {row.createdBy?.firstName}
                </Tag>
              </td>
              <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                <Tag color='green' className='t-text-[12px] md:t-text-[16px] t-py-0.5'>
                  {/* {row.role} Access */}
                  {handleAccess(row.role)}
                </Tag>
              </td>

              <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                <Tag color='orange' className='t-text-[12px] md:t-text-[16px] t-py-0.5'>
                  {/* {row.action} */}
                  Active
                </Tag>
              </td>
              <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                <Switch
                  checked={row?.status}
                  onChange={() => handleToggleChange(index)}
                  checkedChildren='Active'
                  unCheckedChildren='Pending'
                  style={{backgroundColor: row?.status ? '#55B659' : '#FF6461'}}
                />
              </td>
              <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                {row?.joiningDate
                  ? format(parseISO(row?.joiningDate), 'dd MMM yyyy')
                  : 'Pending...'}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default TeamTable
