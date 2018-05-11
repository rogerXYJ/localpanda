<template>
	<div class="pay">
		<p>订单ID：652650022</p>
		<p>产品名称：鼠标</p>
		<p>价格：150元</p>
		<span class="btn" @click="btnPay">支付</span>
		<div>{{dataInfo}}</div>
		<div style="color:#f60;">{{dataInfo2}}</div>
	</div>
</template>
<script>
	//import wx from '~/assets/js/plugin/wx/jweixin-1.2.0.js';
	//require('~/assets/js/plugin/wx/jweixin-1.2.0.js');


	export default {
		name: 'wxPay',
		data() {
			var wxcode = this.$route.query.code;
			
			return {
				orderId:'',
				wxcode: wxcode,
				payData: '',
				dataInfo:'xxxxx' + wxcode,
				dataInfo2:'zzzz'
			}
		},
		components: {
			
		},
		methods: {
			wxInit(){
				console.log(123);
				// var wxScript = document.createElement('script');
				// wxScript.src = 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js';
				// document.body.appendChild(wxScript);

				

				// //异步请求
				// wxScript.onload = function(){
				// 	//配置文件
				// 	wx.config({
				// 			//debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				// 			"appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入     
				// 			"timeStamp":1395712654,         //时间戳，自1970年以来的秒数     
				// 			"nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串     
				// 			signature: '',// 必填，签名
				// 			jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
				// 	});
				// 	//加载完毕
				// 	wx.ready(function(){
				// 		//微信支付
				// 		wx.chooseWXPay({
				// 			"appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入     
				// 			"timeStamp":1395712654,         //时间戳，自1970年以来的秒数     
				// 			"nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串     
				// 			"package":"prepay_id=u802345jgfjsdfgsdg888",     
				// 			"signType":"MD5",         //微信签名方式：     
				// 			"paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89", //微信签名 
				// 			success: function (res) {

				// 				console.log(res);
				// 			// 支付成功后的回调函数
				// 			//weixin://dl/business/?ticket=
				// 			//微信外部支付
				// 			//https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx0919452768684493fb3d256c3320536213&package=2374636710&redirect_url=http%3a%2f%2.localpanda.com/aaa.php
				// 			}
				// 		});

				// 	});
				// }//请求结束

				//code用过或者没有code则从新获取
				var localWxCode = localStorage.getItem('localWxCode');
				if(this.wxcode==localWxCode || !this.wxcode){
					location.href = 'http://www.localpanda.cn/wx/getcode?link='+location.href.split('?')[0];
					return;
				}else{
					//本地存储code
					localStorage.setItem('localWxCode',this.wxcode);
				}


				var self = this;
				self.axios.get("https://www.localpanda.cn/api/payment/wxinfo/get?code=" + this.wxcode, {
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(function(response) {
					// console.log(response);
					

					var openData = response.data;

					//测试用
					self.dataInfo = JSON.stringify(openData);
					
					self.payData = {
						tradeType: 'JSAPI',
						objectId: '1105955013',
						amount: '1',
						openId: openData.openid,
						objectType:'ACTIVITY'
					};


				}, function(response) {});



				
			},
			onBridgeReady(data){
				WeixinJSBridge.invoke(
						'getBrandWCPayRequest', {
								"appId":data.appId,     //公众号名称，由商户传入     
								"timeStamp": data.timeStamp,   //时间戳，自1970年以来的秒数     
								"nonceStr": data.nonceStr, //随机串     
								"package": "prepay_id="+data.prepay_id,     
								"signType": data.signType,     //微信签名方式：     
								"paySign": data.paySign //微信签名 
						},
						function(res){     
							if(res.err_msg == "get_brand_wcpay_request:ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
						}
				); 
			},
			btnPay(){
				this.wxPay(this.payData);
			},
			wxPay(postData){
				var self = this;
				self.axios.post("https://www.localpanda.cn/api/payment/pay/wechat",JSON.stringify(postData), {
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					}
				}).then(function(response) {

					//测试用
					self.dataInfo2 = JSON.stringify(response.data);

					if (typeof WeixinJSBridge == "undefined"){
						if( document.addEventListener ){
								document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
						}else if (document.attachEvent){
								document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
								document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
						}
					}else{
						self.onBridgeReady(response.data);
					}

				}, function(response) {})
			}
		},
		mounted: function() {
			this.wxInit();

		}
	}
</script>
<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';
</style>
<style lang="scss" scoped>

	.pay{
		p{
			padding: 10px 20px;
			font-size: 14px;
		}
	}
	.btn{ 
		display: block;
		margin:20px auto 0;
		cursor: pointer;
		width:200px;
		height: 32px;
		line-height: 32px;
		text-align: center;
		color:#fff;
		background-color:#f90;
	}

</style>