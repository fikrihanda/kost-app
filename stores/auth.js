import { defineStore } from 'pinia'
import { isEmpty } from '#lodash'
import imageDefault from '~/assets/images/default-profile.jpg'

export const useAuth = defineStore('auth', {
  state: () => ({
    info: {},
    token: ''
  }),
  getters: {
    getInfo: state => state.info,
    getToken: state => state.token
  },
  actions: {
    async login (body) {
      const { fetcher } = useFetcher()
      try {
        const { token } = await fetcher.uses('/api/auth/login', {
          method: 'post',
          body
        })
        this.token = token
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },
    logout() {
      this.token = ''
    },
    async register (body) {
      try {
        const { fetcher } = useFetcher()
        await fetcher.uses('/api/auth/register', {
          method: 'post',
          body
        })
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async getAuthInfo () {
      try {
        const { fetcher } = useFetcher()
        const info = await fetcher.uses('/api/auth/info', {
          method: 'get'
        })
        if (isEmpty(info.photo_profile)) {
          info.photo_profile = imageDefault
        }
        this.info = info
        return Promise.resolve()
      } catch (err) {
        this.info = {}
        return Promise.reject(err)
      }
    }
  },
  persist: {
    key: 'token',
    paths: ['token']
  }
})
