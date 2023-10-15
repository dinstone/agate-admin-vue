export type RouteType = {
  id: number
  appId: number
  appName: string
  name: string
  remark: string
  status: number
  frontend: FrontendType
  backend: BackendType
  plugins: PluginType[]
  createTime: string
  updateTime: string
}
export type FrontendType = {
  path: string
  method: string
  consumes: string
  produces: string
}

export type BackendType = {
  type: number
  algorithm: number
  timeout: number
  path: string
  method: string
  registry: string
  connection: string
  urls: string[]
  params: ParamProps[]
}

export type ParamProps = {
  feParamName: string
  feParamType: ParamType
  beParamName: string
  beParamType: ParamType
}

export enum ParamType {
  HEADER,
  QUERY,
  PATH
}

export type PluginType = {
  type: number
  order: number
  plugin: string
  config: string
}
