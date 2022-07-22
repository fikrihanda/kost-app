<template>
  <div class="md:h-screen flex flex-col justify-center items-center px-6 pt-8">
    <nuxt-link
      to="/login"
      class="text-2xl font-semibold flex justify-center items-center mb-8 lg:mb-10"
    >
      <span class="self-center text-2xl font-bold whitespace-nowrap">
        Kost Application
      </span>
    </nuxt-link>
    <div class="bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0">
      <div class="p-6 sm:p-8 lg:p-16 space-y-8">
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-900">
          Sign in to platform
        </h2>
        <form
          action="#"
          class="mt-8 space-y-6"
          @submit.prevent="onSubmit"
        >
          <globals-input
            v-model="$v.username.$model"
            label="Your username"
            placeholder="Username"
            :errors="$v.username.$errors"
            :state="$validation.stateValid($v.username)"
            :icon="[ 'fas', 'user' ]"
          />
          <globals-input
            v-model="$v.password.$model"
            label="Your password"
            placeholder="Password"
            type="password"
            :errors="$v.password.$errors"
            :state="$validation.stateValid($v.password)"
            :icon="[ 'fas', 'lock' ]"
          />
          <button
            type="submit"
            class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center"
          >
            Login to your account
          </button>
          <div class="text-sm font-medium text-gray-500">
            Not registered?
            <nuxt-link
              to="/register"
              class="text-teal-500 hover:underline"
            >
              Create account
            </nuxt-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { required, helpers } from '@vuelidate/validators'
import { useAuth } from '~~/stores/auth'

const auth = useAuth()
const router = useRouter()
const { $toaster, $validation } = useNuxtApp()

useHead({
  title: 'Login'
})
definePageMeta({
  layout: 'non-user',
  middleware: ['isnt-auth']
})

const { $v, form, rules } = useValidation({
  form: {
    username: '',
    password: ''
  },
  rules: {
    username: {
      required: helpers.withMessage('Username must not empty', required)
    },
    password: {
      required: helpers.withMessage('Password must not empty', required)
    }
  }
})

onBeforeUnmount(() => {
  form.username = ''
  form.password = ''
  $v.value.$reset()
})

const onSubmit = async () => {
  const { value: v } = $v
  v.$touch()
  if (v.$invalid) {
    return
  }
  try {
    await auth.login(form)
    $toaster({
      type: 'success',
      message: 'Berhasil login di website kami'
    })
    router.push('/')
  } catch (err) {
    $toaster({
      type: 'danger',
      message: err?.data?.message || err.message
    })
  }
}
</script>
