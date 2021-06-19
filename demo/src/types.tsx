import { AvatarFullConfig } from '../../src/types'

export interface AppComponentState {
  currentTab: string,
  config: AvatarFullConfig,
  theme: "light" | 'dark'
}

export type Panel = 'faceColorPanelOpen' | 'hairColorPanelOpen' | 'hatColorPanelOpen' | 'shirtColorPanelOpen' | 'bgColorPanelOpen'

export interface SingleComponentProps {
  updateConfig: (AvatarFullConfig) => void,
  config: AvatarFullConfig
}

export interface SingleComponentState {
  bgShape: "circle" | "rounded" | "square",
  size: number,
  faceColorPanelOpen: boolean,
  hairColorPanelOpen: boolean,
  hatColorPanelOpen: boolean,
  shirtColorPanelOpen: boolean,
  bgColorPanelOpen: boolean
}