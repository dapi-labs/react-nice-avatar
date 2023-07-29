import React, { PropsWithChildren } from 'react'

import './index.scss'

export interface SectionWrapperProps {
  className?: string,
  switchConfig: () => void,
  tip: string
  disabled?: boolean
}

export default function sectionWrapper(props: PropsWithChildren<SectionWrapperProps>) {
  const { className = "", children, switchConfig, tip } = props
  return (
    <button
      disabled={props.disabled}
      className={"SectionWrapper " + className}
      data-tip={tip}
      onClick={switchConfig}>
      <div className="relative w-full h-full">
        <div className="childrenWrapper absolute top-0 left-0 w-full h-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </button>
  )
}