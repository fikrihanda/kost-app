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
  return { $v, form, rules }
}
