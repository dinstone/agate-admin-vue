<script setup lang="ts">
import { PropType, ref, unref, watch } from 'vue'
import { FormInstance } from 'element-plus'
import { RouteType } from '@/api/agate/types'

const props = defineProps({
  model: {
    type: Object as PropType<RouteType>,
    default: () => ({ frontend: {}, backend: { urls: [''], params: [] }, plugins: [] })
  }
})

const formModel = ref<Recordable>(props.model)

watch(
  () => props.model,
  (data) => {
    if (!data) return
    formModel.value = Object.assign(unref(formModel), data)
  },
  {
    deep: true,
    immediate: true
  }
)

const methodOptions = [
  { label: 'ALL', value: '' },
  { label: 'GET', value: 'GET' },
  { label: 'PUT', value: 'PUT' },
  { label: 'POST', value: 'POST' },
  { label: 'DELET', value: 'DELETE' }
]

const formElRef = ref<FormInstance>()
</script>

<template>
  <el-form
    ref="formElRef"
    :model="formModel"
    label-width="90px"
    class="demo-form-inline"
    status-icon
  >
    <el-space :fill="true" wrap>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>基本信息</span>
          </div>
        </template>
        <el-form-item label="路由名称" prop="name">
          <el-input v-model="formModel.name" />
        </el-form-item>
        <el-form-item label="路由备注" prop="remark">
          <el-input v-model="formModel.remark" type="textarea" maxlength="100" show-word-limit />
        </el-form-item>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>前端信息</span>
          </div>
        </template>
        <el-form-item label="请求路径" prop="frontend.path">
          <el-input v-model="formModel.frontend.path" />
        </el-form-item>
        <el-form-item label="请求方法" prop="frontend.method">
          <el-select v-model="formModel.frontend.method" :fill="true">
            <el-option
              v-for="(item, index) in methodOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="消费类型" prop="frontend.consumes">
          <el-input v-model="formModel.frontend.consumes" />
        </el-form-item>
        <el-form-item label="生产类型" prop="frontend.produces">
          <el-input v-model="formModel.frontend.produces" />
        </el-form-item>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>后端信息</span>
          </div>
        </template>
        <el-form-item label="服务类型" prop="backend.type">
          <el-radio-group v-model="formModel.backend.type">
            <el-radio :label="0">服务代理</el-radio>
            <el-radio :label="1">服务发现</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="注册配置" prop="backend.registry" v-if="formModel.backend.type == 1">
          <el-input v-model="formModel.backend.registry" type="textarea" />
        </el-form-item>

        <el-row :gutter="10">
          <el-col class="el-col-first el-form-item__label"
            >服务地址 （Does not include path, Example: https://www.baidu.com or
            http://user-service）
          </el-col>
        </el-row>
        <el-row
          v-for="(url, index) in formModel.backend.urls"
          :gutter="10"
          :key="url[index]"
          :label="'url' + index"
          :prop="'backend.urls.' + index + ''"
          style="margin-top: 5px; margin-bottom: 15px"
        >
          <el-col :span="23" class="el-col-first"
            ><el-input v-model="formModel.backend.urls[index]" maxlength="50" show-word-limit
          /></el-col>
          <el-col :span="1" />
        </el-row>

        <el-form-item label="请求路径" prop="backend.path">
          <el-input v-model="formModel.backend.path" />
        </el-form-item>
        <el-form-item label="请求方法" prop="backend.method">
          <el-select v-model="formModel.backend.method" placeholder="">
            <el-option
              v-for="(item, index) in methodOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="服务超时" prop="backend.timeout">
          <el-input v-model.number="formModel.backend.timeout"
            ><template #append>ms</template></el-input
          >
        </el-form-item>
        <el-form-item label="连接配置" prop="backend.connection">
          <el-input v-model="formModel.backend.connection" type="textarea" />
        </el-form-item>

        <el-divider content-position="left">参数映射</el-divider>
        <el-row :gutter="10">
          <el-col :span="1" />
          <el-col :span="5"><div class="el-form-item__label">请求参数名称</div></el-col>
          <el-col :span="5"><div class="el-form-item__label">请求参数类型</div></el-col>
          <el-col :span="5"><div class="el-form-item__label">路由参数名称</div></el-col>
          <el-col :span="5"><div class="el-form-item__label">路由参数类型</div></el-col>
          <el-col :span="3" />
        </el-row>
        <el-row
          v-for="(param, index) in formModel.backend.params"
          :gutter="10"
          :key="param.key"
          :label="'Domain' + index"
          :prop="'domains.' + index + '.val'"
          :rules="{
            required: true,
            message: 'domain can not be null',
            trigger: 'blur'
          }"
          style=" margin-top: 5px;margin-bottom: 5px"
        >
          <el-col :span="1" />
          <el-col :span="5"><el-input v-model="param.feParamName" /></el-col>
          <el-col :span="5"
            ><el-select v-model="param.feParamType" placeholder="">
              <el-option label="PATH" value="PATH" />
              <el-option label="QUERY" value="QUERY" />
              <el-option label="HEADER" value="HEADER" /> </el-select
          ></el-col>
          <el-col :span="5"><el-input v-model="param.beParamName" /></el-col>
          <el-col :span="5"
            ><el-select v-model="param.beParamType" placeholder="">
              <el-option label="PATH" value="PATH" />
              <el-option label="QUERY" value="QUERY" />
              <el-option label="HEADER" value="HEADER" /> </el-select
          ></el-col>
          <el-col :span="3" />
        </el-row>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>插件配置</span>
          </div>
        </template>
        <el-row :gutter="10">
          <el-col :span="1" />
          <el-col :span="5"><div class="el-form-item__label">插件名称</div></el-col>
          <el-col :span="15"><div class="el-form-item__label">插件配置</div></el-col>
          <el-col :span="3" />
        </el-row>
        <el-row
          v-for="(plugin, index) in formModel.plugins"
          :gutter="10"
          :key="plugin.key"
          :label="'plugin' + index"
          :prop="'plugin.' + index"
          :rules="{
            required: true,
            message: 'domain can not be null',
            trigger: 'blur'
          }"
          style=" margin-top: 5px;margin-bottom: 5px"
        >
          <el-col :span="1" />
          <el-col :span="5"><el-input v-model="plugin.plugin" /></el-col>
          <el-col :span="15"><el-input v-model="plugin.config" /></el-col>
          <el-col :span="3" />
        </el-row>
      </el-card>
    </el-space>
  </el-form>
</template>

<style scoped>
.el-col-first {
  margin-right: -20px;
  margin-left: 20px;
  border-radius: 4px;
}
</style>
