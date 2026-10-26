import * as React from "react";

type Style = {
  [key: string]: string | number | boolean;
};

export type Sex = "man" | "woman";
export type EarSize = "small" | "big";
export type HairStyle = "normal" | "thick" | "mohawk" | "womanLong" | "womanShort";
export type HairStyleMan = "normal" | "thick" | "mohawk";
export type HairStyleWoman = "normal" | "womanLong" | "womanShort";
export type HatStyle = "beanie" | "turban" | "none";
export type EyeStyle = "circle" | "oval" | "smile" | "closed" | "droopy" | "squint" | "wide";
export type GlassesStyle = "round" | "square" | "none";
export type NoseStyle = "short" | "long" | "round";
export type MouthStyle =
  | "laugh"
  | "smile"
  | "peace"
  | "frown"
  | "grimace"
  | "open"
  | "straight"
  | "surprised";
export type ShirtStyle = "hoody" | "short" | "polo";
export type EyeBrowStyle = "up" | "upWoman" | "angry" | "down" | "flat" | "raised";

export type Expression =
  | "neutral"
  | "happy"
  | "excited"
  | "surprised"
  | "sad"
  | "disappointed"
  | "exhausted"
  | "angry"
  | "shy"
  | "sleepy"
  | "focused";
export type GestureName = "nod" | "shake" | "sneeze" | "squash";
export type LookingDirection = "left" | "center" | "right";

export type AgentState =
  | "idle"
  | "listening"
  | "thinking"
  | "speaking"
  | "celebrating"
  | "confused"
  | "error"
  | "focused"
  | "executing"
  | "tool_call";

export type Sentiment =
  | "neutral"
  | "joy"
  | "curiosity"
  | "confusion"
  | "concern"
  | "amusement"
  | "surprise";

export type EmoteFxName =
  | "idea"
  | "zzz"
  | "sweat"
  | "sparkle"
  | "anger"
  | "question"
  | "exclamation"
  | "heart"
  | "gear";

export type LookAtMode = "none" | "hover" | "global" | "center";

export interface AvatarConfig {
  sex?: Sex;
  faceColor?: string;
  earSize?: EarSize;
  hairColor?: string;
  hairStyle?: HairStyle;
  hairColorRandom?: boolean;
  hatColor?: string;
  hatStyle?: HatStyle;
  eyeStyle?: EyeStyle;
  glassesStyle?: GlassesStyle;
  noseStyle?: NoseStyle;
  mouthStyle?: MouthStyle;
  shirtStyle?: ShirtStyle;
  shirtColor?: string;
  bgColor?: string;
  isGradient?: boolean;
  expression?: Expression;
  animated?: boolean;
  idle?: boolean;
}

export interface AvatarFullConfig extends AvatarConfig {
  eyeBrowStyle?: EyeBrowStyle;
  expression?: Expression;
}

export interface NiceAvatarProps extends AvatarConfig {
  id?: string;
  className?: string;
  style?: Style;
  shape?: "circle" | "rounded" | "square";
  /** One-shot head gesture, replayed whenever the prop changes. */
  gesture?: GestureName;
  /** Head and eyes follow the pointer: 'hover' (only over avatar) or 'global' (across window). */
  lookAt?: LookAtMode;
  /** Deprecated alias: if true, defaults to 'hover' (or 'global' if specified). */
  lookAtCursor?: boolean;
  /** High-level persona state for AI copilot / companion behaviors. */
  agentState?: AgentState;
  /** Real-time emotional sentiment mapping. */
  sentiment?: Sentiment;
  /** Comic / anime overlay badge (idea, zzz, sweat, sparkle, anger, etc.). */
  fx?: EmoteFxName | null;
  /** Enable secondary spring inertia on hair and accessories during head movement. */
  secondaryMotion?: boolean;
  /** Mouth cycles speech-like shapes; also toggled via ref `talk(ms)`. */
  talking?: boolean;
  /** Milliseconds of inactivity before the avatar starts nodding off (needs `animated` or `idle`). */
  sleepAfter?: number;
}

export type GenConfigFunc = (config?: AvatarFullConfig | string) => Required<AvatarFullConfig>;

export declare const genConfig: GenConfigFunc;

export interface AvatarRefHandle {
  nod: () => void;
  shake: () => void;
  sneeze: () => void;
  squash: () => void;
  doubleTake: () => void;
  talk: (duration?: number) => void;
  stopTalking: () => void;
  turn: (direction?: LookingDirection) => void;
  showFx: (fx: EmoteFxName, duration?: number) => void;
  clearFx: () => void;
  wake: () => void;
  sleep: () => void;
}

export interface UseAvatarControllerOptions extends NiceAvatarProps {
  agentState?: AgentState;
  sentiment?: Sentiment;
  lookAt?: LookAtMode;
  fx?: EmoteFxName | null;
  secondaryMotion?: boolean;
}

export interface AvatarController {
  setAgentState: (state: AgentState) => void;
  setSentiment: (sentiment: Sentiment, duration?: number) => void;
  showFx: (fx: EmoteFxName, duration?: number) => void;
  clearFx: () => void;
  nod: () => void;
  shake: () => void;
  sneeze: () => void;
  squash: () => void;
  doubleTake: () => void;
  turn: (direction?: LookingDirection) => void;
  speak: (durationOrText?: number | string, options?: { duration?: number }) => void;
  stopSpeaking: () => void;
  runTool: <T>(task: () => Promise<T>) => Promise<T>;
  wake: () => void;
  sleep: () => void;
}

export interface UseAvatarControllerReturn {
  avatarProps: NiceAvatarProps & { ref: React.RefObject<any> };
  controller: AvatarController;
}

export default class ReactNiceAvatar
  extends React.Component<NiceAvatarProps>
  implements AvatarRefHandle
{
  nod() {}
  shake() {}
  sneeze() {}
  squash() {}
  doubleTake() {}
  talk(_duration?: number) {}
  stopTalking() {}
  turn(_direction?: LookingDirection) {}
  showFx(_fx: EmoteFxName, _duration?: number) {}
  clearFx() {}
  wake() {}
  sleep() {}
}
