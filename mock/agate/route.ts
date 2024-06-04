import config from '@/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import { RouteType } from '@/api/agate/types'
import Mock from 'mockjs'

const { code } = config

const timeout = 1000

const count = 12

let idGener: number = 1
let routeList: RouteType[] = []
for (let i = 0; i < count; i++) {
  routeList.push(
    Mock.mock({
      id: idGener++,
      appId: '@integer(1, 13)',
      appName: '@string(3,5)',
      name: '@string(3,5)',
      remark: '@string(3,5)',
      status: '@integer(0, 1)'
    })
  )
}

export default [
  // 列表接口
  {
    url: '/route/list',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { appId, pageIndex, pageSize } = query
      const mockList = routeList.filter((item) => {
        if (appId && item.appId != appId) return false
        return true
      })
      const pageList = mockList.filter((_, index) => {
        if (pageIndex && pageSize) {
          return index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1)
        }
        return true
      })
      return {
        code: code,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  // 保存接口
  {
    url: '/route/save',
    method: 'post',
    timeout,
    response: ({ body }) => {
      const nowTime = new Date().toLocaleTimeString()
      body.updateTime = nowTime
      if (!body.id) {
        body.createTime = nowTime
        // @ts-ignore
        routeList = [
          Object.assign(body, {
            id: idGener++
          })
        ].concat(routeList)
        return {
          code: code,
          data: 'success'
        }
      } else {
        routeList.map((item) => {
          if (item.id == body.id) {
            for (const key in body) {
              item[key] = body[key]
            }
          }
        })
        return {
          code: code,
          data: 'success'
        }
      }
    }
  },
  // 详情接口
  {
    url: '/route/detail',
    method: 'get',
    response: ({ query }) => {
      const { id } = query
      for (const example of routeList) {
        if (example.id == id) {
          return {
            code: code,
            data: example
          }
        }
      }
    }
  },
  // 删除接口
  {
    url: '/route/delete',
    method: 'delete',
    response: ({ body }) => {
      const ids = body
      if (!ids) {
        return {
          code: 500,
          message: '请选择需要删除的数据'
        }
      } else {
        let i = routeList.length
        while (i--) {
          if (ids.indexOf(routeList[i].id) !== -1) {
            routeList.splice(i, 1)
          }
        }
        return {
          code: code,
          data: 'success'
        }
      }
    }
  }
] as MockMethod[]
