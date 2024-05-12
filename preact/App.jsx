import { COLORS } from "@nice-avatar-svg/shared/constants.mjs";
import NiceAvatar from "./NiceAvatar";

export default function App() {
  return (
    <div style="display: flex; flex-wrap;; gap: 1rem;">
      <NiceAvatar
        bgColor={COLORS.Salmon}
        hairColor={COLORS.Lavender}
        shirtColor={COLORS.Canary}
        skinColor={COLORS.Apricot}
        earSize="big"
        hairStyle="dannyPhantom"
        noseStyle="curve"
        glassesStyle="round"
        eyesStyle="smiling"
        facialHairStyle="beard"
        mouthStyle="laughing"
        shirtStyle="collared"
        earRing="loop"
        eyebrowsStyle="up"
        shape="circle"
      />
      <NiceAvatar
        bgColor={COLORS.Apricot}
        hairColor={COLORS.Coast}
        shirtColor={COLORS.Calm}
        skinColor={COLORS.Topaz}
        earSize="small"
        hairStyle="fonze"
        noseStyle="curve"
        glassesStyle="square"
        eyesStyle="shadow"
        facialHairStyle="beard"
        mouthStyle="nervous"
        shirtStyle="crew"
        eyebrowsStyle="down"
        shape="square"
      />
      <NiceAvatar
        bgColor={COLORS.Calm}
        hairColor={COLORS.Mellow}
        shirtColor={COLORS.Azure}
        skinColor={COLORS.Coast}
        earSize="small"
        hairStyle="mrT"
        noseStyle="pointed"
        eyesStyle="smiling"
        mouthStyle="surprised"
        shirtStyle="open"
        eyebrowsStyle="down"
        shape="rounded"
      />
    </div>
  );
}
