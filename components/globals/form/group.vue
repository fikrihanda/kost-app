<template>
  <div :class="[ 'form-group', stateClass ]">
    <label
      :for="checkLabelFor"
      class="form-label"
    >
      {{ label }}
    </label>
    <slot :label-for="checkLabelFor" />
  </div>
</template>

<script setup>
import { isEmpty, isNull } from '#lodash'
import { faker } from '@faker-js/faker'

const props = defineProps({
  label: {
    type: String,
    default() {
      return ''
    }
  },
  labelFor: {
    type: String,
    default() {
      return ''
    }
  },
  state: {
    type: Boolean,
    default() {
      return null
    }
  }
})

const checkLabelFor = computed(() => {
  if (isEmpty(props.labelFor)) {
    return faker.datatype.uuid()
  }
  return props.labelFor
})

const stateClass = computed(() => {
  if (isNull(props.state)) return ''
  return props.state ? 'success' : 'danger'
})
</script>

<style lang="scss">
.form-group {
  @apply relative;

  &.success {
    .form-label {
      @apply text-green-700;
    }

    .form-input {
      @apply bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500;
    }

    .form-message {
      @apply text-green-700;
    }

    .form-icon {
      @apply text-green-500;
    }
  }

  &.danger {
    .form-label {
      @apply text-red-700;
    }

    .form-input {
      @apply bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500;
    }

    .form-message {
      @apply text-red-700;
    }

    .form-icon {
      @apply text-red-500;
    }
  }
}

.form-label {
  @apply text-sm font-medium text-gray-900 block mb-2;
}
</style>
