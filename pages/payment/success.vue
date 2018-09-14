<template>
	<div class="success">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="successInfo">
			<div class="link">
					<a href="javascript:">1. Fill in your information</a>
					<i class="iconfont">&#xe620;</i>
					<a href="javascript:">2. Select payment method</a>
					<i class="iconfont">&#xe620;</i>
					<a href="javascript:">3. confirmation</a>
				</div>
				<h3>Confirmation</h3>
				<div class="odermesg">
					<div class="title">
						<span class="iconfont">&#xe61e;</span>
						<b>Your booking is Complete! You made a great choice :)</b>
					</div>
					<div class="detail">
						<span>Order ID: {{orderId}}</span><em>|</em><span>Payment amount: <b>{{symbol=='$'?currency+symbol:symbol}}{{amount}}</b></span>
					</div>
					<p style="margin-top: 10px;"> Our staff will confirm with you as soon as possible. We will reply you within one business day. You can know the details furthur by look at your 
order details.You can also email service@localpanda.com or call us at +86 (21) 8018-2090/ +1 (888) 930-8849 (US toll free).</p>				

					<p class="c_666" v-if="showTipTxt && payType!='guide'">You ordered as a guest. You can click this button to view your order details.</p>

					<a class="backorderbtn" v-if="payType!='guide'" :href="logIn ? '/user/myBookings' : '/user/myBookings?email='+email+'&orderid='+orderId">View My Order</a>
				</div>
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
	export default {

		name: 'payNow',
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
				currency:currency ? currency : ''
				
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
			FooterCommon
		},
		methods: {
			getPriceMark:getPriceMark
		},
		mounted: function() {
//			this.orderId=GetQueryString("orderId")
//			this.amount=GetQueryString("amount")
			
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
			margin: 64px 0 44px;
			
		}
			.odermesg{
				padding:60px 68px 54px 84px;
				box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
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
	}
</style>