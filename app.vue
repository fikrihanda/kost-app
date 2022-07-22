<template>
  <nuxt-layout>
    <client-only>
      <nuxt-page />
    </client-only>
    <teleport to="body">
      <globals-toaster-group />
    </teleport>
  </nuxt-layout>
</template>
