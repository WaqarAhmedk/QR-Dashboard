import React, {useEffect, useRef, useState} from 'react'
import {Button, Checkbox, DropdownCheckbox} from '../../../../../_metronic/partials/qrComponents'
import {KTSVG} from '../../../../../_metronic/helpers'
import {images} from '../../../../../assets'
import {useOnClickOutside} from '../../../../../hooks/useOnClickOutside'
import {QR_OPTIONS, QR_FOLDERS} from '../../../../../mock'
import Modal from './Modal'
import {useDispatch, useSelector} from 'react-redux'
import {
  createLabel,
  duplicateQr,
  getAllQrCodes,
  getFoldersQrs,
  getUserQrFolders,
  setTemplate,
  updateQrCode,
} from 'store/qrStore/qrAction'
import {message} from 'antd'
import Input from '../../../../../_metronic/partials/qrComponents/Input'
import {formatDate} from 'utils/functions'
import * as authHelper from '../../../auth/core/AuthHelpers'
import {Badge} from 'antd'

const CardQR = ({content, index, isChecked, handleCheck}) => {
  const [deleteQr, setDeleteQr] = useState(false)
  const [blockQr, setBlockQr] = useState(false)
  const [edit, setEdit] = useState(false)
  const [moveFolder, setFolderMove] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState()
  const [labelmodal, setLableModal] = useState(false)
  const [label, setLabel] = useState(null)
  const dispatch = useDispatch()

  const createSpaceInWords = (word) => {
    return word.replace(/([a-z])([A-Z])/g, '$1 $2')
  }
  const optionsRef = useRef()
  const {foldersInfo, qrLabels, offset} = useSelector((state) => state.qr)
  const {id: userId} = useSelector((state) => state.user.user)
  const [formedFolders, setFormedFolders] = useState()
  const [formedLabels, setFormedLabels] = useState()
  const [duplicate, setDuplicate] = useState(false)

  const closeModal = () => setFolderMove(false)
  useOnClickOutside(optionsRef, () => setEdit(false))
  const role = localStorage.getItem('role')
  const roles = ['viewer', 'whiteLabel']
  useEffect(() => {
    if (foldersInfo?.qrFolders?.length > 0) {
      let formedData = foldersInfo?.qrFolders.map(({name, id}) => {
        return {
          title: name,
          label: name,
          value: id,
        }
      })
      setFormedFolders(formedData)
    }
  }, [foldersInfo?.qrFolders])

  useEffect(() => {
    if (qrLabels?.length > 0) {
      let formedData = qrLabels.map(({name, id}) => {
        return {
          title: name,
          label: name,
          value: id,
        }
      })
      setFormedLabels(formedData)
    }
  }, [qrLabels])

  const handleUpdateLabel = () => {
    if (!content._id || !label) return
    setLableModal(false)
    dispatch(
      updateQrCode({
        qrId: content._id,
        data: {
          label: label,
        },
      })
    )
      .unwrap()
      .then(() => {
        message.success(`Label Added successfully`)
        dispatch(getAllQrCodes({type: 'all', offset: offset}))
        const userId = authHelper.getAuth()?.userId
        // dispatch(getUserQrFolders({userId}))
      })
  }
  const handleFolderOk = () => {
    if (!content._id || !selectedFolder) return
    closeModal()
    dispatch(
      updateQrCode({
        qrId: content._id,
        data: {
          folder: selectedFolder,
        },
      })
    )
      .unwrap()
      .then(() => {
        message.success(`Moved to folder`)
        dispatch(getAllQrCodes({type: 'all', offset: offset}))
        const userId = authHelper.getAuth()?.userId
        dispatch(getUserQrFolders({userId}))
      })
  }

  const handleOptionClick = (label) => {
    console.log('handleOptionClick label', label)
    setEdit(false)
    if (label === 'Send to Folder') {
      setFolderMove(true)
    }
    if (label === 'Delete') {
      setDeleteQr(true)
    }
    if (label === 'Add Label') {
      setLableModal(true)
    }
    if (label === 'Block') {
      setBlockQr(true)
    }
    if (label === 'Duplicate') {
      setDuplicate(true)
    }
    if (label === 'Save as Template') {
      const templateData = {
        userId: userId,
        type: 'Custom',
        qrImage: content.qrImage,
        qrStyle: content.qrStyle,
        qrFrame: content.qrFrame,
        qrFrameColor: content.qrFrameColor,
        qrEyeBallColor: content.qrEyeBallColor,
        qrEyeFrameColor: content.qrEyeFrameColor,
        qrTextColor: content.qrTextColor,
        bgColor: content.bgColor,
        fgColor: content.fgColor,
        logo: content.logo,
        logoSize: content.logoSize,
        eyeBall: content.eyeBall,
        eyeFrame: content.eyeFrame,
        pattern: content.pattern,
      }
      dispatch(setTemplate(templateData)).then(message.success('Template Saved Successfully'))
    }
  }

  const handleDeletePost = () => {
    const afterDelete = () => {
      setDeleteQr(false)
      dispatch(getAllQrCodes({type: 'all', offset: offset}))
      const userId = authHelper.getAuth()?.userId
      dispatch(getUserQrFolders({userId, offset: 0, limit: 4}))
    }
    updateQrStatus('Deleted', 'Qr Deleted Successfully', afterDelete)
  }

  const handleBlockQr = () => {
    const afterDelete = () => {
      setBlockQr(false)
      dispatch(getAllQrCodes({type: 'all', offset: offset}))
    }
    const status = content.qrStatus === 'Blocked' ? 'Active' : 'Blocked'
    updateQrStatus(status, 'Qr Status Updated Successfully', afterDelete)
  }

  const updateQrStatus = (status, updateMessage, handleAfterDelete) => {
    dispatch(
      updateQrCode({
        qrId: content._id,
        data: {
          qrStatus: status,
        },
      })
    )
      .unwrap()
      .then(() => {
        message.success(updateMessage)
        handleAfterDelete && handleAfterDelete()
      })
  }

  const handleDownload = (url) => {
    console.log('content,', content)
    try {
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = url.split('/').pop()
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
    } catch (err) {
      console.log('error in downloading', err)
    }
  }
  const handleEditQr = (value) => {
    window.open(`${process.env.REACT_APP_QR_APP}/?edit_qrId=${value}`, '_blank')
  }

  const handleDuplicateQR = () => {
    dispatch(duplicateQr({qrId: content._id}))
      .unwrap()
      .then(() => {
        dispatch(getAllQrCodes({type: 'all', offset: offset}))
      })
    setDuplicate(false)
  }

  return (
    <div className='t-bg-white t-shadow-md t-rounded-xl '>
      <Badge.Ribbon
        placement='start'
        style={{marginLeft: '5px', marginTop: '-5px'}}
        text={content?.label?.length > 0 && content?.label[0]?.name}
      >
        <div key={content.id} className=' t-flex t-items-center t-py-6 t-px-5 sm:t-px-10'>
          {/* <div className='t-mr-8 xl:t-mr-16 t-flex t-items-center'>
          <Checkbox isCheckedAll={isChecked[index]} handleCheckAll={(e) => handleCheck(e, index)} />
        </div> */}
          <div className=' t-flex t-flex-row t-gap-5 t-items-center t-justify-between t-w-full t-text-[14px] xl:t-text-[16px]'>
            <img src={content.qrImage} alt='scanQr' className='t-w-[101px]' />
            <div className='t-flex t-flex-col t-gap-2 '>
              <h3 className='t-text-[20px] xl:t-text-[24px] t-text-primary t-font-medium '>
                {createSpaceInWords(content.qrName ? content.qrName : 'No Name')}
              </h3>
              <p className=' t-font-small '>
                Qr Status: <span className='t-text-green-700'>{content.qrStatus}</span>
              </p>
              <p className=' t-font-small '>
                Qr Type:{' '}
                <span className='t-text-primary'>{createSpaceInWords(content.qrType)}</span>
              </p>

              <p className=' t-font-medium'>Created: {formatDate(content.createdAt)}</p>
              <div className='t-flex t-flex-row t-items-center t-gap-3'>
                <KTSVG path='/media/svg/qr_dashboard/folder-grey.svg' className=' svg-icon-1' />
                <p className=' t-font-medium'>{content.folder.name}</p>
              </div>
            </div>
            <div className='t-h-[120px] t-w-[0.5px] t-bg-[#9D9DA6]' />
            <div className='t-flex t-flex-col t-gap-2'>
              <p className=' t-font-medium'>
                Total Scans:{' '}
                <span className='t-text-[20px] xl:t-text-[24px]'>{content.scanCount}</span>
              </p>
              <p className=' t-font-medium'>{content.site}</p>
              <div className='t-flex t-flex-row t-items-center t-gap-3'>
                <KTSVG path='/media/svg/qr_dashboard/folder-grey.svg' className=' svg-icon-1' />
                <p className=' t-font-medium'>Modified: {formatDate(content.updatedAt)}</p>
              </div>
            </div>

            <div className='t-flex t-flex-col t-gap-4'>
              {!roles.includes(role) && (
                <Button
                  Name='Edit'
                  Icon='/media/svg/qr_dashboard/edit.svg'
                  className=' t-w-[140px] t-text-[13.28px]'
                  click={() => {
                    handleEditQr(content._id)
                  }}
                />
              )}
              <Button
                Name='Download'
                Icon='/media/svg/qr_dashboard/download.svg'
                className='t-w-[140px] t-text-[13.28px]'
                click={() => handleDownload(content.qrImage)}
              />
            </div>
            {!roles.includes(role) && (
              <div className='t-relative'>
                <div
                  onClick={() => setEdit(!edit)}
                  className='t-h-16 t-w-16 t-flex t-items-center t-justify-center t-cursor-pointer t-border t-border-grey t-rounded-full'
                >
                  <img src={images.dotsmenu} alt='dots menu' />
                </div>
                <div className='t-absolute t-z-[999999] t-top-0 t-right-16  t-flex-column'>
                  {edit && QR_OPTIONS.length > 0 && (
                    <ul
                      ref={optionsRef}
                      className=' t-w-max t-py-1 t-top-[55px] t-left-0 t-bg-white t-whitespace-nowrap t-rounded-xl'
                    >
                      {QR_OPTIONS.map(({label, image}, index) => {
                        return (
                          <li
                            onClick={() => {
                              handleOptionClick(label)
                            }}
                            key={index}
                            className='t-cursor-pointer  t-text-t1 t-px-5 t-py-2 t-rounded-[3px] hover:t-bg-gray-100 t-whitespace-nowrap t-flex t-items-center t-gap-5'
                          >
                            <KTSVG path={image} className=' svg-icon-5' />
                            {content.qrStatus === 'Blocked' && label === 'Block'
                              ? 'Unblock'
                              : label}
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
          {deleteQr && (
            <ConfirmPopUp
              message='Are you sure you want to delete this Qr?'
              handleClick={handleDeletePost}
              setState={setDeleteQr}
              btnText='Delete'
            />
          )}
          {blockQr && (
            <ConfirmPopUp
              message={`${
                content.qrStatus === 'Blocked'
                  ? 'Are you sure you want to Unblock this Qr?'
                  : 'Are you sure you want to Block this Qr?'
              }`}
              handleClick={handleBlockQr}
              setState={setBlockQr}
              btnText={`${content.qrStatus === 'Blocked' ? 'Unblock' : 'Blocked'}`}
            />
          )}
          {duplicate && (
            <ConfirmPopUp
              message={'Are you sure you want to Duplicate this Qr?'}
              handleClick={handleDuplicateQR}
              setState={setDuplicate}
              btnText='Duplicate'
            />
          )}
          <Modal onOk={handleFolderOk} open={moveFolder} close={closeModal}>
            <DropdownCheckbox
              setSelectedItem={setSelectedFolder}
              title='Select a Folder'
              listItems={formedFolders}
            />
          </Modal>
          <Modal
            open={labelmodal}
            close={() => {
              setLableModal(false)
            }}
            onOk={handleUpdateLabel}
          >
            <DropdownCheckbox
              setSelectedItem={setLabel}
              title='Select a Label'
              listItems={formedLabels}
            />
          </Modal>
        </div>
      </Badge.Ribbon>
    </div>
  )
}

export default CardQR

const ConfirmPopUp = ({setState, handleClick, message, btnText}) => {
  const popUpRef = useRef()
  useOnClickOutside(popUpRef, () => setState(false))
  return (
    <div className='t-fixed t-top-0 t-left-0 t-w-[100vw] t-h-[100vh] t-z-[999999] t-bg-[rgba(0,0,0,0.6)] t-flex t-items-center t-justify-center t-text-t2 t-px-3'>
      <div
        ref={popUpRef}
        className='t-bg-white t-p-7 t-w-[412px] t-flex t-flex-col t-items-center t-justify-center t-gap-10 t-rounded-2xl'
      >
        <KTSVG path='/media/svg/qr_dashboard/exclamationred.svg' className=' svg-icon-1' />
        <p className='t-text-[14px] t-font-medium t-text-center'>{message}</p>
        <div className='t-flex t-items-center t-gap-6 t-w-full t-text-[16px] t-text-t1 '>
          <button
            onClick={() => setState(false)}
            type='button'
            className='t-border t-border-[#D0D5DD] t-py-3 t-px-6 t-rounded-xl t-w-full t-font-medium'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={handleClick}
            className='t-border t-border-[#D92D20] t-bg-[#D92D20] t-text-white t-py-3 t-px-6 t-rounded-xl t-w-full t-font-medium'
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  )
}
