import config from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

const { code } = config

const timeout = 1000

const count = 23

interface GatewayProps {
  id: number
  cluster: string
  name: string
  remark: string
  status: number
  host: string
  port: number
  serverConfig: string
  clientConfig: string
  createTime: Date
  updateTime: Date
}

let gwList: GatewayProps[] = []
// init gateway list
for (let i = 0; i < count; i++) {
  gwList.push(
    Mock.mock({
      id: i + 1,
      cluster: '@pick(["product", "testing", "develop"])',
      name: '@string(3,5)',
      remark: '@cword(5)',
      status: '@integer(1, 2)',
      host: '',
      port: 8888,
      serverConfig: '',
      clientConfig: '',
      createTime: '@datetime(yyyy-MM-dd HH:mm:ss)',
      updateTime: '@datetime(yyyy-MM-dd HH:mm:ss)'
    })
  )
}

const clusterList = [
  {
    code: 'product',
    name: '生产集群'
  },
  {
    code: 'testing',
    name: '测试集群'
  },
  {
    code: 'develop',
    name: '开发集群'
  }
]

export default [
  {
    url: '/gateway/cluster',
    method: 'get',
    timeout,
    response: () => {
      return {
        total: clusterList.length,
        list: clusterList
      }
    }
  },
  // 列表接口
  {
    url: '/gateway/list',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { name, pageIndex, pageSize } = query
      const mockList = gwList.filter((item) => {
        if (name && item.name.indexOf(name) < 0) return false
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
    url: '/gateway/save',
    method: 'post',
    timeout,
    response: ({ body }) => {
      const nowTime = new Date().toLocaleTimeString()
      body.updateTime = nowTime
      if (!body.id) {
        body.createTime = nowTime
        // @ts-ignore
        gwList = [
          Object.assign(body, {
            id: gwList.length
          })
        ].concat(gwList)
        return {
          code: code,
          data: 'success'
        }
      } else {
        gwList.map((item) => {
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
    url: '/gateway/detail',
    method: 'get',
    response: ({ query }) => {
      const { id } = query
      for (const example of gwList) {
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
    url: '/gateway/delete',
    method: 'delete',
    response: ({ body }) => {
      const ids = body
      if (!ids) {
        return {
          code: 500,
          message: '请选择需要删除的数据'
        }
      } else {
        let i = gwList.length
        while (i--) {
          if (ids.indexOf(gwList[i].id) !== -1) {
            gwList.splice(i, 1)
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
