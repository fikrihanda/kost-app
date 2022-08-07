import { isEmpty } from '#lodash'

class Fetcher {
  baseUrl = ref('/')
  headers = reactive({})
  interceptors = reactive({
    onRequest: ref([]),
    onRequestError: ref([]),
    onResponse: ref([]),
    onResponseError: ref([])
  })
  setHeaders(key, value) {
    this.headers[key.toLowerCase()] = value
  }
  setToken(token, type = 'Bearer') {
    const value =  !token ? null : (type ? type + ' ' : '') + token
    this.setHeaders('authorization', value)
  }
  onRequest(fn) {
    this.interceptors.onRequest.push(
      (context) => fn(context)
    )
  }
  onRequestError(fn) {
    this.interceptors.onRequestError.push(
      (context) => fn(context)
    )
  }
  onResponse(fn) {
    this.interceptors.onResponse.push(
      (context) => fn(context)
    )
  }
  onResponseError(fn) {
    this.interceptors.onResponseError.push(
      (context) => fn(context)
    )
  }
  created() {
    return $fetch.create({
      baseURL: this.baseUrl.value,
      onRequest: (ctx) => {
        this.interceptors.onRequest.forEach(onReq => onReq(ctx))
      },
      onRequestError: (ctx) => {
        this.interceptors.onRequestError.forEach(onReq => onReq(ctx))
      },
      onResponse: (ctx) => {
        this.interceptors.onResponse.forEach(onReq => onReq(ctx))
      },
      onResponseError: (ctx) => {
        this.interceptors.onResponseError.forEach(onReq => onReq(ctx))
      }
    })
  }
  uses(url, opts) {
    const options = {
      headers: {
        ...this.headers
      },
      ...opts
    }
    let newUrl = url

    if (!isEmpty(options.query)) {
      newUrl = url + '?' + new URLSearchParams(options.query)
    }

    return this.created()(newUrl, options)
  }
}

export default new Fetcher()
