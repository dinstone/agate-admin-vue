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
