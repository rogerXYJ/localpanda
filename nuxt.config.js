//加载build配置信息，用于服务器端自动打包发布区分测试和线上环境。
const nuxtBuild = require('./nuxt.build');

const config = {
  router: {
    middleware: [
      'page-init',
    ]
  },
  build: {
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
};

//加入build配置信息
if(nuxtBuild){
  for(var key in nuxtBuild){
    config.build[key] = nuxtBuild[key];
  }
}

module.exports = config;
