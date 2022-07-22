<template>
  <div v-if="!isEmptyLabelFor">
    <label
      :for="labelFor"
      :class="[ 'form-label', stateClass ]"
    >
      {{ label }}
    </label>
    <input
      v-if="isEmptyIcon"
      :id="labelFor"
      ref="input"
      v-model="dataModelValue"
      v-bind="attributesEtc"
      :type="type"
      :class="[ 'form-input', stateClass ]"
      :placeholder="placeholder"
    >
    <div
      v-else
      class="relative"
    >
      <div class="flex absolute inset-y-0 left-0 items-center pl-4 pointer-events-none">
        <fa-layers :class="[ 'form-icon', stateClass ]">
          <fa
            :icon="icon"
          />
        </fa-layers>
      </div>
      <input
        :id="labelFor"
        ref="input"
        v-model="dataModelValue"
        v-bind="attributesEtc"
        :type="type"
        :class="[ 'form-input', 'with-icon', stateClass ]"
        :placeholder="placeholder"
      >
    </div>
    <div class="space-y-2">
      <template
        v-for="(v, i) in errorsMsg"
        :key="i"
      >
        <p
          :class="[ 'form-message danger', i === 0 && 'mt-2' ]"
        >
          <span>Oops!</span>
          {{ v }}
        </p>
      </template>
    </div>
  </div>
  <fieldset v-else>
    <legend
      tabindex="-1"
      :class="[ 'form-label', 'legend', stateClass ]"
      @click="onFocusInput"
    >
      {{ label }}
    </legend>
    <input
      v-if="isEmptyIcon"
      ref="input"
      v-model="dataModelValue"
      v-bind="attributesEtc"
      :type="type"
      :class="[ 'form-input', stateClass ]"
      :placeholder="placeholder"
    >
    <div
      v-else
      class="relative"
    >
      <div class="flex absolute inset-y-0 left-0 items-center pl-4 pointer-events-none">
        <fa-layers :class="[ 'form-icon', stateClass ]">
          <fa
            :icon="icon"
          />
        </fa-layers>
      </div>
      <input
        ref="input"
        v-model="dataModelValue"
        v-bind="attributesEtc"
        :type="type"
        :class="[ 'form-input', 'with-icon', stateClass ]"
        :placeholder="placeholder"
      >
    </div>
    <div class="space-y-2">
      <template
        v-for="(v, i) in errorsMsg"
        :key="i"
      >
        <p
          :class="[ 'form-message danger', i === 0 && 'mt-2' ]"
        >
          <span>Oops!</span>
          {{ v }}
        </p>
      </template>
    </div>
  </fieldset>
</template>

<script setup>
import { isEmpty, isNull } from '#lodash'

const props = defineProps({
  modelValue: {
    type: String,
    default() {
      return ''
    }
  },
  label: {
    type: String,
    default() {
      return ''
    }
  },
  type: {
    type: String,
    default() {
      return 'text'
    }
  },
  labelFor: {
    type: String,
    default() {
      return ''
    }
  },
  name: {
    type: String,
    default() {
      return ''
    }
  },
  errors: {
    type: Array,
    default() {
      return []
    }
  },
  state: {
    type: Boolean,
    default() {
      return null
    }
  },
  placeholder: {
    type: String,
    default() {
      return ''
    }
  },
  icon: {
    type: Array,
    default() {
      return null
    }
  }
})

const input = ref(null)

const isEmptyLabelFor = computed(() => {
  return isEmpty(props.labelFor)
})

const isEmptyIcon = computed(() => {
  return isEmpty(props.icon)
})

const attributesEtc = computed(() => {
  const attr = {}
  if (isEmpty(props.name)) {
    if (!isEmptyLabelFor.value) {
      attr.name = props.labelFor
    }
  } else {
    attr.name = props.name
  }

  if (props.type === 'password') {
    attr.autocomplete = 'on'
  }
  return attr
})

const errorsMsg = computed(() => {
  return props.errors.map(e => e.$message)
})

const stateClass = computed(() => {
  if (isNull(props.state)) return ''
  return props.state ? 'success' : 'danger'
})

const emitModelValue = defineEmits(['update:modelValue'])
const dataModelValue = useVModel(props, 'modelValue', emitModelValue)

const onFocusInput = () => {
  input.value.focus()
}
</script>

<style lang="scss">
.form-label {
  @apply text-sm font-medium text-gray-900 block mb-2;

  &.legend {
    @apply focus:outline-0;
  }

  &.success {
    @apply text-green-700;
  }

  &.danger {
    @apply text-red-700;
  }
}

.form-input {
  @apply bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:ring-cyan-600 focus:border-cyan-600;

  &.with-icon {
    @apply pl-10;
  }

  &.success {
    @apply bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500;
  }

  &.danger {
    @apply bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500;
  }
}

.form-message {
  @apply text-sm text-gray-900;

  span {
    @apply font-medium;
  }

  &.success {
    @apply text-green-700;
  }

  &.danger {
    @apply text-red-700;
  }
}

.form-icon {
  @apply w-4 h-4 text-gray-500;

  &.success {
    @apply text-green-500;
  }

  &.danger {
    @apply text-red-500;
  }
}
</style>
