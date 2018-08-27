<template>
	<div class="talk">
		<h2 class="talk_title">Talk To Localpanda</h2>
    <div class="talk_tip" v-if="!isWork()">
We respond within one hour during opening hours (Mon-Sun 9 am to 8 pm Beijing time). <br><br>
If it’s not our operating hours, please leave us your requests in the left “Advise Me” section. Our staff will reply ASAP.</div>
    <div class="talk_tip2" v-if="loadTime">
      <p>Due to internet connection problems, Online Chat is currently offline.<br><br>
You can contact us in the following ways:<br>
+86 (21) 8018-2090<br>
+1 (888) 930-8849 (US toll-free)<br>
service@localpanda.com</p>
    </div>
		<Loading :loadingStatus="loadingStatus"></Loading>
	</div>
</template>

<script>
if (process.browser) {
	require('~/assets/js/pages/talk.js')
};

import Loading from '~/components/Loading/Loading';
export default {

	name: 'talk',
	data () {
		let acitivityId=this.$route.query.acitivityId;
		
		return {
			acitivityId : acitivityId?acitivityId:'',
      loadingStatus:false,
      loadTime:false
		}
	},
	components: {
    Loading
  },
	methods: {
		addClass(num){
      var navLi = document.querySelectorAll('.nav_list li');
      for(var i=0;i<navLi.length;i++){
        var thisLi = navLi[i];
        if(num == i){
          thisLi.className = 'active';
        }else{
          thisLi.className = '';
        };
      };
    },
    getIframe(dom,className){
      var iframe = document.getElementsByTagName('iframe');
      for(var i=0;i<iframe.length;i++){
        var thisData = iframe[i].getAttribute('data-test-id');
        if(thisData=='ChatWidgetWindow-iframe'){
          return iframe[i];
        }
      }
      return false;
    },
    //得到标准时区的时间的函数
    getLocalTime(i) {
        //参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
        if (typeof i !== 'number') return;
        var d = new Date();
        //得到1970年一月一日到现在的秒数
        var len = d.getTime();
        //本地时间与GMT时间的时间偏移差
        var offset = d.getTimezoneOffset() * 60000;
        //得到现在的格林尼治时间
        var utcTime = len + offset;
        return new Date(utcTime + 3600000 * i);
    },
    isWork(){
      //获取东八区时区
      var nowDate = this.getLocalTime(8),
        nowHour = nowDate.getHours();
      if(nowHour>=9 && nowHour<20){
        return true;
      };
      return false;
    },
    loadDesk(){
      var that = this;
      var allTime = 0;
      this.webWidgetTimer = setInterval(function(){
        var webWidget = that.getIframe();
        if(webWidget && webWidget.contentWindow.document.querySelector('.meshim_widget_components_ChatWindow.large')){
          that.loadingStatus = false;
					window.clearInterval(that.webWidgetTimer);

					var iframeDocument = webWidget.contentWindow.document;

					var style = document.createElement('style'), 
						str = '.meshim_widget_components_ChatWindow.large{display:block!important;right:auto!important;bottom:auto!important;position: relative!important;}.cwp_large{width:100%!important;height:500px!important;}.title_bar .icons{display:none!important;}.title_bar{display:none!important;}.profile_avatar{box-shadow: 0px 0 2px rgba(0,0,0,0.2)!important;}.meshim_widget_components_chatWindow_ChatPanel .container,.meshim_widget_components_chatWindow_PreChatOfflineForm .container{border:none!important;}.textarea{height:100px!important;}';
						style.type="text/css";
						if(style.styleSheet){         //ie下
						style.styleSheet.cssText = str;
						} else {
						style.innerHTML = str; 
						}
					iframeDocument.querySelector('body').appendChild(style);
        }

        allTime+=200;
        if(allTime>=10000){
          that.loadTime = true;
          that.loadingStatus = false;
          window.clearInterval(that.webWidgetTimer);
        }
      },200);
    }
	},
	mounted: function() {


		//在线交谈昵称设置
		// window.zESettings = {
		// 	webWidget: {
		// 		talk: {
		// 			nickname: 'customer '+this.acitivityId
		// 		}
		// 	}
		// };

		//设置语言
		zE(function() {
			zE.setLocale('en_US');
		});
    //在线交谈
    
    if(this.isWork()){
      this.loadingStatus = true;
      this.loadDesk();
      document.body.className = document.body.className?document.body.className+' show_zendesk': 'show_zendesk';
    }else{
      var style = document.createElement('style');
      style.type="text/css";
      var cssText = '#launcher{width: 0% !important;height: 0% !important;left: -999px !important;}';
      if(style.styleSheet){         //ie下
        style.styleSheet.cssText = cssText;
      } else {
        style.innerHTML = cssText; 
      }
      document.querySelector('body').appendChild(style);
    }
		
	}
}
</script>
<style lang="scss">
.talk{
  position: absolute;
  left: 0;
  top: 30px;
  width: 100%;
	.talk_title{
		font-weight: bold;
		text-align: center;
    font-size: 18px;
	}
	.loaders{
    width: 100%;
    height: 30%;
    position: relative;
    left: auto;
    top:auto;
    margin-top: 2rem;
  }
  .talk_tip,.talk_tip2{
    width: 600px;
    margin: 30px auto 0;
    font-size: 14px;
    color: #333;
  }
}
.show_zendesk{
	padding-top: 80px;
  #launcher{
    width: 0% !important;
    height: 0% !important;
    left: -999px !important;
  }
  #webWidget{
    // left: 0 !important;
    // top: 200px !important;
    // bottom: none !important;
    // opacity: 1 !important;
    // display: block !important;
    // width: 100% !important;
    // border: none !important;
  }
	div[data-test-id="ChatWidgetWindow"]{
		position: relative!important;
		left: 50%!important;
		right: auto!important;
		bottom: auto!important;
		width: 600px!important;
		margin-left: -300px!important;
		opacity: 1!important;
		display: block!important;
		height: 500px!important;
	}
	iframe[data-test-id="ChatWidgetWindow-iframe"]{
		width: 100%!important;
		height: 100%!important;
	}
	.meshim_widget_components_ChatWindow{
		width: 100%!important;
	}
}
</style> 