import { useAuth } from '~/stores/auth'
import { isEmpty } from '#lodash'

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuth()
  const router = useRouter()
  if (!isEmpty(auth.getToken)) {
    router.push('/')
  }
})
