<template>
  <globals-modal
    v-model="dataModelValue"
    title="Tambah Kategori Kost"
    size="lg"
  >
    <globals-form-group
      label="Nama Kategori"
      :state="stateValid($v.nama)"
    >
      <template #default="{ labelFor }">
        <globals-form-input
          :id="labelFor"
          v-model="$v.nama.$model"
          :errors="$v.nama.$errors"
          placeholder="Nama Kategori"
          name="nama_kategori"
        />
      </template>
    </globals-form-group>
    <template #footer>
      <globals-button @click="dataModelValue = false">
        Close
      </globals-button>
      <globals-button variant="primary">
        Save
      </globals-button>
    </template>
  </globals-modal>
</template>

<script setup>
import { helpers, required } from '@vuelidate/validators'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default () {
      return false
    }
  }
})

const { $v, form, rules, stateValid } = useValidation({
  form: {
    nama: ''
  },
  rules: {
    nama: {
      required: helpers.withMessage('Nama Kategori must not empty', required)
    }
  }
})

const emitModelValue = defineEmits(['update:modelValue'])
const dataModelValue = useVModel(props, 'modelValue', emitModelValue)
</script>
