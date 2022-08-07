<template>
  <div class="relative">
    <kategori-kost-lists-pencaian
      v-model:nama="where.nama"
      v-model:modal-tambah="modalTambah"
    />
    <div class="overflow-x-auto min-h-[calc(100vh-223px-64px-58px)] sm:min-h-[calc(100vh-167px-64px-58px)] lg:min-h-[calc(100vh-167px-57px-57px)]">
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
                  Nama Kategori Kost
                </th>
                <th class="p-4" />
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-if="kategoriKost_lists.length === 0"
                class="hover:bg-gray-100"
              >
                <td
                  colspan="3"
                  class="p-4 whitespace-nowrap text-sm font-normal text-gray-500"
                >
                  Data Kosong
                </td>
              </tr>
              <tr
                v-for="(v) in kategoriKost_lists"
                v-else
                :key="v.id"
                class="hover:bg-gray-100"
              >
                <td class="p-4 w-4">
                  <input
                    type="checkbox"
                    class="bg-gray-50 text-cyan-600 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                  >
                </td>
                <td class="p-4 whitespace-nowrap text-base font-semibold text-gray-500">
                  {{ v.nama }}
                </td>
                <td class="p-4 whitespace-nowrap space-x-2">
                  <button class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                    <fa-layers class="h-6 w-6">
                      <fa :icon="[ 'fas', 'pen-to-square' ]" />
                    </fa-layers>
                    Edit Kost
                  </button>
                  <button class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                    <fa-layers class="h-6 w-6">
                      <fa :icon="[ 'fas', 'trash' ]" />
                    </fa-layers>
                    Hapus Kost
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
      a
    </div>
    <kategori-kost-modal-tambah v-model="modalTambah" />
  </div>
</template>

<script setup>
import { isEmpty } from 'lodash'
import { useKategoriKost } from '~/stores/kategori-kost'

useHead({
  title: 'Kategori Kost'
})

definePageMeta({
  middleware: ['is-auth']
})

const kategoriKost = useKategoriKost()
const modalTambah = ref(false)
const page = ref(1)
const perpage = ref(10)
const where = reactive({
  nama: ''
})

const kategoriKost_lists = computed(() => kategoriKost.getLists)
const kategoriKost_pagination = computed(() => kategoriKost.getPagination)

const onFecth = async () => {
  try {
    const w = {}
    if (!isEmpty(where.nama)) {
      w.nama = where.nama
    }
    await kategoriKost.getAll({
      ...w,
      page: page.value,
      perpage: perpage.value
    })
    return Promise.resolve()
  } catch(err) {
    return Promise.reject(err)
  }
}

const { pending, refresh } = await useAsyncData('kategori-kost-getall', () => onFecth(), {
  initialCache: false
})

watch(page, async () => await refresh())
watch(perpage, async () => await refresh())
watchDebounced(where, async () => await refresh(),  { debounce: 500, maxWait: 1000 })
</script>
