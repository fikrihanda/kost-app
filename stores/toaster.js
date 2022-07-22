import { defineStore } from 'pinia'
import { isEmpty } from 'lodash'
import { faker } from '@faker-js/faker'

export const useToaster = defineStore('toaster', {
  state: () => ({
    messages: []
  }),
  getters: {
    getMessages: state => state.messages
  },
  actions: {
    addMessage(message) {
      if (isEmpty(message)) return
      this.messages.push({
        ...message,
        id: faker.datatype.uuid()
      })
    },
    removeMessage(item) {
      if (isEmpty(item)) return
      const findIdx = this.messages.findIndex(m => m.id === item.id)
      if (findIdx === -1) return
      this.messages.splice(findIdx, 1)
    }
  }
})
