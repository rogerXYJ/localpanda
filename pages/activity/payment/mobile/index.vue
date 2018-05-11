<template>
	<div class="payNow">
		<div class="oderdetial">
			<div class="back"><i class="iconfont" @click="back">&#xe615;</i></div>
			<div class="head">Pay Now</div>
			<div class="payfordetail">
				<div class="headcommon">
					<div class="serviceform">
						<h3>{{opctions.activityInfo?opctions.activityInfo.title:''}}</h3>
						<div class="service clearfix">
							<div class="serviceTime">
								<p>{{opctions.startDate}}<span v-if="opctions.startTime">opctions.startTime</span></p>
							</div>
							<div class="servicePepole">
								<p v-if="opctions.adultNum==1&&opctions.childrenNum==0">1 Person</p>
								<p v-else>{{opctions.adultNum+opctions.childrenNum}} People</p>
							</div>
						</div>
					</div>
				</div>
				<div class="pic">
					<div class="adult clearfix">
						<div class="formula" v-if="opctions.childrenNum==0&&opctions.adultNum==1">{{getPriceMark(opctions.currency)}}{{returnFloat(opctions.averagePrice)}} x 1 Person</div>
						<div class="formula" v-else>{{getPriceMark(opctions.currency)}} {{returnFloat(opctions.averagePrice)}} x {{opctions.adultNum+opctions.childrenNum}} People </div>
						<div class="adultPic">{{getPriceMark(opctions.currency)}} {{returnFloat(cutXiaoNum(opctions.averagePrice*(opctions.adultNum+opctions.childrenNum),1))}}</div>
					</div>
					<div class="child" v-if="opctions.childDiscount">
						<b>- {{getPriceMark(opctions.currency)}}{{returnFloat(opctions.childDiscount)}}</b> for child(ren)
					</div>
					<div class="child" v-if="opctions.couponDiscount">
						<b>- {{getPriceMark(opctions.currency)}}{{returnFloat(opctions.couponDiscount)}}</b> for discount
					</div>

				</div>
				<div class="total clearfix">
					<div class="totle-title">Total ({{getPriceMark(opctions.currency,1)}})</div>
					
					<div class="totalPic">{{getPriceMark(opctions.currency)}}{{returnFloat(opctions.amount)}}</div>
					<div class="picRate" v-if="isWx">
						<select class="currency_type" id="currency_type" @change="changeCurrency" v-model="opctions.currency">
							<option value="USD">USD</option>
							<option value="CNY">CNY</option>
						</select>
						<span class="iconfont">&#xe666;</span>
					</div>
				</div>
				<div class="hint">
					<p v-if="logInHide">You ordered as a guest. To view your order details, go to the homepage, click "My Bookings" at the top of the page, and type in the name and email address for your reservation.</p>
					<p v-else>To view your order details, go to the homepage, click "My Bookings" at the top of the page.</p>

					<p>You can get a 100% refund up to {{refundTimeLimit}} hours before your trip.</p>
				</div>
			</div>
			<div class="btn">
				<button @click="pay">Pay</button>
			</div>
		</div>

		<Loading :loadingStatus="loadingStatus"></Loading>
	</div>

</template>

