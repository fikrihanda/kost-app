<template>
  <div
    class="toaster"
    role="alert"
  >
    <fa-layers :class="[ 'toaster-icon', typeItem.classes ]">
      <fa :icon="typeItem.icon" />
    </fa-layers>
    <div class="toaster-msg">
      {{ messageItem }}
    </div>
    <button
      type="button"
      class="toaster-close"
      aria-label="Close"
      @click="onClose"
    >
      <fa
        :icon="[ 'fas', 'xmark' ]"
        class="w-5 h-5"
      />
    </button>
  </div>
</template>

<script setup>
import { watch, computed } from '#imports'
import { useInterval } from '@vueuse/core'

const { counter, pause } = useInterval(200, { controls: true })
const toaster = useToast()

const props = defineProps({
  item: {
    type: Object,
    default() {
      return {}
    }
  }
})

const typeItem = computed(() => {
  const { item: { type } } = props
  switch (type) {
    case 'success':
      return { icon: ['fas', 'check'], classes: type }
    case 'danger':
      return { icon: ['fas', 'xmark'], classes: type }
    case 'warning':
      return { icon: ['fas', 'circle-exclamation'], classes: type }
    case 'info':
      return { icon: ['fas', 'fire'], classes: type }
    default:
      return { icon: ['fas', 'clock'], classes: '' }
  }
})

const messageItem = computed(() => {
  const { item: { message } } = props
  return message
})

const onClose = () => {
  pause()
  toaster.remove(props.item)
}


watch(counter, (val) => {
  if (val === 10) {
    pause()
    toaster.remove(props.item)
  }
})
</script>

<style lang="scss">
.toaster {
  @apply flex items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 ;
}

.toaster-icon {
  @apply inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-gray-500 bg-gray-100 rounded-lg;

  &.success {
    @apply text-green-500 bg-green-100;
  }

  &.danger {
    @apply text-red-500 bg-red-100;
  }

  &.warning {
    @apply text-orange-500 bg-orange-100;
  }

  &.info {
    @apply text-blue-500 bg-blue-100;
  }
}

.toaster-msg {
  @apply ml-3 text-sm font-normal;
}

.toaster-close {
  @apply ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8;
}
</style>
