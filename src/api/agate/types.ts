export type ClusterType = {
  id: number
  code: string
  name: string
  instances: InstanceType[]
  createTime: string
  updateTime: string
}

export type InstanceType = {
  clusterCode: string
  instanceId: string
  manageHost: string
  managePort: number
  createTime: string
}

export type GatewayType = {
  id: number
  cluster: string
  name: string
  remark: string
  status: number
  host: string
  port: number
  serverConfig: string
  clientConfig: string
  createTime: string
  updateTime: string
}

export type AppType = {
  id: number
  name: string
  gwId: number
  gwName: string
  domain: string
  prefix: string
  createTime: string
  updateTime: string
}

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
