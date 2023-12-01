import {useEffect, useRef, useState} from 'react'
import {Button, Search2} from '../../../../../_metronic/partials/qrComponents'
import {PERMISSION_LEVEL, TEAM_COLLAB} from '../../../../../mock'
import TeamTable from './TeamTable'
import {useOnClickOutside} from '../../../../../hooks/useOnClickOutside'
import {images} from '../../../../../assets'
/* eslint-disable jsx-a11y/anchor-is-valid */
import Input from '../../../../../_metronic/partials/qrComponents/Input'
import DropdownForm from '../../../../../_metronic/partials/qrComponents/DropdownForm'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useDispatch, useSelector} from 'react-redux'
import {message, Spin} from 'antd'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {getTeamMembers, searchTeamMembers, sendInvite} from 'store/teamStore/teamAction'
import {RootState} from 'store'
import {useDebounceSearch} from 'hooks/useDebounceSearch'
import {Modal} from 'react-bootstrap'

export function TeamCollab() {
  const modalRef = useRef(null)
  const [alert, setAlert] = useState(false)
  const [addTeam, setAddTeam] = useState(false)
  const [searchTerm, setSearchTerm] = useDebounceSearch('', 50)
  const dispatch = useDispatch()
  const {team, loading} = useSelector((state: RootState) => state.team)
  useOnClickOutside(modalRef, () => {
    setAlert(false)
    setAddTeam(false)
    formik.resetForm()
  })

  useEffect(() => {
    dispatch(getTeamMembers())
  }, [])

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    permission: '',
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().trim().required('First Name is required'),
    lastName: Yup.string().trim().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    permission: Yup.string().required('Permission Level is required'),
  })

  const onSubmit = (values: any) => {
    const data = {
      role: values.permission,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
    }

    dispatch(sendInvite(data))
      .unwrap()
      .then(() => {
        setAddTeam(false)
        message.success('Invite Sent Successfully')
      })
      .catch((err: any) => {
        setAddTeam(false)
        message.error(err)
      })
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })
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
  return (
    <div className='t-relative t-flex t-h-full t-justify-center t-w-full t-overflow-hidden'>
      <div className=' t-w-full t-bg-white t-shadow-lg t-border t-py-4 t-px-4 500:t-px-8 sm:t-px-12 t-rounded-lg t-text-t2'>
        <div className='t-flex t-flex-col md:t-flex-row t-items-center t-justify-between t-flex-wrap t-flex-stack t-mb-3 md:t-px-5'>
          <h3 className='t-font-bold t-my-2 t-text-[18.7px]'>Team Collaboration </h3>

          <div className='t-flex t-flex-col 500:t-flex-row t-gap-3 md:t-gap-6 t-my-2  t-w-full 500:t-w-auto'>
            <div className='t-w-full 500:t-w-[205px] font-inter'>
              <Search2
                placeholder='Search Client'
                height='t-h-[45px]'
                onChange={handleSearch}
                value={searchTerm}
              />
            </div>
            <div className='t-relative t-w-[145px]'>
              <Button
                Name='Add Team'
                Icon='/media/svg/qr_dashboard/plus.svg'
                primary
                iconsize='svg-icon-6'
                className='t-w-full t-h-[45px]'
                click={() => {
                  setAddTeam(true)
                  formik.resetForm()
                }}
              />
            </div>
          </div>
        </div>
        <Spin spinning={loading}>
          {!loading && (
            <div className='t-overflow-auto t-max-h-[650px]'>
              <TeamTable data={team} />
            </div>
          )}
        </Spin>
        {/* {alert || addTeam ? (
          <div className='t-fixed t-top-0 t-left-0 t-w-[100vw] t-h-[100vh] t-z-[999999] t-bg-[rgba(0,0,0,0.5)] t-flex t-items-center t-justify-center t-px-3'></div>
        ) : (
          ''
        )} */}
      </div>
      {alert ? (
        <div
          ref={modalRef}
          className='t-absolute t-bg-white t-px-16 t-py-20 t-w-[90%] 500:t-w-[75%] t-z-[9999999] t-flex t-flex-col t-items-center t-justify-center t-gap-6 t-rounded-2xl'
        >
          <img src={images.alert} alt='scanQr' className='' />
          <h3 className='t-text-[18.7px]  t-text-black'>Alert Message</h3>
        </div>
      ) : (
        ''
      )}

      <Modal show={addTeam} scrollable dialogClassName='modal-md' className='t-mt-[50px]'>
        <div className='t-bg-white t-flex t-flex-col t-gap-6 t-p-7 t-h-full t-overflow-scroll'>
          <div className='t-flex t-flex-row t-items-center t-justify-between'>
            <h3 className='t-text-[16px] md:t-text-[20px] t-text-black t-font-bold'>
              Add New User
            </h3>
            <div
              className='t-cursor-pointer t-flex t-items-center t-justify-center'
              onClick={() => {
                setAddTeam(false)
                formik.resetForm()
              }}
            >
              <KTSVG
                path='/media/svg/qr_dashboard/cross.svg'
                svgClassName='t-w-[10px]'
                className='t-w-[10px] svg-icon-1'
              />
            </div>
          </div>
          <form onSubmit={formik.handleSubmit} className='t-flex t-flex-col t-gap-3 '>
            <div className='t-flex t-flex-col t-gap-1 font-inter'>
              <p className='t-text-[14px] md:t-text-[16px] t-font-medium'>First Name:</p>
              <div className='t-w-full'>
                <Input
                  type='text'
                  name='firstName'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Enter First Name'
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className='t-text-[#ff0000]'>{formik.errors.firstName}</div>
                )}
              </div>
            </div>
            <div className='t-flex t-flex-col t-gap-1 font-inter'>
              <p className='t-text-[14px] md:t-text-[16px] t-font-medium'>Last Name:</p>
              <div className='t-w-full'>
                <Input
                  type='text'
                  name='lastName'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Enter Last Name'
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className='t-text-[#ff0000]'>{formik.errors.lastName}</div>
                )}
              </div>
            </div>
            <div className='t-flex t-flex-col t-gap-1 font-inter'>
              <p className='t-text-[14px] md:t-text-[16px] t-font-medium'>Email:</p>
              <div className='t-w-full'>
                <Input
                  type='email'
                  name='email'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='you@company.com'
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='t-text-[#ff0000]'>{formik.errors.email}</div>
                )}
              </div>
            </div>
            <div className='t-flex t-flex-col t-gap-1 font-inter'>
              <p className='t-text-[14px] md:t-text-[16px] t-font-medium'>Permission:</p>
              <div className='t-w-full'>
                <DropdownForm
                  selectOption={formik.setFieldValue}
                  name='permission'
                  // value={formik.values.permission}
                  title='Select Permission Level'
                  listItems={PERMISSION_LEVEL}
                />
                {formik.touched.permission && formik.errors.permission && (
                  <div className='t-text-[#ff0000]'>{formik.errors.permission}</div>
                )}
              </div>
            </div>
            <button
              type='submit'
              className='t-bg-[#1E1E2D] t-mt-5 t-h-[50px] md:t-h-[60px] t-text-white t-rounded-[12px] font-inter t-text-[16px] t-font-semibold'
            >
              Send Invitation
            </button>
          </form>
        </div>
      </Modal>
    </div>
  )
}
