<template>
	<div class="payNow">
		<HeaderCommon :logIn="logIn"></HeaderCommon>

		<div class="oderdetial clearfix">
			<div class="select">
				<!--<div class="link">
					<a href="javascript:">1. Fill in your information</a>
					<i class="iconfont">&#xe620;</i>
					<a href="javascript:">2. Select payment method</a>
					<i class="iconfont">&#xe620;</i>
					<a href="javascript:">3. confirmation</a>
				</div>-->
				<h3 class="oderDetailTitle" v-if="opctions.currency=='CNY'">Select payment method</h3>
				<div class="selectInfo">
					<h4>Pay with</h4>
					<div class="selectPay">
						<div class="selectCard">
							<div class="wxPay" @click="selectCard(0)" v-show="opctions.currency=='CNY'">
								<div class="payicon">
									<i class="selectTrue" v-if="id==0"></i>
									<i class="selectNull" v-else></i> Wechat
									<div class="chartIcon">
										<svg class="icon1" aria-hidden="true">
											<use xlink:href="#icon-wechat"></use>
										</svg>
									</div>
								</div>

							</div>

							


							<div class="stripePay" @click="selectCard(1)">
								<div class="payicon">
									<i class="selectTrue" v-if="id==1"></i>
									<i class="selectNull" v-else></i> Debit / Credit Card
									<div class="chartIcon">
										<span>
											<svg class="icon1" aria-hidden="true">
													<use xlink:href="#icon-mastercard"></use>
											</svg>
										</span>
										<span>
											<svg class="icon1" aria-hidden="true">
													<use xlink:href="#icon-americanexpress"></use>
											</svg>
										</span>
										<!--<span>
											<svg class="icon1" aria-hidden="true">
													<use xlink:href="#icon-paypal"></use>
											</svg>
										</span>-->
										<span>
											<svg class="icon1" aria-hidden="true">
													<use xlink:href="#icon-visa"></use>
											</svg>
										</span>
									</div>
								</div>

							</div>


							<div class="stripePay" @click="selectCard(2)" v-if="opctions.currency != 'CNY'">
								<div class="payicon">
									<i class="selectTrue" v-if="id==2"></i>
									<i class="selectNull" v-else></i> PayPal
									<div class="chartIcon">
										<span>
											<svg class="icon1" aria-hidden="true">
													<use xlink:href="#icon-paypal"></use>
											</svg>
										</span>
									</div>
								</div>

							</div>


						</div>
					</div>
					<div class="cardInfo" v-show="id==1">
						<h4>Card info</h4>
						<div class="cardNub">
							<div class="card">
								<div id="card-number" class="field empty input"></div>
							</div>
							<div class="row">
								<div class="row-item">
									<div id="card-expiry" class="field empty input"></div>
								</div>
								<div class="row-item">
									<div id="card-cvc" class="field empty input"></div>
								</div>
							</div>
						</div>
						<p style="margin-top: 20px; font-size: 18px;color:red" v-if="payStatus">{{payErrMsg}}</p>
					</div>
				</div>
				<p class="refundPolicy" style=" font-size:14px;margin-top: 30px; color: red;" v-if="opctions.finalRefundPeriod">You can reschedule or cancel your trip at zero cost before {{formatDate(opctions.finalRefundPeriod)}}.</p>
			<!--	<p style="width: 600px;margin-top: 20px; color: red;" v-if="logInHide">You ordered as a guest. To view your order details, you can click "My Bookings" on the top bar then type in the reservee's email address and name you entered before to access that information.</p>-->
				<button class="btnlinner paybtn" @click="getToken" v-show="id!=2">Pay Now</button>
				<div class="paypalBtn" id="paypal-button-container" v-show="id==2"></div>
				
			</div>
			<div class="detailsbox">
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
							<div class="adultPic">{{opctions.symbol}} {{returnFloat(opctions.amount + (opctions.childDiscount?opctions.childDiscount:0) + (opctions.couponDiscount?opctions.couponDiscount:0))}}</div>
						</div>
						<div class="child" v-if="opctions.childDiscount">
							<b>- {{opctions.symbol}}{{returnFloat(opctions.childDiscount)}}</b>  (Children discount)
						</div>
						<div class="child" v-if="opctions.couponDiscount">
							<b>-{{opctions.symbol}}{{returnFloat(opctions.couponDiscount)}}</b> (Coupon discount)
						</div>

					</div>
					<div class="total clearfix">
						<div class="totle-title">Total ({{opctions.currency}})</div>
						<div class="totalPic">{{opctions.symbol}}{{returnFloat(opctions.amount)}}</div>
					</div>
				</div>
				<!--<div class="payWidth">
					<h4>You can pay with:</h4>
					<div class="payments">
						<span>
							<svg class="icon" aria-hidden="true">
									<use xlink:href="#icon-mastercard"></use>
							</svg>
						</span>
						<span>
							<svg class="icon" aria-hidden="true">
									<use xlink:href="#icon-americanexpress"></use>
							</svg>
						</span>
						 <span>
							<svg class="icon" aria-hidden="true">
									<use xlink:href="#icon-paypal"></use>
							</svg>
						</span> 
						<span>
							<svg class="icon" aria-hidden="true">
									<use xlink:href="#icon-visa"></use>
							</svg>
						</span>
						<br>
						<span class="footer_weixin">
							<svg class="icon" aria-hidden="true">
									<use xlink:href="#icon-weixin"></use>
							</svg>
						</span>
					</div>
				</div>-->
			</div>

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
	if(process.browser) {
		//require('~/assets/js/pages/talk.js')
		require('~/assets/js/pages/ga.js')
		require('~/assets/js/plugin/l10n.js')
		
	}
	import { GetQueryString,formatDate } from '~/assets/js/plugin/utils.js'
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon'
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	import Loading from '~/components/Loading/Loading'
	//	import api from '~/assets/js/plugin/api.js'
	//import QRCode from '~/assets/js/plugin/wx/qrcode.min.js'
	import Vue from 'vue'
	import { create } from 'domain';
	import { clearInterval, setTimeout } from 'timers';
	//import { triggerAsyncId } from 'async_hooks';

	export default {
		name: 'payNow',
		
		
		head() {
			let title = 'Payment ';
			let description = 'Enter your payment information and proceed to the confirmation page'
			let keywords =''
			return {
				title: title,
				meta: [{
						hid: "keywords",
						name: "keywords",
						content: keywords
					},
					{
						hid: "description",
						name: "description",
						content: description
					}
				],
				script: [
					{
						src: 'https://js.stripe.com/v3/',
						//src:'https://cloud.localpanda.com/static/js/lp/stripe.js',
						type: 'text/javascript'
					},
					{
						src: 'https://cloud.localpanda.com/static/js/qrcode.min.js',
						type: 'text/javascript'
					},
					{
						src: 'https://www.paypalobjects.com/api/checkout.js',
						type: 'text/javascript'
					}
				]
			}
		},
		async asyncData({route,
			store,
			error,
			apiBasePath,
			redirect
		}) {
			var consoleTimeS = new Date().getTime();
			console.log('node start time:'+consoleTimeS);
			
			
			let id=route.query.objectId;
			let data ={	
				opctions: {
					averagePrice: 0,
					childrenNum: 0,
					adultNum: 0,
					amount: 0,
					couponDiscount: 0
				},
				stripeHandler: "",
				halfDates: '',
				enName: '',
				headPortraitUrl: '',
				orderId:id,
				logIn: '',
				email: '',
				token: '',
				tokenType: '',
				loadingStatus: false,
				isPay: false,
				refundTimeLimit: '',
				errMsg: '',
				logInHide: false,

				//微信支付
				showWxPay: false,
				ewmTip: '',
				wxpayTime: 5 * 60, //5分钟

				//stripe支付
				cardNumber: '',
				stripe: "",
				id: 1, //切换支付方式
				payStatus: false,
				payErrMsg: '',
				isPay: false
		
		};
			
		var dataInfo={}
		try {
		        dataInfo = await Vue.axios.get(apiBasePath+"order/activity/" + id);
		        data.opctions = dataInfo.data
				data.email = dataInfo.data.contactInfo.emailAddress;
				data.refundTimeLimit = dataInfo.data.activityPrice.refundTimeLimit 
				if(data.opctions.currency == "CNY") {
					data.id = 0
				}
		       	
			 	
		      } catch (err) {
		      	//return error(JSON.stringify(err));
		    }
			var consoleTimeS2 = new Date().getTime();
			console.log('node end time:'+consoleTimeS2);
			console.log('在node端渲染，请求所有接口花费时间：'+(consoleTimeS2-consoleTimeS)+' ms');
			return data;
			
			
			
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
					return(parseFloat(this.cutXiaoNum(val, 1)) + 0.1).toFixed(1)

				}

			},
			returnFloat(value) {
				value *= 1;
				if(value) {
					var numberArr = ('' + value).split('.');
					if(numberArr.length > 1 && numberArr[1].length > 2) {
						return(value + 0.005).toFixed(2);
					}
					return value.toFixed(2);
				} else {
					return 0;
				}
			},
			selectCard(id) {

				if(id == 0) {
					this.id = 0
				} else if(id==1) {
					this.id = 1
				}else{
					this.id = 2;
				}
			},
			//国际时间转成美国时间
			formatDate:formatDate,
			//卡元素信息
			stripeFn() {
				this.stripe = Stripe(payCode)
				var elements = this.stripe.elements({
					fonts: [{
						cssSrc: 'https://fonts.googleapis.com/css?family=Quicksand',
					}, ],
					// Stripe's examples are localized to specific languages, but if
					// you wish to have Elements automatically detect your user's locale,
					// use `locale: 'auto'` instead.
					locale: window.__exampleLocale,
				});

				var elementStyles = {
					base: {
						color: '#353a3f',
						fontWeight: 500,
						fontSize: '16px',
						fontSmoothing: 'antialiased',
						':focus': {
							color: '#353a3f',
						},

						'::placeholder': {
							color: '#878e95',
						},

						':focus::placeholder': {
							color: '#878e95',
						},
					},
					invalid: {
						color: '#353a3f',
						':focus': {
							color: '#FA755A',
						},
						'::placeholder': {
							color: '#FFCCA5',
						},
					},
				};

				var elementClasses = {
					focus: 'focus',
					empty: 'empty',
					invalid: 'invalid',
				};

				this.cardNumber = elements.create('cardNumber', {
					style: elementStyles,
					classes: elementClasses,
				});
				this.cardNumber.mount('#card-number');

				var cardExpiry = elements.create('cardExpiry', {
					style: elementStyles,
					classes: elementClasses,
				});
				cardExpiry.mount('#card-expiry');

				var cardCvc = elements.create('cardCvc', {
					style: elementStyles,
					classes: elementClasses,
				});
				cardCvc.mount('#card-cvc');
			},
