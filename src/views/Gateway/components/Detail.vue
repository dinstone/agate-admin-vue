<script setup lang="tsx">
import { PropType, reactive } from 'vue'
import type { GatewayType } from '@/api/agate/types'
import { Descriptions, DescriptionsSchema } from '@/components/Descriptions'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

defineProps({
  currentRow: {
    type: Object as PropType<Nullable<GatewayType>>,
    default: () => null
  }
})

const schema = reactive<DescriptionsSchema[]>([
  {
    field: 'cname',
    label: t('集群')
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
    field: 'status',
    label: t('状态'),
    slots: {
      default: (data: any) => {
        if (data.status === 0) {
          return <el-tag type="info">已停止</el-tag>
        }
        return <el-tag type="success">已启动</el-tag>
      }
    }
  },
  {
    field: 'remark',
    label: t('备注'),
    span: 24
  },
  {
    field: 'serverConfig',
    label: t('服务端配置'),
    span: 24
  },
  {
    field: 'clientConfig',
    label: t('客户端配置'),
    span: 24
  }
])
</script>

<template>
  <Descriptions :schema="schema" :data="currentRow || {}" />
</template>
