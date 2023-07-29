import React, { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export default forwardRef(function Input({ className = '', ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) {
    return (
        <input ref={ref} className={`px-2 py-1 rounded text-gray-600 ${className}`} {...props} />
    )
})