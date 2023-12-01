import {toAbsoluteUrl} from '_metronic/helpers'
import {Switch} from 'antd'
import React from 'react'
import {Button} from 'react-bootstrap'

export default function ClientDetails() {
  return (
    <div className=' '>
      <div className=' t-w-full'>
        <div className='t-flex t-justify-between t-mb-5'>
          <h2 className='t-text-2xl t-font-bold'>Client Details</h2>
          <img src={toAbsoluteUrl('/media/svg/qr_dashboard/cross.svg')} height={20} width={20} />
        </div>
        <div className='t-grid t-grid-cols-2 t-gap-4 375:t-grid-cols-1 500:t-grid-cols-8'>
          <div className='t-items-center t-bg-[white] t-py-10 t-col-span-3'>
            <div className='t-flex t-flex-col t-items-center t-mb-3'>
              <img
                src={require('../../../../../../assets/media/ava.png')}
                height={70}
                width={70}
                className='t-rounded-full'
              />{' '}
              <h2 className='t-text-xl t-mt-4 t-font-bold'>NESL IT</h2>
              <h3 className='t-text-xl t-mt-2 t-text-[green]'>1</h3>
              <h3 className='t-text-xl t-mt-2 t-text-[green]'>id:0001</h3>
            </div>
            <hr className='t-mx-5' />

            <div className='t-flex t-flex-col t-items-center t-mt-5 t-mb-5'>
              <img
                src={toAbsoluteUrl('/media/icons/duotune/communication/com002.svg')}
                height={20}
                width={20}
                className='t-text-[green]'
              />
              <h2 className='t-text-lg  t-mt-2'>waqar.nesliti@gmail.com</h2>
            </div>
            <hr className='t-mx-5' />
            <div className='t-flex t-flex-col t-items-center t-mt-5 t-mb-5'>
              <img
                src={toAbsoluteUrl('/media/icons/duotune/communication/com003.svg')}
                height={20}
                width={20}
                className='t-text-[green]'
              />
              <h2 className='t-text-lg  t-mt-2'>31232323213</h2>
            </div>
            <hr className='t-mx-5' />
            <div className='t-flex t-flex-col t-items-center t-mt-5 t-mb-5'>
              <img
                src={toAbsoluteUrl('/media/icons/duotune/communication/com001.svg')}
                height={20}
                width={20}
                className='t-text-[green]'
              />
              <h2 className='t-text-lg  t-mt-2'>pakistan</h2>
            </div>
            <hr className='t-mx-5' />
            <div className='t-flex  t-p-5 t-mt-5  t-items-center t-justify-between'>
              <Button>Reset Password</Button>
              <Switch
                // checked={row?.status}
                // onChange={() => handleToggleChange(index)}
                checkedChildren='Active'
                unCheckedChildren='Pending'
                style={{backgroundColor: '#FF6461'}}
              />
            </div>
          </div>
          <div className=' t-p-5 t-col-span-5'>
            <div className='t-bg-[white] t-flex t-flex-col t-p-5 t-rounded '>
              <h1 className='t-text-2xl t-mb-5 t-font-bold'>Your Subscription</h1>
              <div className='t-text-start'>
                <h2 className='t-font-bold t-text-xl '>Free Plan</h2>
                <h4 className='t-text-xl t-mt-2'>Last updated : 32/34/32</h4>
              </div>
              <div className='t-text-start t-mt-3'>
                <h2 className='t-font-bold t-text-xl '> 1 Seat</h2>
                <h4 className='t-text-xl t-mt-2'>Last updated : 32/34/32</h4>
              </div>
            </div>

            <div className='t-bg-[white]  t-flex t-flex-col t-p-5 t-rounded  t-mt-10'>
              <h1 className='t-font-bold t-text-2xl t-mb-5'>Next Bill</h1>
              <div className='t-bg-[#8DBFCA]'>
                <h4 className='t-text-xl t-mt-2 t-p-5 t-w-[150px] t-text-center t-font-bold '>
                  40$
                </h4>
              </div>
            </div>
            <div className='t-bg-[white]  t-p-5 t-mt-5'>
              <div className='t-p-5 t-border'>
                <h1 className='t-text-2xl'>Payment details</h1>
                <div className='t-bg-[#FFFFFF] t-mt-2'>
                  <h2 className='t-text-lg t-border t-p-5'> No detials Available</h2>
                </div>
              </div>
              <div className='t-p-5 t-border t-mt-2'>
                <h1 className='t-text-2xl'>Billing Address</h1>
                <div className='t-bg-[#FFFFFF] t-mt-2'>
                  <h2 className='t-text-lg t-border t-p-5'> No detials Available</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='t-grid t-grid-cols-2 t-gap-2 375:t-grid-cols-1 '>
          <div className='375:t-w-[80vw] 500:t-w-auto t-mt-5 t-mb-5'>
            <div className='t-mb-3'>
              <h2 className='t-text-2xl t-font-bold '>Transaction History</h2>
              <hr />
            </div>
            <div className='t-overflow-x-scroll'>
              <table
                className='t-rounded-xl t-table-auto t-w-full t-border t-text-black font-inter  t-text-[12px] md:t-text-[16px] t-whitespace-nowrap'
                style={{borderCollapse: 'separate', borderSpacing: '0 0px'}}
              >
                <thead className='t-rounded-xl '>
                  <tr className='t-rounded-xl t-bg-[#FAFAFA]  t-font-semibold t-w-full'>
                    <td className='t-px-4 t-py-7 t-text-center  '>Date</td>
                    <td className='t-px-4 t-py-7 t-text-center  '>Amount</td>
                    <td className='t-px-4 t-py-7 t-text-center  '>Status</td>
                    <td className='t-px-4 t-py-7 t-text-center  '>Invoice</td>
                  </tr>
                </thead>
                <tbody className='t-rounded-xl t-bg-white '>
                  <td className='t-border-b t-px-4 t-py-7 t-text-center '>12-33-22</td>{' '}
                  <td className='t-border-b t-px-4 t-py-7 t-text-center '>20</td>{' '}
                  <td className='t-border-b t-px-4 t-py-7 t-text-center '>paid</td>
                  <td className='t-border-b t-px-4 t-py-7 t-text-center '>paid</td>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
