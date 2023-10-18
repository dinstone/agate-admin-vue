import config from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import { toAnyString } from '@/utils'
import Mock from 'mockjs'

const { code } = config

const timeout = 1000

const count = 13

interface ClusterProps {
  id: number
  code: string
  name: string
  instances?: InstanceProps[]
  createTime?: Date
  updateTime?: Date
}

interface InstanceProps {
  clusterCode: string
  instanceId: string
  manageHost: string
  managePort: number
  createTime?: string
}

const instanceList: InstanceProps[] = []

for (let i = 0; i < count; i++) {
  instanceList.push(
    Mock.mock({
      instanceId: toAnyString(),
      clusterCode: '@pick(["product", "testing", "develop"])',
      manageHost: '@ip',
      managePort: '@integer(1024, 3400)'
    })
  )
}

let idGener = 1
let clusterList: ClusterProps[] = [
  {
    id: idGener++,
    code: 'product',
    name: '生产集群',
    instances: [
      {
        clusterCode: 'product',
        instanceId: 'adfasfdafd',
        manageHost: '192.168.21.2',
        managePort: 23243
      },
      {
        clusterCode: 'product',
        instanceId: 'wwwww',
        manageHost: '192.168.21.3',
        managePort: 23243
      }
    ]
  },
  {
    id: idGener++,
    code: 'testing',
    name: '测试集群',
    instances: [
      {
        clusterCode: 'testing',
        instanceId: 'hhhhhhhh',
        manageHost: '192.168.22.2',
        managePort: 23243
      },
      {
        clusterCode: 'testing',
        instanceId: 'rrrrrrr',
        manageHost: '192.168.22.3',
        managePort: 23243
      }
    ]
  },
  {
    id: idGener++,
    code: 'develop',
    name: '开发集群',
    instances: [
      {
        clusterCode: 'develop',
        instanceId: 'ppppppp',
        manageHost: '192.168.23.2',
        managePort: 23243
      },
      {
        clusterCode: 'testing',
        instanceId: 'qqqqqq',
        manageHost: '192.168.23.3',
        managePort: 23243
      }
    ]
  }
]

export default [
  // 树形列表接口
  {
    url: '/cluster/instances',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { cluster, pageIndex, pageSize } = query
      const mockList = instanceList.filter((item) => {
        if (cluster && item.clusterCode.indexOf(cluster) < 0) return false
        return true
      })
      const pageList = mockList.filter(
        (_, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1)
      )
      return {
        code: code,
        data: pageList
      }
    }
  },
  // 列表接口
  {
    url: '/cluster/list',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { name, pageIndex, pageSize } = query
      const mockList = clusterList.filter((item) => {
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
        data: pageList
      }
    }
  },
  // 保存接口
  {
    url: '/cluster/save',
    method: 'post',
    timeout,
    response: ({ body }) => {
      const nowTime = new Date().toLocaleTimeString()
      body.updateTime = nowTime
      if (!body.id) {
        body.createTime = nowTime
        // @ts-ignore
        clusterList = [
          Object.assign(body, {
            id: idGener++
          })
        ].concat(clusterList)
        return {
          code: code,
          data: 'success'
        }
      } else {
        clusterList.map((item) => {
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
    url: '/cluster/detail',
    method: 'get',
    response: ({ query }) => {
      const { id } = query
      for (const example of clusterList) {
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
    url: '/cluster/delete',
    method: 'delete',
    response: ({ body }) => {
      const ids = body
      if (!ids) {
        return {
          code: 500,
          message: '请选择需要删除的数据'
        }
      } else {
        let i = clusterList.length
        while (i--) {
          if (ids.indexOf(clusterList[i].id) !== -1) {
            clusterList.splice(i, 1)
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
