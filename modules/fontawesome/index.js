import { resolve } from 'path'
import { addPluginTemplate, defineNuxtModule, useLogger } from '@nuxt/kit'

const logger = useLogger('fontawesome')

const defaults = {
  component: '',
  suffix: false,
  addCss: true,
  useLayers: true,
  useLayersText: true,
  icons: {},
  proIcons: {}
}

const faStyles = [
  'solid',
  'regular',
  'light',
  'duotone',
  'brands'
]

function validateIcons (icons) {
  for (const key in icons) {
    if (!faStyles.includes(key)) {
      logger.error(`Unsupported icons style '${key}', it will be removed`)
      delete icons[key]
    }
  }
}

export default defineNuxtModule({
  meta: {
    name: '@nuxtjs/fontawesome',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  async setup(moduleOptions, nuxt) {

    const options = {
      ...defaults,
      ...nuxt.options.fontawesome,
      ...moduleOptions
    }

    if (options.imports && this.options.dev) {
      logger.warn('The \'imports\' option is deprecated and will be removed in a future version. Use \'icons\' instead')
    }

    validateIcons(options.icons)
    validateIcons(options.proIcons)

    if (!options.component || options.suffix) {
      options.suffix = 'Icon'
    }

    if (!options.component) {
      options.component = 'FontAwesome'
    }

    if (options.addCss) {
      nuxt.options.css.unshift('@fortawesome/fontawesome-svg-core/styles.css')
    }

    addPluginTemplate({
      src: resolve(__dirname, 'plugins.ejs'),
      filename: 'fontawesome.js',
      options
    })

  }
})
