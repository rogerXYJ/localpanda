<template>
    <div class="block">
    	<button class="btnlinner" @click="pay">Pay Now</button>
  </div>
</template>
<script>
//	import slider from '~/plugins/panda/slider'
export default {
    data() {
      return {
      	stripeHandler: "",	
		amount:'0.1'  
        
       
      }
	},
	head() {
		return {
			script: [
				{
					src: 'https://js.stripe.com/v3/',
					//src:'https://cloud.localpanda.com/static/js/lp/stripe.js',
					type: 'text/javascript'
				},{
					src:'https://checkout.stripe.com/checkout.js',
					type:'text/javascript'
				}
			]
		}
	},
    methods:{
		pay(){
			this.stripeHandler.open({
					name: 'Local panda', // 收款方或商家名称，比如 Beansmile
					description: "", // 待支付商品的描述
					amount: this.amount * 100, // 支付金额，单位是“分”
					locale: 'en_US',
					closed: function() {

					}
				})
		},
		getToken() {
				let that = this
				that.stripeHandler = StripeCheckout.configure({
					key: "pk_live_mRSdUvgwE4pZo2IVofL4cVch",
					image: 'https://d2q486kjf9cwwu.cloudfront.net/static/icon/logo.png', // 显示在支付对话框的图片，可自己指定
					alipay: true, // 启用支付宝支付
					token: function(token) { // 用户填写完资料并且 Stripe 校验成功后的回调函数
						// 此时应该提交 token.id 到后台，比如 http://example.com/orders/1?stripeToken={token.id}
						console.log(token.id)

					}
				})
			},
    },
    components: {
//	    slider
	  },
	  mounted:function(){
		  this.getToken()
	  }
  }

</script>

<style>
	.block{
		margin-top: 100px;
	}
</style>