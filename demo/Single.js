import React, { Component } from "react";
import { ChromePicker } from "react-color";
import classnames from "classnames";
import Slider from "rc-slider";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

import Avatar, { genConfig } from "../src";

import "rc-slider/assets/index.css";

export default class Single extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgShape: "circle",
      size: 25, // rem
      faceColorPanelOpen: false,
      hairColorPanelOpen: false,
      shirtColorPanelOpen: false,
      bgColorPanelOpen: false
    };

    this.closeAllColorPanel = this.closeAllColorPanel.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", this.closeAllColorPanel);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.closeAllColorPanel);
  }

  updateConfig(field, value) {
    const { config, updateConfig } = this.props;
    if (config[field] === value) return;
    config[field] = value;
    if (field === "sex") {
      updateConfig(genConfig({ sex: value }));
    } else {
      updateConfig(config);
    }
  }

  onChangeColor(field, value) {
    const { config, updateConfig } = this.props;
    config[field] = value.hex;
    updateConfig(config);
  }

  toggleColorPanel(panelName, e) {
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      [panelName]: !this.state[panelName]
    });
  }

  closeAllColorPanel() {
    this.setState({
      hairColorPanelOpen: false,
      faceColorPanelOpen: false,
      shirtColorPanelOpen: false,
      bgColorPanelOpen: false
    });
  }

  genRandom() {
    const { updateConfig } = this.props;
    updateConfig(genConfig());
  }

  changeBgShape(shape) {
    this.setState({
      bgShape: shape
    });
  }

  changeSize(number) {
    this.setState({
      size: number
    });
  }

  async download() {
    const scale = 2;
    const node = document.getElementById("avatar");
    const blob = await domtoimage.toBlob(node, {
      height: node.offsetHeight * scale,
      style: {
        transform: `scale(${scale}) translate(${node.offsetWidth / 2 / scale}px, ${node.offsetHeight / 2 / scale}px)`,
        "border-radius": 0
      },
      width: node.offsetWidth * scale
    });

    saveAs(blob, "avatar.png");
  }

  render() {
    const { config } = this.props;
    const {
      size,
      bgShape,
      faceColorPanelOpen,
      hairColorPanelOpen,
      shirtColorPanelOpen,
      bgColorPanelOpen
    } = this.state;
    return (
      <div className="singleSection">
        <div className="left">
          <div className="avatarWrapper">
            <Avatar
              id="avatar"
              style={{
                width: `${size}rem`,
                height: `${size}rem`
              }}
              shape={bgShape}
              {...config} />
          </div>
          <Slider
            className="sizeSlider"
            value={size}
            min={1}
            max={25}
            onChange={this.changeSize.bind(this)} />
          <div className="btnGroup">
            <button
              className="random"
              onClick={this.genRandom.bind(this)}>
              Random
            </button>
            <button
              className="download"
              onClick={this.download.bind(this)}>
              Download
            </button>
          </div>
        </div>

        <div className="info">
          {/* Sex */}
          <p className="field">SEX</p>
          <div className="opts">
            <p
              className={classnames("opt", { active: config.sex === "man" })}
              onClick={this.updateConfig.bind(this, "sex", "man")}>
              Man
            </p>
            <p
              className={classnames("opt", { active: config.sex === "woman" })}
              onClick={this.updateConfig.bind(this, "sex", "woman")}>
              Woman
            </p>
          </div>

          {/* Face */}
          <div className="field">
            <p>FACE</p>
            <div className="colorPanelWrapper" onClick={(e) => e.nativeEvent.stopImmediatePropagation()}>
              <i
                className="iconfont icon-color"
                onClick={this.toggleColorPanel.bind(this, "faceColorPanelOpen")} />
              {faceColorPanelOpen &&
                <ChromePicker
                  className="colorPanel"
                  color={config.faceColor}
                  onChange={this.onChangeColor.bind(this, "faceColor")} />
              }
            </div>
          </div>
          <div className="opts">
            <p
              className={classnames("opt", { active: config.faceColor === "#F9C9B6" })}
              onClick={this.updateConfig.bind(this, "faceColor", "#F9C9B6")}>
              Light
            </p>
            <p
              className={classnames("opt", { active: config.faceColor === "#AC6651" })}
              onClick={this.updateConfig.bind(this, "faceColor", "#AC6651")}>
              Dark
            </p>
          </div>

          {/* Hair */}
          <div className="field">
            <p>HAIR</p>
            <div className="colorPanelWrapper" onClick={(e) => e.nativeEvent.stopImmediatePropagation()}>
              <i
                className="iconfont icon-color"
                onClick={this.toggleColorPanel.bind(this, "hairColorPanelOpen")} />
              {hairColorPanelOpen &&
                <ChromePicker
                  className="colorPanel"
                  color={config.hairColor}
                  onChange={this.onChangeColor.bind(this, "hairColor")} />
              }
            </div>
          </div>
          <div className="opts">
            <p
              className={classnames("opt", { active: config.hairStyle === "normal" })}
              onClick={this.updateConfig.bind(this, "hairStyle", "normal")}>
              Normal
            </p>
            <p
              className={classnames("opt", { active: config.hairStyle === "thick" })}
              onClick={this.updateConfig.bind(this, "hairStyle", "thick")}>
              Thick
            </p>
            <p
              className={classnames("opt", { active: config.hairStyle === "mohawk" })}
              onClick={this.updateConfig.bind(this, "hairStyle", "mohawk")}>
              Mohawk
            </p>
            <p
              className={classnames("opt", { active: config.hairStyle === "womanLong" })}
              onClick={this.updateConfig.bind(this, "hairStyle", "womanLong")}>
              Woman Long
            </p>
            <p
              className={classnames("opt", { active: config.hairStyle === "womanShort" })}
              onClick={this.updateConfig.bind(this, "hairStyle", "womanShort")}>
              Woman Short
            </p>
            <p
              className={classnames("opt", { active: config.hairStyle === "turban" })}
              onClick={this.updateConfig.bind(this, "hairStyle", "turban")}>
              Turban
            </p>
            <p
              className={classnames("opt", { active: config.hairStyle === "beanie" })}
              onClick={this.updateConfig.bind(this, "hairStyle", "beanie")}>
              Beanie
            </p>
          </div>

          {/* Eyes */}
          <p className="field">EYES</p>
          <div className="opts">
            <p
              className={classnames("opt", { active: config.eyeStyle === "circle" })}
              onClick={this.updateConfig.bind(this, "eyeStyle", "circle")}>
              Circle
            </p>
            <p
              className={classnames("opt", { active: config.eyeStyle === "oval" })}
              onClick={this.updateConfig.bind(this, "eyeStyle", "oval")}>
              Oval
            </p>
            <p
              className={classnames("opt", { active: config.eyeStyle === "smile" })}
              onClick={this.updateConfig.bind(this, "eyeStyle", "smile")}>
              Smile
            </p>
          </div>

          {/* Glasses */}
          <p className="field">GLASSES</p>
          <div className="opts">
            <p
              className={classnames("opt", { active: config.glassesStyle === "none" })}
              onClick={this.updateConfig.bind(this, "glassesStyle", "none")}>
              None
            </p>
            <p
              className={classnames("opt", { active: config.glassesStyle === "round" })}
              onClick={this.updateConfig.bind(this, "glassesStyle", "round")}>
              Round
            </p>
            <p
              className={classnames("opt", { active: config.glassesStyle === "square" })}
              onClick={this.updateConfig.bind(this, "glassesStyle", "square")}>
              Square
            </p>
          </div>

          {/* Ear */}
          <p className="field">EAR</p>
          <div className="opts">
            <p
              className={classnames("opt", { active: config.earSize === "small" })}
              onClick={this.updateConfig.bind(this, "earSize", "small")}>
              Small
            </p>
            <p
              className={classnames("opt", { active: config.earSize === "big" })}
              onClick={this.updateConfig.bind(this, "earSize", "big")}>
              Big
            </p>
          </div>

          {/* Nose */}
          <p className="field">NOSE</p>
          <div className="opts">
            <p
              className={classnames("opt", { active: config.noseStyle === "short" })}
              onClick={this.updateConfig.bind(this, "noseStyle", "short")}>
              Short
            </p>
            <p
              className={classnames("opt", { active: config.noseStyle === "long" })}
              onClick={this.updateConfig.bind(this, "noseStyle", "long")}>
              Long
            </p>
            <p
              className={classnames("opt", { active: config.noseStyle === "round" })}
              onClick={this.updateConfig.bind(this, "noseStyle", "round")}>
              Round
            </p>
          </div>

          {/* Mouth */}
          <p className="field">MOUTH</p>
          <div className="opts">
            <p
              className={classnames("opt", { active: config.mouthStyle === "laugh" })}
              onClick={this.updateConfig.bind(this, "mouthStyle", "laugh")}>
              Laugh
            </p>
            <p
              className={classnames("opt", { active: config.mouthStyle === "smile" })}
              onClick={this.updateConfig.bind(this, "mouthStyle", "smile")}>
              Smile
            </p>
            <p
              className={classnames("opt", { active: config.mouthStyle === "peace" })}
              onClick={this.updateConfig.bind(this, "mouthStyle", "peace")}>
              Peace
            </p>
          </div>

          {/* Shirt */}
          <div className="field">
            <p>SHIRT</p>
            <div className="colorPanelWrapper" onClick={(e) => e.nativeEvent.stopImmediatePropagation()}>
              <i
                className="iconfont icon-color"
                onClick={this.toggleColorPanel.bind(this, "shirtColorPanelOpen")} />
              {shirtColorPanelOpen &&
                <ChromePicker
                  className="colorPanel top"
                  color={config.shirtColor}
                  onChange={this.onChangeColor.bind(this, "shirtColor")} />
              }
            </div>
          </div>
          <div className="opts">
            <p
              className={classnames("opt", { active: config.shirtStyle === "hoody" })}
              onClick={this.updateConfig.bind(this, "shirtStyle", "hoody")}>
              Hoody
            </p>
            <p
              className={classnames("opt", { active: config.shirtStyle === "short" })}
              onClick={this.updateConfig.bind(this, "shirtStyle", "short")}>
              Short
            </p>
            <p
              className={classnames("opt", { active: config.shirtStyle === "polo" })}
              onClick={this.updateConfig.bind(this, "shirtStyle", "polo")}>
              Polo
            </p>
          </div>

          {/* Background */}
          <div className="field">
            <p>BACKGROUND</p>
            <div className="colorPanelWrapper" onClick={(e) => e.nativeEvent.stopImmediatePropagation()}>
              <i
                className="iconfont icon-color"
                onClick={this.toggleColorPanel.bind(this, "bgColorPanelOpen")} />
              {bgColorPanelOpen &&
                <ChromePicker
                  className="colorPanel top"
                  color={config.bgColor}
                  onChange={this.onChangeColor.bind(this, "bgColor")} />
              }
            </div>
          </div>
          <div className="opts">
            <p
              className={classnames("opt", { active: bgShape === "circle" })}
              onClick={this.changeBgShape.bind(this, "circle")}>
              Circle
            </p>
            <p
              className={classnames("opt", { active: bgShape === "rounded" })}
              onClick={this.changeBgShape.bind(this, "rounded")}>
              Rounded
            </p>
            <p
              className={classnames("opt", { active: bgShape === "square" })}
              onClick={this.changeBgShape.bind(this, "square")}>
              Square
            </p>
          </div>
          {/* Theme */}
          <div className="field">
            Theme
          </div>
          <div className="opts">
            <p
              className={
              classnames("opt", { active: config.theme === "light" })}
              onClick={this.updateConfig.bind(this, "theme", "light")}
              >
              Light
            </p>
            <p
              className={
              classnames("opt", { active: config.theme === "dark" })}
              onClick={this.updateConfig.bind(this, "theme", "dark")}
              >
              Dark
            </p>
            <p
              className={
              classnames("opt", { active: config.theme === "system" })}
              onClick={this.updateConfig.bind(this, "theme", "system")}
              >
              Follow System
            </p>
          </div>
        </div>
      </div>
    );
  }
}
