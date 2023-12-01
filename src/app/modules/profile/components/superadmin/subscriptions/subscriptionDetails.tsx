import {toAbsoluteUrl} from '_metronic/helpers'
import React from 'react'
import {Button} from 'react-bootstrap'

export default function SubscriptionDetails() {
  return (
    <div className=' '>
      <div className=' t-w-full'>
        <div className='t-flex t-justify-between t-mb-5'>
          <h2 className='t-text-2xl t-font-bold'>Subscripton Details</h2>
          <img
            src={toAbsoluteUrl('/media/svg/qr_dashboard/cross.svg')}
            height={20}
            width={20}
          />{' '}
        </div>
        <div className='t-grid  t-gap-2 375:t-grid-cols-1 500:t-grid-cols-1 991:t-grid-cols-9'>
          <div className='t-bg-[white]   t-col-span-4'>
            <div className='t-m-3 t-p-3   t-rounded-lg'>
              <div className='t-flex t-items-center t-gap-5 t-mb-5'>
                <img
                  src={require('../../../../../../assets/media/ava.png')}
                  height={70}
                  width={70}
                  className='t-rounded-full'
                />
                <div>
                  <h2 className='t-text-2xl'>Waqar Ahmed</h2>
                  <h4 className='t-text-lg t-break-words ]'>waqar.neslit@gmail.com</h4>
                </div>
              </div>

              <div className='t-flex t-gap-4'>
                <h2 className='t-text-xl'>Subscription Name : </h2>
                <h3 className='t-text-lg'>DASAIUDADJA</h3>
              </div>
              <div className='t-flex t-gap-4 t-mt-3'>
                <h2 className='t-text-xl'>Subscription Date : </h2>
                <h3 className='t-text-lg'>23-12-32</h3>
              </div>
              <div className='t-flex t-gap-4 t-mt-3'>
                <h2 className='t-text-xl'>Subscription Date : </h2>
                <h3 className='t-text-lg'>23-12-32</h3>
              </div>
            </div>
            <hr />
            <div className='t-px-5 t-py-3'>
              <div className='t-flex t-justify-between t-mb-3 375:t-flex-col 500:t-flex-row'>
                <h2 className='t-text-xl'>Description</h2>
                <h4 className='t-text-lg 500:t-w-[200px] 375:t-w-full'>
                  Lorem Ipsum is simply dummy ofthe printing and typesetting
                </h4>
              </div>
              <div className='t-flex t-justify-between  t-mb-3  375:t-flex-col 500:t-flex-row'>
                <h2 className='t-text-xl'> Months</h2>
                <h4 className='t-text-lg t-w-[200px]  500:t-w-[200px] 375:t-w-full t-font-bold'>
                  1
                </h4>
              </div>
              <div className='t-flex t-justify-between  t-mb-3  375:t-flex-col 500:t-flex-row'>
                <h2 className='t-text-xl'> Start Date</h2>
                <h4 className='t-text-lg t-w-[200px] 500:t-w-[200px] 375:t-w-full t-font-bold'>
                  12/12/23
                </h4>
              </div>
              <div className='t-flex t-justify-between  t-mb-3  375:t-flex-col 500:t-flex-row'>
                <h2 className='t-text-xl'> End Date</h2>
                <h4 className='t-text-lg t-w-[200px] 500:t-w-[200px] 375:t-w-full t-font-bold'>
                  12/12/23
                </h4>
              </div>
              <div className='t-flex t-justify-between  t-mb-3  375:t-flex-col 500:t-flex-row'>
                <h2 className='t-text-xl'> Amount</h2>
                <h4 className='t-text-lg t-w-[200px] 500:t-w-[200px] 375:t-w-full t-font-bold'>
                  30
                </h4>
              </div>
            </div>
          </div>
          <div className='375:t-w-[80vw] 500:t-w-auto t-mt-5 t-col-span-5'>
            <div className='t-mb-3'>
              <h2 className='t-text-2xl t-font-bold'>Subscription Record</h2>
              <hr />
            </div>
            <div className='t-overflow-x-scroll'>
              <table
                className='t-rounded-xl t-table-auto t-w-full t-border t-text-black font-inter  t-text-[12px] md:t-text-[16px] t-whitespace-nowrap'
                style={{borderCollapse: 'separate', borderSpacing: '0 0px'}}
              >
                <thead className='t-rounded-xl '>
                  <tr className='t-rounded-xl t-bg-[#FAFAFA]  t-font-semibold t-w-full'>
                    <td className='t-px-4 t-py-7 t-text-center  '>Subscriptions</td>
                    <td className='t-px-4 t-py-7 t-text-center  '>PaymentId</td>
                    <td className='t-px-4 t-py-7 t-text-center  '>Start Date</td>
                    <td className='t-px-4 t-py-7 t-text-center  '>End Date</td>
                    <td className='t-px-4 t-py-7 t-text-center  '>Status</td>
                  </tr>
                </thead>
                <tbody className='t-rounded-xl t-bg-white '>
                  <td className='t-border-b t-px-4 t-py-7 t-text-center '>22d22aA2ds2daadada</td>
                  <td className='t-border-b t-px-4 t-py-7 t-text-center '>Aksa2saS21SA</td>{' '}
                  <td className='t-border-b t-px-4 t-py-7 t-text-center '>12-33-22</td>{' '}
                  <td className='t-border-b t-px-4 t-py-7 t-text-center '>12-33-22</td>{' '}
                  <td className='t-border-b t-px-4 t-py-7 t-text-center '>paid</td>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className=' 375:t-w-[80vw] 500:t-w-auto t-mt-5'>
        <div className='t-mb-5'>
          <h2 className='t-text-2xl t-font-bold'>Billing</h2>
          <hr />
        </div>
        <div className=' t-overflow-x-scroll'>
          <table
            className='t-rounded-xl t-table-auto t-w-full t-border t-text-black font-inter  t-text-[12px] md:t-text-[16px] t-whitespace-nowrap'
            style={{borderCollapse: 'separate', borderSpacing: '0 0px'}}
          >
            <thead className='t-rounded-xl '>
              <tr className='t-rounded-xl t-bg-[#FAFAFA]  t-font-semibold t-w-full'>
                <td className='t-px-4 t-py-7 t-text-center  '>Subscriptions</td>
                <td className='t-px-4 t-py-7 t-text-center  '>PaymentId</td>
                <td className='t-px-4 t-py-7 t-text-center  '>Start Date</td>
                <td className='t-px-4 t-py-7 t-text-center  '>End Date</td>
                <td className='t-px-4 t-py-7 t-text-center  '>Status</td>
                <td className='t-px-4 t-py-7 t-text-center  '>Action</td>
              </tr>
            </thead>
            <tbody className='t-rounded-xl t-bg-white '>
              <td className='t-border-b t-px-4 t-py-7 t-text-center '>aDJMKADA23MA</td>
              <td className='t-border-b t-px-4 t-py-7 t-text-center '>Akmaka2qq</td>{' '}
              <td className='t-border-b t-px-4 t-py-7 t-text-center '>12-33-22</td>{' '}
              <td className='t-border-b t-px-4 t-py-7 t-text-center '>12-33-22</td>{' '}
              <td className='t-border-b t-px-4 t-py-7 t-text-center '>paid</td>
              <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                <Button>Download</Button>
              </td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
