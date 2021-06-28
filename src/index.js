import React, { Component } from "react";
import PropTypes from "prop-types";

import Face from "./face";
import Hair from "./hair";
import Ear from "./ear";
import Eyebrow from "./eyebrow";
import Eye from "./eyes";
import Glasses from "./glasses";
import Nose from "./nose";
import Mouth from "./mouth";
import Shirt from "./shirt";

const sex = ["man", "woman"];
const faceColor = ["#F9C9B6", "#AC6651"];
const earSize = ["small", "big"];
const hairColor = ["#000", "#fff", "#77311D", "#FC909F", "#D2EFF3", "#506AF4", "#F48150"];
const hairStyleMan = ["normal", "thick", "mohawk", "beanie"];
const hairStyleWoman = ["normal", "womanLong", "womanShort"];
const eyeBrowWoman = ["up", "upWoman"];
const eyeStyle = ["circle", "oval", "smile"];
const noseStyle = ["short", "long", "round"];
const mouthStyle = ["laugh", "smile", "peace"];
const shirtStyle = ["hoody", "short", "polo"];
const shirtColor = ["#9287FF", "#6BD9E9", "#FC909F", "#F4D150", "#77311D"];
const bgColor = ["#9287FF", "#6BD9E9", "#FC909F", "#F4D150", "#E0DDFF", "#D2EFF3", "#FFEDEF", "#FFEBA4", "#506AF4", "#F48150", "#74D153"];
const glassesStyle = ["round", "square", "none"];

const _pickRandomFromList = (data, { avoidList = [], usually = [] } = {}) => {
  const avoidSet = new Set(avoidList.filter((item) => Boolean(item)));
  let myData = data.filter((item) => !avoidSet.has(item));
  const usuallyData = usually.reduce((acc, cur) => acc.concat(new Array(15).fill(cur)), []);
  myData = myData.concat(usuallyData);
  const amount = myData.length;
  const randomIdx = Math.floor(Math.random() * amount);
  return myData[randomIdx];
};

export default class ReactNiceAvatar extends Component {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    shape: PropTypes.oneOf(["circle", "rounded", "square"]),
    sex: PropTypes.oneOf(["man", "woman"]),
    faceColor: PropTypes.string,
    earSize: PropTypes.oneOf(["small", "big"]),
    hairColor: PropTypes.string,
    hairStyle: PropTypes.oneOf(["normal", "thick", "mohawk", "womanLong", "womanShort","beanie","turban"]),
    hairColorRandom: PropTypes.bool,
    eyeStyle: PropTypes.oneOf(["circle", "oval", "smile"]),
    glassesStyle: PropTypes.oneOf(["round", "square", "none"]),
    noseStyle: PropTypes.oneOf(["short", "long", "round"]),
    mouthStyle: PropTypes.oneOf(["laugh", "smile", "peace"]),
    shirtStyle: PropTypes.oneOf(["hoody", "short", "polo"]),
    shirtColor: PropTypes.string,
    bgColor: PropTypes.string
  }

  static defaultProps = {
    shape: "circle",
    hairColorRandom: false
  }

  render() {
    const { id, className, style, shape, hairColorRandom } = this.props;
    const config = genConfig(this.props);

    // Background shape
    let borderRadius;
    switch (shape) {
      case "circle": {
        borderRadius = "100%";
        break;
      }
      case "rounded": {
        borderRadius = "6px";
        break;
      }
      case "square": {
        borderRadius = 0;
        break;
      }
    }

    return (
      <div
        id={id}
        className={className}
        style={{
          background: config.bgColor,
          overflow: "hidden",
          borderRadius,
          ...style
        }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%"
          }}>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "90%"
            }}>
            <Face color={config.faceColor} />
            <Hair
              color={config.hairColor}
              style={config.hairStyle}
              colorRandom={hairColorRandom} />

            {/* Face detail */}
            <div
              style={{
                position: "absolute",
                right: "-3%",
                top: "30%",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}>
              <Eyebrow style={config.eyeBrowStyle} />
              <Eye style={config.eyeStyle} />
              <Glasses style={config.glassesStyle} />
              <Ear color={config.faceColor} size={config.earSize} />
              <Nose style={config.noseStyle} />
              <Mouth style={config.mouthStyle} />
            </div>

            <Shirt color={config.shirtColor} style={config.shirtStyle} />
          </div>
        </div>
      </div>
    );
  }
}

export const genConfig = (userConfig = {}) => {
  const response = {};

  response.sex = userConfig.sex || _pickRandomFromList(sex);
  response.faceColor = userConfig.faceColor || _pickRandomFromList(faceColor);
  response.earSize = userConfig.earSize || _pickRandomFromList(earSize);
  response.eyeStyle = userConfig.eyeStyle || _pickRandomFromList(eyeStyle);
  response.noseStyle = userConfig.noseStyle || _pickRandomFromList(noseStyle);
  response.mouthStyle = userConfig.mouthStyle || _pickRandomFromList(mouthStyle);
  response.shirtStyle = userConfig.shirtStyle || _pickRandomFromList(shirtStyle);
  response.glassesStyle = userConfig.glassesStyle || _pickRandomFromList(glassesStyle, { usually: ["none"] });

  // Hair
  let hairColorAvoidList = [];
  let hairColorUsually = [];
  if (!userConfig.hairColor) {
    switch (response.sex) {
      case "woman": {
        hairColorAvoidList = response.faceColor === faceColor[1] && ["#77311D"] || [];
        break;
      }
      case "man": {
        hairColorUsually = ["#000"];
      }
    }
  }
  response.hairColor = userConfig.hairColor || _pickRandomFromList(hairColor, {
    avoidList: hairColorAvoidList,
    usually: hairColorUsually
  });

  let myHairStyle = userConfig.hairStyle;
  if (!myHairStyle) {
    switch (response.sex) {
      case "man": {
        myHairStyle = _pickRandomFromList(hairStyleMan, { usually: ["normal", "thick"] });
        break;
      }
      case "woman": {
        myHairStyle = _pickRandomFromList(hairStyleWoman);
        break;
      }
    }
  }
  response.hairStyle = myHairStyle;

  // Eyebrow
  let myEyeBrowStyle = userConfig.eyeBrowStyle || "up";
  if (!userConfig.eyeBrowStyle && response.sex === "woman") {
    myEyeBrowStyle = _pickRandomFromList(eyeBrowWoman);
  }
  response.eyeBrowStyle = myEyeBrowStyle;

  // Shirt color
  response.shirtColor = userConfig.shirtColor || _pickRandomFromList(shirtColor, { avoidList: [response.hairColor] });

  // Background color
  response.bgColor = userConfig.bgColor || _pickRandomFromList(bgColor, { avoidList: [response.hairColor, response.shirtColor] });

  return response;
};
