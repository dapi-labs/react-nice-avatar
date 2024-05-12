import register from "preact-custom-element";
import NiceAvatar from "./components/NiceAvatar";

register(
  NiceAvatar,
  "nice-avatar",
  [
    "bgColor",
    "earSize",
    "eyesStyle",
    "facialHairStyle,",
    "hairColor",
    "hairStyle",
    "mouthStyle",
    "noseStyle",
    "shirtColor",
    "shirtStyle",
    "skinColor",
    "earRing",
    "eyebrowsStyle",
    "glassesStyle",
    "shape",
  ],
  { shadow: false }
);
