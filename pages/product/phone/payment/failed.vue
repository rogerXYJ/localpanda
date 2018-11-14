<template>
	<div class="failed">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="failedInfo">
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
						<span class="iconfont">&#xe606;</span>
						<b>Oops! Something went wrong.</b>
					</div>

					<div v-if="payType!='PHONE'">
						<div class="detail">
							<span>{{orderInfo.activityInfo.title}}</span>
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

				

                    <P v-if="errMsg" style="margin-top: 47px;">Your payment did not go through. Here is the error that you can reference: {{errMsg}}</P>
					<p style="margin-top: 30px;">If you want to proceed with payment, click "Try again." If your payment problems continue, we suggest you try using another card or contact us via call, text, email or other messaging tools listed below.</p>
                    <button class="backorderbtn" @click="tryAgain(type)">Try again</button>
				</div>

				<service status="false"></service>

			</div>
		<FooterCommon></FooterCommon>
	</div>
</template>
<script>
	if (process.browser) {
	  require('~/assets/js/pages/talk.js')
	}
	import { GetQueryString,formatDate } from '~/assets/js/plugin/utils.js'
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon'
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	import service from '~/components/pageComponents/inquiry/service';
	import Vue from 'vue'
	export default {

		name: 'failed',
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
//			let orderId=this.$route.query.orderId;
			var query = this.$route.query;
			let currency= query.currency;
			return {
				orderId:query.orderId,
				amount:query.amount,
				logIn:'',
				date:"",
				userId:'',
				type: query.type,
				errMsg:"",
				symbol: query.symbol ? query.symbol : '$',
				currency:currency?currency:'',

				//手机送达方式
				payType: query.category,
				
				
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
			formatDate:formatDate,
			getDays(startDate,endDate){
				var startArr = startDate.split('-'),
					endArr = endDate.split('-');
				var dateS = new Date(startArr[0],startArr[1]-1,startArr[2]).getTime(),
          dateE = new Date(endArr[0],endArr[1]-1,endArr[2]).getTime();
				var days = (dateE - dateS)/1000/60/60/24+1;
				return days;
			},
			tryAgain(){
				window.location.href="/product/phone/payment/?orderId=" + this.orderId + '&login=' + (this.logIn?1:0);
			}
		},
		mounted: function() {
			
			this.errMsg=GetQueryString("errMsg")?decodeURI(GetQueryString("errMsg")):'';
			
			this.logIn=window.localStorage.getItem("logstate")
			this.userId=window.localStorage.getItem("userid")
		}
	}
</script>
<style lang="scss">
	//@import '~/assets/scss/_main.scss';
	//@import '~/assets/font/iconfont.css';
.failed{
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
	.failedInfo{
		width: 1170px;
		margin:0 auto;
		padding: 0 0 100px;
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
				padding:0 68px 54px 50px;
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
						background:#e14f3f;
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
				.backorderbtn{
					width: 172px;
					height: 40px;
					border-radius: 20px;
					text-align: center;
					line-height: 40px;
					margin: 44px auto 0;
					background-image: linear-gradient(270deg,#009efd 0%,#1bbc9d 100%);
					color: #fff;
					font-size: 16px;
					font-weight: bold;
					cursor: pointer;
				}
			}
	}
</style>