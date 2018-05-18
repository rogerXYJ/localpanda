<template>
	<div class="payNow">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="oderdetial">
			<div class="link">
				<a href="javascript:">1. Fill in your information</a>
				<i class="iconfont">&#xe620;</i>
				<a href="javascript:">2. confirmation</a>
			</div>
		<div class="bookbtn">
				<p>Pay with:</p>
				<div class="payfor">
					<img style="width: 200px;" src="https://resource.localpanda.cn/static/icon/stripe.png" />
				</div>
				<div style="font-size: 16px;line-height: 20px;display: block; margin-top: 20px;"><b>Secure Payment:</b></br>We use Stripe's online payment system, which sends your payment info directly to Stripe's secure servers, so your data is never sent to Local Panda's servers and cannot be stolen.</div>
			</div>
			<div class="payfordetail">
				<div class="head clearfix">
					<div class="serviceform">
					<h3>{{opctions.activityInfo?opctions.activityInfo.title:''}}</h3>
						<p v-if="opctions.adultNum==1&&opctions.childrenNum==0">1 Person</p>
						<p v-else>{{opctions.adultNum+opctions.childrenNum}} People</p>
					</div>
				</div>
				<div class="date">
					<p>{{opctions.startDate}}</p>
					<p v-if="opctions.startTime">{{opctions.startTime}}</p>
				</div>
				<div class="pic">
					<div class="adult clearfix">
						<div class="formula" v-if="opctions.childrenNum==0&&opctions.adultNum==1">{{opctions.symbol}}{{returnFloat(opctions.averagePrice)}} x 1 Person</div>
						<div class="formula" v-else>{{opctions.symbol}} {{returnFloat(opctions.averagePrice)}} x {{opctions.adultNum+opctions.childrenNum}} People </div>
						<div class="adultPic">{{opctions.symbol}} {{returnFloat(opctions.amount+opctions.childDiscount)}}</div>
					</div>
					<div class="child" v-if="opctions.childDiscount">
						<b>- {{opctions.symbol}}{{returnFloat(opctions.childDiscount)}}</b> for child(ren)
					</div>
					<div class="child" v-if="opctions.couponDiscount">
						<b>-{{opctions.symbol}}{{returnFloat(opctions.couponDiscount)}}</b> for discount
					</div>
					
				</div>
				<div class="total clearfix">
					<div class="totle-title">Total ({{opctions.currency}})</div>
					<div class="totalPic">{{opctions.symbol}}{{returnFloat(opctions.amount)}}</div>
				</div>
			</div>
			<p class="refundPolicy" style="margin-top: 30px; color: red;">You can get a 100% refund up to {{refundTimeLimit}} hours before your trip.</p>
			<p style="width: 600px;margin-top: 20px; color: red;" v-if="logInHide">You ordered as a guest. To view your order details, you can click "My Bookings" on the top bar then type in the reservee's email address and name you entered before to access that information.</p>
			<button class="btnlinner paybtn" @click="pay">Pay Now</button>
		</div>
		<Loading :loadingStatus="loadingStatus"></Loading>
		<FooterCommon></FooterCommon>


		<div class="win_bg" v-show="showWxPay"></div>
		<div class="wx_pay" v-show="showWxPay">
			<h3>Wechat Pay verification</h3>
			<p>Please open your Wechat App, scan the QR code to enter the verification page. Please don't close this window during the process, and the page will auto continue once you are done.</p>
			<div class="wx_ewmtip" v-show="ewmTip" v-html="ewmTip" @click="refreshCode"></div>
			<div class="wx_pay_ewm" v-show="!ewmTip">
				<div id="wxPayEwm"></div>
			</div>
			<span class="iconfont pay_close" @click="closePay">&#xe629;</span>
		</div>


	</div>

</template>

<script>
	if (process.browser) {
	  //require('~/assets/js/pages/talk.js')
	  require('~/assets/js/pages/ga.js')
	}
	import { GetQueryString } from '~/assets/js/plugin/utils.js'
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon'
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	import Loading from '~/components/Loading/Loading'
	import api from '~/assets/js/plugin/api.js'
	//import QRCode from '~/assets/js/plugin/wx/qrcode.min.js'
	import Vue from 'vue'
