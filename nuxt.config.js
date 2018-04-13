module.exports = {
  router: {
    middleware: [
      'page-init',
    ]
  },
  build: {
  	publicPath: 'https://d2q486kjf9cwwu.cloudfront.net/static/js/',
    vendor: [
        'axios',
        'vue-lazyload',
        'element-ui',
        '~/assets/font/iconfont.js',
    ]
  },
  babel: {
    plugins: [['component', [{
      libraryName: 'element-ui',
      styleLibraryName: 'theme-chalk'
    }]]]
  },
  plugins: [
    { src: '~/plugins/swiper.js', ssr: false },
    { src: '~/plugins/axios.js'},
    { src: '~/plugins/vue-lazyload.js', ssr: false },
    { src: '~/plugins/element-ui.js', ssr: false },
    /*{ src: '~/plugins/vue-infinite-loading.js'}*/

  ],
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'swiper/dist/css/swiper.css',
  ],
}