//
//			getInfo() {
//				let that = this
//				Vue.axios.get(this.apiBasePath + "order/activity/" + that.orderId).then(function(res) {
//					that.opctions = res.data
//					that.email = res.data.contactInfo.emailAddress;
//					that.refundTimeLimit = that.opctions.activityPrice.refundTimeLimit 
//					if(that.opctions.currency == "CNY") {
//						that.id = 1
//					}
//
//				}, function(res) {})
//			},
			getToken() {
				let that = this
				
				if(this.opctions.currency == 'CNY') {
					if(that.id==0){
						this.wxPay();
					}else{
						that.stripePayNow()
					}
					

				} else {
					if(that.id==1){
						that.stripePayNow();
					}else{
						that.paypal();
					}
					
				}

			},
			stripePayNow(){
				let that=this
				that.loadingStatus = true;
					that.stripe.createToken(that.cardNumber,{
						name:that.email
					}).then(function(result) {
						if(result.error) {
							ga(gaSend, {
								hitType: 'event',
								eventCategory: 'activity_payment',
								eventAction: 'click',
								eventLabel: 'activity_pay_fail',
			
							});
							// Inform the user if there was an error.
							//console.log(that.loadingStatus)
							that.loadingStatus = false
							//console.log(that.loadingStatus)
							that.payStatus = true
							that.payErrMsg = result.error.message
						} else {
							ga(gaSend, {
								hitType: 'event',
								eventCategory: 'activity_payment',
								eventAction: 'click',
								eventLabel: 'activity_pay_succ',
			
							});
							// Send the token to your server.
							//stripeTokenHandler(result.token);
							that.payStatus = false
							if(!that.isPay) {
								that.stripeTokenHandler(result.token, that.isPay)
							}
						}
					})				
			},
			device() {
					var ua = navigator.userAgent;
					var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
						isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
						isAndroid = ua.match(/(Android)\s+([\d.]+)/),
						isMobile = isIphone || isAndroid;
				
					if(isMobile) {
						return "MOBILE";
					} else if(ipad) {
						return "IPAD";
					}else{
						return"PC"
					}
				},
			//发起支付
			stripeTokenHandler(token, isPay) {
				isPay = true
				let that = this
				let obj = {
					amount: that.opctions.amount,
					currency: that.opctions.currency,
					objectId: that.orderId,
					token: token.id,
					tokenType: token.type,
					objectType: "ACTIVITY",
					deviceType:that.device(),
					email:that.email
				}

				//console.log(that.opctions.currency);

				Vue.axios.post("https://api.localpanda.com/api/payment/pay/stripe", JSON.stringify(obj), {
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					}
				}).then(function(response) {
					console.log(response)
					that.payStatus = false
					that.errMsg = response.data.errorMessage
					let reg = /Exception/g
					if(response.data.errorMessage && reg.test(response.data.errorMessage)) {
						window.location.href = "/payment/failed?orderId=" + that.orderId + '&amount=' + that.opctions.amount + "&type=1" + "&succeed=false" + "&currency=" + that.opctions.currency + "&symbol=" + that.opctions.symbol
					} else {
						if(response.data.succeed && !response.data.errorMessage) {
							that.loadingStatus = true
							var pageTracker = _gat._getTracker("UA-107010673-1");
							pageTracker._addTrans(that.orderId, "", that.opctions.amount, "", "", "", "", "");
							pageTracker._addItem(that.orderId, that.opctions.activityId, "", "", that.opctions.amount, "1");
							pageTracker._trackTrans();

							window.location.href = "/payment/success?email=" + that.email + "&orderId=" + that.orderId + '&amount=' + that.opctions.amount + "&succeed=true" + "&currency=" + that.opctions.currency + "&symbol=" + that.opctions.symbol
						} else {
							that.loadingStatus = true
							window.location.href = "/payment/failed?email=" + that.email + "&orderId=" + that.orderId + '&amount=' + that.opctions.amount + "&type=1" + "&errMsg=" + that.errMsg + "&succeed=false" + "&currency=" + that.opctions.currency + "&symbol=" + that.opctions.symbol
						}
					}
				}, function(response) {
					window.location.href = "/payment/failed?email=" + that.email + "&orderId=" + that.orderId + '&amount=' + that.opctions.amount + "&type=1" + "&succeed=false" + "&currency=" + that.opctions.currency + "&symbol=" + that.opctions.symbol
				})

			},
			wxPay() {
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
					amount: this.opctions.amount,
					objectType: 'ACTIVITY',
					deviceType:self.device()
				};
				this.axios.post("https://api.localpanda.com/api/payment/pay/wechat", JSON.stringify(obj), {
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					}
				}).then(function(response) {
					if(response.status == 200) {
						//var imgSrc = 'data:image/png;base64,'+response.data.code_url;
						//self.wxPayEwm = imgSrc;
						var payLogo = new Image();
						payLogo.src = 'https://cloud.localpanda.com/static/icon/wechat.png';
						payLogo.className = 'ewmLogo';
						wxPayEwm.appendChild(payLogo);

						var qrcode = new QRCode(wxPayEwm, {
							text: response.data.codeUrl,
							width: 150, //生成的二维码的宽度
							height: 150, //生成的二维码的高度
							colorDark: "#000000", // 生成的二维码的深色部分
							colorLight: "#ffffff", //生成二维码的浅色部分
							correctLevel: QRCode.CorrectLevel.H
						});

						//隐藏提示文字
						self.ewmTip = '';

						//开启查询监听，3秒钟请求一次到达设计时间后停止，并请求一次最终查询接口flag=1
						var allTime = 0;
						self.payTimer = setInterval(function() {
							allTime += 3;
							//开启计时
							if(allTime > self.wxpayTime) {
								this.clearInterval(self.payTimer);
								self.payEnd(1);
							} else {
								self.payEnd();
							}
						}, 3000);

					}
				}, function(response) {})

			},
			closePay() {
				this.showWxPay = false;
				var self = this;
				setTimeout(function() {
					this.clearInterval(self.payTimer);
					self.payEnd(1);
				});

			},
			payEnd(flagNum) {
				var that = this;
				let obj ={
					orderId:this.orderId,
					flag:flagNum?1:0
				}
				//https://www.localpanda.cn/api/payment/wechat/status?orderId=1106357805
				this.axios.post("https://api.localpanda.com/api/payment/query/status",JSON.stringify(obj),{
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					}
				}).then(function(response) {
					if(response.status == 200 && response.data.succeed) {

						var pageTracker = _gat._getTracker("UA-107010673-1");
						pageTracker._addTrans(that.orderId, "", that.opctions.amount, "", "", "", "", "");
						pageTracker._addItem(that.orderId, that.opctions.activityId, "", "", that.opctions.amount, "1");
						pageTracker._trackTrans();

						window.location.href = "/payment/success?email=" + that.email + "&orderId=" + that.orderId + '&amount=' + that.opctions.amount + "&succeed=true" + '&symbol=' + that.opctions.symbol + "&currency=" + that.opctions.currency;

					} else {
						//window.location.href = "/payment/failed?email="+that.email+"&orderId=" + that.orderId + '&amount=' + that.opctions.amount+"&errMsg="+that.errMsg+"&succeed=false"
						if(flagNum) {
							that.ewmTip = 'The code has expired! <a class="refresh_code">刷新</a>'
						}
					}
				}, function(response) {})

			},
			refreshCode(e) {
				var thisTag = e.target.tagName;
				if(thisTag == 'a' || thisTag == 'A') {
					this.wxPay();
				}
			},
			paypal(){
				console.log(this.opctions);
				var self = this;
				var putData = {
					"amount": this.opctions.amount,
					"currency": this.opctions.currency,
					"deviceType": this.device(),
					"email": this.opctions.contactInfo.emailAddress,
					"objectId": this.orderId,
					"objectType": "ACTIVITY",
					"paySerial": "",
					"platform": "PAYPAL",
					"response": "",
					"status": ""//SUCCESSFUL/FAILED
				};
				

				paypal.Button.render({
					env : paypalCode, // sandbox | production
					style:{
						color: 'blue',
						height: 42
					},
					client: {
            sandbox:    'AQU-ZaCuePiwF7vwM6FhAW-fq69LI6HuWuGqbk9JXEP_gZw1gronm1T25EHY7pXeevEQL3g4TVfO16PV',
            production: 'AQdt9x4Glxn-Hxi42yzQE--MucskE38eUdITLxMQFhg1JKsmSyIWMYCd3_a_6pVGzIkspkV5OGfDccn9'
        	},

					// Show the buyer a 'Pay Now' button in the checkout flow
					commit : false,

					payment: function (data, actions) {
            return actions.payment.create({
							transactions: [{
								amount: {
									total: putData.amount,
									currency: putData.currency
								},
								item_list: {
									items: [
										{
											name: self.opctions.activityInfo.title,
											quantity: '1',
											price: putData.amount,
											currency: putData.currency
										}
									]
								}
							}],
							note_to_payer: 'Contact us for any questions on your order.'
						});
					},

					// onAuthorize() is called when the buyer approves the payment
					onAuthorize : function(data, actions) {
						
						var execute = actions.payment.execute().then(function(res) {

							delete res.payer;
							delete res.transactions;

							putData.paySerial = data.paymentID;
							putData.response = JSON.stringify(res);
							putData.status = 'SUCCESSFUL';
							self.paypalCreate(putData);
						});
						return execute;
					},
					onError: function (err) {
						putData.paySerial = err.paymentID;
						putData.response = err;
						putData.status = 'FAILED';
						self.paypalCreate(putData);
					},

					onCancel: function(data, actions) {
						// putData.paySerial = err.paymentID;
						// putData.response = err;
						// putData.status = 'FAILED';
						// self.paypalCreate(putData);
						console.log(data);
					}

				}, '#paypal-button-container');

			},
			paypalCreate(putData){

				var that = this;
				this.loadingStatus = true;
				this.axios.post("https://api.localpanda.com/api/payment/pay/paypal",JSON.stringify(putData), {
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(function(response) {
					that.loadingStatus = false;
					if(putData.status == 'SUCCESSFUL') {
						//跳转
						window.location.href = "/payment/success?email=" + that.email + "&orderId=" + that.orderId + '&amount=' + that.opctions.amount + "&succeed=true" + "&currency=" + that.opctions.currency + "&symbol=" + that.opctions.symbol
					} else {
							window.location.href = "/payment/failed?email=" + that.email + "&orderId=" + that.orderId + '&amount=' + that.opctions.amount + "&type=1" + "&errMsg=fail&succeed=false" + "&currency=" + that.opctions.currency + "&symbol=" + that.opctions.symbol
					}
				}, function(response) {
					
				})
			}
		},
		created: function() {
			
		},
		mounted: function() {
			console.log(window.Stripe)
			this.orderId = GetQueryString("objectId")
			console.log(this.opctions)
//			this.getInfo()
			this.stripeFn()

			//paypal支付
			if(this.opctions.currency !='CNY'){
				this.paypal();
			}

			//this.getToken()
			this.logIn = window.localStorage.getItem("logstate")

			if(!this.logIn) {
				this.logInHide = true;
			}

		}
	}
