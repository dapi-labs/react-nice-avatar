import Body from "@nice-avatar-svg/shared/components/Body";
import Layout from "@nice-avatar-svg/shared/components/Layout";
import { COLORS } from "@nice-avatar-svg/shared/constants.mjs";
import { lazy } from "solid-js";

const EarAttached = lazy(() => import("@nice-avatar-svg/shared/components/EarAttached"));
const EarDetached = lazy(() => import("@nice-avatar-svg/shared/components/EarDetached"));
const EarRingHoop = lazy(() => import("@nice-avatar-svg/shared/components/EarRingHoop"));
const EyebrowsDown = lazy(() => import("@nice-avatar-svg/shared/components/EyebrowsDown"));
const EyebrowsEyelashesDown = lazy(() => import("@nice-avatar-svg/shared/components/EyebrowsEyelashesDown"));
const EyebrowsEyelashesUp = lazy(() => import("@nice-avatar-svg/shared/components/EyebrowsEyelashesUp"));
const EyebrowsUp = lazy(() => import("@nice-avatar-svg/shared/components/EyebrowsUp"));
const EyesBase = lazy(() => import("@nice-avatar-svg/shared/components/EyesBase"));
const EyesRound = lazy(() => import("@nice-avatar-svg/shared/components/EyesRound"));
const EyesShadow = lazy(() => import("@nice-avatar-svg/shared/components/EyesShadow"));
const EyesSmiling = lazy(() => import("@nice-avatar-svg/shared/components/EyesSmiling"));
const FacialHairBeard = lazy(() => import("@nice-avatar-svg/shared/components/FacialHairBeard"));
const FacialHairScruff = lazy(() => import("@nice-avatar-svg/shared/components/FacialHairScruff"));
const GlassesRound = lazy(() => import("@nice-avatar-svg/shared/components/GlassesRound"));
const GlassesSquare = lazy(() => import("@nice-avatar-svg/shared/components/GlassesSquare"));
const HairDannyPhantom = lazy(() => import("@nice-avatar-svg/shared/components/HairDannyPhantom"));
const HairDougFunny = lazy(() => import("@nice-avatar-svg/shared/components/HairDougFunny"));
const HairFonze = lazy(() => import("@nice-avatar-svg/shared/components/HairFonze"));
const HairFull = lazy(() => import("@nice-avatar-svg/shared/components/HairFull"));
const HairMrT = lazy(() => import("@nice-avatar-svg/shared/components/HairMrT"));
const HairPixie = lazy(() => import("@nice-avatar-svg/shared/components/HairPixie"));
const HairTurban = lazy(() => import("@nice-avatar-svg/shared/components/HairTurban"));
const MouthFrown = lazy(() => import("@nice-avatar-svg/shared/components/MouthFrown"));
const MouthLaughing = lazy(() => import("@nice-avatar-svg/shared/components/MouthLaughing"));
const MouthNervous = lazy(() => import("@nice-avatar-svg/shared/components/MouthNervous"));
const MouthPucker = lazy(() => import("@nice-avatar-svg/shared/components/MouthPucker"));
const MouthSad = lazy(() => import("@nice-avatar-svg/shared/components/MouthSad"));
const MouthSmile = lazy(() => import("@nice-avatar-svg/shared/components/MouthSmile"));
const MouthSmirk = lazy(() => import("@nice-avatar-svg/shared/components/MouthSmirk"));
const MouthSurprised = lazy(() => import("@nice-avatar-svg/shared/components/MouthSurprised"));
const NoseCurve = lazy(() => import("@nice-avatar-svg/shared/components/NoseCurve"));
const NosePointed = lazy(() => import("@nice-avatar-svg/shared/components/NosePointed"));
const NoseRound = lazy(() => import("@nice-avatar-svg/shared/components/NoseRound"));
const ShirtCollared = lazy(() => import("@nice-avatar-svg/shared/components/ShirtCollared"));
const ShirtCrew = lazy(() => import("@nice-avatar-svg/shared/components/ShirtCrew"));
const ShirtOpen = lazy(() => import("@nice-avatar-svg/shared/components/ShirtOpen"));

/**
 * @typedef {import('@nice-avatar-svg/shared/model.mjs').AvatarConfiguration} Props
 * @param {Props} props
 */
