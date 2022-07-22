import { useAuth } from '~~/stores/auth'
import { isEmpty } from '#lodash'

export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuth()
  const { $fetcher } = useNuxtApp()
  if (!isEmpty(auth.getToken)) {
    try {
      $fetcher.setToken(auth.getToken)
      await auth.getAuthInfo()
    } catch (err) {
      $fetcher.setToken(null)
      auth.logout()
    }
  }
})
