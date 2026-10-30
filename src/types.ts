import * as React from 'react';

type Style = {
  [key: string]: string | number | boolean
}

export type AvatarStyle = 'human' | 'robot'
/** Legacy beard/goateeV2 names resolve to fullBeard/goatee; no old artwork remains. */
export type FacialHairStyle = 'none' | 'mustache' | 'handlebar' | 'beard' | 'goatee' | 'goateeV2' | 'fullBeard' | 'chinBeard' | 'originalBeard' | 'scruff'

export type Sex = 'man' | 'woman'
export type EarringStyle = 'none' | 'hoop' | 'stud'
export type EarSize = 'small' | 'big'
/** V2 suffixes are accepted only as aliases of the approved unversioned styles. */
export type HairStyle = 'normal' | 'thick' | 'mohawk' | 'womanLong' | 'womanShort' | 'curly' | 'bob' | 'pixie' | 'bun' | 'buzz' | 'curlyV2' | 'bobV2' | 'pixieV2' | 'bunV2' | 'buzzV2' | 'dougFunny' | 'bald'
export type HairStyleMan = 'normal' | 'thick' | 'mohawk' | 'curly' | 'bob' | 'pixie' | 'bun' | 'buzz' | 'dougFunny' | 'bald'
export type HairStyleWoman = 'normal' | 'womanLong' | 'womanShort' | 'curly' | 'bob' | 'pixie' | 'bun' | 'buzz' | 'dougFunny' | 'bald'
export type HatStyle = 'beanie' |'turban' | 'none' | 'bucket'
export type EyeStyle = 'circle' | 'oval' | 'smile' | 'wink' | 'sleepy' | 'sparkle' | 'focused' | 'eyeshadow' | 'smileShadow'
export type GlassesMode = 'transparent' | 'tinted' | 'dark'
export type GlassesStyle = 'round' | 'square' | 'aviator' | 'aviatorTinted' | 'roundDark' | 'squareDark' | 'aviatorDark' | 'none'
export type NoseStyle = 'short' | 'long' | 'round'
export type MouthStyle = 'laugh' | 'smile' | 'peace' | 'surprised' | 'sad' | 'frown' | 'pucker' | 'nervous'
export type ShirtStyle = 'hoody' | 'short' | 'polo'
export type EyeBrowStyle = 'up' | 'upWoman' | 'unibrow' | 'down' | 'eyelashesDown'

export interface AvatarConfig {
  avatarStyle?: AvatarStyle,
  facialHairStyle?: FacialHairStyle,
  sex?: Sex,
  faceColor?: string,
  earSize?: EarSize,
  earringStyle?: EarringStyle,
  earringColor?: string,
  hairColor?: string,
  hairStyle?: HairStyle,
  hairColorRandom?: boolean,
  hatColor?: string,
  hatStyle?: HatStyle,
  eyeStyle?: EyeStyle,
  eyeshadowColor?: string,
  eyeBrowStyle?: EyeBrowStyle,
  glassesStyle?: GlassesStyle,
  glassesMode?: GlassesMode,
  /** Tint color for any shape in tinted mode; rendered at 32% opacity. */
  glassesColor?: string,
  noseStyle?: NoseStyle,
  mouthStyle?: MouthStyle,
  shirtStyle?: ShirtStyle,
  shirtColor?: string,
  bgColor?: string,
  isGradient?: boolean
}

export interface AvatarFullConfig extends AvatarConfig {
  eyeBrowStyle?: EyeBrowStyle
}

export interface NiceAvatarProps extends AvatarConfig {
  id?: string,
  className?: string,
  style?: Style,
  shape?: "circle" | "rounded" | "square"
}

export type GenConfigFunc = (config?: AvatarFullConfig | string) => Required<AvatarFullConfig>

export declare const avatarPresets: ReadonlyArray<{ readonly id: string; readonly name: string; readonly config: Readonly<AvatarFullConfig> }>

export declare const genConfig: GenConfigFunc

export default class ReactNiceAvatar extends React.Component<NiceAvatarProps> {}