import { create } from 'domain';
import { clearInterval, setTimeout } from 'timers';
  //import { triggerAsyncId } from 'async_hooks';
	
	export default {
	name: 'payNow',
	head(){
	    return {
	      script: [
	        { 
	          src: 'https://checkout.stripe.com/checkout.js', 
	          type: 'text/javascript'
	        },
	        {
	        	src:'https://resource.localpanda.cn/static/js/qrcode.min.js',
	        	type: 'text/javascript'
	        }
	      ]
	    }
	  },
	  async asyncData({ apiBasePath }) {
		  	return {
	      apiBasePath: apiBasePath
	    }	
	  },
		
		data() {
			return {
				opctions:{
					averagePrice:0,
					childrenNum:0,
					adultNum:0,
					amount:0,
					couponDiscount:0	
				},
				stripeHandler: "",	
				halfDates: '',
				enName: '',
				headPortraitUrl: '',
				orderId: '',
				logIn: '',
				email: '',
				token: '',
				tokenType: '',
				loadingStatus: false,
				isPay: false,
				refundTimeLimit:'',
				errMsg:'',
				logInHide : false,

				//微信支付
				showWxPay : false,
				ewmTip: '',
				wxpayTime : 5*60 //5分钟

			}
		},
		components: {
			HeaderCommon,
			FooterCommon,
			Loading
		},
		methods: {
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
					return (parseFloat(this.cutXiaoNum(val, 1))+0.1).toFixed(1)

				}

			},
			returnFloat(value) {
				value*=1;
				if(value) {
					var numberArr = (''+value).split('.');
					if(numberArr.length>1 && numberArr[1].length>2){
						return (value+0.005).toFixed(2);
					}
					return value.toFixed(2);
				}else{
					return 0;
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
						that.loadingStatus = true
						let obj = {
							amount: that.opctions.amount * 100,
							currency: that.opctions.currency,
							objectId: that.orderId,
							token: token.id,
							email: token.email,
							tokenType: token.type,
							objectType: "ACTIVITY"
							
						}
						Vue.axios.post(that.apiBasePath+"payment/pay/stripe", JSON.stringify(obj), {
							headers: {
								'Content-Type': 'application/json; charset=UTF-8'
							}
						}).then(function(response) {
							that.errMsg=response.data.errorMessage
							let reg=/Exception/g
							if(response.data.errorMessage&&reg.test(response.data.errorMessage)){
								window.location.href = "/payment/failed?orderId=" + that.orderId + '&amount=' + that.opctions.amount+"&type=1"+"&succeed=false"+"&currency="+that.opctions.currency
							}else{
								if(response.data.succeed&&!response.data.errorMessage){
							 		that.loadingStatus = true
									var pageTracker =_gat._getTracker("UA-107010673-1");
									pageTracker._addTrans(that.orderId,"",that.opctions.amount,"", "", "", "", "");
									pageTracker._addItem(that.orderId, that.opctions.activityId,"","", that.opctions.amount,"1" );
									pageTracker._trackTrans();
									
									window.location.href = "/payment/success?email="+that.email+"&orderId=" + that.orderId + '&amount=' + that.opctions.amount+"&succeed=true"+"&currency="+that.opctions.currency
								}else{
									that.loadingStatus = true
							 		window.location.href = "/payment/failed?email="+that.email+"&orderId=" + that.orderId + '&amount=' + that.opctions.amount+"&type=1"+"&errMsg="+that.errMsg+"&succeed=false"+"&currency="+that.opctions.currency
								}	
							}
						}, function(response) {
							window.location.href = "/payment/failed?email="+that.email+"&orderId=" + that.orderId + '&amount=' + that.opctions.amount+"&type=1"+"&succeed=false"+"&currency="+that.opctions.currency
						})
					}
				})
			},
			getInfo(){
				let that=this
				Vue.axios.get(this.apiBasePath+"activity/order/detail/"+that.orderId).then(function(res){
					console.log(res.data);
					that.opctions=res.data
					that.email = res.data.contactInfo.emailAddress;
					that.refundTimeLimit=that.opctions.activityInfo.refundTimeLimit*24
					
				},function(res){})
			},
			pay() {
				let that = this;
				
				ga('gtag_UA_107010673_1.send', {
					hitType: 'event',
					eventCategory: 'activity_payment',
					eventAction: 'click',
					eventLabel: 'activity_pay',

				});
				
				if(this.opctions.currency=='CNY'){
					this.wxPay();
					return;
				}
				

				that.stripeHandler.open({
					name: 'Local panda', // 收款方或商家名称，比如 Beansmile
					description: "", // 待支付商品的描述
					currency:that.opctions.currency,
					amount: that.opctions.amount* 100, // 支付金额，单位是“分”
					closed: function() {

					}
				})
			},
			wxPay(){
				//人民币支付，弹出微信二维码
				var self = this;
				this.showWxPay = true;

				//设置提示文字
				this.ewmTip = 'Loading ...';

				var wxPayEwm = document.getElementById("wxPayEwm");
				wxPayEwm.innerHTML = '';


				var obj = {
					tradeType: 'NATIVE',
					objectId: this.opctions.orderId,
					amount: this.opctions.amount * 100,
					objectType: 'ACTIVITY'
				};
				this.axios.post("/api/payment/pay/wechat", JSON.stringify(obj), {
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					}
				}).then(function(response) {
					if(response.status==200){
						//var imgSrc = 'data:image/png;base64,'+response.data.code_url;
						//self.wxPayEwm = imgSrc;
						var payLogo = new Image();
						payLogo.src = 'https://resource.localpanda.cn/static/icon/wechat.png';
						payLogo.className = 'ewmLogo';
						wxPayEwm.appendChild(payLogo);

						var qrcode = new QRCode(wxPayEwm, {
							text: response.data.code_url,
							width: 150, //生成的二维码的宽度
							height: 150, //生成的二维码的高度
							colorDark : "#000000", // 生成的二维码的深色部分
							colorLight : "#ffffff", //生成二维码的浅色部分
							correctLevel : QRCode.CorrectLevel.H
						});
						
						//隐藏提示文字
						self.ewmTip = '';

						//开启查询监听，3秒钟请求一次到达设计时间后停止，并请求一次最终查询接口flag=1
						var allTime = 0;
						self.payTimer = setInterval(function(){
							allTime+=3;
							//开启计时
							if(allTime>self.wxpayTime){
								this.clearInterval(self.payTimer);
								self.payEnd(1);
							}else{
								self.payEnd();
							}
						},3000);
						
						


					}
				}, function(response) {})

			},
			closePay(){
				this.showWxPay = false;
				var self = this;
				setTimeout(function(){
					this.clearInterval(self.payTimer);
					self.payEnd(1);
				});
				
				
			},
			payEnd(flagNum){
				var that = this;
				//https://www.localpanda.cn/api/payment/wechat/status?orderId=1106357805
				this.axios.get("/api/payment/wechat/status?orderId="+this.orderId+'&flag='+(flagNum?1:0),{
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					}
				}).then(function(response) {
					if(response.status==200 && response.data.succeed){

						var pageTracker =_gat._getTracker("UA-107010673-1");
							pageTracker._addTrans(that.orderId,"",that.opctions.amount,"", "", "", "", "");
							pageTracker._addItem(that.orderId, that.opctions.activityId,"","", that.opctions.amount,"1" );
							pageTracker._trackTrans();
						
						window.location.href = "/payment/success?email="+that.email+"&orderId=" + that.orderId + '&amount=' + that.opctions.amount+"&succeed=true"+'&symbol='+that.opctions.symbol;
							
					}else{
						//window.location.href = "/payment/failed?email="+that.email+"&orderId=" + that.orderId + '&amount=' + that.opctions.amount+"&errMsg="+that.errMsg+"&succeed=false"
						if(flagNum){
							that.ewmTip = 'The code has expired! <a class="refresh_code">刷新</a>'
						}
					}
				}, function(response) {})

			},
			refreshCode(e){
				var thisTag = e.target.tagName;
				if(thisTag=='a'||thisTag=='A'){
					this.wxPay();
				}
			}
		},
		created: function() {
			
			
		},
		mounted: function() {
			this.orderId = GetQueryString("objectId")
			this.getInfo()
			this.getToken()
			this.logIn = window.localStorage.getItem("logstate")
			
			if(!this.logIn){
				this.logInHide = true;
			}

			

			
			
		}
	}
