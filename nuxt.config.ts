export default defineNuxtConfig({
  compatibilityDate: '2024-12-27',
  
  devtools: { enabled: true },
  
  ssr: true,

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}
    }
  },

  runtimeConfig: {
    public: {
      newsApiKey: process.env.NUXT_PUBLIC_NEWS_API_KEY,
      newsApiBaseUrl: process.env.NUXT_PUBLIC_NEWS_API_BASE_URL
    }
  },

  typescript: {
    strict: true,
    typeCheck: true
  },

  app: {
    head: {
      title: 'News Website',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Latest news from around the world' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  nitro: {
    compressPublicAssets: true,
    routeRules: {
      '/': { 
        swr: 300,
        cache: {
          maxAge: 300,
          staleMaxAge: 600
        }
      },
      '/news/**': { 
        swr: 600,
        cache: {
          maxAge: 600,
          staleMaxAge: 1200
        }
      }
    }
  }
})

