<script setup lang="ts">
import Write from './components/Write.vue'
import { ContentDetailWrap } from '@/components/ContentDetailWrap'
import { ref, unref } from 'vue'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter } from 'vue-router'
import { saveGateway } from '@/api/agate/gateway'
import { useEmitt } from '@/hooks/event/useEmitt'

const { t } = useI18n()
const { emitter } = useEmitt()
const { push, go } = useRouter()

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
      emitter.emit('changeEvent', 'add')
      push('/gateway/list')
    }
  }
}
</script>

<template>
  <ContentDetailWrap :title="t('exampleDemo.add')" @back="push('/gateway/list')">
    <Write ref="writeRef" />

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
