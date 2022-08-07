<template>
  <div class="absolute right-5 bottom-5 max-w-xs w-full overflow-hidden">
    <TransitionGroup name="toaster-item">
      <globals-toaster-item
        v-for="(v) in toasters"
        :key="v.id"
        :item="v"
      />
    </TransitionGroup>
  </div>
</template>

<script setup>
const { toasters } = useToast()
</script>

<style lang="scss">
.toaster-item-enter-active,
.toaster-item-leave-active {
  @apply transition duration-500 ease-in-out;
}

.toaster-item-enter-from,
.toaster-item-leave-to {
  @apply opacity-0 translate-x-[30px];
}
</style>
