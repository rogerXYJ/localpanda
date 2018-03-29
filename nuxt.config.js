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
        'v-calendar',
        '~/assets/font/iconfont.js',
    ]
  },
  babel: {
    plugins: [['component', [{
      libraryName: 'element-ui',
      styleLibraryName: 'theme-chalk'
    },{
    	 libraryName: 'v-calendar',
      styleLibraryName: 'v-calendar'
    }]]]
  },
  plugins: [
    { src: '~/plugins/swiper.js', ssr: false },
    { src: '~/plugins/axios.js'},
    { src: '~/plugins/vue-lazyload.js', ssr: false },
    { src: '~/plugins/element-ui.js', ssr: false },
     { src: '~/plugins/calendar.js', ssr: false },
  ],
  css: [
    'swiper/dist/css/swiper.css',
    'v-calendar/lib/v-calendar.min.css'
  ],
}