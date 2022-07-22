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
          Create a Free Account
        </h2>
        <form
          action="#"
          class="mt-8 space-y-6"
          @submit.prevent="onSubmit"
        >
          <globals-input
            v-model="$v.username.$model"
            label="Your username"
            label-for="username"
            placeholder="Username"
            name="username"
            :errors="$v.username.$errors"
            :state="$validation.stateValid($v.username)"
          />
          <globals-input
            v-model="$v.password.$model"
            type="password"
            label="Your password"
            label-for="current-password"
            placeholder="Password"
            name="current-password"
            :errors="$v.password.$errors"
            :state="$validation.stateValid($v.password)"
          />
          <globals-input
            v-model="$v.repeat.$model"
            type="password"
            label="Confirm password"
            label-for="repeat"
            placeholder="Confirm Password"
            name="repeat"
            :errors="$v.repeat.$errors"
            :state="$validation.stateValid($v.repeat)"
          />
          <globals-input
            v-model="$v.code.$model"
            type="password"
            label="Admin code"
            label-for="one-time-code"
            placeholder="Admin code"
            name="one-time-code"
            :errors="$v.code.$errors"
            :state="$validation.stateValid($v.code)"
          />
          <button
            type="submit"
            class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center"
          >
            Create account
          </button>
          <div class="text-sm font-medium text-gray-500">
            Already have an account?
            <nuxt-link
              to="/login"
              class="text-teal-500 hover:underline"
            >
              Login here
            </nuxt-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { helpers, required, minLength, sameAs } from '@vuelidate/validators'
import { useAuth } from '~/stores/auth'

const auth = useAuth()
const config = useRuntimeConfig()
const { $toaster, $validation } = useNuxtApp()
const router = useRouter()

const equal = param => val => {
  return !helpers.req(val) || param === parseInt(val)
}

useHead({
  title: 'Register',
  middleware: ['isnt-auth']
})
definePageMeta({
  layout: 'non-user'
})

const { $v, form, rules } = useValidation({
  form: {
    username: '',
    password: '',
    repeat: '',
    code: ''
  },
  rules(frm) {
    return {
      username: {
        required: helpers.withMessage('Username must not empty', required)
      },
      password: {
        required: helpers.withMessage('Password must not empty', required),
        upperCase: helpers.withMessage('Password must contain uppercase', helpers.regex(/[A-Z]/)),
        digit: helpers.withMessage('Password must contain one digit', helpers.regex(/[0-9]/)),
        specialChar: helpers.withMessage('Password must contain special character', helpers.regex(/[#?!@$%^&*-]/)),
        minLength: helpers.withMessage(({ $params }) => `Password minim ${$params.min} in length`, minLength(8))
      },
      repeat: {
        sameAs: helpers.withMessage('Password must be identical', sameAs(frm.value.password))
      },
      code: {
        required: helpers.withMessage('Admin code must not empty', required),
        equal: helpers.withMessage('Admin code is wrong', equal(config.public.adminCode))
      }
    }
  }
})

onBeforeUnmount(() => {
  form.username = ''
  form.password = ''
  form.repeat = ''
  form.code = ''
  $v.value.$reset()
})

const onSubmit = async () => {
  const { value: v } = $v
  v.$touch()
  if (v.$invalid) {
    return
  }
  try {
    await auth.register({
      username: form.username,
      password: form.password
    })
    $toaster({
      type: 'success',
      message: 'Berhasil register di website kami'
    })
    router.push('/login')
  } catch (err) {
    $toaster({
      type: 'danger',
      message: err.data.message
    })
  }
}
</script>
