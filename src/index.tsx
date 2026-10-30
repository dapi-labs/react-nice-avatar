import { Earrings } from "./originals";
import React, { Component } from "react";
import PropTypes from "prop-types";

import type { NiceAvatarProps } from "./types"

import { genConfig, defaultOptions } from "./utils";

import Face from "./face";
import Robot from "./robot";
import FacialHair from "./facialHair";
import Hair from "./hair";
import HairVariants from "./hair/variants";
import Hat from "./hat";
import Ear from "./ear";
import Eyebrow from "./eyebrow";
import Eye from "./eyes";
import Glasses from "./glasses";
import Nose from "./nose";
import Mouth from "./mouth";
import Shirt from "./shirt";

export default class ReactNiceAvatar extends Component<NiceAvatarProps> {
  static propTypes = {
    avatarStyle: PropTypes.oneOf(["human", "robot"]),
    facialHairStyle: PropTypes.oneOf(["none", "mustache", "handlebar", "beard", "goatee", "goateeV2", "fullBeard", "chinBeard", "originalBeard", "scruff"]),
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    shape: PropTypes.oneOf(["circle", "rounded", "square"]),
    sex: PropTypes.oneOf(defaultOptions.sex),
    faceColor: PropTypes.string,
    earringStyle: PropTypes.oneOf(["none", "hoop", "stud"]),
    earringColor: PropTypes.string,
    eyeshadowColor: PropTypes.string,
    earSize: PropTypes.oneOf(defaultOptions.earSize),
    hairColor: PropTypes.string,
    hairStyle: PropTypes.oneOf(
      (defaultOptions.hairStyleMan as string[]).concat(defaultOptions.hairStyleWoman as string[], ["dougFunny", "bald", "curlyV2", "bobV2", "pixieV2", "bunV2", "buzzV2"])
    ),
    hatColor: PropTypes.string,
    hatStyle: PropTypes.oneOf(defaultOptions.hatStyle),
    hairColorRandom: PropTypes.bool,
    eyeStyle: PropTypes.oneOf([...defaultOptions.eyeStyle, "eyeshadow", "smileShadow"]),
    glassesStyle: PropTypes.oneOf(defaultOptions.glassesStyle),
    glassesColor: PropTypes.string,
    glassesMode: PropTypes.oneOf(["transparent", "tinted", "dark"]),
    eyeBrowStyle: PropTypes.oneOf(["up", "upWoman", "unibrow", "down", "eyelashesDown"]),
    noseStyle: PropTypes.oneOf(defaultOptions.noseStyle),
    mouthStyle: PropTypes.oneOf([...defaultOptions.mouthStyle, "surprised", "sad", "frown", "pucker", "nervous"]),
    shirtStyle: PropTypes.oneOf(defaultOptions.shirtStyle),
    shirtColor: PropTypes.string,
    bgColor: PropTypes.string,
    isGradient: PropTypes.bool
  }

  render() {
    const { id, className, style, shape = "circle", hairColorRandom = false } = this.props;
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
            {config.avatarStyle !== "robot" && config.hatStyle === "none" && ["bob"].includes(config.hairStyle) &&
              <HairVariants style={config.hairStyle} color={config.hairColor} behindFace />
            }
            {config.avatarStyle === "robot" ? <Robot color={config.faceColor} accent={config.shirtColor} /> : <Face color={config.faceColor} />}
            <Hat
              color={config.hatColor}
              style={config.hatStyle} />
            {config.hatStyle === "none" && config.avatarStyle !== "robot" &&
              <Hair
                color={config.hairColor}
                style={config.hairStyle}
                colorRandom={hairColorRandom} />
            }

            {config.avatarStyle !== "robot" && <>
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
              <Eye style={config.eyeStyle} color={config.eyeshadowColor} />
              <Glasses style={config.glassesStyle} color={config.glassesColor} mode={config.glassesMode} />
              {["fullBeard", "chinBeard", "originalBeard", "scruff"].includes(config.facialHairStyle || "") && <FacialHair style={config.facialHairStyle} color={config.hairColor} />}
              <Ear color={config.faceColor} size={config.earSize} />
              <Earrings style={config.earringStyle} color={config.earringColor} size={config.earSize} />
              <Nose style={config.noseStyle} />
              <Mouth style={config.mouthStyle} />
              {!["fullBeard", "chinBeard", "originalBeard", "scruff"].includes(config.facialHairStyle || "") && <FacialHair style={config.facialHairStyle || "none"} color={config.hairColor} />}
            </div>

            </>}
            {config.avatarStyle !== "robot" && <Shirt color={config.shirtColor} style={config.shirtStyle} />}
          </div>
        </div>
      </div>
    );
  }
}

export { avatarPresets } from "./presets";
export { genConfig } from "./utils";
