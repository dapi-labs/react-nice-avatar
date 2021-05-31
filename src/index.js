import React, { Component } from "react";
import PropTypes from "prop-types";

import Face from "./face";
import Hair from "./hair";
import Ear from "./ear";
import Eyebrow from "./eyebrow";
import Eye from "./eyes";
import Nose from "./nose";
import Mouth from "./mouth";
import Shirt from "./shirt";

const sex = ["man", "woman"];
const faceColor = ["#F9C9B6", "#AC6651"];
const earSize = ["small", "big"];
const hairColor = ["#000", "#77311D", "#FC909F", "#D2EFF3"];
const hairStyleMan = ["normal", "thick", "mohawk"];
const hairStyleWoman = ["normal", "womanLong", "womanShort"];
const eyeBrowWoman = ["up", "upWoman"];
const eyeStyle = ["circle", "oval", "smile"];
const noseStyle = ["short", "long", "round"];
const mouthStyle = ["laugh", "smile", "peace"];
const shirtStyle = ["hoody", "short", "polo"];
const shirtColor = ["#9287FF", "#6BD9E9", "#FC909F", "#F4D150", "#77311D"];
const bgColor = ["#9287FF", "#6BD9E9", "#FC909F", "#F4D150", "#E0DDFF", "#D2EFF3", "#FFEDEF", "#FFEBA4"];

const _pickRandomFromList = (data, avoidList = []) => {
  const aviodSet = new Set(avoidList.filter((item) => Boolean(item)));
  const myData = data.filter((item) => !aviodSet.has(item));
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
    hairStyle: PropTypes.oneOf(["normal", "thick", "mohawk", "womanLong", "womanShort"]),
    eyeStyle: PropTypes.oneOf(["circle", "oval", "smile"]),
    noseStyle: PropTypes.oneOf(["short", "long", "round"]),
    mouthStyle: PropTypes.oneOf(["laugh", "smile", "peace"]),
    shirtStyle: PropTypes.oneOf(["hoody", "short", "polo"]),
    shirtColor: PropTypes.string,
    bgColor: PropTypes.string
  }

  static defaultProps = {
    shape: "circle"
  }

  render() {
    const { id, className, style, shape } = this.props;
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
      case "squal": {
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
            <Hair color={config.hairColor} style={config.hairStyle} />
            <Ear color={config.faceColor} size={config.earSize} />

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

  // Hair
  let hairColorAvoidList = [];
  if (!userConfig.hairColor && response.sex === "woman") {
    hairColorAvoidList = response.faceColor === faceColor[1] && ["#77311D"] || [];
  }
  response.hairColor = userConfig.hairColor || _pickRandomFromList(hairColor, hairColorAvoidList);

  let myHairStyle = userConfig.hairStyle;
  if (!myHairStyle) {
    switch (response.sex) {
      case "man": {
        myHairStyle = _pickRandomFromList(hairStyleMan);
        break;
      }
      case "woman": {
        myHairStyle = _pickRandomFromList(hairStyleWoman);
        break;
      }
    }
  }
  response.hairStyle = myHairStyle;

  // Eyebrown
  let myEyeBrowStyle = userConfig.eyeBrowStyle || "up";
  if (!userConfig.eyeBrowStyle && response.sex === "woman") {
    myEyeBrowStyle = _pickRandomFromList(eyeBrowWoman);
  }
  response.eyeBrowStyle = myEyeBrowStyle;

  // Shirt color
  response.shirtColor = userConfig.shirtColor || _pickRandomFromList(shirtColor, [response.hairColor]);

  // Background color
  response.bgColor = userConfig.bgColor || _pickRandomFromList(bgColor, [response.hairColor, response.shirtColor]);

  return response;
};
