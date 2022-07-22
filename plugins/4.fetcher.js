class Fetcher {
  constructor() {
    this.baseUrl = '/'
    this.defaults = {
      headers: {}
    }
    this.interceptors = {
      onRequest: [],
      onRequestError: [],
      onResponse: [],
      onResponseError: []
    }
  }
  setHeaders(name, value) {
    this.defaults.headers[name] = value
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
      baseURL: this.baseUrl,
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
      ...this.defaults,
      ...opts
    }
    return this.created()(url, options)
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      fetcher: new Fetcher()
    }
  }
})
