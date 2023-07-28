import React, { CSSProperties } from 'react'
import { useState } from "react"

import './index.scss'

interface CopyBtnProps {
    className?: string
    style?: CSSProperties
    text?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
export default function CopyBtn({ text = '', className = '', style, onClick, }: CopyBtnProps) {

    const [label, setLabel] = useState<'Copy' | 'Copied'>('Copy')

    const reset = () => {
        setLabel('Copy')
    }

    const handleCopy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (label === 'Copied') return
        navigator.clipboard.writeText(text)
        setLabel('Copied')
        setTimeout(reset, 1000)
        onClick?.(e)
    }

    return (
        <button className={`copy-btn ${className}`} style={style} onClick={(e) => handleCopy(e)}>
            {label}
        </button>
    )
}