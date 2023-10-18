<script setup lang="ts">
import Write from './components/Write.vue'
import { ContentDetailWrap } from '@/components/ContentDetailWrap'
import { ref, unref } from 'vue'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter, useRoute } from 'vue-router'
import { useEmitt } from '@/hooks/event/useEmitt'
import { getRouteDetail, saveRoute } from '@/api/agate/route'
import { RouteType } from '@/api/agate/types'

const { t } = useI18n()
const { query } = useRoute()
const { emitter } = useEmitt()
const { push, go } = useRouter()

const routeData = ref<RouteType>()
const getDetail = async () => {
  const res = await getRouteDetail(query.id as string)
  if (res) {
    routeData.value = res.data
  }
}
getDetail()

const writeRef = ref<ComponentRef<typeof Write>>()

const loading = ref(false)

const SaveAction = async () => {
  const write = unref(writeRef)
  const formData: any = await write?.submitForm()
  if (formData) {
    loading.value = true
    const res = await saveRoute(formData)
      .catch(() => {})
      .finally(() => {
        loading.value = false
      })
    if (res) {
      emitter.emit('changeEvent', 'editor')
      go(-1)
    }
  }
}
const ResetAction = async () => {
  const write = unref(writeRef)
  write?.resetForm()
}
</script>

<template>
  <ContentDetailWrap :title="t('exampleDemo.edit')" @back="push('/gateway/list')">
    <Write ref="writeRef" :model="routeData" />

    <template #header>
      <ElButton @click="go(-1)">
        {{ t('common.back') }}
      </ElButton>
      <ElButton type="primary" @click="ResetAction">
        {{ t('common.reset') }}
      </ElButton>
      <ElButton type="primary" :loading="loading" @click="SaveAction">
        {{ t('exampleDemo.save') }}
      </ElButton>
    </template>
  </ContentDetailWrap>
</template>
@/hooks/event/useEmitt
