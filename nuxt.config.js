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
    plugins: [],
    components: true,
    build:{},
    buildModules: [],
    modules: ['@nuxtjs/axios','@nuxtjs/style-resources'],
    styleResources: {
        scss: [
            '@assets/scss/style.scss',
            '@assets/scss/titles.scss',
            '@assets/scss/transitions.scss'
        ]
    },
    axios:{
        baseUrl: "https://fakestoreapi.com"
    },
    browserslist: [
        ">0.3%",
        "not ie 11",
        "not dead",
        "not op_mini all",
        "last 3 version",
        "Chrome >= 35",
        "Firefox >= 38",
        "Edge >= 10",
        "Explorer >= 10",
        "ie >= 10",
        "iOS >= 8",
        "Safari >= 8",
        "Android 2.3",
        "Android >= 4",
        "Opera >= 12"
      ],
    pageTransition: {
        name: 'page',
        mode: 'out-in',
      }
}