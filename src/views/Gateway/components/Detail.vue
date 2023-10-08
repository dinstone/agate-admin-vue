<script setup lang="tsx">
import { PropType, reactive } from 'vue'
import type { GatewayType } from '@/api/gateway/types'
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
    field: 'cluster',
    label: t('集群'),
    span: 24
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
  },
  {
    field: 'createTime',
    label: t('创建时间')
  },
  {
    field: 'updateTime',
    label: t('更新时间')
  }
])
</script>

<template>
  <Descriptions :schema="schema" :data="currentRow || {}" />
</template>
