import React, { Component } from "react";
import classnames from "classnames";
import { ChromePicker } from "react-color";

import Avatar, { genConfig } from "../src";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: genConfig(),
      bgShape: "circle",
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

  updateConfig(field, value) {
    const { config } = this.state;
    if (config[field] === value) return;
    config[field] = value;
    this.setState({
      config
    });
  }

  onChangeColor(field, value) {
    const { config } = this.state;
    config[field] = value.hex;
    this.setState({
      config
    });
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
    this.setState({
      config: genConfig()
    });
  }

  changeBgShape(shape) {
    this.setState({
      bgShape: shape
    });
  }

  render() {
    const {
      config,
      faceColorPanelOpen,
      hairColorPanelOpen,
      shirtColorPanelOpen,
      bgColorPanelOpen,
      bgShape
    } = this.state;
    return (
      <div className="app">
        <a className="iconfont icon-github" href="https://github.com/chilllab/react-nice-avatar" />

        <div className="left">
          <Avatar className="avatar" shape={bgShape} {...config} />
          <button onClick={this.genRandom.bind(this)}>
            Random
          </button>
        </div>

        <div className="info">
          {/* Sex */}
          <p className="field">Sex</p>
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
            <p>Face</p>
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

          {/* Ear */}
          <p className="field">Ear</p>
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

          {/* Hair */}
          <div className="field">
            <p>Hair</p>
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
          </div>

          {/* Eyes */}
          <p className="field">Eyes</p>
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

          {/* Nose */}
          <p className="field">Nose</p>
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
          <p className="field">Mouth</p>
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
            <p>Shirt</p>
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
            <p>Background</p>
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
        </div>
      </div>
    );
  }
}
