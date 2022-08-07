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
          <globals-form-group
            label="Your username"
            :state="stateValid($v.username)"
          >
            <template #default="{ labelFor }">
              <globals-form-input
                :id="labelFor"
                v-model="$v.username.$model"
                placeholder="Username"
                :icon="[ 'fas', 'user' ]"
                :errors="$v.username.$errors"
                name="username"
              />
            </template>
          </globals-form-group>

          <globals-form-group
            label="Your password"
            :state="stateValid($v.password)"
          >
            <template #default="{ labelFor }">
              <globals-form-input
                :id="labelFor"
                v-model="$v.password.$model"
                placeholder="Password"
                :icon="[ 'fas', 'lock' ]"
                :errors="$v.password.$errors"
                type="password"
                name="password"
              />
            </template>
          </globals-form-group>
          <globals-button
            type="submit"
            variant="primary"
          >
            Login to your account
          </globals-button>
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
const toaster = useToast()

useHead({
  title: 'Login'
})
definePageMeta({
  layout: 'non-user',
  middleware: ['isnt-auth']
})

const { $v, form, rules, stateValid } = useValidation({
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
    toaster.show({
      type: 'success',
      message: 'Berhasil login di website kami'
    })
    router.push('/')
  } catch (err) {
    toaster.show({
      type: 'danger',
      message: err?.data?.message || err.message
    })
  }
}
</script>
