import { Suspense, lazy } from "preact/compat";
import { COLORS } from "../constants.mjs";
import Body from "./parts/Body";
import Layout from "./parts/Layout";

const EarAttached = lazy(() => import("./parts/EarAttached"));
const EarDetached = lazy(() => import("./parts/EarDetached"));
const EarRingHoop = lazy(() => import("./parts/EarRingHoop"));
const EyebrowsDown = lazy(() => import("./parts/EyebrowsDown"));
const EyebrowsEyelashesDown = lazy(() => import("./parts/EyebrowsEyelashesDown"));
const EyebrowsEyelashesUp = lazy(() => import("./parts/EyebrowsEyelashesUp"));
const EyebrowsUp = lazy(() => import("./parts/EyebrowsUp"));
const EyesBase = lazy(() => import("./parts/EyesBase"));
const EyesRound = lazy(() => import("./parts/EyesRound"));
const EyesShadow = lazy(() => import("./parts/EyesShadow"));
const EyesSmiling = lazy(() => import("./parts/EyesSmiling"));
const FacialHairBeard = lazy(() => import("./parts/FacialHairBeard"));
const FacialHairScruff = lazy(() => import("./parts/FacialHairScruff"));
const GlassesRound = lazy(() => import("./parts/GlassesRound"));
const GlassesSquare = lazy(() => import("./parts/GlassesSquare"));
const HairDannyPhantom = lazy(() => import("./parts/HairDannyPhantom"));
const HairDougFunny = lazy(() => import("./parts/HairDougFunny"));
const HairFonze = lazy(() => import("./parts/HairFonze"));
const HairFull = lazy(() => import("./parts/HairFull"));
const HairMrT = lazy(() => import("./parts/HairMrT"));
const HairPixie = lazy(() => import("./parts/HairPixie"));
const HairTurban = lazy(() => import("./parts/HairTurban"));
const MouthFrown = lazy(() => import("./parts/MouthFrown"));
const MouthLaughing = lazy(() => import("./parts/MouthLaughing"));
const MouthNervous = lazy(() => import("./parts/MouthNervous"));
const MouthPucker = lazy(() => import("./parts/MouthPucker"));
const MouthSad = lazy(() => import("./parts/MouthSad"));
const MouthSmile = lazy(() => import("./parts/MouthSmile"));
const MouthSmirk = lazy(() => import("./parts/MouthSmirk"));
const MouthSurprised = lazy(() => import("./parts/MouthSurprised"));
const NoseCurve = lazy(() => import("./parts/NoseCurve"));
const NosePointed = lazy(() => import("./parts/NosePointed"));
const NoseRound = lazy(() => import("./parts/NoseRound"));
const ShirtCollared = lazy(() => import("./parts/ShirtCollared"));
const ShirtCrew = lazy(() => import("./parts/ShirtCrew"));
const ShirtOpen = lazy(() => import("./parts/ShirtOpen"));

/**
 * @typedef Props
 * @property {string} bgColor
 * @property {'dannyPhantom' | 'dougFunny' | 'fonze' | 'mrT' | 'pixie' | 'turban'} hairStyle
 * @property {'loop'} [earRing]
 * @property {'small' | 'big'} earSize
 * @property {'up' | 'down' | 'eyelashesUp' | 'eyelashesDown'} [eyebrowsStyle]
 * @property {'round' | 'base' | 'shadow' | 'smiling'} eyesStyle
 * @property {'scruff' | 'beard'} facialHairStyle
 * @property {'round' | 'square'} [glassesStyle]
 * @property {string} hairColor
 * @property {'frown' | 'laughing' | 'nervous' | 'pucker' | 'sad' | 'smirk' | 'surprised' | 'smile'} mouthStyle
 * @property {'curve' | 'pointed' | 'round'} noseStyle
 * @property {'circle' | 'rounded' | 'square'} shape
 * @property {string} shirtColor
 * @property {'collared' | 'crew' | 'open'} shirtStyle
 * @property {string} skinColor
 *
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
  earRing = false,
  eyebrowsStyle = "up",
  glassesStyle,
  shape = "circle",
}) {
  return (
    <Layout shape={shape} bgColor={bgColor}>
      <Body skinColor={skinColor} />
      <Suspense fallback={<LoadingNode />}>
        <Eyebrows eyebrowsStyle={eyebrowsStyle} />
      </Suspense>
      <Suspense fallback={<LoadingNode />}>
        <Hair hairColor={hairColor} hairStyle={hairStyle} />
      </Suspense>
      <Suspense fallback={<LoadingNode />}>
        <Ear earSize={earSize} skinColor={skinColor} />
      </Suspense>
      <Suspense fallback={<LoadingNode />}>
        <Nose noseStyle={noseStyle} />
      </Suspense>
      <Suspense fallback={<LoadingNode />}>
        <Shirt shirtColor={shirtColor} shirtStyle={shirtStyle} />
      </Suspense>
      <Suspense fallback={<LoadingNode />}>
        <Mouth mouthStyle={mouthStyle} />
      </Suspense>
      <Suspense fallback={<LoadingNode />}>
        <Eyes eyesStyle={eyesStyle} />
      </Suspense>
      <Suspense fallback={<LoadingNode />}>
        <Glasses glassesStyle={glassesStyle} />
      </Suspense>
      <Suspense fallback={<LoadingNode />}>
        <FacialHair facialHairStyle={facialHairStyle} />
      </Suspense>
      <Suspense fallback={<LoadingNode />}>{earRing === "loop" && <EarRingHoop />}</Suspense>
    </Layout>
  );
}

const LoadingNode = () => <></>;

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
