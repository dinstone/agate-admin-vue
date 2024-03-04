import { useStorage } from '@/hooks/web/useStorage'

import {
  AxiosConfig,
  AxiosResponse,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig
} from './types'
import { ElMessage } from 'element-plus'
import qs from 'qs'

const { getStorage } = useStorage()

const config: AxiosConfig = {
  /**
   * api请求基础路径
   */
  baseUrl: '',

  /**
   * 接口成功返回状态码
   */
  code: 0,

  /**
   * 接口请求超时时间
   */
  timeout: 2000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  defaultHeaders: 'application/json',

  interceptors: {
    //请求拦截
    // requestInterceptors: (config) => {
    //   return config
    // },
    // 响应拦截器
    // responseInterceptors: (result: AxiosResponse) => {
    //   return result
    // }
  }
}

const defaultRequestInterceptors = (config: InternalAxiosRequestConfig) => {
  if (
    config.method === 'post' &&
    (config.headers as AxiosRequestHeaders)['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    config.data = qs.stringify(config.data)
  }
  if (config.method === 'get' && config.params) {
    let url = config.url as string
    url += '?'
    const keys = Object.keys(config.params)
    for (const key of keys) {
      if (config.params[key] !== void 0 && config.params[key] !== null) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`
      }
    }
    url = url.substring(0, url.length - 1)
    config.params = {}
    config.url = url
  }

  const token = getStorage('jwt.token')
  if (token) {
    config.headers.setAuthorization(token)
  }

  return config
}

const defaultResponseInterceptors = (response: AxiosResponse<any>) => {
  if (response?.config?.responseType === 'blob') {
    // 如果是文件流，直接过
    return response
  }

  // API响应格式是包装类型
  if (response.data.hasOwnProperty('code')) {
    if (response.data.code === config.code) {
      return response.data
    } else {
      ElMessage.error(response.data.message)
    }
  } else {
    // API响应格式是原始类型，适配成包装类型
    const raw = response.data
    response.data = { data: raw, code: config.code }
    return response.data
  }
}

export { defaultResponseInterceptors, defaultRequestInterceptors }
export default config
