import {toAbsoluteUrl} from '_metronic/helpers'
import React, {useRef, useState} from 'react'
import {Interface} from 'readline'
import {string} from 'yup'
import {useOnClickOutside} from 'hooks/useOnClickOutside'
import {Modal} from 'react-bootstrap'
import {AddUserModal} from './usermodals/addusermodal'
import {UpdateUserModal} from './usermodals/updateusermodal'
import {DeleteUserModal} from './usermodals/deleteuserModal'
import {ViewUserModal} from './usermodals/viewuser'
interface UserCard {
  name: string
  role: string
  email: string
  id: string
}

const UserCard: React.FC<UserCard> = ({name, email, id, role}) => {
  const [opensetting, setOpenSettings] = useState(false)
  const [usertodelete, setUserToDelete] = useState({name: '', id: ''})
  const [usertoview, setUserToView] = useState({name: '', id: '', email: '', role: ''})

  const [opendelete, setOpenDelete] = useState(false)
  const [openview, setOpenView] = useState(false)
  const [openedit, setOpenEdit] = useState(false)
  const settingref = useRef<HTMLDivElement>(null)
  useOnClickOutside(settingref, () => {
    setOpenSettings(false)
  })
  return (
    <div className='t-items-center t-bg-[white] t-py-10 t-relative'>
      <img
        src={require('../../../../../../assets/media/dotsmenu.png')}
        height={5}
        width={5}
        className='t-absolute  t-right-5 t-top-5 t-cursor-pointer'
        onClick={() => {
          setOpenSettings(true)
        }}
      />

      {opensetting ? (
        <div ref={settingref}>
          <ul className='t-absolute t-z-[9999999] t-flex-column t-w-[200px] t-py-1 t-top-12 t-right-5 t-bg-white t-border t-border-greyp t-rounded-xl'>
            <li
              className='t-p-2  t-flex t-gap-3 t-items-center t-cursor-pointer  hover:t-text-blue-600'
              onClick={() => {
                setOpenSettings(false)
                setOpenEdit(true)
              }}
            >
              <img
                src={toAbsoluteUrl('/media/icons/duotune/communication/com002.svg')}
                height={30}
                width={30}
                className='t-text-[green]'
              />
              <span className='t-text-lg'>Edit</span>
            </li>
            <li
              className='t-p-2  t-flex t-gap-3 t-items-center t-cursor-pointer  hover:t-text-blue-600'
              onClick={() => {
                setUserToDelete({
                  name: name,
                  id: id,
                })
                setOpenSettings(false)
                setOpenDelete(true)
              }}
            >
              <img
                src={toAbsoluteUrl('/media/icons/duotune/general/gen027.svg')}
                height={30}
                width={30}
                className='t-text-[green]'
              />
              <span className='t-text-lg'>Delete Profile</span>
            </li>{' '}
            <li
              className='t-p-2  t-flex t-gap-3 t-items-center t-cursor-pointer hover:t-text-blue-600'
              onClick={() => {
                setUserToView({
                  name,
                  email,
                  id,
                  role,
                })
                setOpenSettings(false)
                setOpenView(true)
              }}
            >
              <img
                src={toAbsoluteUrl('/media/icons/duotune/communication/com006.svg')}
                height={30}
                width={30}
                className='t-text-[green]'
              />
              <span className='t-text-lg'>Profile</span>
            </li>
          </ul>
        </div>
      ) : (
        ''
      )}

      <div className='t-flex t-flex-col t-items-center t-mb-3'>
        <img
          src={require('../../../../../../assets/media/ava.png')}
          height={70}
          width={70}
          className='t-rounded-full'
        />{' '}
        <h2 className='t-text-xl t-mt-4 t-font-bold'>{name}</h2>
        <h3 className='t-text-xl t-mt-2 t-text-[green]'>{role}</h3>
        <h3 className='t-text-xl t-mt-2 '>{id}</h3>
      </div>
      <hr className='t-mx-5' />
      <div className='t-flex t-flex-col t-items-center t-mt-5 t-mb-5'>
        <img
          src={toAbsoluteUrl('/media/icons/duotune/communication/com002.svg')}
          height={30}
          width={30}
          className='t-text-[green]'
        />
        <a className='t-text-lg  t-mt-2 t-underline t-cursor-pointer'>{email}</a>
      </div>

      <UpdateUserModal
        show={openedit}
        handleClose={() => {
          setOpenEdit(false)
        }}
      />

      <DeleteUserModal
        show={opendelete}
        user={usertodelete}
        handleClose={() => {
          setOpenDelete(false)
        }}
      />

      <ViewUserModal
        show={openview}
        user={usertoview}
        handleClose={() => {
          setOpenView(false)
        }}
      />
    </div>
  )
}
export default UserCard
