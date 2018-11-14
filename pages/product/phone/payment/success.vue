<template>
	<div class="success">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="successInfo">
			<!-- <div class="link">
				<a href="javascript:">1. Fill in your information</a>
				<i class="iconfont">&#xe620;</i>
				<a href="javascript:">2. Select payment method</a>
				<i class="iconfont">&#xe620;</i>
				<a href="javascript:">3. confirmation</a>
			</div> -->
			<h3>Confirmation</h3>
			<div class="odermesg">
				<div class="title">
					<span class="iconfont">&#xe61e;</span>
					<b>Your booking is Complete! You made a great choice :)</b>
				</div>
				<div v-if="payType!='PHONE'">
					<div class="detail">
						<span v-if="orderInfo.activityInfo">{{orderInfo.activityInfo.title}}</span>
					</div>
					<div class="detail">
						<span><i>Order ID:</i> {{orderId}}</span><em>|</em><span><i>Payment Amount:</i> <b>{{orderInfo.currency+' '+orderInfo.symbol}}{{orderInfo.amount}}</b></span>
					</div>
					<div class="detail">
						<span><i>Number of {{(orderInfo.adultNum+orderInfo.childrenNum)>1?'Travelers':'Traveler'}}:</i> {{orderInfo.adultNum+orderInfo.childrenNum}}</span><em>|</em><span><i>Travel Date:</i> {{formatDate(orderInfo.startDate)}}</span>
					</div>

				</div>

				<div class="" v-else>
					<div class="detail">
						<span>Panda Phone Service</span>
					</div>
					<div class="detail">
						<span><i>Order ID:</i> {{orderId}}</span><em>|</em>
						<span><i>Payment Amount:</i> <b>{{orderInfo.currency+' '+symbol}}{{orderInfo.amount}}</b></span>
						
					</div>
					<div class="detail">
						<span><i>Number of devices:</i> {{orderInfo.deviceNum}}</span><em>|</em>
						<span><i>Duration :</i> {{getDays(orderInfo.startDate,orderInfo.endDate)}} Days <dfn>({{formatDate(orderInfo.startDate)}} - {{formatDate(orderInfo.endDate)}})</dfn></span>
					</div>
				</div>
				
				<!-- <p style="margin-top: 10px;"> Our staff will confirm with you as soon as possible. We will reply you within one business day. You can know the details furthur by look at your order details.You can also email service@localpanda.com or call us at +86 (21) 8018-2090/ +1 (888) 930-8849 (US toll free).</p>				

				<p class="c_666" v-if="showTipTxt && payType!='guide'">You ordered as a guest. You can click this button to view your order details.</p> -->


				<div class="panda_phone_tip" v-if="ppType==3 && showPhoneTip">
					<p>Your Panda Phone delivery info has been successfully submitted. Please ensure your phone number and email are correct so we can reach you in case any issues arise. We will contact you via email prior to your departure to confirm the delivery location, date, and time.<br><br>
Your Delivery Info:<br>
<span>Location：</span>Hotel<br>
<span>Pick-up Date：</span>{{formatDate(orderInfo.startDate)}} {{pickUpTime}}<br>
<span>Hotel Name & Address：</span>{{hotel}}<br><br>
Thank you for choosing Local Panda, we hope you have a great trip!<br>
If you have any questions or concerns, feel free to contact us.</p>
				</div>

				<div class="panda_phone_tip" v-if="ppType==1">
					<p>You chose: “I haven't decided yet. I'll contact you later” for your delivery information, so we will still need to confirm this prior to your departure.</p>
					<p>You will receive a booking email from service@localpanda.com. Once you've confirmed your travel plans please reply to our email and provide us with your delivery date and location.  Please provide this information at least 24 hours prior to your departure so we can ensure delivery of your Panda Phone.</p>
					<p>Thank you for choosing Local Panda, we hope you have a great trip!</p>
					<p>If you have any questions or concerns, feel free to contact us.</p>
					<!-- <p>If you have any questions or concerns, feel free to contact us using the info at the bottom of the page.</p> -->
				</div>
				

				<!-- <div class="service_box" v-if="orderInfo.contactInfo">
					<p class="tip_detail">In the meantime, a confirmation email has been sent to“{{orderInfo.contactInfo.emailAddress}}”, Please check. If you have not received it, please check your junk mail folder. If you still do <br>not see it, please <a @click="showEmailBox=true">click here</a> to enter your correct or alternative email address.</p>
					<div class="email_box" v-show="showEmailBox">
						<input type="text" v-model="inqueryEmail">
						<span class="btn_sendemail" @click="sendEmail">Resend email address</span>

						<div class="email_tip red" v-show="emailTip">Please enter a valid email</div>
						<div class="email_tip green" v-show="emailSendTip"><i class="iconfont">&#xe654;</i> Email address has been updated ,and We have sent an email to your new mailbox</div>
					</div>
				</div> -->

				<a class="backorderbtn" v-if="payType!='guide' && orderInfo.contactInfo" :href="logIn ? '/user/myBookings' : '/user/myBookings?email='+orderInfo.contactInfo.emailAddress+'&orderid='+orderId">View My Order</a>
			</div>

			<service></service>
			
		</div>
		<FooterCommon></FooterCommon>
	</div>
