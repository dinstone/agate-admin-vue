import config from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import { AppType } from '@/api/apps/types'
import Mock from 'mockjs'

const { code } = config

const timeout = 1000

const count = 13

let idGener: number = 1
let instanceList: AppType[] = []
for (let i = 0; i < count; i++) {
  instanceList.push(
    Mock.mock({
      id: idGener++,
      gwId: '1',
      gwName: '生成网关',
      name: '@string(3,5)',
      domain: '@string(3,5)',
      prefix: '/*'
    })
  )
}

export default [
  // 列表接口
  {
    url: '/apps/list',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { gwName, pageIndex, pageSize } = query
      const mockList = instanceList.filter((item) => {
        if (gwName && item.gwName.indexOf(gwName) < 0) return false
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
    url: '/apps/save',
    method: 'post',
    timeout,
    response: ({ body }) => {
      const nowTime = new Date().toLocaleTimeString()
      body.updateTime = nowTime
      if (!body.id) {
        body.createTime = nowTime
        // @ts-ignore
        instanceList = [
          Object.assign(body, {
            id: idGener++
          })
        ].concat(instanceList)
        return {
          code: code,
          data: 'success'
        }
      } else {
        instanceList.map((item) => {
          if (item.id == body.id) {
            for (const key in item) {
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
    url: '/apps/detail',
    method: 'get',
    response: ({ query }) => {
      const { id } = query
      for (const example of instanceList) {
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
    url: '/apps/delete',
    method: 'post',
    response: ({ body }) => {
      const ids = body.ids
      if (!ids) {
        return {
          code: 500,
          message: '请选择需要删除的数据'
        }
      } else {
        let i = instanceList.length
        while (i--) {
          if (ids.indexOf(instanceList[i].id) !== -1) {
            instanceList.splice(i, 1)
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
