module.exports = {
  router: {
    middleware: [
      'page-init',
    ]
  },
  build: {

      // publicPath: 'https://cloud.localpanda.com/static/js/',
      // testGa: true,
      // payCode: 'pk_live_mRSdUvgwE4pZo2IVofL4cVch',
      // paypalCode: 'production',

    
    extractCSS: {
      allChunks: true 
    },
    vendor: [
      'axios',
      'vue-lazyload',
      'element-ui',
      '~/assets/font/iconfont.js',
    ],
    
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
    { src: '~/plugins/element-ui.js', ssr: true },
    { src: '~plugins/ga.js', ssr: false },
    { src: '~/plugins/main.js', ssr: false }
  ],
  css: [
    '~/assets/scss/_main.scss',
    'element-ui/lib/theme-chalk/index.css',
    'swiper/dist/css/swiper.css'
  ],
  render: {
    resourceHints:false
  },
  performance: {
    prefetch: false
  }
}

//{ src: '~/plugins/vue-infinite-loading.js'}