</template>
<script>
	if (process.browser) {
	  // require('~/assets/js/pages/talk.js')
	}
	import {getPriceMark,formatDate} from '~/assets/js/plugin/utils.js'
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon'
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	import service from '~/components/pageComponents/inquiry/service';
	import {radioGroup,radio} from "~/plugins/panda/radio/";
	import Validate from "~/plugins/panda/validate/";
	import Flatpickr from 'flatpickr';
	require('~/assets/scss/G-ui/flatpickr.min.css')
	import Vue from 'vue'
	export default {

		name: 'payNow',
		async asyncData({
			apiBasePath,
			route,
			error
		}) {

			let query = route.query;
			var orderInfo = '';

			try {
				orderInfo = await Vue.axios.get(apiBasePath + "product/phone/" + query.orderId);
			} catch(err) {
				return error({
					statusCode: 500,
					message: JSON.stringify(err)
				});
			};

			return {
				orderInfo: orderInfo ? orderInfo.data : ''
			}
		},
		data() {
			var query = this.$route.query;
			var payType = query.payType;
			let orderId=query.orderId;
			let amount=query.amount;
			let currency=query.currency;
			return {
				orderId:orderId,
				amount:'',
				logIn:'',
				date:"",
				userId:'',
				email: '',
				showTipTxt: false,
				payType: query.category,
				symbol: '',
				currency:'',


				serviceData:{id:orderId,type:'payment'},


				
				emailTip:false,
				emailSendTip:false,
				showEmailBox:false,
				inqueryEmail:'',

				//手机送达方式
				ppType:3,
				arrivalDate:'',
				flightNumber:'',
				hotel:'',
				pickUpTime:'',
				showPhoneTip:false
				
			}
		},
		 head() {
			let title = 'Order Complete! - Localpanda.com ';
			let description = 'Your Order is confirmed! You should received a confirmation email from us shortly. '
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
				]
			};
		},
		components: {
			HeaderCommon,
			FooterCommon,
			service,
			radioGroup,
			radio
		},
		methods: {
			// getPriceMark:getPriceMark,
			formatDate:formatDate,
			getDays(startDate,endDate){
				var startArr = startDate.split('-'),
					endArr = endDate.split('-');
				var dateS = new Date(startArr[0],startArr[1]-1,startArr[2]).getTime(),
          dateE = new Date(endArr[0],endArr[1]-1,endArr[2]).getTime();
				var days = (dateE - dateS)/1000/60/60/24+1;
				return days;
			},
			sendEmail(){
				var that = this;
				if(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.inqueryEmail)){

					//默认是修改feedback的邮箱
					var postData = {
						contactInfo:{
							emailAddress: this.inqueryEmail
						},
						orderId: this.orderId
					};
					var postUrl = 'https://api.localpanda.com/api/order/activity/email';

					//修改邮箱请求
					that.axios.post(postUrl, JSON.stringify(postData), {
						headers: {
							'Content-Type': 'application/json'
						}
					}).then(function(response) {
						if(response.data.succeed) {
							that.emailSendTip = true;
							that.orderInfo.contactInfo.emailAddress = that.inqueryEmail;
							that.inqueryEmail = '';
						};

					}, function(response) {

					})
					this.emailTip = false;
				}else{
					this.emailTip = true;
				}
			},
			
			
		},
		mounted: function() {

			this.$nextTick(()=>{
				new Flatpickr('.js_changetime',{
					minDate: new Date(),
				});
				//var aaa = new Flatpickr('#js_changetime1');
				// new Flatpickr('#js_changetime2');
				this.fromValidate = new Validate({
					inputClassName:'js_validate', //需要校验的input的className
					errorClassName:'valError'  //报错时，会自动在input上添加的className
				});
			});

			//设置货币符号
			for(var i=0;i<this.currencyData.length;i++){
				var thisData = this.currencyData[i];
				if(thisData.code == this.orderInfo.currency){
					this.symbol = thisData.symbol;
				}
			}

			//显示panda phone提示
			if(this.payType =='PHONE'){
				this.showPhoneTip = true;
				if(this.orderInfo.phoneHireInfo && this.orderInfo.phoneHireInfo.hotel){
					this.hotel = this.orderInfo.phoneHireInfo.hotel;
					this.pickUpTime = this.orderInfo.phoneHireInfo.pickUpTime;
				}else{
					this.ppType = 1;
				}
				
			}

			console.log(this.orderInfo);
			
			this.logIn=window.localStorage.getItem("logstate")
			this.userId=window.localStorage.getItem("userid")

			if(!this.logIn){
				this.showTipTxt = true;
			}


			

		}
	}
</script>

