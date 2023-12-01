import {toAbsoluteUrl} from '_metronic/helpers'
import React, {useState} from 'react'
import UserCard from './usercard'
import {AddUserModal} from './usermodals/addusermodal'
import {Button} from 'react-bootstrap'

let users = [
  {
    name: 'John Doe',
    role: 'Admin',
    email: 'john.doe@example.com',
    id: 'user123',
  },
  {
    name: 'Jane Smith',
    role: 'Editor',
    email: 'jane.smith@example.com',
    id: 'user456',
  },
  {
    name: 'Michael Johnson',
    role: 'Viewer',
    email: 'michael.johnson@example.com',
    id: 'user789',
  },
  {
    name: 'John Doe',
    role: 'Admin',
    email: 'john.doe@example.com',
    id: 'user123',
  },
  {
    name: 'Jane Smith',
    role: 'Editor',
    email: 'jane.smith@example.com',
    id: 'user456',
  },
  {
    name: 'Michael Johnson',
    role: 'Viewer',
    email: 'michael.johnson@example.com',
    id: 'user789',
  },
]

export default function AllUsers() {
  const [showadduser, setShowAddUser] = useState(false)

  return (
    <div>
      <div className='t-flex t-justify-end t-mb-10'>
        <Button
          onClick={() => {
            setShowAddUser(true)
          }}
        >
          Add User
        </Button>
      </div>
      <div className='t-grid t-grid-cols-4 t-gap-3 375:t-grid-cols-1 500:t-grid-cols-2 991:t-grid-cols-3 1110:t-grid-cols-4'>
        {users.map((user, index) => {
          return (
            <UserCard
              key={index}
              name={user.name}
              email={user.email}
              role={user.role}
              id={user.id}
            />
          )
        })}
        <AddUserModal
          show={showadduser}
          handleClose={() => {
            setShowAddUser(false)
          }}
        />
      </div>
    </div>
  )
}
