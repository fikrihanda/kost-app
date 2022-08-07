<template>
  <aside
    ref="rootElm"
    :class="[ 'menu-aside', props.open && 'open' ]"
  >
    <div class="relative border-r border-gray-200 bg-white h-full">
      <div class="pt-5 pb-5 overflow-y-auto max-h-full">
        <div class="px-3">
          <ul class="space-y-2">
            <li>
              <nuxt-link
                to="/"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
              >
                <fa-layers class="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75">
                  <fa :icon="[ 'fas', 'chart-pie' ]" />
                </fa-layers>
                <span class="ml-3">Dashboard</span>
              </nuxt-link>
            </li>
            <li>
              <button
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group w-full"
                @click="dropdownKategori = !dropdownKategori"
              >
                <fa-layers class="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75">
                  <fa :icon="[ 'fas', 'tag' ]" />
                </fa-layers>
                <span class="ml-3">Kategori</span>
                <fa-layers class="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75 ml-auto">
                  <fa :icon="[ 'fas', 'angle-down' ]" />
                </fa-layers>
              </button>
              <ul
                v-show="dropdownKategori"
                class="py-2"
              >
                <li>
                  <nuxt-link
                    to="/kategori/kost"
                    class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 pl-[2.75rem] hover:bg-gray-100 group"
                  >
                    <span>Kost</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link
                    to="/kategori/kamar"
                    class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 pl-[2.75rem] hover:bg-gray-100 group"
                  >
                    <span>Kamar</span>
                  </nuxt-link>
                </li>
              </ul>
            </li>
            <li>
              <nuxt-link
                to="/kost"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
              >
                <fa-layers class="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75">
                  <fa :icon="[ 'fas', 'house' ]" />
                </fa-layers>
                <span class="ml-3">Kost</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/kamar"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
              >
                <fa-layers class="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75">
                  <fa :icon="[ 'fas', 'bed' ]" />
                </fa-layers>
                <span class="ml-3">Kamar</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/orang"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
              >
                <fa-layers class="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75">
                  <fa :icon="[ 'fas', 'users' ]" />
                </fa-layers>
                <span class="ml-3">Orang</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default() {
      return ''
    }
  }
})

const rootElm = ref(null)
const dropdownKategori = ref(false)
const emites = defineEmits(['close', 'open'])

onMounted(() => {
  rootElm.value.addEventListener('transitionend', () => !props.open && emites('close'))
})

onBeforeUnmount(() => {
  rootElm.value.removeEventListener('transitionend', () => !props.open && emites('close'))
})
</script>

<style lang="scss">
.menu-aside {
  @apply fixed z-20 lg:h-[calc(100vh-57px)] h-[calc(100vh-65px)] transition-transform ease-in-out delay-100 w-64 translate-x-[-256px] lg:translate-x-0;

  &.open {
    @apply translate-x-0;
  }
}
</style>
