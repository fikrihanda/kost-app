export default defineNuxtPlugin(() => {
  return {
    provide: {
      validation: {
        stateValid(v$ = {}) {
          if (v$?.$dirty) {
            return !v$?.$error
          }
          return null
        }
      }
    }
  }
})
