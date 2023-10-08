import request from '@/config/axios'
import type { AppType } from './types'

export const getApps = (params: any) => {
  return request.get({ url: '/apps/list', params })
}

export const saveApps = (data: Partial<AppType>): Promise<IResponse> => {
  return request.post({ url: '/apps/save', data })
}

export const deleteApps = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: '/apps/delete', data: { ids } })
}
