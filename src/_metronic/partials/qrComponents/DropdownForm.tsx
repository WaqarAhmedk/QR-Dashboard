import React, {useEffect, useRef, useState} from 'react'
import {useOnClickOutside} from '../../../hooks/useOnClickOutside'
import {KTSVG} from '../../helpers'

interface ListItem {
  name: string
  value: string
}

interface Props {
  name: string
  title: string
  label?: string
  listItems: ListItem[]
  selectOption?: (name: string, value: string) => void
}

const DropdownForm: React.FC<Props> = ({name, title, label, listItems, selectOption}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(title)
  const dropDownRef = useRef<HTMLDivElement>(null)
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  useOnClickOutside(dropDownRef, () => setIsOpen(false))

  const listClass = `t-cursor-pointer  t-text-[13px] md:t-text-[16px] t-text-black t-px-8 t-py-1.5 t-rounded-[3px] hover:t-bg-gray-100`

  const handleOptionSelect = (selectedName: string, selectedValue: string) => {
    setValue(selectedName)
    selectOption && selectOption(name, selectedValue) // Pass the name property to selectOption
    setIsOpen(false)
  }

  return (
    <div className=' t-w-full t-h-full'>
      <div className='t-relative  t-flex-column t-gap-2 ' ref={dropDownRef}>
        {label && (
          <p className='t-block t-text-sm lg:t-text-base t-mb-2 t-font-medium t-text-gray-90'>
            {label}
          </p>
        )}
        <button
          type='button'
          name='drop-down'
          className={`t-h-[50px] md:t-h-[60px] t-text-gray-400 t-w-full t-text-[13px] md:t-text-[16px] t-text-gray t-border t-border-gray-300 t-gap-6 t-px-4 t-py-4 t-rounded-[12px] t-flex t-items-center t-whitespace-nowrap t-justify-between t-bg-[#F8FAFC] focus:t-outline-none focus:t-ring-2 focus:t-ring-secondary focus:t-border-transparent `}
          onClick={toggleDropdown}
        >
          <span>{value}</span>
          <KTSVG path='/media/svg/qr_dashboard/chevron_down.svg' className=' svg-icon-5' />
        </button>
        {isOpen && listItems.length > 0 && (
          <ul className='t-absolute  t-flex-column t-w-full t-py-1 t-top-[60px] md:t-top-[70px] t-left-0 t-bg-white t-border t-border-greyp t-rounded-xl'>
            {listItems.map(({name: itemName, value: itemValue}, index) => {
              return (
                <li
                  onClick={() => handleOptionSelect(itemName, itemValue)} // Use the modified function
                  className={listClass}
                  key={index}
                >
                  {itemName}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default DropdownForm
