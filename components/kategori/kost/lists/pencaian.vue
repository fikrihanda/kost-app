<template>
  <div class="p-4 bg-white block border-b border-gray-200">
    <nav class="mb-5">
      <ol class="flex items-center space-x-1 md:space-x-2">
        <li>
          <nuxt-link
            to="/"
            class="text-gray-700 hover:text-gray-900 flex items-center"
          >
            <fa-layers class="w-5 h-5 mr-2.5">
              <fa :icon="[ 'fas', 'chart-pie' ]" />
            </fa-layers>
            Home
          </nuxt-link>
        </li>
        <li class="flex items-center">
          <fa-layers class="w-6 h-6 text-gray-400">
            <fa :icon="[ 'fas', 'angle-right' ]" />
          </fa-layers>
          <a
            class="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium"
            href="#"
          >
            Kategori
          </a>
        </li>
        <li class="flex items-center">
          <fa-layers class="w-6 h-6 text-gray-400">
            <fa :icon="[ 'fas', 'angle-right' ]" />
          </fa-layers>
          <span class="text-gray-400 ml-1 md:ml-2 font-medium text-sm">
            Kost
          </span>
        </li>
      </ol>
    </nav>
    <h1 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
      Kategori Kost
    </h1>
    <div class="block sm:flex items-center md:divide-x md:divide-gray-100">
      <form
        action="#"
        class="sm:pr-3 mb-4 sm:mb-0"
      >
        <div class="relative sm:w-64 xl:w-96">
          <globals-form-input
            v-model="dataNama"
            placeholder="Cari nama"
          />
        </div>
      </form>
      <div class="flex items-center sm:justify-end w-full">
        <div class="hidden md:flex pl-2 space-x-1">
          <a
            href="#"
            class="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
          >
            <fa-layers class="w-6 h-6">
              <fa :icon="[ 'fas', 'circle-exclamation' ]" />
            </fa-layers>
          </a>
        </div>
        <button
          class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
          @click="dataModalTambah = true"
        >
          <fa-layers class="h-6 w-6">
            <fa :icon="[ 'fas', 'plus' ]" />
          </fa-layers>
          Tambah Kategori Kost
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  nama: {
    type: String,
    default() {
      return ''
    }
  },
  modalTambah: {
    type: Boolean,
    default() {
      return false
    }
  }
})

const emits = defineEmits(['update:nama', 'update:kategori', 'update:modalTambah'])
const dataNama = useVModel(props, 'nama', emits)
const dataModalTambah = useVModel(props, 'modalTambah', emits)
</script>

