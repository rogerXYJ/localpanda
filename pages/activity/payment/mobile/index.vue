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
						<div class="formula" v-if="opctions.childrenNum==0&&opctions.adultNum==1">${{returnFloat(opctions.averagePrice)}} x 1 Person</div>
						<div class="formula" v-else>$ {{returnFloat(opctions.averagePrice)}} x {{opctions.adultNum+opctions.childrenNum}} People </div>
						<div class="adultPic">$ {{returnFloat(cutXiaoNum(opctions.averagePrice*(opctions.adultNum+opctions.childrenNum),1))}}</div>
					</div>
					<div class="child" v-if="opctions.childDiscount">
						<b>- ${{returnFloat(opctions.childDiscount)}}</b> for child(ren)
					</div>
					<div class="child" v-if="opctions.couponDiscount">
						<b>- ${{returnFloat(opctions.couponDiscount)}}</b> for discount
					</div>

				</div>
				<div class="total clearfix">
					<div class="totle-title">Total (USD)</div>
					<div class="totalPic">${{returnFloat(opctions.amount)}}</div>
				</div>
				<div class="hint">
					<p>You ordered as a guest. To view your order details, go to the homepage, click "My Bookings" at the top of the page, and type in the name and email address for your reservation.</p>
					<p>You can get a 100% refund up to {{refundTimeLimit}} hours before your trip.Please be assured to book your trip.</p>
				</div>
			</div>
			<div class="btn">
				<button @click="pay">Next</button>
			</div>
		</div>
	</div>

</template>

<script>
	if(process.browser) {
		require('~/assets/js/plugin/flexible.js')
		require('~/assets/js/pages/ga.js')
	}
	import { GetQueryString } from '~/assets/js/plugin/utils.js'
	import api from '~/assets/js/plugin/api.js'
	import Vue from 'vue'

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
			return {
				opctions: {
					averagePrice: 0,
					childrenNum: 0,
					adultNum: 0,
					amount: 0,
					couponDiscount: 0
				},
				stripeHandler: "",
				orderId: '',
				logIn: '',
				email: '',
				token: '',
				tokenType: '',
				refundTimeLimit:"",

			}
		},
		components: {
		},
		methods: {
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
					key: fb_code,
					image: 'https://d2q486kjf9cwwu.cloudfront.net/static/icon/logo.png', // 显示在支付对话框的图片，可自己指定
					alipay: true, // 启用支付宝支付
					token: function(token) { // 用户填写完资料并且 Stripe 校验成功后的回调函数
						// 此时应该提交 token.id 到后台，比如 http://example.com/orders/1?stripeToken={token.id}

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

							if(response.data.succeed) {

								var pageTracker = _gat._getTracker("UA-107010673-1");
								pageTracker._addTrans(that.orderId, "", that.opctions.amount, "", "", "", "", "");
								pageTracker._addItem(that.orderId, that.opctions.activityId, "", "", that.opctions.amount, "1");
								pageTracker._trackTrans();
								window.location.href = "/payment/success?orderId=" + that.orderId + '&amount=' + that.opctions.amount
							}
							//
						}, function(response) {})
					}
				})
			},
			getInfo() {
				let that = this
				Vue.axios.get(this.apiBasePath + "activity/order/detail/" + that.orderId).then(function(res) {
					that.opctions = res.data
					that.refundTimeLimit=res.data.activityInfo.refundTimeLimit*24
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
				that.stripeHandler.open({
					name: 'Local panda', // 收款方或商家名称，比如 Beansmile
					description: "", // 待支付商品的描述
					amount: that.opctions.amount * 100, // 支付金额，单位是“分”
					locale: 'en_US',
					closed: function() {

					}
				})
			}
		},
		created: function() {

		},
		mounted: function() {
			this.orderId = GetQueryString("objectId")
			this.getInfo()
			this.getToken()

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
</style>