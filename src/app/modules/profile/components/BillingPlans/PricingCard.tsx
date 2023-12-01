import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import {json} from 'stream/consumers'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from 'store'
import {createPayment, updatePayment} from 'store/payment/paymentAction'

interface Props {
  Type?: string
  price?: string
  dynamic?: string
  scans?: string
  users?: number
  analytics?: string
  bulk?: boolean
  maxResolution?: string
  QRShapes?: boolean
  whiteLabeling?: boolean
  popular?: boolean
  buttonType?: string
  header?: boolean
  isAnnual: boolean
}

const PricingCard: React.FC<Props> = ({
  Type,
  price,
  dynamic,
  scans,
  users,
  analytics,
  bulk,
  maxResolution,
  QRShapes,
  popular,
  whiteLabeling,
  isAnnual,
  header = false,
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const {user} = useSelector((state: any) => state.user)
  const [buttonText, setButtonText] = useState('Subscribe')

  const {billingInfo, loading} = useSelector((state: any) => state.payment)

  const subscription = useEffect(() => {
    if (billingInfo?.paymentStatus && billingInfo?.stripeSubscriptionStatus === 'paid') {
      setButtonText('Upgrade')
    }
  }, [billingInfo?.paymentStatus])

  const handleSubscribeClick = () => {
    if (!loading) {
      if (billingInfo?.stripeSubscriptionStatus === 'paid') {
        dispatch(
          updatePayment({
            isAnnual,
            selectedPlan: Type,
          })
        )
      } else {
        dispatch(
          createPayment({
            isAnnual,
            selectedPlan: Type,
            fromHomePage: false,
          })
        )
      }
    }
  }

  return (
    <div
      className={`${
        popular ? 't-bg-[#1E1E2D] t-text-white ' : ' t-text-[#303038] '
      } t-flex-column  t-row t-items-center t-font-medium`}
    >
      <div className='t-relative t-px-2 lg:t-px-5 t-py-2.5 t-flex t-flex-col t-gap-2 t-items-center t-border-b t-border-gray-200 t-w-full t-h-[209px]   '>
        {popular ? (
          <p className='t-m-auto t-absolute t-top-4 t-text-[#303038] t-font-semibold t-bg-white t-rounded-full t-px-3 t-py-1 t-text-[12px] lg:t-text-[14px] xl:t-text-[16px]'>
            Most Popular
          </p>
        ) : (
          ''
        )}

        <div className='t-pt-16 t-text-center md:t-pb-5'>
          <div className='t-flex-col t-items-center '>
            <h1
              className={`t-text-[16px] xl:t-text-[18.7px] t-font-bold t-italic t-mb-5 font-inter ${
                popular ? 't-text-white' : ''
              } `}
            >
              {Type ? Type : 'Type '}
            </h1>
            {!header ? (
              <div className='t-flex t-items-center t-justify-center  t-gap-1 t-italic font-inter'>
                <div className='t-flex t-items-start'>
                  <p className='t-text-[14px] lg:t-text-[18.7px] t-font-bold'>$</p>
                  <p className='t-font-bold t-text-[32px]'>{price ? price : '$$'}</p>
                </div>
                <p className='t-text-[14px] lg:t-text-[16px] t-mt-2'> /mo</p>
              </div>
            ) : (
              ''
            )}
          </div>
          {!header ? (
            <p className='t-text-[14px] xl:t-text-[16px] t-font-normal'>billed annually</p>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className='t-border-b t-w-full t-leading-6 t-flex t-justify-center t-text-center t-items-center t-py-3 t-border-gray-200 t-h-[72px] md:t-h-[100px] t-text-[14px] xl:t-text-[16px]'>
        {Type !== 'Enterprise' ? (
          <p>
            {dynamic ? (
              <>
                {dynamic} Dynamic <br />
                QR Code
              </>
            ) : (
              'Dynamic QR Codes'
            )}
          </p>
        ) : (
          <p>Tiered Pricing</p>
        )}
      </div>
      <div className='t-border-b t-w-full t-flex t-leading-6 t-justify-center t-text-center t-items-center t-py-3 t-border-gray-200 t-h-[72px] md:t-h-[100px] t-text-[14px] xl:t-text-[16px]'>
        {Type !== 'Enterprise' ? (
          <p>
            {scans ? (
              <>
                {scans}
                <br />
                Scans
              </>
            ) : (
              'Scans'
            )}
          </p>
        ) : (
          <p>
            Custom no.
            <br />
            of Scans
          </p>
        )}
      </div>
      <div className='t-border-b t-w-full t-leading-6 t-flex t-justify-center t-text-center t-items-center t-py-3  t-border-gray-200 t-h-[72px] md:t-h-[100px] t-text-[14px] xl:t-text-[16px]'>
        {Type !== 'Enterprise' ? (
          <p>{users ? (users === 1 ? 'Single User' : `${users} Users`) : 'Users'}</p>
        ) : (
          <p>
            Custom no.
            <br />
            of Users
          </p>
        )}
      </div>
      <div className='t-leading-6 t-border-b t-w-full t-flex t-justify-center t-text-center t-items-center t-py-3 t-border-gray-200 t-h-[72px] md:t-h-[100px] t-text-[14px] xl:t-text-[16px]'>
        <p>{analytics ? analytics : 'Analytics'}</p>
      </div>
      <div className='t-leading-6 t-border-b t-w-full t-flex t-justify-center t-text-center t-items-center t-py-5 t-border-gray-200 t-h-[72px] md:t-h-[100px] t-text-[14px] xl:t-text-[16px]'>
        <p>{bulk === true ? 'Yes' : bulk === false ? '' : 'Bulk Uploads'}</p>
      </div>
      <div className='t-leading-6 t-border-b t-w-full t-flex t-justify-center t-text-center t-items-center t-py-5 t-border-gray-200 t-h-[72px] md:t-h-[100px] t-text-[14px] xl:t-text-[16px]'>
        <p>{maxResolution ? maxResolution : 'Max Download Resolution'}</p>
      </div>
      <div className='t-leading-6 t-border-b t-w-full t-flex t-justify-center t-text-center t-items-center t-py-5 t-border-gray-200 t-h-[72px] md:t-h-[100px] t-text-[14px] xl:t-text-[16px]'>
        <p>{QRShapes === true ? 'Yes' : QRShapes === false ? '' : 'QR Shapes'}</p>
      </div>
      <div className='t-leading-6 t-border-b t-w-full t-flex t-justify-center t-text-center t-items-center t-py-5  t-h-[72px] md:t-h-[100px] t-text-[14px] xl:t-text-[16px]'>
        <p>
          {whiteLabeling === true ? 'Yes' : whiteLabeling === false ? '' : 'White Labeling Domain'}
        </p>
      </div>

      {!header && Type?.toUpperCase() !== billingInfo?.plan && Type !== 'Enterprise' ? (
        <div className=' t-w-full t-flex t-justify-center t-text-center t-items-center t-h-[72px] md:t-h-[110px] t-py-3 t-px-3 '>
          <button
            type='button'
            onClick={handleSubscribeClick}
            className={`${
              popular
                ? 't-text-black t-bg-white t-rounded-full t-border t-border-white'
                : 't-text-black t-bg-white t-rounded-full t-border t-border-black '
            } t-px-2 xl:t-px-8 t-py-2 xl:t-py-3 t-font-semibold t-text-[14px] lg:t-text-[16px] font-IBM`}
          >
            {buttonText}
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default PricingCard
