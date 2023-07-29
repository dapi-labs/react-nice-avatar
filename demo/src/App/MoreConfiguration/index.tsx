import React, { useState } from 'react'
import SelectForm, { SelectFormProps } from './SelectForm'

export type MoreConfigurationProps = SelectFormProps

export default function MoreConfiguration(props: MoreConfigurationProps) {

  const [isOpened, setOpenStatus] = useState(false)


  return (
    <div className="fixed right-0 p-4 pt-10 bg-gray-800 h-full" style={{
      transform: isOpened ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.3s ease-in-out'
    }}>
      <div
        className="absolute cursor-pointer w-20 h-20 text-md rounded-full -ml-4 flex pb-4 justify-center items-end bg-gray-800" style={{
          transform: 'translateX(-50%) rotate(90deg)',
        }}

        onClick={() => {
          setOpenStatus(!isOpened)
        }}
      >
        MORE
      </div>
      <SelectForm className='relative z-1' {...props} />
    </div>
  )
}