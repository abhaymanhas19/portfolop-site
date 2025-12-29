export {}

type VantaNetOptions = {
  el: HTMLElement | string
  mouseControls?: boolean
  touchControls?: boolean
  gyroControls?: boolean
  minHeight?: number
  minWidth?: number
  scale?: number
  scaleMobile?: number
  color?: number
  backgroundColor?: number
  points?: number
  maxDistance?: number
  spacing?: number
}

type VantaRingsOptions = {
  el: HTMLElement | string
  mouseControls?: boolean
  touchControls?: boolean
  gyroControls?: boolean
  minHeight?: number
  minWidth?: number
  scale?: number
  scaleMobile?: number
  color?: number
  backgroundColor?: number
}

type VantaInstance = {
  destroy: () => void
}

declare global {
  interface Window {
    VANTA?: {
      NET?: (options: VantaNetOptions) => VantaInstance
      RINGS?: (options: VantaRingsOptions) => VantaInstance
    }
  }
}
