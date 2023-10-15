<script setup lang="ts">
import Write from './components/Write.vue'
import { ContentDetailWrap } from '@/components/ContentDetailWrap'
import { ref, unref } from 'vue'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter, useRoute } from 'vue-router'
import { saveRoute } from '@/api/route'
import { useEmitt } from '@/hooks/event/useEmitt'

const { t } = useI18n()
const { emitter } = useEmitt()
const { push, go } = useRouter()
const { query } = useRoute()

const writeRef = ref<ComponentRef<typeof Write>>()
const loading = ref(false)

const SaveAction = async () => {
  const write = unref(writeRef)
  const formData: any = await write?.submitForm()
  if (formData) {
    loading.value = true
    formData.appId = query.app
    const res = await saveRoute(formData)
      .catch(() => {})
      .finally(() => {
        loading.value = false
      })
    if (res) {
      emitter.emit('changeEvent', 'add')
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
  <ContentDetailWrap :title="t('exampleDemo.add')" @back="push('/app/route/list')">
    <Write ref="writeRef" />

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
