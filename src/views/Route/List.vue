<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton } from 'element-plus'
import { Table, TableColumn } from '@/components/Table'
import { getRoutes, delRoute, closeRoute, startRoute } from '@/api/agate/route'
import { getAppDetail } from '@/api/agate/apps'
import { useTable } from '@/hooks/web/useTable'
import { RouteType } from '@/api/agate/types'
import { reactive, ref, unref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useEmitt } from '@/hooks/event/useEmitt'
import { DescriptionsSchema, Descriptions } from '@/components/Descriptions'

defineOptions({
  name: 'RouteListPage'
})
const { query } = useRoute()
const { push } = useRouter()
const { t } = useI18n()

const appInfo = ref({})
const initApp = async () => {
  const res = await getAppDetail({ id: query.app })
  appInfo.value = res.data
}
initApp()

const ids = ref<string[]>([])
const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getRoutes({
      appId: query.app,
      pageIndex: unref(currentPage),
      pageSize: unref(pageSize)
    })
    return {
      list: res.data.list,
      total: res.data.total
    }
  },
  fetchDelApi: async () => {
    const res = await delRoute(unref(ids))
    return !!res
  }
})
const { loading, dataList, total, currentPage, pageSize } = tableState
const { getList, getElTableExpose, delList } = tableMethods

useEmitt({
  name: 'changeEvent',
  callback: (type: string) => {
    if (type === 'add') {
      currentPage.value = 1
    }
    getList()
  }
})

const AddAction = () => {
  push(`/apps/route/add?app=${query.app}`)
}

const delLoading = ref(false)
const DelAction = async (row: RouteType | null) => {
  const elTableExpose = await getElTableExpose()
  ids.value = row ? [row.id] : elTableExpose?.getSelectionRows().map((v: RouteType) => v.id) || []
  delLoading.value = true
  await delList(unref(ids).length).finally(() => {
    delLoading.value = false
  })
}

const ShowAction = (row: RouteType, type: string) => {
  push(`/apps/route/${type}?id=${row.id}`)
}

const StatusAction = async (row: any) => {
  row.sloading = true
  if (row.status == 1) {
    await closeRoute(row.id)
  } else {
    await startRoute(row.id)
  }
  row.sloading = false

  getList()
}

const appSchema = reactive<DescriptionsSchema[]>([
  {
    field: 'gwName',
    label: t('网关')
  },
  {
    field: 'name',
    label: t('应用')
  },
  {
    field: 'domain',
    label: t('域名')
  },
  {
    field: 'prefix',
    label: t('前缀')
  }
])

const tableColumns = reactive<TableColumn[]>([
  {
    field: 'selection',
    type: 'selection'
  },
  {
    field: 'index',
    label: t('tableDemo.index'),
    type: 'index'
  },
  {
    field: 'name',
    label: t('路由')
  },
  {
    field: 'remark',
    label: t('备注')
  },
  {
    field: 'frontend.path',
    label: t('路径')
  },
  {
    field: 'status',
    label: t('状态'),
    slots: {
      default: (data: any) => {
        if (data.row.status == 0) {
          return <el-tag type="info">已停止</el-tag>
        } else {
          return <el-tag type="success">已启动</el-tag>
        }
      }
    }
  },
  {
    field: 'action',
    width: '330px',
    label: t('tableDemo.action'),
    slots: {
      default: (data: any) => {
        return (
          <>
            <ElButton type="primary" onClick={() => ShowAction(data.row, 'edit')}>
              {t('exampleDemo.edit')}
            </ElButton>
            <ElButton type="success" onClick={() => ShowAction(data.row, 'detail')}>
              {t('exampleDemo.detail')}
            </ElButton>
            <ElButton type="danger" onClick={() => DelAction(data.row)}>
              {t('exampleDemo.del')}
            </ElButton>
            <ElButton
              type="warning"
              loading={data.row.sloading}
              onClick={() => StatusAction(data.row)}
            >
              {data.row.status ? t('关闭') : t('启动')}
            </ElButton>
          </>
        )
      }
    }
  }
])
</script>

<template>
  <ContentWrap style="margin-bottom: 10px">
    <Descriptions :schema="appSchema" :data="appInfo" />
  </ContentWrap>
  <ContentWrap>
    <div class="mb-10px">
      <ElButton type="primary" @click="AddAction">{{ t('exampleDemo.add') }}</ElButton>
      <ElButton :loading="delLoading" type="danger" @click="DelAction(null)">
        {{ t('exampleDemo.del') }}
      </ElButton>
    </div>

    <Table
      v-model:pageSize="pageSize"
      v-model:currentPage="currentPage"
      :columns="tableColumns"
      :data="dataList"
      :loading="loading"
      :pagination="{
        total: total
      }"
      @register="tableRegister"
    />
  </ContentWrap>
</template>
@/hooks/event/useEmitt
