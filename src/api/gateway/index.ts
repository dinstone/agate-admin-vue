import request from '@/config/axios'
import type { GatewayType } from './types'

export const getClusters = () => {
  return request.get({ url: '/cluster/list' })
}

export const getGateways = (params: any) => {
  return request.get({ url: '/gateway/list', params })
}

export const getGatewayDetail = (id: string): Promise<IResponse<GatewayType>> => {
  return request.get({ url: '/gateway/detail', params: { id } })
}

export const saveGateway = (data: Partial<GatewayType>): Promise<IResponse> => {
  return request.post({ url: '/gateway/save', data })
}

export const delGateway = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: '/gateway/delete', data: { ids } })
}
