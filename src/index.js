import React, { Component } from "react";
import PropTypes from "prop-types";

import { genConfig } from "./utils";

import Face from "./face";
import Hair from "./hair";
import Hat from "./hat";
import Ear from "./ear";
import Eyebrow from "./eyebrow";
import Eye from "./eyes";
import Glasses from "./glasses";
import Nose from "./nose";
import Mouth from "./mouth";
import Shirt from "./shirt";

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
    hatColor: PropTypes.string,
    hatStyle: PropTypes.oneOf(["beanie", "turban", "none"]),
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
            <Hat
              color={config.hatColor}
              style={config.hatStyle} />
            {config.hatStyle === "none" &&
              <Hair
                color={config.hairColor}
                style={config.hairStyle}
                colorRandom={hairColorRandom} />
            }

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

export { genConfig } from "./utils";
