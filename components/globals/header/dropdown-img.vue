<template>
  <div>
    <button
      ref="buttonTem"
      class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
      @click="open = !open"
    >
      <img
        :src="props.item.photo_profile"
        alt="photo-profile"
        class="w-8 h-8 rounded-full"
      >
    </button>
    <div
      ref="dropdownTem"
      :class="[ 'w-56 z-30 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow', open ? 'show' : 'hidden' ]"
    >
      <div class="py-3 px-4">
        <span class="block text-sm text-gray-900">{{ namaLengkap }}</span>
      </div>
      <ul class="py-1">
        <li>
          <a
            href="#"
            class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            @click.prevent="onLogout"
          >
            Setting
          </a>
        </li>
        <li>
          <a
            href="#"
            class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            @click.prevent="onLogout"
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { isEmpty } from '#lodash'
import { createPopper } from '@popperjs/core'
import { useAuth } from '~/stores/auth'

const auth = useAuth()
const router = useRouter()

const open = ref(false)
const buttonTem = ref(null)
const dropdownTem = ref(null)
const popper = ref(null)

const props = defineProps({
  item: {
    type: Object,
    default() {
      return {}
    }
  }
})

const namaLengkap = computed(() => {
  const nama_belakang = isEmpty(props.item.nama_belakang) ? '' : ` ${props.item.nama_belakang}`
  return props.item.nama_depan + nama_belakang
})


onMounted(() => {
  popper.value = createPopper(buttonTem.value, dropdownTem.value, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10]
        },
      },
    ]
  })
})

watch(open, (current) => {
  if (current) {
    popper.value.setOptions((options) => {
      return {
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: 'eventListeners', enabled: true },
        ],
      }
    })
  } else {
    popper.value.setOptions((options) => {
      return {
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: 'eventListeners', enabled: false },
        ],
      }
    })
  }
})

onClickOutside(dropdownTem, (e) => {
  if (buttonTem.value.contains(e.target)) return
  if (open.value) {
    open.value = false
  }
})

const onLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>
