<template>
  <div>
    <button @click="onLogout">
      Logout
    </button>
  </div>
</template>

<script setup>
import { useAuth } from '~~/stores/auth'

const auth = useAuth()
const router = useRouter()

definePageMeta({
  middleware: ['is-auth']
})

const onLogout = async () => {
  auth.logout()
  router.push('/login')
}
</script>
