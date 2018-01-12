const resolve = require('path').resolve

module.exports = {
  cache: {
    max: 1000,
    maxAge: 900000
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'laravel',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js project'}
    ],
    script: [
      {src: 'https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {href: 'https://at.alicdn.com/t/font_248424_8m9cczp6jsbutyb9.css', rel: 'stylesheet', type: 'text/css'},
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},

  plugins: [
    // ssr: false to only include it on client-side
    {src: '~/plugins/vue-awesome-swiper', ssr: false},
    {src: '~/plugins/axios'},
    {src: '~/util/filter'},
    {src: '~/util/globalComponent'}
  ],
  css: [
    'swiper/dist/css/swiper.css',
    '~/css/pagination.css',
    'assets/css/main.css'
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'moment'],
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      // if (ctx.dev && ctx.isClient) {
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })
      // }
      // 添加cur文件支持
      config.module.rules.push({
        test: /\.(cur)(\?.+)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000, // 10KO
          name: 'img/[name].[hash].[ext]'
        }
      })
    }
  }
}
