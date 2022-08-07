<template>
  <teleport to="body">
    <div
      v-if="dataModelValue"
      class="modal"
    >
      <div :class="[ 'modal-dialog', size ]">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header">
              <h3 class="modal-title">
                {{ title }}
              </h3>
              <button
                type="button"
                class="modal-close"
                @click="dataModelValue = false"
              >
                <slot name="close-icon">
                  <fa-layers class="w-6 h-6">
                    <fa :icon="[ 'fas', 'xmark' ]" />
                  </fa-layers>
                </slot>
              </button>
            </slot>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div
            v-if="!hideFooter"
            class="modal-footer"
          >
            <slot name="footer">
              <globals-button
                type="button"
                variant="primary"
              >
                Ok
              </globals-button>
              <globals-button
                type="button"
                @click="dataModelValue = false"
              >
                Cancel
              </globals-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="dataModelValue"
      class="modal-backdrop"
    />
  </teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default () {
      return false
    }
  },
  title: {
    type: String,
    default () {
      return ''
    }
  },
  size: {
    type: String,
    default () {
      return 'md'
    }
  },
  hideFooter: {
    type: Boolean,
    default () {
      return false
    }
  }
})

const emitModelValue = defineEmits(['update:modelValue'])
const dataModelValue = useVModel(props, 'modelValue', emitModelValue)
</script>

<style lang="scss">
.modal {
  @apply fixed inset-0 w-full h-full outline-0 overflow-hidden z-[1072];
}
.modal-dialog {
  @apply relative w-auto pointer-events-none m-[0.5rem] sm:my-[1.75rem] sm:max-w-lg sm:mx-auto;
  &.md {
    @apply sm:max-w-lg;
  }
  &.sm {
    @apply sm:max-w-md;
  }
  &.lg {
    @apply sm:max-w-4xl;
  }
  &.xl {
    @apply sm:max-w-7xl;
  }
}
.modal-content {
  @apply relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-lg outline-0;
}
.modal-header {
  @apply flex justify-between items-center p-4 rounded-t border-b;
}
.modal-title {
  @apply text-xl font-medium text-gray-900;
}
.modal-close {
  @apply text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center;
}
.modal-body {
  @apply p-4;
}
.modal-footer {
  @apply flex items-center p-4 space-x-2 rounded-b border-t border-gray-200;
}
.modal-backdrop {
  @apply bg-gray-900 bg-opacity-50 fixed inset-0 z-[1071];
}
</style>
