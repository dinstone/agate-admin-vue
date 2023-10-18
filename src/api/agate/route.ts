import request from '@/config/axios'
import type { RouteType } from './types'

export const getRoutes = (params: any) => {
  return request.get({ url: '/route/list', params })
}

export const getRouteDetail = (id: string): Promise<IResponse<RouteType>> => {
  return request.get({ url: '/route/detail', params: { id } })
}

export const saveRoute = (data: Partial<RouteType>): Promise<IResponse> => {
  return request.post({ url: '/route/save', data })
}

export const delRoute = (ids: string[] | number[]): Promise<IResponse> => {
  return request.delete({ url: '/route/delete', data: ids })
}
