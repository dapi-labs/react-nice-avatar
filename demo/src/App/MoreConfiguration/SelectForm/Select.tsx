import React from 'react'

export interface SelectProps {
  className?: string
  style?: React.CSSProperties,
  value?: string,
  onChange: (value: string) => void,
  items?: string[],
  disabled?: boolean,
}

export default function Select({ value, items, className, style, disabled = false, onChange }: SelectProps) {
  return (
    <select
      value={value}
      disabled={disabled}
      className={`px-2 py-1 rounded text-gray-600 ${className}`} style={{ width: 240, ...style }} onChange={e => {
        // console.log(e.target.value, 'e.target.value')
        onChange(e.target.value)
      }}>
      {
        items?.map(item => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          )
        })
      }
    </select>
  )
}