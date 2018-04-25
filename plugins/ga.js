const nuxtConfig = require('../nuxt.config');



export default ({ app }) => {


  // console.log(app.router.options);
  // window.app = app;
  //检测线上环境
  if (process.env.NODE_ENV !== 'production' && !nuxtConfig.build.publicPath) {
    //测试环境支付key
    window.fb_code = "pk_test_ymxnY3KoqRcjCEElfvFxPy1G"
    return;
  }else{
    //线上环境支付key
    window.fb_code = "pk_live_mRSdUvgwE4pZo2IVofL4cVch"
  }

  //添加google统计代码
  var scriptArr = [
    'https://www.googletagmanager.com/gtag/js?id=UA-107010673-1',
    'https://www.google-analytics.com/ga.js?id=UA-107010673-1'
  ]
  for(var i=0;i<scriptArr.length;i++){
    var gaScript = document.createElement('script');
    gaScript.async=1;
    gaScript.src=scriptArr[i];
    document.body.appendChild(gaScript);
  }

  //添加默认数据
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)};
  gtag('js', new Date());
  gtag('config', 'UA-107010673-1');


  // ga('create', 'UA-XXXXXXXX-X', 'auto');

  // app.router.afterEach((to, from) => {
  //   ga('set', 'page', to.fullPath)
  //   ga('send', 'pageview')
  // })
}