<script>
	if(process.browser) {
		require('~/assets/js/plugin/flexible.js')
		require('~/assets/js/pages/ga.js')
	}
	import { GetQueryString , getPriceMark } from '~/assets/js/plugin/utils.js'
	import api from '~/assets/js/plugin/api.js'
	import Vue from 'vue'
	import Loading from '~/components/Loading/Loading'

	export default {
		name: 'payNow',
		head() {
			return {
				script: [{
						src: 'https://checkout.stripe.com/checkout.js',
						type: 'text/javascript'
					},
					/*{
						src:'https://google-analytics.com/ga.js?id=UA-107010673-1',
						type: 'text/javascript'
					}*/
				]
			}
		},
		async asyncData({
			apiBasePath
		}) {
			return {
				apiBasePath: apiBasePath
			}
		},

		data() {
			var query = this.$route.query;
			return {
				urlQuery:query,
				wxcode: query.code,
				opctions: {
					averagePrice: 0,
					childrenNum: 0,
					adultNum: 0,
					amount: 0,
					couponDiscount: 0,
					currency:''
				},
				stripeHandler: "",
				orderId: '',
				logIn: '',
				email: '',
				token: '',
				tokenType: '',
				refundTimeLimit:"",
				logInHide:false,
				loadingStatus: false,
				rate: 6.3710,
				isWx : false
			}
		},
		components: {
			Loading
		},
		methods: {
			getPriceMark:getPriceMark,
			changeCurrency(e){
				var value = e.target.value;
				this.opctions.currency = value;
				

				this.changePrice(value);
				
			},
			changePrice(value){
				var priceAll = this.opctions.priceAll;
				if(value=='USD'){
					this.opctions.averagePrice = priceAll.averagePrice;
					this.opctions.amount = priceAll.amount;
				}else{
					this.opctions.averagePrice = priceAll.averagePrice*this.rate;
					this.opctions.amount = priceAll.amount*this.rate;
				}
			},
			back(){
				history.back()
			},
			cutXiaoNum(num, len) {
				var numStr = num.toString();
				if(len == null || len == undefined) {
					len = numStr.length;
				}
				var index = numStr.indexOf('.');
				if(index == -1) {
					index = numStr.length;
					numStr += ".0000000000000";
				} else {
					numStr += "0000000000000";
				}
				var newNum = numStr.substring(0, index + len + 1);
				return newNum;
			},
			round(val) {
				if(typeof val === 'number' && val % 1 === 0) {
					return val
				} else {
					return(parseFloat(this.cutXiaoNum(val, 1)) + 0.1).toFixed(1)

				}

			},
			returnFloat(value) {
				var value = Math.round(parseFloat(value) * 100) / 100;
				var xsd = value.toString().split(".");
				if(xsd.length == 1) {
					value = value.toString() + ".00";
					return value;
				}
				if(xsd.length > 1) {
					if(xsd[1].length < 2) {
						value = value.toString() + "0";
					}
					return value;
				}
			},
			getToken() {
				let that = this
				that.stripeHandler = StripeCheckout.configure({
					key: payCode,
					image: 'https://resource.localpanda.cn/static/icon/logo.png', // 显示在支付对话框的图片，可自己指定
					alipay: true, // 启用支付宝支付
					token: function(token) { // 用户填写完资料并且 Stripe 校验成功后的回调函数
						// 此时应该提交 token.id 到后台，比如 http://example.com/orders/1?stripeToken={token.id}
						that.loadingStatus = true;
						let obj = {
							amount: that.opctions.amount * 100,
							currency: "USD",
							objectId: that.orderId,
							token: token.id,
							email: token.email,
							tokenType: token.type,
							objectType: "ACTIVITY"
						}

						

						Vue.axios.post(that.apiBasePath + "payment/pay/stripe", JSON.stringify(obj), {
							headers: {
								'Content-Type': 'application/json; charset=UTF-8'
							}
						}).then(function(response) {
							var thisData = response.data;
							var msg = '';
							//成功
							if(response.status==200){
								var pageTracker = _gat._getTracker("UA-107010673-1");
								pageTracker._addTrans(that.orderId, "", that.opctions.amount, "", "", "", "", "");
								pageTracker._addItem(that.orderId, that.opctions.activityId, "", "", that.opctions.amount, "1");
								pageTracker._trackTrans();

								if(!thisData.succeed && thisData.errorMessage && !/Exception/.test(thisData.errorMessage)) {
									msg = thisData.errorMessage;
								}

							}
							//跳转
							window.location.href = "/payment/mobile/success?email="+that.email+"&orderId=" + that.orderId + '&amount=' + that.opctions.amount+'&succeed='+thisData.succeed+'&msg='+msg
							//
						}, function(response) {
							//请求失败跳转
							window.location.href = "/payment/mobile/success?email="+that.email+"&orderId=" + that.orderId + '&amount=' + that.opctions.amount+'&succeed=false'
						})
					}
				})
			},
			getInfo() {
				let that = this
				Vue.axios.get(this.apiBasePath + "activity/order/detail/" + that.orderId).then(function(res) {
					that.opctions = res.data;
					that.email = res.data.contactInfo.emailAddress;
					that.refundTimeLimit=res.data.activityInfo.refundTimeLimit*24
					// var orderInfo = localStorage.getItem('orderInfo') || {currency:"USD"};
					// that.opctions.currency = JSON.parse(orderInfo).currency;
					if(that.opctions.currency=='CNY'){
						that.opctions.currency = 'USD';
						that.opctions.amount /= that.rate;
						that.opctions.averagePrice /= that.rate;
					}
					that.opctions.priceAll = {
						amount:that.opctions.amount,
						averagePrice:that.opctions.averagePrice
					};
					

					if(that.urlQuery.payType=='CNY'){
						that.opctions.currency = 'CNY';
						that.changePrice('CNY');
					}else{
						that.opctions.currency = 'USD';
						that.changePrice('USD');
					}

					

				}, function(res) {})
			},
			pay() {
				let that = this;

				ga('gtag_UA_107010673_1.send', {
					hitType: 'event',
					eventCategory: 'Button',
					eventAction: 'Click',
					eventLabel: 'activity_pay',

				});


				if(this.opctions.currency=='CNY'){
					this.wxPay(this.payData);
					
					return;
				}

				that.stripeHandler.open({
					name: 'Local panda', // 收款方或商家名称，比如 Beansmile
					description: "", // 待支付商品的描述
					amount: that.opctions.amount * 100, // 支付金额，单位是“分”
					locale: 'en_US',
					closed: function() {

					}
				})
			},
			wxInit(){
				
				//code用过或者没有code则从新获取
				var localWxCode = localStorage.getItem('localWxCode');
				if(this.wxcode==localWxCode || !this.wxcode){
					location.href = 'http://www.localpanda.cn/wx/getcode?link='+encodeURIComponent(location.href.replace('code','nostr'));
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

					
					self.payData = {
						tradeType: 'JSAPI',
						objectId: self.orderId,//1105955013
						amount: self.opctions.amount * 100,//self.opctions.amount * 100
						openId: openData.openid,
						objectType:'ACTIVITY'
					};


				}, function(response) {});



				
			},
			onBridgeReady(data){
				var that = this;
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
							var thisData = {
								succeed : false
							};
							
							var msg = '';
							if(/ok/.test(res.err_msg)) {
								
								//成功
								var pageTracker = _gat._getTracker("UA-107010673-1");
									pageTracker._addTrans(that.orderId, "", that.opctions.amount, "", "", "", "", "");
									pageTracker._addItem(that.orderId, that.opctions.activityId, "", "", that.opctions.amount, "1");
									pageTracker._trackTrans();

									msg = 'ok';
									thisData.succeed = true;
							}else{
								msg = 'fail';
							}
							this.loadingStatus = false;
							//跳转
							window.location.href = "https://www.localpanda.com/payment/mobile/success?email="+that.email+"&orderId=" + that.orderId + '&amount=' + that.opctions.amount+'&succeed='+thisData.succeed+'&msg='+msg+'&payType=CNY';
						}
				); 
			},
			
			wxPay(postData){
				var self = this;
				this.loadingStatus = true;
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
		created: function() {

		},
		mounted: function() {
			this.orderId = GetQueryString("objectId")
			this.getInfo()
			this.getToken()

			var ua = window.navigator.userAgent.toLowerCase();
			this.isWx = (ua.match(/MicroMessenger/i) == 'micromessenger') ? true : false;
			if (this.isWx){
				this.wxInit();
			}
			
			
			this.logIn= this.urlQuery.login?this.urlQuery.login:0;
			if(!this.logIn){
				this.logInHide = true;
			}


			

		}
	}
