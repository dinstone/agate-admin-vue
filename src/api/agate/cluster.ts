import request from '@/axios'
import type { ClusterType } from './types'

export const getClusters = (params: any) => {
  return request.get({ url: '/cluster/list', params })
}

export const getInstances = (params: any) => {
  return request.get({ url: '/cluster/instances', params })
}

export const saveCluster = (data: Partial<ClusterType>): Promise<IResponse> => {
  return request.post({ url: '/cluster/save', data })
}

export const deleteCluster = (ids: string[] | number[]): Promise<IResponse> => {
  return request.delete({ url: '/cluster/delete', data: ids })
}