</script>
<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';
	#header{
		box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
	}
	body{
		min-width:1200px;
	}
	.ewmLogo{
		position:absolute;
		width:30px;
		height:30px;
		left:50%;
		top:50%;
		-webkit-transform:translate(-50%,-50%);
		transform:translate(-50%,-50%);
		border-radius:5px;
	}
	.refresh_code{
		color:#00B886;
		cursor:pointer;
		&:hover{
			color:#00B886;
		}
	}
</style>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
	.payNow {
		.oderdetial {
			width: 1170px;
			margin: 0 auto;
			padding: 60px 0 100px;
			position: relative;
			.link {
				a {
					font-size: 16px;
					color: #353a3f;
					cursor: auto;
					&:last-child {
						color: #dde0e0;
					}
				}
				i {
					font-size: 10px;
					color: #dde0e0;
					margin: 0 20px;
				}
			}
			.title_head {
				font-weight: bold;
				font-size: 36px;
				margin: 64px 0 44px;
			}
			.payfordetail {
				margin-top: 10px;
				box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
				background: #fff;
				padding: 30px 30px 40px;
				width: 316px;
				.head {
					padding-bottom: 30px;
					border-bottom: 1px solid #dde0e0;
					.serviceform {
						h3 {
							font-size: 18px;
							margin-bottom: 0;
							font-weight: bold;
						}
						p {
							margin-top: 12px;
							font-size: 18px
						}
					}
					
				}
				.date {
					padding: 30px 0;
					border-bottom: 1px solid #dde0e0;
					p {
						font-size: 18px;
					}
				}
				.pic {
					padding: 30px 0;
					border-bottom: 1px solid #dde0e0;
					.adult {
						.formula {
							float: left;
							font-size: 18px;
						}
						.adultPic {
							float: right;
							font-size: 18px;
						}
					}
					.child {
						margin-top: 20px;
						font-size: 18px;
					}
				}
				.total {
					padding-top: 30px;
					.totle-title {
						float: left;
						font-size: 18px;
					}
					.totalPic {
						float: right;
						font-size: 18px;
						font-weight: bold;
					}
				}
				.refundPolicy{
					font-size: 18px;
					color: red;
				}
			}
			.bookbtn {
				width: 242px;
				position: absolute;
				top: 60px;
				right: 0;
				padding: 30px;
				background: #faf9f8;
				p {
					font-size: 18px;
					font-weight: bold;
				}
				.payfor {
					span {
						display: inline-block;
						width: 58px;
						height: 36px;
						margin-right: 10px;
					}
				}
			}
		}
		.paybtn {
			font-size: 16px;
			font-weight: bold;
		}


		.win_bg{
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top:0;
			background-color: rgba(0,0,0,0.8);
			z-index: 9;
		}
		.wx_pay{
			width: 600px;
			height:420px;
			position: fixed;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			background-color: #fff;
			z-index: 10;
			padding:32px 32px 50px;
			box-sizing:border-box;
			h3{
				color: #353a3f;
				font-size:28px;
				font-weight: bold;
				margin-top: 40px;
			}
			p{
				font-size:18px;
				line-height: 24px;
				color: #353a3f;
				margin-top: 20px;
			}
			.wx_ewmtip{
				margin-top:80px;
				font-size:14px;
				text-align: center;
				color:#888;
				
			}
			.wx_pay_ewm{
				text-align: center;
				margin: 20px auto 0;
				width:150px;
				height:150px;
				color:#888;
				position:relative;
				span{
					display:inline-block;
					margin-top:20px;
					font-size:18px;
				}
				
			}
			.pay_close{
				font-size:26px;
				position: absolute;
				right: 20px;
				top: 20px;
				cursor: pointer;
			}
		}
		
	}
	
	
</style>