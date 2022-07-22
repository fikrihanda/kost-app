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
          <span class="text-gray-400 ml-1 md:ml-2 font-medium text-sm">
            Kost
          </span>
        </li>
      </ol>
    </nav>
    <h1 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
      Kost
    </h1>
    <div class="block sm:flex items-center md:divide-x md:divide-gray-100">
      <form
        action="#"
        class="sm:pr-3 mb-4 sm:mb-0"
      >
        <div class="relative sm:w-64 xl:w-96">
          <input
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Search"
          >
        </div>
      </form>
      <div class="flex items-center sm:justify-end w-full">
        <div class="hidden md:flex pl-2 space-x-1">
          <a
            href="#"
            class="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
          >
            <fa-layers class="w-6 h-6">
              <fa :icon="[ 'fas', 'gear' ]" />
            </fa-layers>
          </a>
          <a
            href="#"
            class="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
          >
            <fa-layers class="w-6 h-6">
              <fa :icon="[ 'fas', 'trash' ]" />
            </fa-layers>
          </a>
          <a
            href="#"
            class="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
          >
            <fa-layers class="w-6 h-6">
              <fa :icon="[ 'fas', 'circle-exclamation' ]" />
            </fa-layers>
          </a>
          <a
            href="#"
            class="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
          >
            <fa-layers class="w-6 h-6">
              <fa :icon="[ 'fas', 'ellipsis-vertical' ]" />
            </fa-layers>
          </a>
        </div>
        <button class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto">
          <fa-layers class="h-6 w-6">
            <fa :icon="[ 'fas', 'plus' ]" />
          </fa-layers>
          Tambah Kost
        </button>
      </div>
    </div>
  </div>
  <div>
    <div class="overflow-x-auto">
      <div class="align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden">
          <table class="table-fixed min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-100">
              <tr>
                <th class="p-4">
                  <input
                    type="checkbox"
                    class="bg-gray-50 text-cyan-600 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                  >
                </th>
                <th class="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Nama Kost
                </th>
                <th class="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Alamat
                </th>
                <th class="p-4" />
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
    a
  </div>
</template>

<script setup>
useHead({
  title: 'Kost'
})

definePageMeta({
  middleware: ['is-auth']
})
</script>
