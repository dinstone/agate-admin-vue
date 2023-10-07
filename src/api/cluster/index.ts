import request from '@/config/axios'
import type { ClusterType } from './types'

export const getTreeTableListApi = (params: any) => {
  return request.get({ url: '/cluster/treeList', params })
}

export const getClusters = (params: any) => {
  return request.get({ url: '/cluster/list', params })
}

export const getInstances = (params: any) => {
  return request.get({ url: '/cluster/instances', params })
}

export const saveCluster = (data: Partial<ClusterType>): Promise<IResponse> => {
  return request.post({ url: '/cluster/save', data })
}

export const getTableDetApi = (id: string): Promise<IResponse<ClusterType>> => {
  return request.get({ url: '/cluster/detail', params: { id } })
}

export const deleteCluster = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: '/cluster/delete', data: { ids } })
}
