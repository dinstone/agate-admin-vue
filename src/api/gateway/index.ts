import request from '@/config/axios'
import type { RowType } from './types'

export const getTableListApi = (params: any) => {
  return request.get({ url: '/gateway/list', params })
}

export const getClusterList = () => {
  return request.get({ url: '/gateway/cluster' })
}

export const getTreeTableListApi = (params: any) => {
  return request.get({ url: '/gateway/treeList', params })
}

export const saveTableApi = (data: Partial<RowType>): Promise<IResponse> => {
  return request.post({ url: '/gateway/save', data })
}

export const getTableDetApi = (id: string): Promise<IResponse<RowType>> => {
  return request.get({ url: '/gateway/detail', params: { id } })
}

export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: '/gateway/delete', data: { ids } })
}
