module.exports = {
  router: {
    middleware: [
      'page-init',
    ]
  },
  build: {
    //publicPath: 'https://d2q486kjf9cwwu.cloudfront.net/static/js/',
    testGa: false,
    payCode: 'pk_test_ymxnY3KoqRcjCEElfvFxPy1G',
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
    { src: '~plugins/ga.js', ssr: false }
  ],
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'swiper/dist/css/swiper.css',
  ],
  render: {
    resourceHints:false
  },
  performance: {
    prefetch: false
  }
}

//{ src: '~/plugins/vue-infinite-loading.js'}