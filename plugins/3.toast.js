import { isEmpty, isString } from '#lodash'
import { useToaster } from '~/stores/toaster'

export default defineNuxtPlugin(() => {
  const toaster = useToaster()
  return {
    provide: {
      toaster: (message) => {
        let stateMsg = {}
        if (isEmpty(message)) return
        if (isString(message)) {
          stateMsg = {
            type: 'default',
            message
          }
        } else {
          stateMsg = {
            ...message
          }
        }
        toaster.addMessage(stateMsg)
      }
    }
  }
})
