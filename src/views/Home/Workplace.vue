<script setup lang="ts">
import { ElRow, ElCol, ElSkeleton, ElCard, ElDivider, ElLink } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { ref, reactive } from 'vue'
import { CountTo } from '@/components/CountTo'
import { formatTime } from '@/utils'
import type { Total, TechStack, Project } from '@/api/dashboard/workplace/types'
import { useAppStore } from '@/store/modules/app'
import { useStorage } from '@/hooks/web/useStorage'

const appStore = useAppStore()
const { getStorage } = useStorage()
const userInfo = getStorage(appStore.getUserInfo)

const loading = ref(true)

// 获取统计数
let total = reactive<Total>({
  gateway: 4,
  apps: 18,
  route: 37
})

// 获取技术栈
let stack = reactive<TechStack[]>([
  {
    name: 'Vue 3.3',
    icon: 'logos:vue',
    url: 'https://v3.vuejs.org/'
  },
  {
    name: 'Vue Router',
    icon: 'logos:react',
    url: 'https://next.router.vuejs.org/'
  },
  {
    name: 'Pinia',
    icon: 'logos:pinia',
    url: 'https://pinia.vuejs.org/'
  },
  {
    name: 'Element-plus',
    icon: 'ep:element-plus',
    url: 'https://element-plus.org/'
  },
  {
    name: 'Vite',
    icon: 'vscode-icons:file-type-vite',
    url: 'https://vitejs.dev/'
  },
  {
    name: 'TypeScript',
    icon: 'logos:webpack',
    url: 'https://www.typescriptlang.org/'
  }
])

const projects = reactive<Project[]>([
  {
    name: 'Vue',
    icon: 'logos:vue',
    message: 'workplace.introduction',
    personal: 'Archer',
    time: new Date()
  },
  {
    name: 'Angular',
    icon: 'logos:angular-icon',
    message: 'workplace.introduction',
    personal: 'Archer',
    time: new Date()
  },
  {
    name: 'React',
    icon: 'logos:react',
    message: 'workplace.introduction',
    personal: 'Archer',
    time: new Date()
  },
  {
    name: 'Github',
    icon: 'akar-icons:github-fill',
    message: 'workplace.introduction',
    personal: 'Archer',
    time: new Date()
  },
  {
    name: 'Webpack',
    icon: 'logos:webpack',
    message: 'workplace.introduction',
    personal: 'Archer',
    time: new Date()
  },
  {
    name: 'Vite',
    icon: 'vscode-icons:file-type-vite',
    message: 'workplace.introduction',
    personal: 'Archer',
    time: new Date()
  }
])

loading.value = false

const { t } = useI18n()
</script>

<template>
  <div>
    <ElCard shadow="never">
      <ElSkeleton :loading="loading" animated>
        <ElRow :gutter="20" justify="space-between">
          <ElCol :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <div class="flex items-center">
              <img
                src="@/assets/imgs/avatar.jpg"
                alt=""
                class="w-70px h-70px rounded-[50%] mr-20px"
              />
              <div>
                <div class="text-20px">
                  {{ userInfo.username }}，{{ t('workplace.happyDay') }}
                </div>
                <div class="mt-10px text-14px text-gray-500">
                  {{ t('workplace.toady') }}，20℃ - 32℃！
                </div>
              </div>
            </div>
          </ElCol>
          <ElCol :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <div class="flex h-70px items-center justify-end lt-sm:mt-20px">
              <div class="px-8px text-right">
                <div class="text-14px text-gray-400 mb-20px">{{ t('网关数') }}</div>
                <CountTo
                  class="text-20px"
                  :start-val="0"
                  :end-val="total.gateway"
                  :duration="2600"
                />
              </div>
              <ElDivider direction="vertical" />
              <div class="px-8px text-right">
                <div class="text-14px text-gray-400 mb-20px">{{ t('应用数') }}</div>
                <CountTo class="text-20px" :start-val="0" :end-val="total.apps" :duration="2600" />
              </div>
              <ElDivider direction="vertical" border-style="dashed" />
              <div class="px-8px text-right">
                <div class="text-14px text-gray-400 mb-20px">{{ t('路由数') }}</div>
                <CountTo class="text-20px" :start-val="0" :end-val="total.route" :duration="2600" />
              </div>
            </div>
          </ElCol>
        </ElRow>
      </ElSkeleton>
    </ElCard>
  </div>

  <ElRow class="mt-20px" :gutter="20" justify="space-between">
    <ElCol :xl="16" :lg="16" :md="24" :sm="24" :xs="24" class="mb-20px">
      <ElCard shadow="never">
        <template #header>
          <div class="flex justify-between">
            <span>{{ t('待审批应用') }}</span>
            <ElLink type="primary" :underline="false">{{ t('workplace.more') }}</ElLink>
          </div>
        </template>
        <ElSkeleton :loading="loading" animated>
          <ElRow>
            <ElCol
              v-for="(item, index) in projects"
              :key="`card-${index}`"
              :xl="8"
              :lg="8"
              :md="12"
              :sm="24"
              :xs="24"
            >
              <ElCard shadow="hover">
                <div class="flex items-center">
                  <Icon :icon="item.icon" :size="25" class="mr-10px" />
                  <span class="text-16px">{{ item.name }}</span>
                </div>
                <div class="mt-15px text-14px text-gray-400">{{ t(item.message) }}</div>
                <div class="mt-20px text-12px text-gray-400 flex justify-between">
                  <span>{{ item.personal }}</span>
                  <span>{{ formatTime(item.time, 'yyyy-MM-dd') }}</span>
                </div>
              </ElCard>
            </ElCol>
          </ElRow>
        </ElSkeleton>
      </ElCard>
    </ElCol>

    <ElCol :xl="8" :lg="8" :md="24" :sm="24" :xs="24" class="mb-20px">
      <ElCard shadow="never">
        <template #header>
          <span>{{ t('workplace.stack') }}</span>
        </template>
        <ElSkeleton :loading="loading" animated>
          <ElRow>
            <ElCol v-for="item in stack" :key="`team-${item.name}`" :span="12" class="mb-20px">
              <div class="flex items-center">
                <Icon :icon="item.icon" class="mr-10px" />
                <ElLink type="default" :underline="false" :href="item.url">
                  {{ item.name }}
                </ElLink>
              </div>
            </ElCol>
          </ElRow>
        </ElSkeleton>
      </ElCard>
    </ElCol>
  </ElRow>
</template>
