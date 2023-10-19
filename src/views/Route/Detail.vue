<script setup lang="ts">
import Show from './components/Show.vue'
import { ContentDetailWrap } from '@/components/ContentDetailWrap'
import { ref } from 'vue'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter, useRoute } from 'vue-router'
import { getRoute } from '@/api/agate/route'
import { RouteType } from '@/api/agate/types'

const { t } = useI18n()
const { query } = useRoute()
const { push, go } = useRouter()

const routeData = ref<RouteType>()
const getDetail = async () => {
  const res = await getRoute(query.id as string)
  if (res) {
    routeData.value = res.data
  }
}
getDetail()
</script>

<template>
  <ContentDetailWrap :title="t('exampleDemo.detail')" @back="push('/gateway/list')">
    <Show :model="routeData" />

    <template #header>
      <ElButton @click="go(-1)">
        {{ t('common.back') }}
      </ElButton>
    </template>
  </ContentDetailWrap>
</template>
