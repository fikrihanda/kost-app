import { resolve } from 'path'
import { constructURL, merge, parse, download, isValidURL } from 'google-fonts-helper'
import { defineNuxtModule, useLogger } from '@nuxt/kit'

const CONFIG_KEY = 'googleFonts'

const logger = useLogger('google-fonts')

export default defineNuxtModule({
  meta: {
    name: '@nuxtjs/google-fonts',
    configKey: CONFIG_KEY,
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  async setup(moduleOptions, nuxt) {
    const defaults = {
      families: {},
      display: null,
      subsets: [],
      text: null,
      prefetch: true,
      preconnect: true,
      preload: false,
      useStylesheet: false,
      download: true,
      base64: false,
      inject: true,
      overwriting: false,
      outputDir: nuxt.options.dir.assets,
      stylePath: 'css/fonts.css',
      fontsDir: 'fonts',
      fontsPath: '~/assets/fonts'
    }

    const options = {
      ...defaults,
      ...moduleOptions,
      ...nuxt.options['google-fonts'],
      ...nuxt.options[CONFIG_KEY],
    }

    if (!options.display && !options.preload) {
      options.display = 'swap'
    }

    const fontsParsed = (nuxt.options.app.head.link || []).filter(link => isValidURL(link.href)).map(link => parse(link.href))

    const url = constructURL(fontsParsed.length ? merge(options, ...fontsParsed) : options)

    if (!url) {
      logger.warn('No provided fonts.')
      return
    }

    nuxt.options.app.head.link = (nuxt.options.app.head.link || []).filter(link => !isValidURL(link.href))

    if (options.download) {
      const outputDir = nuxt.resolver ? nuxt.resolver.resolveAlias(options.outputDir) : nuxt.options.alias[options.outputDir] || options.outputDir
      const downloader = download(url, {
        base64: options.base64,
        overwriting: options.overwriting,
        outputDir,
        stylePath: options.stylePath,
        fontsDir: options.fontsDir,
        fontsPath: options.fontsPath
      })
      try {
        await downloader.execute()
        if (options.inject) {
          nuxt.options.css.unshift(resolve(outputDir, options.stylePath))
        }
      } catch (e) {
        logger.error(e)
      }
      return
    }

    if (options.prefetch) {
      nuxt.options.app.head.link.push({
        rel: 'dns-prefetch',
        href: 'https://fonts.gstatic.com/'
      })
    }

    if (options.preconnect) {
      nuxt.options.app.head.link.push({
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com/',
        crossorigin: 'anonymous'
      }, {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com/'
      })

    }

    if (options.preload) {
      nuxt.options.app.head.link.push({
        rel: 'preload',
        as: 'style',
        href: url
      })
    }

    if (options.useStylesheet) {
      nuxt.options.app.head.link.push({
        rel: 'stylesheet',
        href: url
      })
      return
    }

    nuxt.options.app.head.script = nuxt.options.app.head.script || []
    nuxt.options.app.head.script.push({
      'data-hid': 'gf-script',
      children: `(function(){var l=document.createElement('link');l.rel="stylesheet";l.href="${url}";document.querySelector("head").appendChild(l);})();`
    })
  }
})
