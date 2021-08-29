import React from 'react'

import './index.scss'

export default function (props) {
  const { className = "", children, switchConfig, tip } = props
  return (
    <div
      className={"SectionWrapper " + className}
      data-tip={tip}
      onClick={switchConfig}>
      <div className="relative w-full h-full">
        <div className="childrenWrapper absolute top-0 left-0 w-full h-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  )
}