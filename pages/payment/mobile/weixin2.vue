<template>
	<div class="pay">
		<p>订单ID：652650022</p>
		<p>产品名称：鼠标</p>
		<p>价格：150元</p>
		<span class="btn" @click="btnPay">支付</span>
		<div>{{dataInfo}}</div>
		<div style="color:#f60;">{{dataInfo2}}</div>
	</div>
</template>
<script>
	//import wx from '~/assets/js/plugin/wx/jweixin-1.2.0.js';
	//require('~/assets/js/plugin/wx/jweixin-1.2.0.js');


	export default {
		name: 'wxPay',
		data() {
			var wxcode = this.$route.query.code;
			
			return {
				orderId:'',
				wxcode: wxcode,
				payData: '',
				dataInfo:'xxxxx' + wxcode,
				dataInfo2:'zzzz'
			}
		},
		components: {
			
		},
		methods: {
			btnPay(){
				
				this.wxPay({
					tradeType: 'MWEB',
					objectId: '1106535208',
					amount : 1,
					objectType : 'ACTIVITY'
				})
				
			},
			wxPay(postData){
				var self = this;
				self.axios.post("https://www.localpanda.cn/api/payment/pay/wechat",JSON.stringify(postData), {
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					}
				}).then(function(response) {
					var data = response.data;
					if(data.return_code == 'SUCCESS'){
						alert(data.mweb_url)
						var payurl = data.mweb_url + '&redirect_url=' + encodeURIComponent('https://www.baidu.com');
						console.log(payurl);
						location.href = payurl;
					}else{
						alert(data.return_msg)
					}
					//alert(JSON.stringify());
					console.log(data);
					//location.href = ''
					
				}, function(response) {})
			}
		},
		mounted: function() {
			
		}
	}
</script>
<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';
</style>
<style lang="scss" scoped>

	.pay{
		p{
			padding: 10px 20px;
			font-size: 14px;
		}
	}
	.btn{ 
		display: block;
		margin:20px auto 0;
		cursor: pointer;
		width:200px;
		height: 32px;
		line-height: 32px;
		text-align: center;
		color:#fff;
		background-color:#f90;
	}

</style>