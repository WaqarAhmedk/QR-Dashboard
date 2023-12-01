import React, {useEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {IProfileDetails, profileDetailsInitValues as initialValues} from '../SettingsModel'
import {confirmOtp, getUser, sendOpt, updateEmail, updateUser} from 'store/userStore/userActions'
import * as Yup from 'yup'
import {useFormik, useFormikContext} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '_metronic/layout/components/macros/Loader'
import {Spin, message} from 'antd'
import camera from '../../../../../../../src/assets/media/camera.svg'
import {Button, Dropdown, DropdownButton, FormControl} from 'react-bootstrap'
import './style.css'
const {axiosInstance} = require('../../../../../../axios/index')
const profileDetailsSchema = Yup.object().shape({
  picture: Yup.string(),
  name: Yup.string().required(' Name is required'),
  email: Yup.string().required('Email is required'),
  location: Yup.string().required('Location is required'),
  industry: Yup.string().required('Industry is required'),
  role: Yup.string().required('Role is required'),
})

const ProfileDetails = () => {
  const {user} = useSelector((state) => state.user)
  const [imageloading, setimageLoading] = useState(false)
  const [data, setData] = useState(user)
  const [tempUser, setTempUser] = useState()
  const updateData = (fieldsToUpdate) => {
    const updatedData = Object.assign(data, fieldsToUpdate)
    setData(updatedData)
  }

  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const [imgUrl, setImgUrl] = useState(null)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: user,
    validationSchema: profileDetailsSchema,
    onSubmit: (values) => {
      values = {...values, picture: imgUrl}
    },
  })
  const uploadFileGCP = async (file) => {
    const form = new FormData()

    for (let i = 0; i < file.length; i++) {
      form.append('files', file[i])
    }

    try {
      const response = await axiosInstance.post(`/resource`, form)
      setImgUrl(response[0].url)
      message.success('Image Uploaded Successfully')
      setimageLoading(false)
    } catch (err) {
      console.log(err)
      alert(err.message)
      // Toast.error('err while uploading file', {
      //   toastId: 'There is a problem while fetching qr',
      // })
    }
  }
  const [opt, setOpt] = useState()
  const handleChange = (event) => {
    setOpt(event.target.value)
  }
  useEffect(() => {
    if (user.picture) {
      setImgUrl(user.picture)
    } else {
    }
  }, [user])
  const [countries, setCountries] = useState([])
  useEffect(() => {
    const fetchCountryNames = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const data = await response.json()
        const countryNames = data.map((country) => country.name.common)
        setCountries(countryNames)
      } catch (error) {
        console.error('Error fetching country names:', error)
      }
    }

    fetchCountryNames()
  }, [])

  const handleConfirmOtp = () => {
    delete tempUser.otp
    dispatch(
      confirmOtp({
        user: tempUser,
        otp: parseInt(opt),
      })
    )
      .unwrap()
      .then((res) => {
        message.success(res.message)
      })
      .catch((err) => message.error(err))
      .finally(setOpt(''), setModal(false))
  }
  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header t-border cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Profile Details</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form
          noValidate
          onSubmit={async (event) => {
            event.preventDefault()
            formik.values = {...formik.values, picture: imgUrl}
            if (user?.email?.trim() !== formik?.values.email?.trim()) {
              dispatch(sendOpt({email: formik.values.email}))
                .unwrap()
                .then(() => {
                  setModal(true)
                  setTempUser(formik.values)
                })
            } else {
              await dispatch(updateUser(formik.values))
              message.success({
                content: 'User Updated Successfully',
                key: 'updated',
              })
            }
          }}
          className='form'
        >
          <div className='card-body border-top p-9'>
            <div className='row mb-10'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
              <div className='t-flex t-items-center t-justify-center t-gap-6 t-bg-lightGreen t-p-4 t-rounded-xl'>
                <div className='t-relative'>
                  {imageloading ? (
                    <Spin size='lg' className='t-absolute t-top-[50%] t-left-[50%]' />
                  ) : (
                    ''
                  )}
                  {imgUrl ? (
                    <img
                      src={imgUrl?.preview ? imgUrl?.preview : imgUrl}
                      className={`t-min-w-[160px] t-items-center t-flex t-justify-center t-max-w-[160px] t-h-[160px]  t-rounded-[100px] ${
                        imageloading ? 't-opacity-80' : 't-opacity-100'
                      }`}
                      alt='User avatar'
                    />
                  ) : (
                    <div className='t-text-white t-min-w-[120px] t-min-h-[120px] bg-primary t-flex t-flex-col t-justify-center items-center  t-pt-2 t-text-center  t-text-7xl t-rounded-full'>
                      {`${
                        user && user?.firstName[0]?.toUpperCase()
                      }${user?.lastName[0]?.toUpperCase()}`}
                    </div>
                  )}
                  <div className='t-p-3 t-cursor-pointer t-w-[40px]  t-absolute t-bottom-1 t-right-0 t-rounded-[100px] t-flex t-items-center t-bg-primary'>
                    <label htmlFor='filePicker'>
                      <input
                        id='filePicker'
                        type='file'
                        className='t-hidden'
                        onChange={(e) => {
                          setimageLoading(true)

                          const file = e.target.files[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = async () => {
                              setImgUrl({
                                file: file,
                                preview: reader.result,
                              })
                            }
                            uploadFileGCP(e.target.files)

                            reader.readAsDataURL(file)
                          }
                        }}
                      />
                      <img src={camera} className='t-w-full t-cursor-pointer' alt='Camera Icon' />
                    </label>
                  </div>
                </div>
              </div>
              {/* <div className='col-lg-8'>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div
                    className='image-input-wrapper w-[125px] h-125px t-relative'
                    style={{
                      borderRadius: '100px',
                    }}
                  >
                    {imgUrl ? (
                      <img
                        style={{
                          borderRadius: '100px',
                        }}
                        className='max-h-[120px] max-w-[120px] '
                        src={imgUrl?.preview ? imgUrl?.preview : imgUrl}
                        height={120}
                        width={120}
                      />
                    ) : (
                      <div className='text-white bg-primary t-h-full t-w-full t-pt-10  t-text-center  t-text-6xl t-rounded-full'>
                        {user?.firstName[0]?.toUpperCase() + user?.lastName[0]?.toUpperCase()}
                      </div>
                    )}

                    {imageloading ? (
                      'Uploading Profile...'
                    ) : (
                      <input
                        type='file'
                        className=' t-mt-4'
                        onChange={(e) => {
                          setimageLoading(true)

                          const file = e.target.files[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = async () => {
                              setImgUrl({
                                file: file,
                                preview: reader.result,
                              })
                            }
                            uploadFileGCP(e.target.files)

                            reader.readAsDataURL(file)
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              </div> */}
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>First Name</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='First name'
                      {...formik.getFieldProps('firstName')}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.firstName}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Last Name</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Last name'
                      {...formik.getFieldProps('lastName')}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.lastName}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Email</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Email Address'
                      {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.email}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Location</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <DropdownButton
                      variant='secondary'
                      title={formik.values.location ? formik.values.location : 'Select a location'}
                    >
                      {countries.map((locationName, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => formik.setFieldValue('location', locationName)}
                        >
                          {locationName}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                    {formik.touched.location && formik.errors.location && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.location}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Industry</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Industry'
                      {...formik.getFieldProps('industry')}
                    />
                    {formik.touched.industry && formik.errors.industry && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.industry}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Role</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      disabled
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0 '
                      placeholder='First name'
                      {...formik.getFieldProps('role')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='submit' className='btn btn-primary'>
              Save Changes
            </button>
          </div>
          {modal && (
            <div className='t-fixed t-top-0 t-left-0 t-w-[100vw] t-h-[100vh] t-z-[999999] t-bg-[rgba(0,0,0,0.6)] t-flex t-items-center t-justify-center t-px-3'>
              <div className='t-bg-white t-px-16 t-py-12 t-w-[587px] t-flex t-flex-col t-items-center t-justify-center t-gap-10 t-rounded-2xl'>
                <div className='  t-w-full '>
                  <div className='t-flex t-flex-col t-gap-2'>
                    <h3 className='t-font-semibold t-text-xl md:t-text-2xl lg:t-text-3xl'>
                      Email Update
                    </h3>
                    <p className='t-mb-2'>
                      A confirmation email has been sent to the email you provided along with an
                      OPT. Type the OPT below to verify your new email address
                    </p>
                  </div>
                  <FormControl
                    type='opt'
                    placeholder='Enter the requested OPT here...'
                    value={opt}
                    onChange={handleChange}
                  />
                </div>
                <div className='t-flex t-items-center t-justify-between t-gap-12 t-w-full t-text-[16px]'>
                  <Button variant='secondary' type='button' onClick={() => setModal(false)}>
                    Cancel
                  </Button>
                  <Button variant='primary' type='button' onClick={handleConfirmOtp}>
                    Confirm Otp
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='submit' className='btn btn-primary' disabled={loading}>
              {!loading && 'Save Chanssssges'}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div> */}
        </form>
      </div>
    </div>
  )
}

export {ProfileDetails}
