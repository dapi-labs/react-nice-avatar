import React, { PropsWithChildren, useEffect, useMemo, useRef, useState, } from 'react'
import './combobox.scss'
import Input from './Input'


export interface ComboboxProps {
    items?: string[]
    value?: string
    onChange?: (value: string) => void
}



export default function Combobox({ value, onChange, items = [] }: PropsWithChildren<ComboboxProps>) {
    const [isFocus, setFocusStatus] = useState(false)
    const filterItems = useMemo(() => {
        return items.filter(item => item.includes(value || ''))
    }, [value])

    return (
        <div className='relative' style={{ zIndex: isFocus ? 99 : 1 }}>
            <Input
                value={value}
                onFocus={() => setFocusStatus(true)}
                onBlur={() => {
                    setTimeout(() => {
                        setFocusStatus(false)
                    }, 30);
                }}
                onChange={e => onChange?.(e.target.value)}
            />

            {isFocus && filterItems.length > 0 ? (
                <div
                    className='combo-box-list absolute shadow-white min-w-full shadow-md bg-white mt-2 rounded p-2 overflow-y-auto'
                >
                    {
                        filterItems.map(item => {
                            return (
                                <div
                                    key={item}
                                    className="hover:bg-gray-200 focus-visible:bg-gray-200 text-gray-600 cursor-pointer px-2 py-1 rounded"
                                    onClick={() => onChange?.(item)}
                                >
                                    {item}
                                </div>
                            )
                        })
                    }
                </div>
            ) : null}

        </div>
    )
}
