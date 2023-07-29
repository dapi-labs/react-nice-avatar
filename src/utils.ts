import {
  AvatarFullConfig,
  GenConfigFunc,
  Sex,
  EarSize,
  HairStyleMan,
  HairStyleWoman,
  HatStyle,
  EyeStyle,
  GlassesStyle,
  NoseStyle,
  MouthStyle,
  ShirtStyle,
  EyeBrowStyle,
} from "./types"

/**
 * Pick random one from the list
 */
interface PickRandomOpt<T> {
  avoidList?: T[],
  usually?: T[]
}

type PickRandomFromList = <T>(data: T[], opt?: PickRandomOpt<T | undefined>) => T;

export const pickRandomFromList: PickRandomFromList = (data, { avoidList = [], usually = [] } = {}) => {
  // Filter out avoid options
  const avoidSet = new Set(
    avoidList.filter((item) => Boolean(item))
  );
  let myData = data.filter((item) => !avoidSet.has(item));

  // Increase selecting possibility of usually options
  const usuallyData = usually
    .filter(Boolean)
    .reduce(
      (acc, cur) => acc.concat(new Array(15).fill(cur)),
      [] as any[]
    );
  myData = myData.concat(usuallyData);

  // Pick randon one from the list
  const amount = myData.length;
  const randomIdx = Math.floor(Math.random() * amount);
  return myData[randomIdx];
};

/**
 * Gennerate avatar configurations
 */
export interface DefaultOptions {
  sex: Sex[],
  faceColor: string[],
  earSize: EarSize[],
  hairColor: string[],
  hairStyleMan: HairStyleMan[],
  hairStyleWoman: HairStyleWoman[],
  hatColor: string[],
  hatStyle: HatStyle[],
  eyeBrowWoman: EyeBrowStyle[],
  eyeStyle: EyeStyle[],
  glassesStyle: GlassesStyle[],
  noseStyle: NoseStyle[],
  mouthStyle: MouthStyle[],
  shirtStyle: ShirtStyle[],
  shirtColor: string[],
  bgColor: string[],
  gradientBgColor: string[]
}

export const defaultOptions: DefaultOptions = {
  sex: ["man", "woman"],
  faceColor: ["#F9C9B6", "#AC6651"],
  earSize: ["small", "big"],
  hairColor: ["#000000", "#FFFFFF", "#77311D", "#FC909F", "#D2EFF3", "#506AF4", "#F48150"],
  hairStyleMan: ["normal", "thick", "mohawk"],
  hairStyleWoman: ["normal", "womanLong", "womanShort"],
  hatColor: ["#000000", "#FFFFFF", "#77311D", "#FC909F", "#D2EFF3", "#506AF4", "#F48150"],
  hatStyle: ["beanie", "turban", "none"],
  eyeBrowWoman: ["up", "upWoman"],
  eyeStyle: ["circle", "oval", "smile"],
  glassesStyle: ["round", "square", "none"],
  noseStyle: ["short", "long", "round"],
  mouthStyle: ["laugh", "smile", "peace"],
  shirtStyle: ["hoody", "short", "polo"],
  shirtColor: ["#9287FF", "#6BD9E9", "#FC909F", "#F4D150", "#77311D"],
  bgColor: ["#9287FF", "#6BD9E9", "#FC909F", "#F4D150", "#E0DDFF", "#D2EFF3", "#FFEDEF", "#FFEBA4", "#506AF4", "#F48150", "#74D153"],
  gradientBgColor: [
    "linear-gradient(45deg, #178bff 0%, #ff6868 100%)",
    "linear-gradient(45deg, #176fff 0%, #68ffef 100%)",
    "linear-gradient(45deg, #ff1717 0%, #ffd368 100%)",
    "linear-gradient(90deg, #36cd1c 0%, #68deff 100%)",
    "linear-gradient(45deg, #3e1ccd 0%, #ff6871 100%)",
    "linear-gradient(45deg, #1729ff 0%, #ff56f7 100%)",
    "linear-gradient(45deg, #56b5f0 0%, #45ccb5 100%)"
  ]
};

const createAvatarByHashCode = (hashCode: number) => ({
  sex: pickByHashCode(hashCode, 'sex') as Sex,
  faceColor: pickByHashCode(hashCode, 'faceColor'),
  earSize: pickByHashCode(hashCode, 'earSize') as EarSize,
  eyeStyle: pickByHashCode(hashCode, 'eyeStyle') as EyeStyle,
  noseStyle: pickByHashCode(hashCode, 'noseStyle') as NoseStyle,
  mouthStyle: pickByHashCode(hashCode, 'mouthStyle') as MouthStyle,
  shirtStyle: pickByHashCode(hashCode, 'shirtStyle') as ShirtStyle,
  glassesStyle: pickByHashCode(hashCode, 'glassesStyle') as GlassesStyle,
})

const createAvatarByDefaultOptions = () => ({
  sex: pickRandomFromList(defaultOptions.sex),
  faceColor: pickRandomFromList(defaultOptions.faceColor),
  earSize: pickRandomFromList(defaultOptions.earSize),
  eyeStyle: pickRandomFromList(defaultOptions.eyeStyle),
  noseStyle: pickRandomFromList(defaultOptions.noseStyle),
  mouthStyle: pickRandomFromList(defaultOptions.mouthStyle),
  shirtStyle: pickRandomFromList(defaultOptions.shirtStyle),
  glassesStyle: pickRandomFromList(defaultOptions.glassesStyle),
})

