import {KTSVG, toAbsoluteUrl} from '_metronic/helpers'
import {DropdownForm} from '_metronic/partials/qrComponents'
import Input from '_metronic/partials/qrComponents/Input'
import {useFormik} from 'formik'
import {PERMISSION_LEVEL} from 'mock'
import React, {Dispatch, SetStateAction, useState, useEffect} from 'react'
import {Button, Modal} from 'react-bootstrap'
import * as Yup from 'yup'
import camera from '../../../../../../../assets/media/camera.svg'
type Props = {
  show: boolean
  handleClose: () => void
  user: {
    name: string
    id: string
  }
}

const DeleteUserModal: React.FC<Props> = ({show, user, handleClose}) => {
  const initialValues = {
    firstName: 'Waqar',
    lastName: 'Ahmed',
    phone: '23232331131',
    address: 'islamabad Pakistan',
    designation: 'developer',
    country: 'Pakistan',
    state: '',
    city: 'Islamabad',
    zipCode: '323',
    email: 'waqar.neslit@gmail.com',
    permission: '',
  }

  return (
    <Modal
      className='modal fade'
      id='kt_modal_select_location'
      data-backdrop='static'
      tabIndex={-1}
      role='dialog'
      show={show}
      scrollable
      dialogClassName='modal-lg'
      aria-hidden='true'
    >
      <div className='modal-content'>
        <div className='modal-header'>
          <h5 className='modal-title t-text-xl t-font-bold t-text-[red]'>Delete User</h5>

          <div className='btn btn-icon btn-sm btn-active-light-primary ms-2' onClick={handleClose}>
            <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-2x' />
          </div>
        </div>
        <div className='modal-body'>
          <div className='t-text-xl'>
            Are you Sure you Want to Delete User{' '}
            <span className='t-text-2xl t-font-bold'>{user.name}</span> of id{' '}
            <span className='t-text-2xl t-font-bold'>{user.id}</span>
          </div>
        </div>
        <div className='modal-footer'>
          <Button>Confirm</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </div>
      </div>
    </Modal>
  )
}

export {DeleteUserModal}
