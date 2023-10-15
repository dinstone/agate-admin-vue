import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/home/workplace',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/home',
    component: Layout,
    redirect: '/home/workplace',
    name: 'Home',
    meta: {
      title: t('router.dashboard'),
      icon: 'ant-design:dashboard-filled',
      alwaysShow: true
    },
    children: [
      {
        path: 'workplace',
        component: () => import('@/views/Home/Workplace.vue'),
        name: 'Workplace',
        meta: {
          title: t('router.workplace'),
          noCache: true
        }
      }
    ]
  },
  {
    path: '/cluster',
    component: Layout,
    name: 'Cluster',
    meta: {},
    children: [
      {
        path: '',
        component: () => import('@/views/Cluster/Cluster.vue'),
        name: 'ClusterIndex',
        meta: {
          title: t('集群'),
          icon: 'ri:function-fill'
        }
      }
    ]
  },
  {
    path: '/gateway',
    component: Layout,
    name: 'Gateway',
    redirect: '/gateway/list',
    meta: { title: t('网关'), icon: 'ep:management' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/Gateway/List.vue'),
        name: 'GatewayList',
        meta: {
          title: t('网关-列表'),
          icon: 'ep:management',
          hidden: true,
          canTo: true,
          activeMenu: '/gateway'
        }
      },
      {
        path: 'add',
        component: () => import('@/views/Gateway/Add.vue'),
        name: 'GatewayAdd',
        meta: {
          title: t('网关-新增'),
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true,
          activeMenu: '/gateway'
        }
      },
      {
        path: 'edit',
        component: () => import('@/views/Gateway/Edit.vue'),
        name: 'GatewayEdit',
        meta: {
          title: t('网关-编辑'),
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true,
          activeMenu: '/gateway'
        }
      },
      {
        path: 'detail',
        component: () => import('@/views/Gateway/Detail.vue'),
        name: 'GatewayDetail',
        meta: {
          title: t('网关-详情'),
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true,
          activeMenu: '/gateway'
        }
      }
    ]
  },
  {
    path: '/apps',
    component: Layout,
    name: 'Apps',
    redirect: '/apps/list',
    meta: { title: t('应用'), icon: 'ep:management' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/Apps/Apps.vue'),
        name: 'AppsList',
        meta: {
          title: t('应用-列表'),
          icon: 'ep:management',
          hidden: true,
          canTo: true,
          activeMenu: '/apps'
        }
      },
      {
        path: 'route/list',
        component: () => import('@/views/Route/List.vue'),
        name: 'RouteList',
        meta: {
          title: t('路由-列表'),
          icon: 'ep:management',
          // noTagsView: true,
          hidden: true,
          canTo: true,
          activeMenu: '/apps'
        }
      },
      {
        path: 'route/add',
        component: () => import('@/views/Route/Add.vue'),
        name: 'RouteAdd',
        meta: {
          title: t('路由-新增'),
          icon: 'ep:management',
          noTagsView: true,
          hidden: true,
          canTo: false,
          activeMenu: '/apps'
        }
      },
      {
        path: 'route/edit',
        component: () => import('@/views/Route/Edit.vue'),
        name: 'RouteEdit',
        meta: {
          title: t('路由-编辑'),
          icon: 'ep:management',
          noTagsView: true,
          hidden: true,
          canTo: true,
          activeMenu: '/apps'
        }
      },
      {
        path: 'route/detail',
        component: () => import('@/views/Route/Detail.vue'),
        name: 'RouteDetail',
        meta: {
          title: t('路由-详情'),
          icon: 'ep:management',
          noTagsView: true,
          hidden: true,
          canTo: true,
          activeMenu: '/apps'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
