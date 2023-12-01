/* eslint-disable jsx-a11y/anchor-is-valid */
import {QR_CODE, QR_CARD_DATE} from '../../../../../mock'
import Card from '../../../../../_metronic/partials/content/cards/Card'
import Button from '../../../../../_metronic/partials/qrComponents/Button'
import Dropdown from '../../../../../_metronic/partials/qrComponents/Dropdown'
import CardSelection from './CardSelection'
import {useEffect, useRef, useState} from 'react'
import {createFolder, createLabel, getUserQrFolders, getUserQrLabels} from 'store/qrStore/qrAction'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from 'store'
import Input from '../../../../../_metronic/partials/qrComponents/Input'
import * as authHelper from '../../../auth/core/AuthHelpers'
import {useOnClickOutside} from '../../../../../hooks/useOnClickOutside'
import {Empty, Spin, message} from 'antd'
import './style.css'
import PaginationComponent from 'app/modules/pagination/pagination'
import {
  Modal,
  Button as BootstrapButton,
  Dropdown as BootstrapDropdown,
  FormControl,
} from 'react-bootstrap'
import {locationInfo, updateUser} from 'store/userStore/userActions'
interface cardItemType {
  name: string
  createdDate: Date
  qrs?: number
  id?: string
  owner?: string
}

