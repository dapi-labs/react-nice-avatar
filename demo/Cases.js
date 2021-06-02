import React from 'react'

import Avatar from "../src";

export default function (props) {
  const genApplicationMockup = () => {
    return (
      <div className="application">
        <div className="applicationHeader">
          <div className="icons">
            <span className="icon" />
            <span className="icon" />
            <span className="icon" />
          </div>
          <Avatar style={{ width: '1.2rem', height: '1.2rem' }} />
        </div>

        <div className="applicationBody">
          <div className="left"></div>
          <div className="right"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="casesSection">
      {genApplicationMockup()}
    </div>
  )
}