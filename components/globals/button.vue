<template>
  <button
    :class="[ 'btn', variant ]"
    :type="type"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default () {
      return ''
    }
  },
  type: {
    type: String,
    default () {
      return 'button'
    }
  },
  size: {
    type: String,
    default () {
      return ''
    }
  }
})
</script>

<style lang="scss">
.btn {
  @apply inline-block
    text-center
    align-middle
    select-none
    font-normal
    rounded-lg
    px-3
    py-1.5
    bg-gray-700
    text-white
    hover:bg-gray-800
    focus:ring-4
    focus:outline-none
    focus:ring-gray-300;

  &.success {
    @apply bg-green-700 hover:bg-green-800 focus:ring-green-300;
  }
  &.warning {
    @apply bg-orange-700 hover:bg-orange-800 focus:ring-orange-300;
  }
  &.danger {
    @apply bg-red-700 hover:bg-red-800 focus:ring-red-300;
  }
  &.info {
    @apply bg-blue-700 hover:bg-blue-800 focus:ring-blue-300;
  }
  &.primary {
    @apply bg-cyan-700 hover:bg-cyan-800 focus:ring-cyan-300;
  }
}
</style>