<style lang="scss" scoped>
//@import '~/assets/scss/base/_setting.scss';
	.successInfo{
		width: 1170px;
		margin:0 auto;
		padding: 60px 0 100px;
		position: relative;
		.contact{
			position:absolute;
			bottom:221px;
			left:793px;
			p{
				color: #353a3f;
				font-size: 18px;
				&:first-child{
					font-weight: bold;
				}
			}
		}
		
		
		.link {
			a {
				font-size: 16px;
				color: #353a3f;
				cursor:auto; 
			}
			i {
				font-size: 10px;
				color: #dde0e0;
				margin: 0 20px;
			}
		}
		h3{
			font-weight: bold;
			font-size:36px;
			margin: 0 0 44px;
			
		}
			.odermesg{
				padding:0 0 30px 50px;
				.title{
					position: relative;
					span{
						position: absolute;
						left:-52px;
						top:0;
						color:#fff;
						width: 34px;
						height: 34px;
						border-radius: 50%;
						text-align: center;
						line-height: 34px;
						background:#1bbc9d;
					}
					b{
						font-size: 24px;
					}
					
				}
				.detail{
					margin-top: 10px;
					span{
						font-size: 18px;
						b{
							color: #1bbc9d;
							margin-left: 5px;
						}	
						i{
							font-style:normal;
							color: #666;
							margin-right: 5px;
						}
					}
					em{
						vertical-align: top;
						color:#878e95;
						margin:3px 22px 0px;
						display: inline-block;
					}
					dfn{
						margin-left: 10px;
						font-size: 16px;
						font-style: normal;
					}
				}
				p{
					margin-top: 10px;
					font-size:16px;
					color: #878e95;
					
				}
				.c_666{
					color: #666;
				}
				.backorderbtn{
					display: inline-block;
					width: 200px;
					height: 40px;
					border-radius: 4px;
					text-align: center;
					line-height: 40px;
					margin: 20px auto 0;
					background: #1bbc9d;
					color: #fff;
					font-size: 18px;
					font-weight: bold;
					cursor: pointer;
				}

				.panda_phone{
					margin-top: 20px;
					padding: 20px;
					background-color: rgba(0,0,0,0.04);
					font-size: 16px;
					h4{
						font-size: 18px;
						color: #353a3f;
						margin-bottom: 15px;
						font-weight: bold;
					}
					h5{ margin-top: 10px;font-size: 16px;}
					p{margin: 0;}
					.panda_phone_check{
						margin-top: 10px;
						.phone_check_list{
							margin-top: 10px;
							padding: 10px 0;
							input{
								padding: 0 10px;
								height: 32px;
								line-height: 32px;
								margin:0 50px 0 10px;
								border: 1px solid #ccc;
								font-size:16px;
							}
							.w500{
								width: 500px;
							}
						}
					}
					.btn{
						display: inline-block;;
						height: 42px;
						line-height: 42px;
						text-align: center;
						width: 160px;
						margin-top: 10px;
						background-image: -webkit-gradient(linear, right top, left top, from(#009efd), to(#1bbc9d));
						background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
						border-radius: 21px;
						color: #fff;
						font-size: 16px;
						box-sizing: border-box;
						cursor: pointer;
						font-weight: bold;
					}
				}
				.panda_phone_tip{
					margin-top: 20px;
					padding: 20px;
					background-color: rgba(0,0,0,0.04);
					font-size: 16px;
					p{
						color: #353a3f;
						span{ color: #878e95; margin-right: 5px;}
					}
				}
				.panda_phone_no{
					margin-top: 20px;
					p{
						// color: #353a3f;
						margin-top: 10px;
						span{ color: #878e95; margin-right: 5px;}
					}
				}
			}

		.service_box{
			font-size: 14px;
			.tip_detail{ 
				margin-top: 20px; font-size: 14px; line-height: 22px;
				a{ color:#00B886; cursor: pointer;
					&:hover{ text-decoration: underline;}
				}
			}
			.email_box{
				margin-top: 10px;
				input{
					width: 300px;
					border: 1px solid #ddd;
					height: 32px;
					line-height: 32px;
				}
				.btn_sendemail{
					display: inline-block;
					height: 32px;
					border-radius: 16px;
					line-height: 30px;
					padding: 0 20px;
					font-size: 14px;
					cursor: pointer;
					background-image: -webkit-gradient(linear, right top, left top, from(#009efd), to(#1bbc9d));
					background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
					color: #fff;
					margin-left: 10px;
				}
			}
			.email_tip{
				margin-top: 9px;
				i{
					font-size: 14px;
				}
			}
			
			
		}
	}
</style>


<style lang="scss">
	//@import '~/assets/scss/_main.scss';
	//@import '~/assets/font/iconfont.css';
.success{
	#header {
		box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
	}
	#header {
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
	.flatpickr-input{
		padding: 0 10px!important;
		width: 200px!important;
		height: 32px!important;
		line-height: 32px!important;
		margin:0 50px 0 10px!important;
		border: 1px solid #ccc!important;
		font-size:16px!important;
	}
	.valError{
		border: 1px solid #e14f3f!important;
	}
}
</style>