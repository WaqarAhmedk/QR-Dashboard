/* eslint-disable jsx-a11y/anchor-is-valid */

import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from 'store'
import {useEffect, useState} from 'react'
import {getAllQrCodes} from 'store/qrStore/qrAction'
import {Spin, Switch} from 'antd'
import {Button} from 'react-bootstrap'
let users = [
  {
    User: 1,
    Name: 'John Doe',
    Email: 'john.doe@example.com',
    Role: 'Admin',
    Status: 'Active',
    Action: 'Edit',
  },
  {
    User: 2,
    Name: 'User 2',
    Email: 'user2@example.com',
    Role: 'Admin',
    Status: 'Active',
    Action: 'Edit',
  },
  {
    User: 3,
    Name: 'User 3',
    Email: 'user3@example.com',
    Role: 'Admin',
    Status: 'Active',
    Action: 'Edit',
  },
  {
    User: 4,
    Name: 'User 4',
    Email: 'user4@example.com',
    Role: 'Admin',
    Status: 'Active',
    Action: 'Edit',
  },
  {
    User: 5,
    Name: 'User 5',
    Email: 'user5@example.com',
    Role: 'Admin',
    Status: 'Active',
    Action: 'Edit',
  },
  {
    User: 6,
    Name: 'User 6',
    Email: 'user6@example.com',
    Role: 'Admin',
    Status: 'Active',
    Action: 'Edit',
  },
  {
    User: 7,
    Name: 'User 7',
    Email: 'user7@example.com',
    Role: 'Admin',
    Status: 'Active',
    Action: 'Edit',
  },
  {
    User: 8,
    Name: 'User 8',
    Email: 'user8@example.com',
    Role: 'Admin',
    Status: 'Active',
    Action: 'Edit',
  },
  {
    User: 9,
    Name: 'User 9',
    Email: 'user9@example.com',
    Role: 'Admin',
    Status: 'Active',
    Action: 'Edit',
  },
  {
    User: 10,
    Name: 'User 10',
    Email: 'user10@example.com',
    Role: 'Admin',
    Status: 'Active',
    Action: 'Edit',
  },
]

export function AdminRecycleBin() {
  const handleToggleChange = (index: number) => {
    // const newActiveStates = [...activeStates]
    // newActiveStates[index] = !newActiveStates[index]
    // setActiveStates(newActiveStates)
  }
  return (
    <div className='t-flex t-flex-col t-gap-8 t-h-full'>
      <div>
        <h3 className='t-font-bold t-my-2 t-text-[24px]'>Recycle Bin (Deleted Users)</h3>
      </div>
      <div className=' t-overflow-x-scroll'>
        <table
          className='t-rounded-xl t-table-auto t-w-full t-border t-text-black font-inter  t-text-[12px] md:t-text-[16px] t-whitespace-nowrap'
          style={{borderCollapse: 'separate', borderSpacing: '0 0px'}}
        >
          <thead className='t-rounded-xl '>
            <tr className='t-rounded-xl t-bg-[#FAFAFA]  t-font-semibold t-w-full'>
              <td className='t-px-4 t-py-7 t-text-center  '>User Id</td>
              <td className='t-px-4 t-py-7 t-text-center  '>Name</td>
              <td className='t-px-4 t-py-7 t-text-center  '>Email</td>
              <td className='t-px-4 t-py-7 t-text-center  '>Role</td>
              <td className='t-px-4 t-py-7 t-text-center  '>Status</td>
              <td className='t-px-4 t-py-7 t-text-center  '>Action</td>
            </tr>
          </thead>
          <tbody className='t-rounded-xl t-bg-white '>
            {users.length > 0 &&
              users.map((user, index) => {
                return (
                  <tr>
                    <td className='t-border-b t-px-4 t-py-7 t-text-center '>{user.User}</td>
                    <td className='t-border-b t-px-4 t-py-7 t-text-center '>{user.Name}</td>{' '}
                    <td className='t-border-b t-px-4 t-py-7 t-text-center '>{user.Email}</td>{' '}
                    <td className='t-border-b t-px-4 t-py-7 t-text-center '>{user.Role}</td>{' '}
                    <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                      <Switch
                        checked={user.Status === 'Active' ? true : false}
                        onChange={() => handleToggleChange(index)}
                        checkedChildren='Active'
                        unCheckedChildren='Pending'
                        style={{backgroundColor: user.Status === 'Active' ? '#55B659' : '#FF6461'}}
                      />
                    </td>
                    <td className='t-border-b t-px-4 t-py-7 t-text-center t-flex t-justify-center t-gap-2 '>
                      <Button className='t-bg-[#FD7172]'>Delete </Button>
                      <Button className='t-bg-[#02AEDE]'>Restore</Button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminRecycleBin
