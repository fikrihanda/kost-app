import useVuelidate from '@vuelidate/core'
import { isFunction } from '#lodash'

export default function (options) {
  let form, rules
  if (isFunction(options)) {
    const { form: formOpts, rules: rulesOpts } = options()
    form = formOpts
    rules = rulesOpts
  } else {
    form = reactive(options.form)
    rules = computed(() => {
      return isFunction(options.rules) ? options.rules(form) : options.rules
    })
  }
  const $v = useVuelidate(rules, form)
  const stateValid = (v$) => {
    if (v$?.$dirty) {
      return !v$?.$error
    }
    return null
  }
  return { $v, form, rules, stateValid }
}
