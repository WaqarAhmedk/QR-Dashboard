import React, {useEffect, useState} from 'react'
import {QR_SORT, QR_STATUS, QR_TYPE} from '../../../../../mock'
import './../../../../../_metronic/partials/qrComponents/Style/style.css'
import {Checkbox, DropdownCheckbox, Search} from '../../../../../_metronic/partials/qrComponents'
import CardQR from './CardQR'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from 'store'
import {duplicateQr, getAllQrCodes, searchQrCodes} from 'store/qrStore/qrAction'
import {Empty, Spin} from 'antd'
import {useDebounceSearch} from 'hooks/useDebounceSearch'
import PaginationComponent from 'app/modules/pagination/pagination'
import {setQrOffset} from 'store/qrStore/qrSlice'

interface CardData {
  id?: number
  title?: string
  description?: string
  role?: string
}

interface Props {
  cardData: CardData[]
}

interface searchOptions {
  qrStatus: string
  qrType: string
  qrName: string
  sortBy: string
  offset: string
}

const CardSelection: React.FC<Props> = ({cardData}) => {
  const [isCheckedAll, setIsCheckedAll] = useState(false)
  const {qrsInfo, loading, selectedFolder} = useSelector((state: RootState) => state.qr)
  const dispatch = useDispatch<AppDispatch>()
  const [isChecked, setIsChecked] = useState(Array.from({length: cardData.length}, () => false))
  const [searchOptions, setSearchOptions] = useState<searchOptions>()
  const [searchTerm, setSearchTerm] = useDebounceSearch('', 300)
  const {foldersInfo, qrLabels} = useSelector((state: RootState) => state.qr)
  const [formedFolders, setFormedFolders] = useState<{label: string; value: string}[]>([])
  const [formedLabels, setFormedLabels] = useState<{label: string; value: string}[]>([])

  useEffect(() => {
    //-- get all qrs
    dispatch(getAllQrCodes({type: 'all', offset: 0}))
  }, [])

  useEffect(() => {
    if (foldersInfo?.qrFolders?.length > 0) {
      let formedData = foldersInfo?.qrFolders.map(({name, id}: any) => {
        return {
          label: name,
          value: id,
        }
      })
      setFormedFolders(formedData)
    }
    if (qrLabels.length > 0) {
      let formed = qrLabels.map(({name, id}) => {
        return {
          title: name,
          label: name,
          value: id,
        }
      })
      setFormedLabels(formed)
    }
  }, [foldersInfo?.qrFolders, qrLabels])

  // const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setIsCheckedAll(event.target.checked)
  //   setIsChecked(Array.from({length: cardData.length}, () => event.target.checked))
  // }

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newChecked = [...isChecked]
    newChecked[index] = event.target.checked
    setIsChecked(newChecked)
    setIsCheckedAll(newChecked.every((c) => c))
  }

  useEffect(() => {}, [qrLabels])

  const handleStatusChange = (value: string) => {
    setSearchOptions((prev: any) => ({
      ...prev,
      qrStatus: value,
    }))
    dispatch(
      searchQrCodes({
        ...searchOptions,
        qrStatus: value,
      })
    )
  }

  useEffect(() => {
    if (searchTerm) {
      setSearchOptions((prev: any) => ({
        ...prev,
        qrType: searchTerm,
      }))
      dispatch(
        searchQrCodes({
          ...searchOptions,
          qrType: searchTerm,
        })
      )
    }
  }, [searchTerm])

  useEffect(() => {
    if (selectedFolder) {
      dispatch(
        searchQrCodes({
          ...searchOptions,
          qrFolder: selectedFolder,
        })
      )
    }
  }, [selectedFolder])

  const handleQrTypeChange = (value: string) => {
    setSearchTerm(value)
  }

  const handleSortChange = (value: string) => {
    setSearchOptions((prev: any) => ({
      ...prev,
      sortBy: value,
    }))
    dispatch(
      searchQrCodes({
        ...searchOptions,
        sortBy: value,
      })
    )
  }

  const handleSearchChange = (value: string) => {
    setSearchOptions((prev: any) => ({
      ...prev,
      qrName: value,
    }))
    dispatch(
      searchQrCodes({
        ...searchOptions,
        qrName: value,
      })
    )
  }

  const handleFolderChange = (value: string) => {
    setSearchOptions((prev: any) => ({
      ...prev,
      qrFolder: value,
    }))
    dispatch(
      searchQrCodes({
        ...searchOptions,
        qrFolder: value,
      })
    )
  }

  const handleLabelChange = (value: string) => {
    setSearchOptions((prev: any) => ({
      ...prev,
      qrLabel: value,
    }))
    dispatch(
      searchQrCodes({
        ...searchOptions,
        qrLabel: value,
      })
    )
  }
  const handleQrPageChange = (offset: string) => {
    if (
      searchOptions?.qrName ||
      searchOptions?.qrStatus ||
      searchOptions?.qrType ||
      searchOptions?.sortBy
    ) {
      dispatch(
        searchQrCodes({
          ...searchOptions,
          offset: offset,
        })
      )
    } else {
      dispatch(getAllQrCodes({type: 'all', offset: offset}))
      setSearchOptions({qrStatus: '', qrType: '', qrName: '', sortBy: '', offset: ''})
    }
    dispatch(setQrOffset(offset))
  }

  return (
    <Spin spinning={loading}>
      <div className='t-flex t-flex-col t-gap-9 t-min-w-[777px]'>
        <div className=' t-flex t-items-center t-justify-between'>
          {/* <div className='t-mr-8 xl:t-mr-12 t-flex t-items-center'>
            <Checkbox isCheckedAll={isCheckedAll} handleCheckAll={handleCheckAll} />
          </div> */}
          <div className=' t-flex t-items-center t-justify-between t-gap-8 t-w-full'>
            <Search onChange={handleSearchChange} />
            <DropdownCheckbox
              onClick={handleFolderChange}
              title='QR Folder'
              listItems={formedFolders}
            />
            <DropdownCheckbox
              onClick={handleStatusChange}
              title='QR Status'
              listItems={QR_STATUS}
            />
            <DropdownCheckbox
              onClick={handleQrTypeChange}
              title='QR Code Type'
              listItems={QR_TYPE}
            />
            <DropdownCheckbox onClick={handleLabelChange} title='Label' listItems={formedLabels} />
            <DropdownCheckbox onClick={handleSortChange} title='Sort by' listItems={QR_SORT} />
          </div>
        </div>
        <div className='t-flex t-flex-col gap-3 t-text-t1'>
          {qrsInfo?.qrs?.length >= 1 ? (
            qrsInfo.qrs.map((card, index) => (
              <CardQR
                key={index}
                content={card}
                index={index}
                isChecked={isChecked}
                handleCheck={handleCheck}
              />
            ))
          ) : (
            <Empty description={<p>No Qrs yet</p>} />
          )}
          <PaginationComponent
            totalItems={qrsInfo?.totalRecords}
            itemsPerPage={10}
            onPageChange={(offset: string) => handleQrPageChange(offset)}
          />
        </div>
      </div>
    </Spin>
  )
}

export default CardSelection
