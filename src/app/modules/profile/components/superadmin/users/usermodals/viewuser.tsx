import {KTSVG, toAbsoluteUrl} from '_metronic/helpers'
import {DropdownForm} from '_metronic/partials/qrComponents'
import Input from '_metronic/partials/qrComponents/Input'
import {useFormik} from 'formik'
import {PERMISSION_LEVEL} from 'mock'
import React, {Dispatch, SetStateAction, useState, useEffect} from 'react'
import {Button, Modal} from 'react-bootstrap'
type Props = {
  show: boolean
  handleClose: () => void
  user: {
    name: string
    id: string
    role: string
    email: string
  }
}

const ViewUserModal: React.FC<Props> = ({show, user, handleClose}) => {
  return (
    <Modal
      className='modal fade'
      id='kt_modal_select_location'
      data-backdrop='static'
      tabIndex={-1}
      role='dialog'
      show={show}
      scrollable
      dialogClassName='modal-md'
      aria-hidden='true'
    >
      <div className='modal-content'>
        <div className='modal-header'>
          <h5 className='modal-title t-text-xl t-font-bold'>User Details</h5>

          <div className='btn btn-icon btn-sm btn-active-light-primary ms-2' onClick={handleClose}>
            <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-2x' />
          </div>
        </div>
        <div className='modal-body'>
          <div className='t-items-center t-bg-[white] t-py-10 t-relative'>
            <div className='t-flex t-flex-col t-items-center t-mb-3'>
              <img
                src={toAbsoluteUrl('/media/avatars/300-1.jpg')}
                height={70}
                width={70}
                className='t-rounded-full'
              />{' '}
              <h2 className='t-text-xl t-mt-4 t-font-bold'>{user.name}</h2>
              <h3 className='t-text-xl t-mt-2 t-text-[green]'>{user.role}</h3>
              <h3 className='t-text-xl t-mt-2 '>{user.id}</h3>
            </div>
            <hr className='t-mx-5' />
            <div className='t-flex t-flex-col t-items-center t-mt-2 t-mb-2'>
              <img
                src={toAbsoluteUrl('/media/icons/duotune/communication/com002.svg')}
                height={30}
                width={30}
                className='t-text-[green]'
              />
              <a className='t-text-lg  t-mt-2 t-underline t-cursor-pointer'>{user.email}</a>
            </div>
            <hr className='t-mx-5' />

            <div className='t-flex t-flex-col t-items-center t-mt-2 t-mb-2'>
              <img
                src={toAbsoluteUrl('/media/icons/duotune/communication/com003.svg')}
                height={20}
                width={20}
                className='t-text-[green]'
              />
              <h2 className='t-text-lg  t-mt-2'>31232323213</h2>
            </div>
            <hr className='t-mx-5' />
            <div className='t-flex t-flex-col t-items-center t-mt-2 t-mb-2'>
              <img
                src={toAbsoluteUrl('/media/icons/duotune/communication/com001.svg')}
                height={20}
                width={20}
                className='t-text-[green]'
              />
              <h2 className='t-text-lg  t-mt-2'>Islamabad Pakistan</h2>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export {ViewUserModal}
