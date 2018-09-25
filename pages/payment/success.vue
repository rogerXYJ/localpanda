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

				<div class="detail">
					<span>{{orderInfo.activityInfo.title}}</span>
				</div>
				<div class="detail">
					<span><i>Order ID:</i> {{orderId}}</span><em>|</em><span><i>Payment amount:</i> <b>{{orderInfo.currency+' '+orderInfo.symbol}}{{orderInfo.amount}}</b></span>
				</div>
				<div class="detail">
					<span><i>Number of travelers:</i> {{orderInfo.adultNum+orderInfo.childrenNum}}</span><em>|</em><span><i>Travel date:</i> {{orderInfo.startDate}}</span>
				</div>
				
				<!-- <p style="margin-top: 10px;"> Our staff will confirm with you as soon as possible. We will reply you within one business day. You can know the details furthur by look at your order details.You can also email service@localpanda.com or call us at +86 (21) 8018-2090/ +1 (888) 930-8849 (US toll free).</p>				

				<p class="c_666" v-if="showTipTxt && payType!='guide'">You ordered as a guest. You can click this button to view your order details.</p> -->

				<div class="service_box">
					<p class="tip_detail">In the meantime, a confirmation email has been sent to“{{orderInfo.contactInfo.emailAddress}}”, Please check. If you have not received it, please check your junk mail folder. If you still do <br>not see it, please <a @click="showEmailBox=true">click here</a> to enter your correct or alternative email address.</p>
					<div class="email_box" v-show="showEmailBox">
						<input type="text" v-model="inqueryEmail">
						<span class="btn_sendemail" @click="sendEmail">Resend email address</span>

						<div class="email_tip red" v-show="emailTip">Please enter a valid email</div>
						<div class="email_tip green" v-show="emailSendTip"><i class="iconfont">&#xe654;</i> Email address has been updated ,and We have sent an email to your new mailbox</div>
					</div>
				</div>

				<a class="backorderbtn" v-if="payType!='guide'" :href="logIn ? '/user/myBookings' : '/user/myBookings?email='+orderInfo.contactInfo.emailAddress+'&orderid='+orderId">View My Order</a>
			</div>

			<service></service>
			
		</div>
		<FooterCommon></FooterCommon>
	</div>
</template>
<script>
	if (process.browser) {
	  require('~/assets/js/pages/talk.js')
	}
	import {getPriceMark} from '~/assets/js/plugin/utils.js'
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon'
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	import service from '~/components/pageComponents/inquiry/service';
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
				orderInfo = await Vue.axios.get(apiBasePath + "order/activity/" + query.orderId)
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
				amount:amount,
				logIn:'',
				date:"",
				userId:'',
				email: this.$route.query.email,
				showTipTxt: false,
				payType: payType?payType.toLowerCase():false,
				symbol: query.symbol?query.symbol:'$',
				currency:currency ? currency : '',


				serviceData:{id:orderId,type:'payment'},


				
				emailTip:false,
				emailSendTip:false,
				showEmailBox:false,
				inqueryEmail:'',
				
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
			service
		},
		methods: {
			getPriceMark:getPriceMark,
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
//			this.orderId=GetQueryString("orderId")
//			this.amount=GetQueryString("amount")

console.log(this.orderInfo);
			
			this.logIn=window.localStorage.getItem("logstate")
			this.userId=window.localStorage.getItem("userid")

			if(!this.logIn){
				this.showTipTxt = true;
			}
		}
	}
</script>
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
}
</style>
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