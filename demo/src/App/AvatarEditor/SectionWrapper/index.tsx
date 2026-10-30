import React from 'react'

import './index.scss'

export default function sectionWrapper(props: {
  className?: string,
  children: JSX.Element,
  switchConfig: () => void,
  tip: string
}) {
  const { className = "", children, switchConfig, tip } = props
  return (
    <button
      type="button"
      aria-label={tip}
      title={tip}
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