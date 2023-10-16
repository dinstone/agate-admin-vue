export type Total = {
  gateway: number
  apps: number
  route: number
}

export type Project = {
  name: string
  icon: string
  message: string
  personal: string
  time: Date | number | string
}

export type Dynamic = {
  keys: string[]
  time: Date | number | string
}

export type TechStack = {
  name: string
  icon: string
  url?: string
}

export type RadarData = {
  personal: number
  team: number
  max: number
  name: string
}
