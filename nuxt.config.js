import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Kost App'
    }
  },
  alias: {
    '#lodash': 'lodash-es'
  },
  css: [
    '@/assets/styles/app.css'
  ],
  plugins: [
    '~/other-plugins/pinia-persisted',
    '~/other-plugins/toaster'
  ],
  buildModules: [
    '@pinia/nuxt',
    '~/modules/google-fonts',
    '~/modules/fontawesome'
  ],
  modules: [
    '@vueuse/nuxt'
  ],
  build: {
    postcss: {
      postcssOptions: {
        syntax: 'postcss-scss',
        plugins: {
          'tailwindcss/nesting': 'postcss-nested',
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    }
  },
  googleFonts: {
    families: {
      Inter: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900]
      }
    },
    download: false,
    useStylesheet: true
  },
  fontawesome: {
    component: 'fa',
    addCss: true,
    suffix: false,
    icons: {
      solid: true,
      regular: true,
      brands: true
    }
  },
  runtimeConfig: {
    passwordKey: '7REZxSqeP4qgXznKZ5BJd2l7or0OyQ',
    public: {
      adminCode: 5324625
    }
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    }
  }
})
