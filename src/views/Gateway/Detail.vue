<script setup lang="ts">
import Detail from './components/Detail.vue'
import { ContentDetailWrap } from '@/components/ContentDetailWrap'
import { ref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter, useRoute } from 'vue-router'
import { getGatewayDetail } from '@/api/gateway'
import { GatewayType } from '@/api/gateway/types'
import { ElButton } from 'element-plus'

const { t } = useI18n()
const { query } = useRoute()
const { push, go } = useRouter()

const currentRow = ref<Nullable<GatewayType>>(null)
const getDetail = async () => {
  const res = await getGatewayDetail(query.id as string)
  if (res) {
    currentRow.value = res.data
  }
}

getDetail()
</script>

<template>
  <ContentDetailWrap :title="t('exampleDemo.detail')" @back="push('/gateway/list')">
    <template #header>
      <ElButton @click="go(-1)">
        {{ t('common.back') }}
      </ElButton>
    </template>
    <Detail :current-row="currentRow" />
  </ContentDetailWrap>
</template>