</script>
<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';
</style>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
	.payNow {
		.oderdetial {
			padding: 0 0.586666rem 1.946666rem;
			.back {
				padding: 0.426666rem 0 0.8rem;
			}
			.head {
				font-size: 0.8rem;
				font-weight: bold;
			}
			.payfordetail {
				.headcommon {
					
					padding:1.333333rem 0 0.693333rem;
					border-bottom: 1px solid #dde0e0;
					.serviceform {
						h3 {
							font-size: 0.453333rem;
							font-weight: bold;
						}
						.service{
							margin-top: 0.32rem;
							font-size: 0.346666rem;
							.serviceTime{
								float: left;
								p{
									span{
										margin-left: 0.133333rem;
									}
								}
							}
							.servicePepole{
								float: left;
								margin-left: 0.4rem;
							}
						}
					}
				}
				.pic {
					padding: 0.666666rem 0;
					border-bottom: 1px solid #dde0e0;
					.adult {
						.formula {
							float: left;
							font-size: 0.48rem;
						}
						.adultPic {
							float: right;
							font-size: 0.48rem;
						}
					}
					.child {
						margin-top: 0.266666rem;
						font-size: 0.48rem;
					}
				}
				.total {
					border-bottom: 1px solid #dde0e0;
					padding: 0.666666rem 0;
					.totle-title {
						float: left;
						font-size: 0.48rem;
					}
					.totalPic {
						float: right;
						font-size: 0.48rem;
						font-weight: bold;
					}
				}
				.hint{
					padding-top: 0.666666rem;
					p{
						font-size: 0.293333rem;
						color: #e14f3f;
						&:last-child{
							margin-top: 0.266666rem;
						}
					}
				}
			}
			.btn {
				position: fixed;
				bottom: 0;
				left: 0;
				width: 100%;
				padding: 0.373333rem 0.586666rem;
				button {
					width: calc(100% - 1.173333rem);
					height: 1.2rem;
					line-height: 1.2rem;
					background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
					text-align: center;
					color: #fff;
					border-radius: 0.6rem;
					font-size: 0.346666rem;
					font-weight: bold;
				}
			}
		}
	}
	.picRate {
			float: right;
			color: #fff;
			position: relative;
			opacity: 0.5;
			height: 0.82rem;
			margin-right: 0.3rem;
			span {
				font-size: 10px;
			}
			.iconfont{
				float: right;
						margin-top: 0.6rem;
						height: 0.8rem;
						line-height: 0.8rem;
						text-align:center;
						font-size:22px;
						color:#666;
						margin-top: 0;
			}
			.currency_type{
				background: none;
				border:none;
				height: 0.8rem;
				padding: 0 0 0 0.2rem;
				font-size:0.34rem;
				margin-top: 0;
				
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
			}
		}
</style>