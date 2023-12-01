import React, {useEffect, useRef, useState} from 'react'
import {useOnClickOutside} from '../../../hooks/useOnClickOutside'
import {KTSVG} from '../../helpers'
import './Style/style.css'
import {useSelector} from 'react-redux'
import {RootState} from 'store'
interface ListItem {
  label: string
  value: string
}

interface ListItem {
  label: string
  value: string
}
interface Props {
  title: string
  label?: string
  value?: string
  listItems: ListItem[] // Use 'ListItem[]' instead of 'ListItem[{label: string; value: string}]'
  fontsize?: string
  primary?: boolean
  setSelectedItem?: any
  onClick?: any
}
const DropdownCheckbox: React.FC<Props> = ({
  title,
  label,
  setSelectedItem,
  value,
  listItems,
  fontsize,
  onClick,
  primary = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const {selectedFolder} = useSelector((state: RootState) => state.qr)

  const dropDownRef = useRef<HTMLDivElement>(null)
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  useOnClickOutside(dropDownRef, () => setIsOpen(false))

  const [selected, setSelected] = useState({
    label: '',
    value: '',
  })

  useEffect(() => {
    if (selectedFolder) {
      const selectedItem = listItems.find((item) => item.value === selectedFolder)
      if (selectedItem) {
        setSelected(selectedItem)
      }
    }
  }, [selectedFolder, listItems])

  const listClass = `t-cursor-pointer t-text-t1 t-px-6 t-py-2 t-rounded-[3px] hover:t-bg-gray-100`

  return (
    <div className='t-w-full'>
      <div className='t-relative t-flex-column t-gap-2' ref={dropDownRef}>
        {label && (
          <p className='t-block t-text-sm lg:t-text-[16px] t-mb-2 t-font-medium t-text-gray-90'>
            {label}
          </p>
        )}
        <button
          name='drop-down'
          className={`t-w-full ${
            primary
              ? 't-bg-primary t-text-white'
              : 't-bg-white t-text-t1 t-text-[16px] t-shadow-md t-border t-h-[50px]'
          } t-gap-6 t-px-7 t-py-4 t-rounded-full t-flex t-items-center t-whitespace-nowrap t-justify-between`}
          onClick={toggleDropdown}
        >
          <span>{selected?.label?.length > 0 ? selected.label : title}</span>
          {primary ? (
            <KTSVG path='/media/svg/qr_dashboard/chevron_down_white.svg' className='svg-icon-5' />
          ) : (
            <KTSVG path='/media/svg/qr_dashboard/chevron_down.svg' className='svg-icon-5' />
          )}
        </button>
        {isOpen && listItems?.length > 0 && (
          <ul className='t-absolute t-z-[9999999] t-overflow-scroll t-max-h-[350px] t-text-[16px] t-flex-column t-w-full t-py-1 t-top-[55px] t-left-0 t-bg-white t-border t-border-greyp t-rounded-xl'>
            {listItems.map(({label, value}, index) => {
              const inputId = `radio-${index}`
              return (
                <>
                  {/* <label htmlFor={inputId} className={`${listClass} t-flex t-items-center t-gap-3`}>
                    <input type='radio' className='rounded-radio' id={inputId} name='radio-group' />
                    <li>{label}</li>
                  </label> */}
                  <label htmlFor={inputId} className={`${listClass} t-flex t-items-center t-gap-3`}>
                    <input
                      type='radio'
                      className='option-input radio rounded-radio'
                      id={inputId}
                      name='radio-group'
                      onClick={() => {
                        setSelected({label: label, value: value})
                        setSelectedItem && setSelectedItem(value)
                        toggleDropdown()
                        onClick && onClick(value)
                      }}
                    />
                    {label}
                  </label>
                </>
              )
            })}
          </ul>
        )}
      </div>
      {isOpen ? (
        <div
          className='t-fixed t-top-0 t-left-0 t-w-[100vw] t-h-[100vh] t-z-[999999] t-bg-[rgba(0,0,0,0.6)]'
          onClick={toggleDropdown}
        ></div>
      ) : (
        ''
      )}
    </div>
  )
}

export default DropdownCheckbox
