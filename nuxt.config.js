const StoryblokClient = require('storyblok-js-client')
const bodyParser = require('body-parser')

const env = {
  mode: process.env.MODE || 'universal',
  StoryblokToken: process.env.STORYBLOCK_TOKEN || 'kKYPayxatVZ2o5KgaeM2MAtt',
  StoryblokApiToken: process.env.STORYBLOCK_API_TOKEN || 'DOka2ldpENvRmZHFHjghnwtt-46029-jG1d37ZjMUFxcqZGQq1L',
  fbDatabaseUrl: process.env.FB_DATABASE_URL || 'https://paymxt-com.firebaseio.com/',
  fbAPIKey: 'AIzaSyCzChegtHjQsvfkT8VBLJ6sModIFkAIwqQ',
  mixpanel: process.env.MIXPANEL || '7a5a3dacddd4b607e36557716c5796ee',
  cdnPublicPath: process.env.CDN_PUBLIC_PATH || '/_nuxt/',
  googleAnalytics: process.env.GOOGLE_ANALYTICS || 'UA-130925743-1',
  mapboxKey: process.env.MAPBOX_KEY,

  linkexchangeRecipientAddress: process.env.LINKEXCHANGE_RECIPIENT_ADDRESS || '0x65bCF0A60B3974931a4459c32ef4043262bc370c',
  linkexchangeTillDate: process.env.LINKEXCHANGE_TILL_DATE || '5/31/2018',
  linkexchangeWhitelistAddress: process.env.LINKEXCHANGE_WHITELIST_ADDRESS || '0x65bCF0A60B3974931a4459c32ef4043262bc370c'
}

// Original token!!! Change to your Storyblok preview token
// const StoryblokToken = 'qQTqOxTlxSrQiW7f9FANDwtt'

module.exports = {
  mode: 'universal',

  env: {
    fbDatabaseUrl: env.fbDatabaseUrl,
    fbAPIKey: env.fbAPIKey,
    mixpanel: env.mixpanel
  },

  modules: [
    ['storyblok-nuxt', { accessToken: env.StoryblokToken, cacheProvider: 'memory' }],
    ['bootstrap-vue/nuxt'],
    ['@nuxtjs/axios']
  ],

  axios: {
    // baseURL: process.env.BASE_URL || 'https://paymxt-com.firebaseio.com/',
    baseURL: 'https://paymxt-com.firebaseio.com/',
    // setToken: 'AIzaSyCzChegtHjQsvfkT8VBLJ6sModIFkAIwqQ',
    credentials: false
  },

  vendor: [
    'mixpanel-browser'
  ],

  plugins: [
    { src: '~/plugins/mixpanel', ssr: false },
    { src: '~/plugins/components' },
    { src: '~/plugins/filters' },
    { src: '~/plugins/vuelidate' }
  ],

  router: {
    middleware: ['languageDetection', 'log']
  },

  serverMiddleware: [ bodyParser.json(), '~/api' ],

  generate: {
    routes () {
      let routes = []

      const StoryblokClientInstance = new StoryblokClient({
        accessToken: env.StoryblokToken
      })

      return StoryblokClientInstance.get('cdn/links')
        .then((res) => {
          for (i in res.data.links) {
            routes.push({
              route: '/' + res.data.links[i].slug
            })
          }

          return routes
        })
    }
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'Paymxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Storyblok project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.9/css/all.css' },
      // { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i' }
    ]
  },

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  /*
  ** Build configuration
  */
  build: {
    optimization: {
      splitChunks: {
        chunks: 'async'
      }
    },
    splitChunks: {
      pages: false,
      vendor: true,
      commons: true,
      runtime: true,
      layouts: false
    },
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
