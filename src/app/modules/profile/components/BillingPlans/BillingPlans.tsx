/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import {QR_PRICING} from '../../../../../mock'
import PricingCard from './PricingCard'
// import imgae from '../../../../../assets/media/save10.png'
import {images} from '../../../../../assets'
import Toggle from '../../../../../_metronic/partials/qrComponents/Toggle'
import SuccessFailureModal from './SuccessFailure'
import {Spin, message} from 'antd'
import moment from 'moment'
import {getTransactions} from 'store/payment/paymentAction'
import {useDispatch} from 'react-redux'
import {AppDispatch} from 'store'
export function BillingPlans() {
  const location = useLocation()
  const [isAnnual, setIsAnnual] = useState(false)
  const [plan, setPlan] = useState(null)
  const [loader, setLoader] = useState(true)
  const [subscriptiondocId, setSubscriptiondocId] = useState(null)
  const [price, setprice] = useState(null)
  const [cancelRequest, setCancelRequest] = useState(null)
  const [subscription, setSubscription] = useState(null)
  const [change, setChange] = useState(false)
  const [update, setUpdat] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const [freeTrial, setFreeTrial] = useState<any>({})
  const [currentPlan, setCurrentPlan] = useState<any>(null)
  const user: any = JSON.parse(localStorage.getItem('userInfo') || '')
  const navigate = useNavigate()
  const token = user?.token

  function fold() {
    // console.log('status', status)
    // useEffect(() => {
    //   if (status === 'success') {
    //     setOpenModal(true)
    //     setPaidStatus(true)
    //   } else if (status === 'fail') {
    //     setOpenModal(true)
    //     setPaidStatus(false)
    //   }
    // }, [status])
    // useEffect(() => {
    //   getPlan()
    // }, [])
    // const getPlan = () => {
    //   setLoader(true)
    //   axios(process.env.REACT_APP_QR_API + 'plan/get-plan', {
    //     method: 'GET',
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //     .then((response) => {
    //       if (response.data.msg === 'Data Found') {
    //         setSubscription(response.data.data.paymentStatus)
    //         setSubscriptiondocId(response.data.data.id)
    //         setPlan(response.data.data.selectedPlan)
    //         setprice(response.data.data.amount)
    //         setCancelRequest(response.data.data.appliedToCancelled)
    //         const foundObject = QR_PRICING.find(
    //           (obj) => obj.Type.toLowerCase() === response?.data?.data?.selectedPlan
    //         )
    //         setCurrentPlan(foundObject)
    //         if (foundObject) {
    //           if (response.data.isTrail) {
    //             setFreeTrial({
    //               trial: response.data.isTrail,
    //               start: moment(response.data.current_period_start).format('MMM DD YYYY'),
    //               end: moment(response.data.current_period_end).format('MMM DD YYYY'),
    //             })
    //           }
    //         }
    //       } else {
    //         setSubscription(null)
    //         setCurrentPlan(null)
    //         setFreeTrial({})
    //       }
    //     })
    //     .catch((error) => console.error(error))
    //     .finally(() => {
    //       setUpdat(false)
    //       setLoader(false)
    //     })
    // }
    // const handleUpdatSubscription = async (item: any) => {
    //   try {
    //     // convert this to small case here.
    //     const API_URL = process.env.REACT_APP_QR_API + 'plan/change-plan'
    //     const data = {
    //       annualPurchase: isAnnual,
    //       selectedPlan: item.Type.toLowerCase(),
    //       price: item.price,
    //     }
    //     const response = await axios.post(API_URL, data, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     getPlan()
    //   } catch (error) {
    //     console.log(error)
    //     console.error(error)
    //   }
    // }
    // const handleUpgrade = async () => {
    //   setUpdat(true)
    // }
    // const handleCancelPlan = async (cancelRequest: any) => {
    //   setLoader(true)
    //   try {
    //     if (cancelRequest) {
    //       const API_URL = process.env.REACT_APP_QR_API + 'plan/revoke-plan'
    //       const data = {subscriptionId: subscriptiondocId}
    //       const response = await axios.post(API_URL, data, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       })
    //       if (response.data.success) {
    //         setTimeout(() => {
    //           message.info(response.data.msg)
    //           getPlan()
    //           setLoader(false)
    //         }, 3000)
    //         setChange(!change)
    //       } else {
    //         message.info(response.data.msg)
    //       }
    //     } else {
    //       const API_URL = process.env.REACT_APP_QR_API + 'plan/cancel-plan'
    //       const data = {subscriptionId: subscriptiondocId}
    //       const response = await axios.post(API_URL, data, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       })
    //       if (response.data.success) {
    //         // message.info(response.data.msg)
    //         getPlan()
    //         setLoader(false)
    //         // }, 3000)
    //         setChange(!change)
    //       } else {
    //         alert(response.data.msg)
    //       }
    //     }
    //   } catch (error) {
    //     console.error(error)
    //   }
    // }
    // if (loader) {
    //   return (
    //     <div className='t-w-full t-flex t-items-center t-justify-center'>
    //       <Spin />
    //     </div>
    //   )
    // }
  }

  useEffect(() => {
    dispatch(getTransactions())
  }, [])
  const goToBilling = () => {
    navigate('/crafted/pages/billing')
  }
  return (
    <div className='t-flex t-flex-col t-gap-3 t-items-start'>
      <p
        onClick={goToBilling}
        className='t-text-[#1E1E2D] t-text-xl t-cursor-pointer t-font-semibold'
      >
        <span className='t-mr-2'>&#8592;</span>
        Back to billing
      </p>
      <section className=' layout-container px-[20px] lg:px-[80px] xl:px-[121px] t-text-[#303038]'>
        <div className='t-bg-white t-shadow-md t-px-[15px] sm:t-px-[34px] t-py-10 t-flex t-flex-col t-items-center t-rounded-xl '>
          <div className='t-flex t-flex-col t-gap-3 t-text-center t-justify-center'>
            <p className='t-text-[32px] t-font-bold'>Payment Plans</p>
            <p className='t-text-[16px]'>Choose a plan that's right for you</p>
            <div className='t-flex t-justify-around t-items-center t-gap-3 t-relative'>
              <p className='breif t-text-[16px]'>Pay Monthly</p>
              <Toggle
                setvalue={(e: any) => {
                  setIsAnnual(e)
                }}
              />
              <div className='t-relative t-flex t-justify-center'>
                <p className='breif t-text-[16px]'>Pay Annual</p>

                <img
                  src={images.underline}
                  alt='underline'
                  width={200}
                  height={200}
                  className='t-w-20 t-absolute -t-bottom-4 t-hidden lg:t-block'
                />
              </div>
              <img
                src={images.save10}
                alt='save25Percent'
                width={180}
                height={180}
                className='t-hidden lg:t-block t-absolute -t-right-56 -t-bottom-5'
              />
            </div>
          </div>

          <div className=' t-w-full t-overflow-auto'>
            <div className='t-w-full t-h-[1px] t-bg-gray-200 t-mt-12' />
            <div className='t-grid t-grid-cols-6 t-min-w-[700px]'>
              {QR_PRICING.map((item, key) => {
                return <PricingCard isAnnual={isAnnual} {...item} key={key} />
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
