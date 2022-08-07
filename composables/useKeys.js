const toastInjectKey = Symbol()
const fetcherInjectKey = Symbol()

export default function () {
  return {
    toaster: toastInjectKey,
    fetcher: fetcherInjectKey
  }
}
