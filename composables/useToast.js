import { isEmpty, isString } from '#lodash'

export default function () {
  const { toaster: toasterKey } = useKeys()
  const toaster = inject(toasterKey)
  const show = function(message) {
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
    toaster.add(stateMsg)
  }
  const remove = function(item) {
    toaster.remove(item)
  }
  return { toasters: toaster.toasters.value, show, remove }
}