const stringToHashCode = (str: string): number => {
  if (str.length === 0) return 0
  let hash = 0
  let char
  for (let i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

type PickByHashCodeOpts = {
  avoidList?: string[],
  usually?: string[]
}
const pickByHashCode = (code: number, type: keyof DefaultOptions, opts?: PickByHashCodeOpts): string => {
  const avoidList = opts && opts.avoidList || []
  const usually = opts && opts.usually || []

  // Filter out avoid options
  const avoidSet = new Set<string>(avoidList)
  let myDefaultOptions = defaultOptions[type].filter(item => !avoidSet.has(item))

  // Increase selecting possibility of usually options
  myDefaultOptions = usually
    .filter(Boolean)
    .reduce(
      (acc, cur) => acc.concat(new Array(15).fill(cur)),
      [] as string[]
    )
    .concat(myDefaultOptions)

  const index = code % myDefaultOptions.length
  return myDefaultOptions[index]
}

export const genConfig: GenConfigFunc = (mixed?: AvatarFullConfig | string, seedConfig?: AvatarFullConfig): Required<AvatarFullConfig> => {
  const isSeedConfig = typeof mixed === 'string'
  const hashCode = isSeedConfig ? stringToHashCode(mixed) : 0
  const response = (isSeedConfig ? {
    ...createAvatarByHashCode(hashCode),
    ...seedConfig
  } : {
    ...createAvatarByDefaultOptions(),
    ...mixed
  }) as Required<AvatarFullConfig>


  // Hair
  let hairColorAvoidList: string[] = [];
  let hairColorUsually: string[] = [];
  if (!response.hairColor) {
    switch (response.sex) {
      case "woman": {
        hairColorAvoidList = response.faceColor === defaultOptions.faceColor[1] && ["#77311D"] || [];
        break;
      }
      case "man": {
        hairColorUsually = ["#000000"];
      }
    }
  }

  // if the hairColor is not set, pick one
  if (!response.hairColor) {
    response.hairColor = isSeedConfig
      ? pickByHashCode(hashCode, 'hairColor', {
        avoidList: hairColorAvoidList,
        usually: hairColorUsually
      })
      : pickRandomFromList(defaultOptions.hairColor, {
        avoidList: hairColorAvoidList,
        usually: hairColorUsually
      })
  }

  if (!response.hairStyle) {
    switch (response.sex) {
      case "man": {
        response.hairStyle = isSeedConfig
          ? pickByHashCode(hashCode, 'hairStyleMan', { usually: ["normal", "thick"] }) as HairStyleMan
          : pickRandomFromList(defaultOptions.hairStyleMan, { usually: ["normal", "thick"] });
        break;
      }
      case "woman": {
        response.hairStyle = isSeedConfig
          ? pickByHashCode(hashCode, 'hairStyleWoman') as HairStyleWoman
          : pickRandomFromList(defaultOptions.hairStyleWoman);
        break;
      }
    }
  } else {
    response.hairStyle
  }

  if (!response.hatStyle) {
    response.hatStyle = isSeedConfig
      ? pickByHashCode(hashCode, 'hatStyle', { usually: ["none"] }) as HatStyle
      : pickRandomFromList(defaultOptions.hatStyle, { usually: ["none"] });
  }

  if (!response.hatColor) {
    response.hatColor = isSeedConfig
      ? pickByHashCode(hashCode, 'hatColor')
      : pickRandomFromList(defaultOptions.hatColor);
  }

  const _hairOrHatColor = response.hatStyle === "none" && response.hairColor || response.hatColor;

  // Eyebrow
  if (!response.eyeBrowStyle) {
    switch (response.sex) {
      case 'man':
        response.eyeBrowStyle = 'up'
        break;
      case 'woman':
        response.eyeBrowStyle = isSeedConfig
          ? pickByHashCode(hashCode, 'eyeBrowWoman') as EyeBrowStyle
          : pickRandomFromList(defaultOptions.eyeBrowWoman)
        break;
    }
  }



  // Shirt color
  if (!response.shirtColor) {
    response.shirtColor = isSeedConfig
      ? pickByHashCode(hashCode, 'shirtColor', { avoidList: [_hairOrHatColor] })
      : pickRandomFromList(defaultOptions.shirtColor, { avoidList: [_hairOrHatColor] });
  }


  // Background color
  if (!response.bgColor) {
    if (!isSeedConfig && response.isGradient) {
      response.bgColor = pickRandomFromList(defaultOptions.gradientBgColor);
    } else {
      response.bgColor = isSeedConfig
        ? pickByHashCode(hashCode, 'bgColor', { avoidList: [_hairOrHatColor, response.shirtColor] })
        : pickRandomFromList(defaultOptions.bgColor, { avoidList: [_hairOrHatColor, response.shirtColor] });
    }

    response.bgColor = isSeedConfig
      ? pickByHashCode(hashCode, 'bgColor', { avoidList: [_hairOrHatColor, response.shirtColor] })
      : pickRandomFromList(defaultOptions.bgColor, { avoidList: [_hairOrHatColor, response.shirtColor] });
  }

  return response;
}