</script>
<style lang="scss">
	//@import '~/assets/scss/_main.scss';
	//@import '~/assets/font/iconfont.css';
	.payNow{
		
		body {
			min-width: 1200px;
		}
		
		.ewmLogo {
			position: absolute;
			width: 30px;
			height: 30px;
			left: 50%;
			top: 50%;
			-webkit-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			border-radius: 5px;
		}
		
		.refresh_code {
			color: #00B886;
			cursor: pointer;
			&:hover {
				color: #00B886;
			}
		}


		#header {
			box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
			.init{
				li{
					&:nth-child(0){
						display: none;
					}
					&:nth-child(1){
						display: none;
					}
					&:nth-child(3){
						display: none;
					}
					
				}
			}
			.login{
				.selectCurrency{
					display: none;
				}
			}
			.search{ 
				display: none!important;
			}
			
		}
		.footerInfo{
			li:nth-child(5){
				display: none!important;
			}
		}

		.paypal-button,.xcomponent-outlet{
			width: 100%!important;
			height: 100%!important;
		}

	}
</style>
<style lang="scss" scoped>
	//@import '~/assets/scss/base/_setting.scss';
	.icon {
		width: 58px;
		height: 36px;
		vertical-align: middle;
		fill: currentColor;
		overflow: hidden;
		border-radius: 5px;
	}
	
	.icon1 {
		width: 38px;
		height: 23px;
		vertical-align: middle;
		fill: currentColor;
		overflow: hidden;
		border-radius: 5px;
	}
	
	.input {
		padding: 22px 0 22px 15px;
		font-size: 18px;
	}
	
	.payNow {
		.oderdetial {
			width: 1170px;
			margin: 0 auto;
			padding: 60px 0 100px;
			position: relative;
			.select {
				float: left;
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
				.oderDetailTitle {
					font-size: 36px;
					font-weight: bold;
				}
				.selectInfo {
					margin-top: 25px;
					width: 476px;
					h4 {
						font-size: 18px;
						font-weight: bold;
					}
				}
				.selectPay {
					margin-top: 10px;
					border: 1px solid #dde0e0;
					border-bottom: none;
					border-radius: 3px;
					.selectCard{ cursor: pointer;}
					.wxPay,
					.stripePay {
						height: 56px;
						line-height: 56px;
						padding: 0 15px 0 43px;
						border-bottom: 1px solid #dde0e0;
						position: relative;
						font-size: 18px;
						i {
							left: 15px;
							top: 22px;
							position: absolute;
							border-radius: 50%;
							&.selectTrue {
								width: 6px;
								height: 6px;
								border: 5px solid #1bbc9d;
							}
							&.selectNull {
								width: 14px;
								height: 14px;
								border: 1px solid #dde0e0;
							}
						}
						.chartIcon {
							float: right;
							span {
								display: inline-block;
								margin-left: 8px;
								&:first-child {
									margin-left: 0;
								}
							}
						}
					}
				}
				.cardInfo {
					margin-top: 34px;
					.cardNub {
						margin-top: 14px;
						border: 1px solid #dde0e0;
						.card {
							height: 56px;
							line-height: 56px;
						}
						.row {
							display: flex;
							height: 56px;
							line-height: 56px;
							border-top: 1px solid #dde0e0;
							.row-item {
								flex: 1;
								width: 50%;
								&:first-child {
									border-right: 1px solid #dde0e0;
								}
							}
						}
					}
				}
			}
			.detailsbox {
				float: right;
				width: 376px;
			}
			.payfordetail {
				box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
				background: #fff;
				padding: 30px 30px 40px;
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
				.refundPolicy {
					font-size: 18px;
					color: red;
				}
			}
			/*.bookbtn {
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
			}*/
			.payWidth {
				padding: 30px 0 30px 30px;
				background-color: #faf9f8;
				margin-top: 30px;
				h4 {
					font-size: 18px;
					font-weight: bold;
				}
				.payments {
					margin-top: 20px;
					span {
						margin-right: 6px;
						margin-bottom: 5px;
						display: inline-block;
					}
					.footer_weixin {
						background-color: #0eb20a;
						width: 58px;
						height: 36px;
						display: inline-block;
						border-radius: 5px;
						text-align: center;
						svg {
							color: #fff;
							width: 32px;
						}
					}
				}
			}
		}
		.paybtn {
			font-size: 16px;
			font-weight: bold;
		}
		.paypalBtn{
			width: 200px;
			height: 42px;
			margin-top: 30px;
		}
		.win_bg {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			background-color: rgba(0, 0, 0, 0.8);
			z-index: 9;
		}
		.wx_pay {
			width: 600px;
			height: 420px;
			position: fixed;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background-color: #fff;
			z-index: 10;
			padding: 32px 32px 50px;
			box-sizing: border-box;
			h3 {
				color: #353a3f;
				font-size: 28px;
				font-weight: bold;
				margin-top: 40px;
			}
			p {
				font-size: 18px;
				line-height: 24px;
				color: #353a3f;
				margin-top: 20px;
			}
			.wx_ewmtip {
				margin-top: 80px;
				font-size: 14px;
				text-align: center;
				color: #888;
			}
			.wx_pay_ewm {
				text-align: center;
				margin: 20px auto 0;
				width: 150px;
				height: 150px;
				color: #888;
				position: relative;
				span {
					display: inline-block;
					margin-top: 20px;
					font-size: 18px;
				}
			}
			.pay_close {
				font-size: 26px;
				position: absolute;
				right: 20px;
				top: 20px;
				cursor: pointer;
			}
		}
	}
</style>