export default function NiceAvatar({
  bgColor = COLORS.Azure,
  earSize = "small",
  eyesStyle = "base",
  facialHairStyle,
  hairColor = COLORS.Coast,
  hairStyle = "pixie",
  mouthStyle = "smile",
  noseStyle = "round",
  shirtColor = COLORS.Canary,
  shirtStyle = "open",
  skinColor = COLORS.Apricot,
  earRing = undefined,
  eyebrowsStyle = "up",
  glassesStyle,
  shape = "circle",
}) {
  return (
    <Layout shape={shape} bgColor={bgColor}>
      <Body skinColor={skinColor} />
      <Eyebrows eyebrowsStyle={eyebrowsStyle} />
      <Hair hairColor={hairColor} hairStyle={hairStyle} />
      <Ear earSize={earSize} skinColor={skinColor} />
      <Nose noseStyle={noseStyle} />
      <Shirt shirtColor={shirtColor} shirtStyle={shirtStyle} />
      <Mouth mouthStyle={mouthStyle} />
      <Eyes eyesStyle={eyesStyle} />
      <Glasses glassesStyle={glassesStyle} />
      <FacialHair facialHairStyle={facialHairStyle} />
      {earRing === "loop" && <EarRingHoop />}
    </Layout>
  );
}

/** @param {Pick<Props, 'hairColor' | 'hairStyle>} param0 */
function Hair({ hairStyle, hairColor }) {
  switch (hairStyle) {
    case "dannyPhantom":
      return <HairDannyPhantom hairColor={hairColor} />;
    case "dougFunny":
      return <HairDougFunny />;
    case "fonze":
      return <HairFonze hairColor={hairColor} />;
    case "full":
      return <HairFull hairColor={hairColor} />;
    case "mrT":
      return <HairMrT hairColor={hairColor} />;
    case "pixie":
      return <HairPixie hairColor={hairColor} />;
    case "turban":
      return <HairTurban hairColor={hairColor} />;
    default:
      return <></>;
  }
}

/** @param {Pick<Props, 'earSize' | 'skinColor'>} param0 */
function Ear({ earSize, skinColor }) {
  switch (earSize) {
    case "big":
      return <EarDetached skinColor={skinColor} />;
    case "small":
      return <EarAttached skinColor={skinColor} />;
    default:
      return <></>;
  }
}

/** @param {Pick<Props, 'noseStyle'>} param0 */
function Nose({ noseStyle }) {
  switch (noseStyle) {
    case "curve":
      return <NoseCurve />;
    case "pointed":
      return <NosePointed />;
    case "round":
    default:
      return <NoseRound />;
  }
}

/** @param {Pick<Props, 'shirtColor' | 'shirtStyle'>} param0 */
function Shirt({ shirtColor, shirtStyle }) {
  switch (shirtStyle) {
    case "collared":
      return <ShirtCollared shirtColor={shirtColor} />;
    case "crew":
      return <ShirtCrew shirtColor={shirtColor} />;
    case "open":
    default:
      return <ShirtOpen shirtColor={shirtColor} />;
  }
}

/** @param {Pick<Props, 'mouthStyle'>} param0 */
function Mouth({ mouthStyle }) {
  switch (mouthStyle) {
    case "frown":
      return <MouthFrown />;
    case "laughing":
      return <MouthLaughing />;
    case "nervous":
      return <MouthNervous />;
    case "pucker":
      return <MouthPucker />;
    case "sad":
      return <MouthSad />;
    case "smirk":
      return <MouthSmirk />;
    case "surprised":
      return <MouthSurprised />;
    case "smile":
    default:
      return <MouthSmile />;
  }
}

/** @param {Pick<Props, 'glassesStyle'>} param0 */
function Glasses({ glassesStyle }) {
  switch (glassesStyle) {
    case "round":
      return <GlassesRound />;
    case "square":
      return <GlassesSquare />;
    default:
      return <></>;
  }
}

/** @param {Pick<Props, 'eyesStyle'>} param0 */
function Eyes({ eyesStyle }) {
  switch (eyesStyle) {
    case "round":
      return <EyesRound />;
    case "shadow":
      return <EyesShadow />;
    case "smiling":
      return <EyesSmiling />;
    case "base":
    default:
      return <EyesBase />;
  }
}

/** @param {Pick<Props, 'eyebrowsStyle'>} param0 */
function Eyebrows({ eyebrowsStyle }) {
  switch (eyebrowsStyle) {
    case "down":
      return <EyebrowsDown />;
    case "up":
      return <EyebrowsUp />;
    case "eyelashesDown":
      return <EyebrowsEyelashesDown />;
    case "eyelashesUp":
      return <EyebrowsEyelashesUp />;
    default:
      return <></>;
  }
}

/** @param {Pick<Props, 'facialHairStyle'>} param0 */
function FacialHair({ facialHairStyle }) {
  switch (facialHairStyle) {
    case "beard":
      return <FacialHairBeard />;
    case "scruff":
      return <FacialHairScruff />;
    default:
      return <></>;
  }
}
