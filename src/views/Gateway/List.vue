<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton } from 'element-plus'
import { Table, TableColumn } from '@/components/Table'
import { getGateways, delGateway, getClusters } from '@/api/agate/gateway'
import { useTable } from '@/hooks/web/useTable'
import { GatewayType } from '@/api/agate/types'
import { reactive, ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import { useEmitt } from '@/hooks/event/useEmitt'
import { FormSchema } from '@/components/Form'

defineOptions({
  name: 'GatewayListPage'
})

const { push } = useRouter()
const { t } = useI18n()

const searchParams = ref({})

const ids = ref<string[]>([])
const clusterList = ref<any[]>([])
const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    // init clusters
    const cres = await getClusters()
    clusterList.value = cres.data

    const { currentPage, pageSize } = tableState
    const res = await getGateways({
      pageIndex: unref(currentPage),
      pageSize: unref(pageSize),
      ...unref(searchParams)
    })
    return {
      list: res.data.list,
      total: res.data.total
    }
  },
  fetchDelApi: async () => {
    const res = await delGateway(unref(ids))
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

const setSearchParams = (params: any) => {
  searchParams.value = params
  getList()
}

const AddAction = () => {
  push({ name: 'GatewayAdd' })
}

const delLoading = ref(false)
const DelAction = async (row: GatewayType | null) => {
  const elTableExpose = await getElTableExpose()
  ids.value = row ? [row.id] : elTableExpose?.getSelectionRows().map((v: GatewayType) => v.id) || []
  delLoading.value = true
  await delList(unref(ids).length).finally(() => {
    delLoading.value = false
  })
}

const ShowAction = (row: GatewayType, type: string) => {
  push(`/gateway/${type}?id=${row.id}`)
}

const searchSchema = reactive<FormSchema[]>([
  {
    field: 'name',
    label: t('网关名称'),
    component: 'Input'
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
    field: 'cluster',
    label: t('集群'),
    slots: {
      default: (data: any) => {
        for (const element of clusterList.value) {
          if (element.code == data.row.cluster) {
            return <>{element.name}</>
          }
        }
        return <>{data.row.cluster}</>
      }
    }
  },
  {
    field: 'name',
    label: t('网关')
  },
  {
    field: 'port',
    label: t('端口')
  },
  {
    field: 'remark',
    label: t('备注')
  },
  {
    field: 'status',
    label: t('状态'),
    slots: {
      default: (data: any) => {
        if (data.row.status === 1) {
          return <>已停止</>
        }
        return <>已启动</>
      }
    }
  },
  {
    field: 'action',
    width: '260px',
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
          </>
        )
      }
    }
  }
])
</script>

<template>
  <ContentWrap>
    <Search :schema="searchSchema" @search="setSearchParams" @reset="setSearchParams" />

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
