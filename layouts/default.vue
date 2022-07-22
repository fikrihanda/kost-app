<template>
  <div class="relative h-screen bg-gray-50">
    <globals-header
      ref="header"
      v-model="open"
    />
    <div class="lg:pt-[57px] pt-[65px]">
      <globals-aside
        ref="aside"
        :open="open"
        @close="backdrop = false"
      />
      <div :class="[ 'bg-gray-900 opacity-50 fixed inset-0 z-10 lg:hidden', !backdrop && 'hidden' ]" />
      <div class="lg:ml-[256px] transition-[margin] ease-in-out delay-100">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const open = ref(false)
const backdrop = ref(false)
const aside = ref(null)
const header = ref(null)

watch(open, (newVal) => {
  if (newVal) {backdrop.value = true}
})

onMounted(() => {
  onClickOutside(aside.value.$el, (e) => {
    if (aside.value.$el.contains(e.target)) return
    if (header.value.$el.contains(e.target)) return
    if (open.value) {
      open.value = false
    }
  })
})
</script>
