<template>
  <header class="bg-white border-b border-gray-200 fixed z-30 w-full">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button
            class="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
            @click="dataModelValue = !dataModelValue"
          >
            <fa-layers class="h-6 w-6 block">
              <fa
                :icon="[ 'fas', 'bars-staggered' ]"
              />
            </fa-layers>
          </button>
          <nuxt-link
            to="/"
            class="text-xl font-bold flex items-center lg:ml-2.5"
          >
            <span class="self-center whitespace-nowrap">
              Kost Application
            </span>
          </nuxt-link>
        </div>
        <div class="flex items-center">
          <globals-header-dropdown-img :item="getInfo" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuth } from '~/stores/auth'

const auth = useAuth()
const { getInfo } = auth

const props = defineProps({
   modelValue: {
    type: Boolean,
    default() {
      return false
    }
  }
})

const emitModelValue = defineEmits(['update:modelValue'])
const dataModelValue = useVModel(props, 'modelValue', emitModelValue)
</script>
