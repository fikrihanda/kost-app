import { faker } from '@faker-js/faker'
import { isEmpty } from '#lodash'

class Toaster {
  toasters = ref([])
  add(item) {
    this.toasters.value.push({
      ...item,
      id: faker.datatype.uuid()
    })
  }
  remove(item) {
    if (isEmpty(item)) return
    const findIdx = this.toasters.value.findIndex(m => m.id === item.id)
    if (findIdx === -1) return
    this.toasters.value.splice(findIdx, 1)
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const { toaster: toasterKey } = useKeys()
  nuxtApp.vueApp.provide(toasterKey, new Toaster())
})
