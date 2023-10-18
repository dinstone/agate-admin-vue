<script setup lang="ts">
import { Form, FormSchema } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch } from 'vue'
import { GatewayType } from '@/api/agate/types'
import { useI18n } from '@/hooks/web/useI18n'
import { useValidator } from '@/hooks/web/useValidator'
import { getClusters } from '@/api/agate/gateway'

const { t } = useI18n()
const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<GatewayType>>,
    default: () => null
  }
})

const { formRegister, formMethods } = useForm()
const { setValues, getFormData, getElFormExpose } = formMethods

const schema = reactive<FormSchema[]>([
  {
    field: 'cluster',
    label: t('集群'),
    component: 'Select',
    componentProps: {
      props: {
        label: 'name',
        value: 'code'
      }
    },
    optionApi: async () => {
      const res = await getClusters()
      return res.data
    },
    formItemProps: {
      rules: [required()]
    },
    colProps: {
      span: 24
    }
  },
  {
    field: 'name',
    label: t('网关'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'port',
    label: t('端口'),
    component: 'InputNumber',
    componentProps: {
      controlsPosition: 'right'
    },
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'remark',
    label: t('备注'),
    component: 'Input',
    componentProps: {
      type: 'textarea',
      rows: 2
    },
    colProps: {
      span: 24
    }
  },
  {
    field: 'serverConfig',
    label: t('服务端配置'),
    component: 'Input',
    componentProps: {
      type: 'textarea',
      rows: 2
    },
    colProps: {
      span: 24
    }
  },
  {
    field: 'clientConfig',
    label: t('客户端配置'),
    component: 'Input',
    componentProps: {
      type: 'textarea',
      rows: 2
    },
    colProps: {
      span: 24
    }
  }
])

const rules = reactive({
  cluster: [required()],
  name: [required()],
  port: [required()]
})

const submit = async () => {
  const elForm = await getElFormExpose()
  const valid = await elForm?.validate().catch((err) => {
    console.log(err)
  })
  if (valid) {
    const formData = await getFormData()
    return formData
  }
}

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    setValues(currentRow)
  },
  {
    deep: true,
    immediate: true
  }
)

defineExpose({
  submit
})
</script>

<template>
  <Form :rules="rules" @register="formRegister" :schema="schema" />
</template>
