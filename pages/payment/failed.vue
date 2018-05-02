<template>
	<div class="failed">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="failedInfo">
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
						<span class="iconfont">&#xe606;</span>
						<b>Oops! Some went wrong.</b>
					</div>
					<div class="detail">
						<span>Order ID: {{orderId}}</span><em>|</em><span>Payment amount: <b>${{amount}}</b></span>
						
					</div>
                    <P v-if="errMsg">Your order failed to submit. The payment failure is due to {{errMsg}}</P>
					<p style="margin-top: 47px;"> Our staff will confirm with you as soon as possible. We will reply you within one business day. You can know the details furthur by look at your 
order details.You can also email service@localpanda.com or call us at +86 (21) 8018-2090/ +1 (888) 930-8849 (US toll free).</p>
                    <button class="backorderbtn">Try again</button>
				</div>
			</div>
		<FooterCommon></FooterCommon>
	</div>
</template>
<script>
	import { GetQueryString } from '~/assets/js/plugin/utils.js'
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon'
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	export default {

		name: 'failed',
		data() {
			return {
				orderId:'',
				amount:'',
				logIn:'',
				date:"",
                userId:'',
                type:'',
                errMsg:""
				
				
			}
		},
		components: {
			HeaderCommon,
			FooterCommon
		},
		methods: {
			tryAgain(type){
                if(type==1){
                    window.location.href="/activity/payment?objectId="+this.orderId
                }else{
                    window.location.href="/guide/payment?objectId="+this.orderId 
                }
                
            }
		},
		mounted: function() {
			this.orderId=GetQueryString("orderId")
			this.amount=GetQueryString("amount")
            this.type=GetQueryString("type")
            this.errMsg= decodeURI(GetQueryString("errMsg"))
			this.logIn=window.localStorage.getItem("logstate")
			this.userId=window.localStorage.getItem("userid")
		}
	}
</script>
<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';
	#header {
		box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
	}
</style>
<style lang="scss" scoped>
@import "~assets/scss/base/_setting.scss";
	.failedInfo{
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
				padding:60px 0 54px 84px;
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