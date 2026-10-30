import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { defaultOptions } from "react-nice-avatar/utils"
import FacialHair from "react-nice-avatar/facialHair"
import Artwork from "react-nice-avatar/originals/artwork"
import Robot from "react-nice-avatar/robot"
import Face from "react-nice-avatar/face/index"
import Hair from "react-nice-avatar/hair/index"
import Hat from "react-nice-avatar/hat/index"
import Eyes from "react-nice-avatar/eyes/index"
import { resolveGlasses } from "react-nice-avatar/glasses/config"
import Eyebrow from "react-nice-avatar/eyebrow/index"
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
      earringStyle: ['none', 'hoop', 'stud'],
      glassesMode: ['transparent', 'tinted', 'dark'],
      earringColor: ['#F4D150', '#D2EFF3', '#FC909F', '#506AF4', '#FFFFFF'],
      eyeshadowColor: ['#D2EFF3', '#FC909F', '#9287FF', '#6BD9E9', '#FFEBA4'],
      glassesColor: ['#ADBFFF', '#6BD9E9', '#FC909F', '#F4D150', '#D2EFF3'],
      bgColor: [...opts.bgColor, ...opts.gradientBgColor],
      avatarStyle: ["human", "robot"],
      facialHairStyle: ["none", "mustache", "handlebar", "goatee", "fullBeard", "chinBeard", "originalBeard", "scruff"],
      glassesStyle: ["round", "square", "aviator", "none"],
      eyeBrowStyle: ["up", "upWoman", "unibrow", "down", "eyelashesDown"],
      hairStyle: [...Array.from(hairSet), "dougFunny", "bald"],
      eyeStyle: [...opts.eyeStyle, "eyeshadow", "smileShadow"],
      mouthStyle: [...opts.mouthStyle, "surprised", "sad", "frown", "pucker", "nervous"]
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
    const ignoreAttr = ['id']
    const myConfig = Object.keys(config)
      .filter(key => !ignoreAttr.includes(key))
      .reduce((acc, key) => ({ ...acc, [key]: config[key] }), {})
    return "const config = " +
    JSON.stringify(myConfig, null, 2) +
    "\n" +
    "const myConfig = genConfig(config)\n" +
    "<NiceAvatar style={{ width: '5rem', height: '5rem' }} {...myConfig} />"
  }

  render () {
    const { config, shape, download } = this.props
    const { isCodeShow } = this.state
    const human = config.avatarStyle !== 'robot'
    const glasses = resolveGlasses(config.glassesStyle, config.glassesMode)
    const control = (key, label, current, icon) => <SectionWrapper key={key}
      className="w-8 h-8 rounded-full p-2 mx-2"
      tip={`${label}: ${current}`} switchConfig={() => this.switchConfig(key, current)}>{icon}</SectionWrapper>
    const colorControl = (key, label, fallback) => control(key, label, config[key] || fallback,
      <span className="colorSwatch" style={{background: config[key] || fallback}} />)
    return <div className="AvatarEditor" role="group" aria-label="Editor de avatar">
      <div className="editorRow editorPrimary rounded-full px-3 py-2 flex items-center" aria-label="Controles originales">
        {control('faceColor', human ? 'Piel' : 'Carcasa', config.faceColor, <Face color={config.faceColor} />)}
        {human && control('hairStyle', 'Peinado', config.hairStyle, <Hair style={config.hairStyle} color="#fff" colorRandom />)}
        {control('hatStyle', 'Sombrero', config.hatStyle, <Hat style={config.hatStyle === 'none' ? 'beanie' : config.hatStyle} color="#fff" />)}
        {human && control('eyeStyle', 'Ojos', config.eyeStyle, <Eyes style={config.eyeStyle} color="#fff" />)}
        {human && control('glassesStyle', 'Lentes', glasses.style, <Glasses style={glasses.style === 'none' ? 'round' : glasses.style} mode={glasses.mode} color={config.glassesColor} />)}
        {human && control('earSize', 'Orejas', config.earSize, <Ear size={config.earSize} color="#fff" />)}
        {human && control('noseStyle', 'Nariz', config.noseStyle, <Nose style={config.noseStyle} />)}
        {human && control('mouthStyle', 'Boca', config.mouthStyle, <Mouth style={config.mouthStyle} />)}
        {human && control('shirtStyle', 'Ropa', config.shirtStyle, <Shirt style={config.shirtStyle} color="#fff" />)}
      <SectionWrapper className="w-8 h-8 rounded-full p-2 mx-2" tip={`Forma: ${shape}`} switchConfig={() => this.switchShape(shape)}>
        <div className={classnames("w-3 h-3 bg-white", {"rounded-full": shape === 'circle', "rounded": shape === 'rounded'})} />
      </SectionWrapper>
      <div className="divider w-0.5 h-5 rounded mx-2" />
      <div className="mx-2 relative flex justify-center">
        <button type="button" className="iconfont icon-code text-xl cursor-pointer" aria-label="Mostrar configuración" aria-expanded={isCodeShow} onClick={this.toggleCodeShow.bind(this)} />
        {isCodeShow && <div className="rounded-lg p-5 absolute bottom-full codeBlock mb-4 active">
          <pre className="text-xs highres:text-sm">{this.genCodeString(config)}</pre>
        </div>}
      </div>
      <div className="divider w-0.5 h-5 rounded mx-2" />
      <button type="button" className="iconfont icon-download text-xl mx-2 cursor-pointer" aria-label="Descargar avatar" onClick={download} />
      </div>
      <div className="editorRow rounded-full px-3 py-2 flex items-center" aria-label="Nuevos accesorios">
        {control('avatarStyle', 'Humano / Robot', config.avatarStyle || 'human', <Robot color="#D2EFF3" accent="#6BD9E9" />)}
        {human && (control('eyeBrowStyle', 'Cejas', config.eyeBrowStyle, <Eyebrow style={config.eyeBrowStyle} />))}
        {human && (control('facialHairStyle', 'Barba y bigote', config.facialHairStyle || 'none', <FacialHair style={config.facialHairStyle && config.facialHairStyle !== 'none' ? config.facialHairStyle : 'goatee'} color="#fff" />))}
        {human && (control('earringStyle', 'Arete', config.earringStyle || 'none', <svg viewBox="-3 -3 54 54" fill="none"><Artwork name={config.earringStyle === 'stud' ? 'stud' : 'hoop'} color="#F4D150" /></svg>))}
        {human && (glasses.style !== 'none' && control('glassesMode', 'Acabado de lentes', glasses.mode, <Glasses style={glasses.style} mode={glasses.mode} color={config.glassesColor} />))}
      </div>
      <div className="editorRow rounded-full px-3 py-2 flex items-center" aria-label="Colores">
        {human && (colorControl('hairColor', 'Color de cabello y barba', '#171921'))}
        {config.hatStyle !== 'none' && colorControl('hatColor', 'Color del sombrero', '#171921')}
        {human && (config.earringStyle && config.earringStyle !== 'none' && colorControl('earringColor', 'Color del arete', '#F4D150'))}
        {human && (['eyeshadow', 'smileShadow'].includes(config.eyeStyle) && colorControl('eyeshadowColor', 'Color de sombra de ojos', '#D2EFF3'))}
        {human && (glasses.style !== 'none' && glasses.mode === 'tinted' && colorControl('glassesColor', 'Color de cristales', '#ADBFFF'))}
        {colorControl('shirtColor', human ? 'Color de ropa' : 'Color de ojos y detalles del robot', '#9287FF')}
        {colorControl('bgColor', 'Fondo', '#F4D150')}
      </div>
    </div>
  }
}
