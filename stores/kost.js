import { defineStore } from 'pinia'

export const useKost = defineStore('kost', {
  state: () => ({
    info: {},
    lists: [],
    pagination: {}
  }),
  getters: {
    getInfo: state => state.info,
    getLists: state => state.lists,
    getPagination: state => state.pagination
  },
  actions: {
    async getAll(params) {
      try {
        const { fetcher } = useFetcher()
        const { lists, pagination } = await fetcher.uses('/api/kost', {
          method: 'get',
          query: params
        })
        this.lists = lists
        this.pagination = pagination
        return Promise.resolve()
      } catch(err) {
        return Promise.reject(err)
      }
    },
    async create(params) {
      try {
        const { fetcher } = useFetcher()
        await fetcher.uses('/api/kost', {
          method: 'post',
          body: params
        })
        return Promise.resolve()
      } catch(err) {
        return Promise.reject(err)
      }
    }
  }
})
