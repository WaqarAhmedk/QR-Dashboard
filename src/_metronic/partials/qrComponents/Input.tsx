import React, {useState, forwardRef, Ref} from 'react'

type InputProps = {
  placeholder?: string
  name?: string
  onChange?: any
  onBlur?: any
  classNames?: string
  value?: any
  width?: string
  type?: string
  bg?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {placeholder, name, onChange, onBlur, value, width, type = 'text'}: InputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div className={`${width ? width : 't-w-full'} t-h-[50px] `}>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange && onChange}
          onBlur={onBlur && onBlur}
          className='t-border t-placeholder-gray t-h-full t-pl-4 t-border-gray-300 t-rounded-[12px] t-bg-[#F8FAFC] focus:t-outline-none focus:t-ring-2 focus:t-ring-secondary focus:t-border-transparent t-text-gray-700 t-text-[13px] md:t-text-[16px]  t-block t-w-full '
        />
      </div>
    )
  }
)

export default Input
