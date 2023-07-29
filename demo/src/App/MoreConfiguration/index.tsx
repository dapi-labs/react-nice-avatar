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
        className="absolute cursor-pointer w-24 h-24 text-sm rounded-full -ml-4 flex px-2 items-center bg-gray-800" style={{
          transform: 'translateX(-50%)',
        }}

        onClick={() => {
          setOpenStatus(!isOpened)
        }}
      >
        More
      </div>
      <SelectForm className='relative z-1' {...props} />
    </div>
  )
}