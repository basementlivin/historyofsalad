import { repositoryName } from './slicemachine.config.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      title: 'History of Salad',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'History of Salad is a creative technology studio run by Erik Pedersen and Whitney Gilchrist in Asheville, NC. We specialize in design, web development, and SEO consulting.'
        },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'referrer', content: 'no-referrer-when-downgrade' },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://prismic.io'},
        { rel: 'preconnect', href: 'https://images.prismic.io/historyofsalad'},
      ]
    }
  },

  css: [
    '@/assets/scss/main.scss',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/scss/globals/reset";
            @import "@/assets/scss/globals/variables";
            @import "@/assets/scss/globals/mixins";
            @import "@/assets/scss/globals/typography";
            @import "@/assets/scss/globals/global";
            @import "breakpoint-sass/stylesheets/breakpoint";
            @import "@/assets/scss/globals/wrappers";
            @import "@/assets/scss/components/buttons";
          `
        }
      }
    }
  },

  modules: [
    "@nuxtjs/prismic",
    "nuxt-swiper",
    "nuxt-svgo",
    "nuxt-gtag"
  ],

  svgo: {
    autoImportPath: "~/assets/svg",
  },

  prismic: {
    endpoint: "historyofsalad",
    preview: "/api/preview",
    clientConfig: {
      routes: [
        {
          type: "page",
          uid: "home",
          path: "/",
        },
        {
          type: "page",
          path: "/:uid",
        },
        {
          type: "about",
          path: "/about",
        },
        {
          type: "contact",
          path: "/contact",
        },
        {
          type: "blog",
          path: "/articles",
        },
        {
          type: "blog_article",
          path: "/articles/:uid",
        }
      ]
    }
  },

  runtimeConfig: {
    gsapAuthToken: process.env.GSAP_AUTH_TOKEN,
  }
})