export function QrCodes() {
  const modalRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(modalRef, () => setNewFolder(false))
  const [newFolder, setNewFolder] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const {foldersInfo, foldersLoading, loading} = useSelector((state: RootState) => state.qr)
  const {industry: Indu, location: Loc, email} = useSelector((state: RootState) => state.user.user)
  const [folderName, setFolderName] = useState('')
  const [infoModal, setInfoModal] = useState(false)
  const roles = ['viewer', 'whiteLabel']
  const [labelmodal, setLableModal] = useState(false)
  const [label, setLabel] = useState(null)
  const role = authHelper.getAuth()?.role
  const userId = authHelper.getAuth()?.userId
  const [err, setErr] = useState<string | undefined>(undefined)
  const [displayedFolders, setDisplayedFolders] = useState<
    {
      name: string
      owner: string
      id: string
      createdAt: string
    }[]
  >([])

  const handleClicks = () => {
    setNewFolder(true)
  }
  useEffect(() => {
    const userId = authHelper.getAuth()?.userId
    dispatch(getUserQrFolders({userId, offset: 0, limit: 4}))
    dispatch(getUserQrLabels({userId}))
  }, [])

  useEffect(() => {
    if (foldersInfo?.qrFolders?.length > 0) {
      setDisplayedFolders(foldersInfo?.qrFolders?.slice(0, 4))
    }
  }, [foldersInfo?.qrFolders])

  const handleCreateLabel = () => {
    if (label === '' || label === null) {
      message.error('Please Enter a Label Name')
    } else {
      dispatch(createLabel(label))
        .unwrap()
        .then(() => {
          setLableModal(false)
          setLabel(null)
        })
        .catch(() => {
          setLableModal(false)
        })
    }
  }

  function isValidFolderName(folderName: string) {
    // Check if folderName is not empty and contains at least one alphabet character
    const regex = /[a-zA-Z]/
    return folderName.length > 0 && regex.test(folderName)
  }

  const createFolderSubmit = () => {
    if (isValidFolderName(folderName)) {
      let name = folderName?.trim()
      dispatch(createFolder(name))
        .unwrap()
        .then(() => {
          dispatch(getUserQrFolders({userId, offset: 0, limit: 4}))
          setNewFolder(false)
          setFolderName('')
        })
        .catch(() => {
          setNewFolder(false)
        })
    } else {
      setErr('Folder name Required')
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isValidFolderName(e.target.value)) {
      setFolderName(e.target.value)
      setErr('')
    } else {
      setErr('Folder name Required')
    }
  }

  const handleCancel = () => {
    setNewFolder(false)
  }

  const handleFolderPageChange = (offset: number) => {
    const startIndex = offset
    const endIndex = startIndex + 4
    const displayedFolders = foldersInfo?.qrFolders?.slice(startIndex, endIndex)
    setDisplayedFolders(displayedFolders)
  }

  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [industry, setIndustry] = useState('')
  const [disabled, setDisabled] = useState(false)
  const handleCountrySelect = (countryName: any) => {
    setSelectedCountry(countryName)
  }
  const handleIndustryInput = (e: any) => {
    setIndustry(e.target.value)
  }
  const handleSubmit = () => {
    if (selectedCountry === '' || industry === '') {
      setDisabled(true)
    } else if (selectedCountry !== '' && industry !== '') {
      setDisabled(false)
      dispatch(updateUser({industry, location: selectedCountry}))
        .unwrap()
        .then(message.success('User profile updated'))
        .finally(setInfoModal(false))
    }
  }
  useEffect(() => {
    if (email) {
      if (Loc === '' && Indu === '' && role === 'admin') {
        setInfoModal(true)
        const fetchCountryNames = async () => {
          try {
            const response = await fetch('https://restcountries.com/v3.1/all')
            const data = await response.json()
            const countryNames = data.map((country: any) => country.name.common)
            setCountries(countryNames)
          } catch (error) {
            console.error('Error fetching country names:', error)
          }
        }

        fetchCountryNames()
      }
    }
  }, [Loc, Indu, email])
  // useEffect(() => {}, [selectedCountry, industry])

  return (
    <div className='t-flex t-flex-col t-gap-8'>
      <div>
        <div className='t-flex t-flex-col 500:t-flex-row t-items-center t-justify-between t-flex-wrap t-flex-stack t-mb-3'>
          <h3 className='t-font-bold t-my-2 t-text-[24px]'>Folders</h3>

          {role && !roles.includes(role) && (
            <div className='t-flex t-flex-col 500:t-flex-row t-items-center t-gap-2 500:t-gap-6 t-my-2'>
              <Button
                Name='New Folder'
                Icon='/media/icons/buttonIcons/folder.svg'
                click={handleClicks}
              />
              <Button
                Name='New Label'
                Icon='/media/icons/buttonIcons/folder.svg'
                click={() => {
                  setLableModal(true)
                }}
              />
              {/* <Dropdown title='CREATE QR CODE' listItems={QR_CODE} primary={true} /> */}
              <Button
                click={() => {
                  window.location.href = '/crafted/pages/create-qr'
                }}
                Name='Create Qr Code'
                className='bg-[white] t-text-primary t-cursor-pointer'
              />
            </div>
          )}
        </div>
        <Spin spinning={foldersLoading}>
          <div className='w-full'>
            {displayedFolders?.length > 0 && displayedFolders[0]?.name ? (
              <div className='t-grid t-grid-cols-1 500:t-grid-cols-2 lg:t-grid-cols-3 xl:t-grid-cols-4 t-gap-5'>
                {!foldersLoading &&
                  displayedFolders?.map(
                    (item, index) =>
                      // Add a condition to check if the 'name' property exists in the item
                      item?.name &&
                      item?.id && (
                        <div key={index} className='t-w-full'>
                          <Card content={item} />
                        </div>
                      )
                  )}
              </div>
            ) : (
              <Empty description={<span>No Folders</span>} />
            )}

            <PaginationComponent
              totalItems={foldersInfo?.qrFolders?.length}
              itemsPerPage={4}
              onPageChange={(offset: number) => handleFolderPageChange(offset)}
            />
          </div>
        </Spin>
      </div>

      <div>
        <div className='t-flex t-items-center t-justify-between t-flex-wrap t-flex-stack t-mb-3'>
          <h3 className='t-font-bold t-my-2 t-text-[24px]'>QR Codes</h3>
        </div>

        <div className='t-overflow-x-auto t-min-h-[500px]'>
          <CardSelection cardData={QR_CARD_DATE} />
        </div>
      </div>

      {newFolder ? (
        <div className='t-fixed t-top-0 t-left-0 t-w-[100vw] t-h-[100vh] t-z-[999999] t-bg-[rgba(0,0,0,0.6)] t-flex t-items-center t-justify-center t-px-3'>
          <div
            ref={modalRef}
            className='t-bg-white t-px-16 t-py-20 t-w-[587px] t-flex t-flex-col t-items-center t-justify-center t-gap-10 t-rounded-2xl'
          >
            <h3 className='t-text-[24px] t-font-bold t-text-black'>New Folder</h3>
            <div className='t-h-[60px] t-gap-3  t-w-full'>
              <Input placeholder='Enter Folder Name' onChange={onChange} />
              <p className='t-text-primaryblue t-mt-3'>{err}</p>
            </div>
            <div className='t-flex t-items-center t-gap-12 t-w-full t-text-[16px]'>
              <Button
                Name='Create'
                loading={loading}
                click={createFolderSubmit}
                primary
                className='t-w-full'
              />
              <Button Name='Cancel' click={handleCancel} className='t-w-full' />
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      {labelmodal ? (
        <div className='t-fixed t-top-0 t-left-0 t-w-[100vw] t-h-[100vh] t-z-[999999] t-bg-[rgba(0,0,0,0.6)] t-flex t-items-center t-justify-center t-px-3'>
          <div className='t-bg-white t-px-16 t-py-20 t-w-[587px] t-flex t-flex-col t-items-center t-justify-center t-gap-10 t-rounded-2xl'>
            <h3 className='t-text-[24px] t-font-bold t-text-black'>New Label</h3>
            <div className='t-h-[60px]  t-w-full'>
              <Input
                placeholder='Enter Label Name'
                onChange={(e: any) => {
                  setLabel(e.target.value)
                }}
              />
            </div>
            <div className='t-flex t-items-center t-gap-12 t-w-full t-text-[16px]'>
              <Button
                Name='Create Label'
                loading={loading}
                click={handleCreateLabel}
                primary
                className='t-w-full'
              />
              <Button
                Name='Cancel'
                click={() => {
                  setLableModal(false)
                }}
                className='t-w-full'
              />
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {infoModal && (
        <Modal
          show={infoModal}
          backdrop='static'
          keyboard={false}
          onHide={() => setInfoModal(false)}
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Body>
            <div className='t-w-full t-flex t-flex-col t-gap-8'>
              <div>
                <h3 className='t-font-bold t-text-3xl t-text-center t-mb-2'>Welcome</h3>
                <p>
                  Before moving forward, we need some details. Kindly fill in the location and the
                  industry you belong to.
                </p>
                <div className='mt-3 t-flex t-flex-col t-gap-3'>
                  <div>
                    <p className='t-font-medium t-mb-1'>Choose your current location</p>
                    <BootstrapDropdown style={{width: '100%'}}>
                      <BootstrapDropdown.Toggle
                        variant='primary'
                        id='country-dropdown'
                        // style={{
                        //   width: '100%',
                        //   textAlign: 'start',
                        //   color: 'white',
                        // }}
                      >
                        {selectedCountry ? selectedCountry : 'Select a country'}
                      </BootstrapDropdown.Toggle>
                      <BootstrapDropdown.Menu>
                        {countries.map((countryName, index) => (
                          <BootstrapDropdown.Item
                            key={index}
                            onClick={() => handleCountrySelect(countryName)}
                          >
                            {countryName}
                          </BootstrapDropdown.Item>
                        ))}
                      </BootstrapDropdown.Menu>
                    </BootstrapDropdown>
                  </div>
                  <div>
                    <p className='t-font-medium t-mb-1'>
                      Choose the industry you are affiliated with
                    </p>
                    <FormControl
                      placeholder='Industry...'
                      value={industry}
                      onChange={handleIndustryInput}
                      aria-label='Input field'
                    />
                  </div>
                </div>
              </div>
              <div className='t-ml-0 t-flex t-flex-col t-gap-2' aria-disabled={disabled}>
                <BootstrapButton variant='primary' onClick={handleSubmit}>
                  Save Changes
                </BootstrapButton>
                {disabled && (
                  <span className='t-text-xs t-text-red'>Please fill the form to continue</span>
                )}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  )
}
