import request from '@/config/axios'
import type { GatewayType } from './types'

export const getClusters = () => {
  return request.get({ url: '/cluster/list' })
}

export const getGateways = (params: any) => {
  return request.get({ url: '/gateway/list', params })
}

export const getGateway = (id: number): Promise<IResponse<GatewayType>> => {
  return request.get({ url: '/gateway/detail', params: { id } })
}

export const saveGateway = (data: Partial<GatewayType>): Promise<IResponse> => {
  return request.post({ url: '/gateway/save', data })
}

export const delGateway = (ids: string[] | number[]): Promise<IResponse> => {
  return request.delete({ url: '/gateway/delete', data: ids })
}

export const startGateway = (id: number): Promise<IResponse> => {
  return request.put({ url: '/gateway/start', params: { id } })
}

export const closeGateway = (id: number): Promise<IResponse> => {
  return request.put({ url: '/gateway/close', params: { id } })
}
