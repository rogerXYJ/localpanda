const nuxtConfig = require('../nuxt.config');



export default ({ app }) => {


  let NODE_ENV = process.env.NODE_ENV,
  buildData = nuxtConfig.build;

  //检测线上环境，或者 检测测试环境使用ga（在nuxt.config里配置在测试环境是否显示ga）
  if (NODE_ENV !== 'production' && !buildData.publicPath || NODE_ENV !== 'production' && !buildData.testGa) {
    //测试环境支付key
    window.fb_code = "pk_test_ymxnY3KoqRcjCEElfvFxPy1G"
    
    //防止ga报错，默认添加ga方法
    window.ga = function(){
      console.log('this is test! no ga code!');
    };
    //跳出，不走ga
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