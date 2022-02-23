export default {
    head: {
        title: 'Animations',
        htmlAttrs: {
            lang: 'ru'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    css: [
        '@/assets/scss/style.scss',
        '@/assets/scss/titles.scss',
    ],
    plugins: ['@/plugins/clientHook.client.js'],
    components: true,
    build:{},
    buildModules: [],
    modules: ['@nuxtjs/axios','@nuxtjs/style-resources'],
    styleResources: {
        scss: [
            '@assets/scss/variables.scss',
            '@assets/scss/style.scss',
            '@assets/scss/titles.scss',
            '@assets/scss/transitions.scss',
        ]
    },
    axios:{
        baseUrl: "https://fakestoreapi.com"
    },
    
    pageTransition: {
        name: 'page',
        mode: 'out-in',
      }
}