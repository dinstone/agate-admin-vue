<script setup lang="ts">
import Write from './components/Write.vue'
import { ContentDetailWrap } from '@/components/ContentDetailWrap'
import { ref, unref } from 'vue'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter, useRoute } from 'vue-router'
import { saveGateway, getGatewayDetail } from '@/api/agate/gateway'
import { GatewayType } from '@/api/agate/types'
import { useEmitt } from '@/hooks/event/useEmitt'

const { t } = useI18n()
const { query } = useRoute()
const { emitter } = useEmitt()
const { push, go } = useRouter()

const currentRow = ref<Nullable<GatewayType>>(null)

const getTableDet = async () => {
  const res = await getGatewayDetail(query.id as string)
  if (res) {
    currentRow.value = res.data
  }
}

getTableDet()

const writeRef = ref<ComponentRef<typeof Write>>()

const loading = ref(false)

const SaveAction = async () => {
  const write = unref(writeRef)
  const formData = await write?.submit()
  if (formData) {
    loading.value = true
    const res = await saveGateway(formData)
      .catch(() => {})
      .finally(() => {
        loading.value = false
      })
    if (res) {
      emitter.emit('changeEvent', 'editor')
      push('/gateway/list')
    }
  }
}
</script>

<template>
  <ContentDetailWrap :title="t('exampleDemo.edit')" @back="push('/gateway/list')">
    <Write ref="writeRef" :current-row="currentRow" />

    <template #header>
      <ElButton @click="go(-1)">
        {{ t('common.back') }}
      </ElButton>
      <ElButton type="primary" :loading="loading" @click="SaveAction">
        {{ t('exampleDemo.save') }}
      </ElButton>
    </template>
  </ContentDetailWrap>
</template>
@/hooks/event/useEmitt
