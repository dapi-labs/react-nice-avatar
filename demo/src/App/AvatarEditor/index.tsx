import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { defaultOptions } from "react-nice-avatar/utils"
import Face from "react-nice-avatar/face/index"
import Hair from "react-nice-avatar/hair/index"
import Hat from "react-nice-avatar/hat/index"
import Eyes from "react-nice-avatar/eyes/index"
import Glasses from "react-nice-avatar/glasses/index"
import Ear from "react-nice-avatar/ear/index"
import Nose from "react-nice-avatar/nose/index"
import Mouth from "react-nice-avatar/mouth/index"
import Shirt from "react-nice-avatar/shirt/index"

import SectionWrapper from "./SectionWrapper/index"

import './index.scss'

export default class AvatarEditor extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    shape: PropTypes.string.isRequired,
    updateConfig: PropTypes.func.isRequired,
    updateShape: PropTypes.func.isRequired,
    download: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      isCodeShow: false
    }
    this.myDefaultOptions = this.genDefaultOptions(defaultOptions)
    this.shapes = ['circle', 'rounded', 'square']
  }

  // Modification on defaultOptions for convenient
  genDefaultOptions (opts) {
    const hairSet = new Set(opts.hairStyleMan.concat(opts.hairStyleWoman))
    return {
      ...opts,
      hairStyle: Array.from(hairSet)
    }
  }

  switchConfig (type, currentOpt) {
    const { updateConfig } = this.props
    const opts = this.myDefaultOptions[type]
    const currentIdx = opts.findIndex(item => item === currentOpt)
    const newIdx = (currentIdx + 1) % opts.length
    updateConfig(type, opts[newIdx])
  }

  switchShape (currentShape) {
    const { updateShape } = this.props
    const currentIdx = this.shapes.findIndex(item => item === currentShape)
    const newIdx = (currentIdx + 1) % this.shapes.length
    updateShape(this.shapes[newIdx])
  }

  toggleCodeShow () {
    const { isCodeShow } = this.state
    this.setState({
      isCodeShow: !isCodeShow
    })
  }

  genCodeString (config) {
    return "const config = " +
    JSON.stringify(config, null, 2) +
    "\n" +
    "const myConfig = genConfig(config)\n" +
    "<NiceAvatar style={{ width: '5rem', height: '5rem' }} {...myConfig} />"
  }

  render () {
    const { config, shape, download } = this.props
    const { isCodeShow } = this.state
    return (
      <div className="AvatarEditor rounded-full p-3 flex items-center">
        {/* Face */}
        <SectionWrapper
          className="w-8 h-8 rounded-full p-2 mx-2"
          tip="Face"
          switchConfig={this.switchConfig.bind(this, 'faceColor', config.faceColor)}>
          <Face color={config.faceColor} />
        </SectionWrapper>
        {/* Hair style */}
        <SectionWrapper
          className="w-8 h-8 rounded-full p-2 mx-2"
          tip="Hair"
          switchConfig={this.switchConfig.bind(this, 'hairStyle', config.hairStyle)}>
          <Hair style={config.hairStyle} color="#fff" colorRandom />
        </SectionWrapper>
        {/* Hat style */}
        <SectionWrapper
          className="w-8 h-8 rounded-full p-2 mx-2"
          tip="Hat"
          switchConfig={this.switchConfig.bind(this, 'hatStyle', config.hatStyle)}>
          <Hat style={config.hatStyle} color="#fff" />
        </SectionWrapper>
        {/* Eyes style */}
        <SectionWrapper
          className="w-8 h-8 rounded-full p-2 mx-2"
          tip="Eyes"
          switchConfig={this.switchConfig.bind(this, 'eyeStyle', config.eyeStyle)}>
          <Eyes style={config.eyeStyle} color="#fff" />
        </SectionWrapper>
        {/* Glasses style */}
        <SectionWrapper
          className="w-8 h-8 rounded-full p-2 mx-2"
          tip="Glasses"
          switchConfig={this.switchConfig.bind(this, 'glassesStyle', config.glassesStyle)}>
          <Glasses style={config.glassesStyle} color="#fff" />
        </SectionWrapper>
        {/* Ear style */}
        <SectionWrapper
          className="w-8 h-8 rounded-full p-2 mx-2"
          tip="Ear"
          switchConfig={this.switchConfig.bind(this, 'earSize', config.earSize)}>
          <Ear size={config.earSize} color="#fff" />
        </SectionWrapper>
        {/* Nose style */}
        <SectionWrapper
          className="w-8 h-8 rounded-full p-2 mx-2"
          tip="Nose"
          switchConfig={this.switchConfig.bind(this, 'noseStyle', config.noseStyle)}>
          <Nose style={config.noseStyle} color="#fff" />
        </SectionWrapper>
        {/* Mouth style */}
        <SectionWrapper
          className="w-8 h-8 rounded-full p-2 mx-2"
          tip="Mouth"
          switchConfig={this.switchConfig.bind(this, 'mouthStyle', config.mouthStyle)}>
          <Mouth style={config.mouthStyle} color="#fff" />
        </SectionWrapper>
        {/* Shirt style */}
        <SectionWrapper
          className="w-8 h-8 rounded-full p-2 mx-2"
          tip="Shirt"
          switchConfig={this.switchConfig.bind(this, 'shirtStyle', config.shirtStyle)}>
          <Shirt style={config.shirtStyle} color="#fff" />
        </SectionWrapper>

        {/* Shape style */}
        <SectionWrapper
          className="w-8 h-8 rounded-full p-2 mx-2"
          tip="Shape"
          switchConfig={this.switchShape.bind(this, shape)}>
          <div
            className={classnames("w-3 h-3 bg-white", {
              "rounded-full": shape === 'circle',
              "rounded": shape === 'rounded'
            })} />
        </SectionWrapper>

        <div className="divider w-0.5 h-5 rounded mx-2" />
        <div className="mx-2 relative flex justify-center">
          <i
            className={classnames("iconfont icon-code text-xl  cursor-pointer transition duration-300 hover:text-green-100", {
              banTip: isCodeShow
            })}
            data-tip="Config"
            onClick={this.toggleCodeShow.bind(this)} />
          <div className={classnames("rounded-lg bg-white py-5 px-6 absolute bottom-full codeBlock mb-4", {
            active: isCodeShow
          })}>
            <pre className="text-sm">{this.genCodeString(config)}</pre>
          </div>
        </div>

        <div className="divider w-0.5 h-5 rounded mx-2" />
        <i
          className="iconfont icon-download text-xl mx-2 cursor-pointer transition duration-300 hover:text-green-100"
          data-tip="Download"
          onClick={download} />
      </div>
    )
  }
}
