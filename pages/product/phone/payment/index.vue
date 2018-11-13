<template>
	<div class="payNow">
		<HeaderCommon :logIn="logIn"></HeaderCommon>

		<div class="oderdetial clearfix">
			<div class="select">
				<h3 class="oderDetailTitle" v-if="options.currency=='CNY'">Select payment method</h3>
				<div class="selectInfo">
					<h4>Pay with</h4>
					<div class="selectPay">
						<div class="selectCard">
							<div class="wxPay" @click="selectCard(0)" v-show="options.currency=='CNY'">
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


							<div class="stripePay" @click="selectCard(2)" v-if="options.currency != 'CNY'">
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
				<!-- panda Phone -->
				<div class="panda_phone">
					<p>A $150 USD deposit (1000 RMB) is required to use the Panda Phone, which will be returned to you upon returning the phone at the end of your trip. Please choose a deposit payment method below.</p>
					<radio-group v-model="options.phoneDepositPayOnline" class="deposit_list">
						<radio :label="false">Pay deposit upon recieving the phone in China with cash (RMB only) or paypal .*</radio><br>
						<radio :label="true">Pay deposit now online</radio>
					</radio-group>
					<p class="mt10">*deposit will be returned in the same method you paid: paypal or in cash (RMB only)</p>
				</div>

				<p class="refundPolicy" style=" font-size:14px;margin-top: 30px; color: red;" v-if="options.finalRefundPeriod">You can reschedule or cancel your trip at zero cost before {{formatDate(options.finalRefundPeriod)}}.</p>
			<!--	<p style="width: 600px;margin-top: 20px; color: red;" v-if="logInHide">You ordered as a guest. To view your order details, you can click "My Bookings" on the top bar then type in the reservee's email address and name you entered before to access that information.</p>-->

				

				<button class="btnlinner paybtn" @click="getToken" v-show="id!=2">Pay Now</button>
				<div class="paypalBtn" id="paypal-button-container" v-show="id==2"></div>
				
			</div>
			<div class="detailsbox">
				<div class="payfordetail">
					<div class="head clearfix">
						<h3>Panda Phone Service</h3>
					</div>
					<div class="date">
						<p>Duration : {{options.days}} {{options.days>1?'Days':'Day'}}<span>{{formatDate(options.startDate)}} - {{formatDate(options.endDate)}}</span></p>
						<!-- <p>Travel Date :  {{formatDate(options.startDate)}}</p>
						<p v-if="options.startTime">{{options.startTime}}</p> -->
					</div>
					<div class="pic">
						<div class="adult clearfix">
							<div class="formula">{{options.days}} {{options.days>1?'Days':'Day'}} × {{options.deviceNum}} {{options.deviceNum>1?'Devices':'Device'}}</div>
							<div class="adultPic">{{options.symbol}}<span v-once>{{returnFloat(options.amount)}}</span> </div>
						</div>
						<!-- panda Phone -->
						<div class="child" v-if="options.phoneHire">
							<b>+ {{options.symbol}}{{options.phoneHirePrice}}</b> for Panda Phone
						</div>
						<div class="child" v-if="options.phoneDepositPayOnline === 'true' || options.phoneDepositPayOnline===true">
							<b>+ {{options.symbol}}{{options.phoneDeposit*options.deviceNum}}</b> for Panda Phone deposit
						</div>

					</div>
					<div class="total clearfix">
						<div class="totle-title">Total Amount</div>
						<div class="totalPic">{{options.currency}} {{options.symbol}}{{returnFloat(options.amount)}}</div>
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


		<!-- 提示订单状态 -->
		<dialogBox title="Tips" v-model="dialogStatus" :bgNoClick="true" :hideClose="true" width="80%" height="auto">
			<div class="order_status">
				<p>{{dialogStatusText}}</p>
				<a class="btn" :href="'https://www.localpanda.com/activity/details/'+options.activityId" v-if="options.status=='CANCELED'">Book Again</a>
				<a class="btn" :href="'/user/myBookings?email='+options.contactInfo.emailAddress+'&orderid='+orderId" v-else>View Order Detail</a>
				<a class="btn" href="/">Back to Home</a>
			</div>
		</dialogBox>

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
	import {radioGroup,radio} from "~/plugins/panda/radio/";
	import dialogBox from '~/plugins/panda/dialogBox';
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
		async asyncData({
			route,
			store,
			error,
			apiBasePath,
			redirect
		}) {
			var consoleTimeS = new Date().getTime();
			console.log('node start time:'+consoleTimeS);


			let orderId = route.query.orderId;

			let data ={	
				options: {
					amount: 0,
					deviceNum:'',
				},
				stripeHandler: "",
				halfDates: '',
				enName: '',
				headPortraitUrl: '',
				orderId: orderId,
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
				isPay: false,

				//订单状态提醒
				dialogStatus:false,
				dialogStatusText:''

			};

			var dataInfo={};

		
			try {
				dataInfo = await Vue.axios.get(apiBasePath+"product/phone/" + data.orderId);
				data.options = dataInfo.data;
				data.email = dataInfo.data.contactInfo.emailAddress;
				
				if(data.options.currency == "CNY") {
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
			Loading,
			radioGroup,
			radio,
			dialogBox
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
			getToken() {
				let that = this
				
				if(this.options.currency == 'CNY') {
					if(that.id==0){
						this.wxPay();
					}else{
						that.stripePayNow();
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
				isPay = true;
				let that = this;
				let obj = {
					amount: that.options.amount,
					currency: that.options.currency,
					objectId: that.orderId,
					token: token.id,
					tokenType: token.type,
					objectType: "PHONE",
					deviceType:that.device(),
					email:that.email
				};

				Vue.axios.post("https://api.localpanda.com/api/payment/pay/stripe", JSON.stringify(obj), {
					headers: {
						'Content-Type': 'application/json;'
					}
				}).then(function(response) {
					
					that.payStatus = false
					that.errMsg = response.data.errorMessage
					let reg = /Exception/g
					if(response.data.errorMessage && reg.test(response.data.errorMessage)) {
						that.jumpStatusPage(false,that.errMsg);
					} else {
						if(response.data.succeed && !response.data.errorMessage) {
							that.loadingStatus = true;
							
							//ga统计
							that.analyticsGa({
								orderId: that.orderId,
								activityId: that.options.activityId,
								title: 'Panda Phone Service',
								travelers: that.options.deviceNum,
								currency: that.options.currency,
								amount: that.options.amount,
								payType: 'Stripe'
							});

							that.jumpStatusPage(true);
						} else {
							that.loadingStatus = true;
							that.jumpStatusPage(false,that.errMsg);
						}
					}
				}, function(response) {
					that.jumpStatusPage(false,'fail');
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
					objectId: this.options.orderId,
					amount: this.options.amount,
					objectType: 'PHONE',
					deviceType:self.device(),
					phoneDepositPayOnline: this.options.phoneDepositPayOnline
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
					flag:flagNum?1:0,
					businessType: 'PHONE'
				}
				//https://www.localpanda.cn/api/payment/wechat/status?orderId=1106357805
				this.axios.post("https://api.localpanda.com/api/payment/query/status",JSON.stringify(obj),{
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					}
				}).then(function(response) {
					if(response.status == 200 && response.data.succeed) {
						//ga统计
						that.analyticsGa({
							orderId: that.orderId,
							activityId: that.options.activityId,
							title: 'Panda Phone Service',
							travelers: that.options.deviceNum,
							currency: that.options.currency,
							amount: that.options.amount,
							payType: 'Wechat'
						});

						that.jumpStatusPage(true);

					} else {
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
				console.log(this.options);
				var self = this;
				var putData = {
					"amount": this.options.amount,
					"currency": this.options.currency,
					"deviceType": this.device(),
					"email": this.options.contactInfo.emailAddress,
					"objectId": this.orderId,
					"objectType": "PHONE",
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
											name: 'Panda Phone Service',
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
							var saleId = res.transactions[0].related_resources[0].sale.id;
							delete res.payer;
							delete res.transactions;

							putData.paySerial = saleId;
							putData.response = JSON.stringify(res);
							putData.status = 'SUCCESSFUL';
							self.paypalCreate(putData);
						});
						return execute;
					},
					onError: function (err) {
						putData.paySerial = '';
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

						//ga统计
						that.analyticsGa({
							orderId: that.orderId,
							activityId: that.options.activityId,
							title: 'Panda Phone Service',
							travelers: that.options.deviceNum,
							currency: that.options.currency,
							amount: that.options.amount,
							payType: 'Paypal'
						});

						//跳转
						that.jumpStatusPage(true);
					} else {
						that.jumpStatusPage(false,'fail');
					}
				}, function(response) {
					
				})
			},
			orderUpdate(){
				var that = this;
				var newPrice = 0;
				//检测是否押金价格，从总价减去/加上押金
				if(that.options.phoneDepositPayOnline=='true'){
					newPrice = this.returnFloat(that.options.amount*1 + that.options.phoneDeposit*that.options.deviceNum);
				}else{
					newPrice = this.returnFloat(that.options.amount*1 - that.options.phoneDeposit*that.options.deviceNum);
				}
				that.options.amount = newPrice;
				//改变订单信息
				var postData = {
					orderId: that.options.orderId,
					phoneDepositPayOnline: that.options.phoneDepositPayOnline,
					amount: newPrice
				};
				that.loadingStatus = true;
				that.axios.post( "https://api.localpanda.com/api/order/activity", JSON.stringify(postData), {
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(function(response) {
					that.loadingStatus = false;
					if(that.options.currency !='CNY'){
						document.querySelector('#paypal-button-container').innerHTML = '';
						that.paypal();
					}
				},function(response) {
					that.options.amount = that.options.amountDefault;
					that.loadingStatus = false;
				});
			},
			analyticsGa(data){
				//电商ga
				ga('ecommerce:addTransaction', {
					'id': data.orderId,  // Transaction ID. Required.
					'affiliation': data.payType,   // Affiliation or store name.
					'revenue': data.amount,               // Grand Total.
					'currency': data.currency
					// 'shipping': '',                  // Shipping.
					// 'tax': ''                     // Tax.
				});
				ga('ecommerce:addItem', {
					'id': data.orderId,    // Transaction ID. Required.
					'name': data.title,    // Product name. Required.
					'sku': data.activityId,                 // SKU/code.
					'category': 'ACTIVITY',         // Category or variation.
					'price': data.amount,                 // Unit price.
					'currency': data.currency,
					'quantity': '1'             // Quantity.
				});
				ga('ecommerce:send');
			},
			getSymbol(currency){
				var currencyData = this.currencyData;
				for(var i=0;i<currencyData.length;i++){
					var thisData = currencyData[i];
					if(thisData.code==currency){
						return thisData.symbol;
					}
				}
				return '$'
			},
			jumpStatusPage(status,msg){
				if(status==true){
					window.location.href = "/payment/success?category=PHONE&orderId=" + this.orderId;
				}else{
					window.location.href = "/payment/failed?category=PHONE&orderId=" + this.orderId + (msg ? '&errMsg='+msg : '');
				}
			}
		},
		created: function() {
			
		},
		mounted: function() {

			this.options.days = 2;
			this.options.symbol = this.getSymbol(this.options.currency);

			//检测支付状态
			if(this.options.status=='PAYMENT_PENDING'){

				//paypal支付
				if(this.options.currency !='CNY'){
					this.paypal();
				}
				
				//stripe支付
				this.stripeFn();

			}else if(this.options.status=='CANCELED'){
				this.dialogStatus = true;
				this.dialogStatusText = 'The order has expired. ';
			}else{
				this.dialogStatus = true;
				this.dialogStatusText = 'The order has been paid.';
			}

			//this.getToken()
			this.logIn = window.localStorage.getItem("logstate")

			if(!this.logIn) {
				this.logInHide = true;
			}

		},
		watch:{
			'options.phoneDepositPayOnline':function(val){
				this.orderUpdate();
			}
		}
	}
</script>

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
				width: 750px;

				.panda_phone{
					margin-top: 30px;
					font-size:16px;
					padding: 20px;
					background-color:rgba(0, 0, 0, 0.03);
					.deposit_list{
						margin-top: 10px;
						.radio_label{
							overflow: hidden;
							line-height: 20px;
							margin-top: 5px;
							margin-left: 0;
							
						}
						
					}
					p{ color: #878787;}
				}
				
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
					h3 {
						font-size: 18px;
						font-weight: bold;
					}
					.serviceform {
						margin-top: 15px;
						padding: 25px 0;
						border-top: 1px solid #dde0e0;
						border-bottom: 1px solid #dde0e0;
						p {
							line-height: 24px;
							font-size: 18px
						}
					}
				}
				.date {
					padding: 25px 0;
					border-bottom: 1px solid #dde0e0;
					p {
						font-size: 18px;
						// span{ font-size: 14px;}
						span{ display: block; padding:8px 0 0 85px; font-size: 14px;}
					}
				}
				.pic {
					padding: 25px 0;
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
						margin-top: 10px;
						font-size: 18px;
					}
				}
				.total {
					padding-top: 25px;
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
			position: relative;
			overflow: hidden;
			.paypal-button{
				display: none;
				&:last-child(){
					display: block;
				}
			}
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

		.order_status{
			text-align: center;
			p{
				text-align: center;
				font-size: 24px;
				padding: 20px 0 40px;
				font-weight: bold;
			}
			.btn{
				display: inline-block;
				height: 38px;
				padding: 0 30px;
				line-height: 36px;
				margin-top: 0.3rem;
				border-radius: 19px;
				font-size: 16px;
				text-align: center;
				color: #fff;
				margin: 0 20px;
				background-image: -webkit-gradient(linear, right top, left top, from(#009efd), to(#1bbc9d)), -webkit-gradient(linear, left top, left bottom, from(#1bbc9d), to(#1bbc9d));
    		background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%), linear-gradient(#1bbc9d, #1bbc9d);
			}
		}
	}
</style>

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
		.paypalBtn{
			.paypal-button{
				display: none!important;
				&:nth-last-child(1){
					display: block!important;
				}
			}
		}

		

	}
</style>