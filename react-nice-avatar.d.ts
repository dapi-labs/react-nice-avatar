import * as React from 'react';

type Style = {
  [key: string]: string | number | boolean
}

export interface AvatarConfig {
  sex?: 'man' | 'woman',
  faceColor?: string,
  earSize?: 'small' | 'big',
  hairColor?: string,
  hairStyle?: 'normal' | 'thick' | 'mohawk' | 'womanLong' | 'womanShort' | 'turban',
  eyeStyle?: 'circle' | 'oval' | 'smile',
  glassesStyle?: 'round' | 'square' | 'none',
  noseStyle?: 'short' | 'long' | 'round',
  mouthStyle?: 'laugh' | 'smile' | 'peace',
  shirtStyle?: 'hoody' | 'short' | 'polo',
  shirtColor?: string,
  bgColor?: string
}

export interface NiceAvatarProps extends AvatarConfig {
  id?: string,
  className?: string,
  style?: Style
}

export const genConfig = (config?: AvatarConfig) => AvatarConfig

export default class ReactNiceAvatar extends React.Component<NiceAvatarProps> {}
