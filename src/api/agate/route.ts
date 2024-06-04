import request from '@/axios'
import type { RouteType } from './types'

export const getRoutes = (params: any) => {
  return request.get({ url: '/route/list', params })
}

export const getRoute = (id: string): Promise<IResponse<RouteType>> => {
  return request.get({ url: '/route/detail', params: { id } })
}

export const saveRoute = (data: Partial<RouteType>): Promise<IResponse> => {
  return request.post({ url: '/route/save', data })
}

export const delRoute = (ids: string[] | number[]): Promise<IResponse> => {
  return request.delete({ url: '/route/delete', data: ids })
}

export const startRoute = (id: number): Promise<IResponse> => {
  return request.put({ url: '/route/start', params: { id } })
}

export const closeRoute = (id: number): Promise<IResponse> => {
  return request.put({ url: '/route/close', params: { id } })
}
