// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',

    devtools: {enabled: true},

    modules: ['@nuxt/eslint', '@pinia/nuxt', 'nuxt-swiper', '@nuxt/icon'],

    icon: {
        mode: 'svg',
        customCollections: [
            {
                prefix: 'icons',
                dir: './assets/icons',
            },
        ],
    },

    css: ['~/assets/scss/main.scss'],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "~/assets/scss/shared/variables" as *;'
                }
            }
        }
    },

    runtimeConfig: {
        public: {
            apiBase: process.env.PROXY_URL,
        },
    },
})
