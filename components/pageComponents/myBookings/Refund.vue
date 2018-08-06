<template>
	<div id="alertTitle" class="alertTitle" v-if="isShowAlertTitle">
		<div class="fixed"></div>
		<div v-bind:class="{'box animated zoomIn' : isShowAlertTitle , 'box animated zoomOut' : !isShowAlertTitle}">
			<div class="con">

				<span v-show="isShowTitle">{{alertTitle}}</span>
				<p>{{alertMessage}}</p>
			</div>
			
			<div class="selectBtn clearfix">
				<div class="btn" v-on:click="conmmitFn">Confirm</div>
				<div class="btn margin" v-on:click="cancel">Cancel</div>
			</div>
			
			
		</div>
	</div>
</template>
<script>
	export default {
		name: "alertTitle",
		props: ['isShowAlertTitle','alertTitle','alertMessage','orderId','businessType'],
		data() {
			return {
				isShowTitle:true,  //是否有标题
			}
		},
		methods: {
			conmmitFn() {
				
				let obj={
					orderId:this.orderId,
					businessType:this.businessType
				}
				this.axios.post("https://api.localpanda.com/api/payment/refund",JSON.stringify(obj),{
				headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					}
				}).then(function(response){
					if(response.data.succeed){
						
						window.location.reload()
					}
				},function(response){})
				this.$emit("setIsShowAlertFn",!this.isShowAlertTitle)
			},
			cancel() {
				this.$emit("setIsShowConfirmFn",!this.isShowAlertTitle)
			},
		},
		watch: {
			alertTitle: function(val,oldVal){ //监听是否有标题
				if(this.alertTitle == ""){  
					this.isShowTitle = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	//@import '~/assets/scss/base/_setting.scss';
	@import "~assets/scss/base/_animate.scss";
	.alertTitle {
		.fixed{
			width: 100%;
			height: 100%;
			position: fixed;
			top:0;
			left:0;
			background: #000;
			opacity: 0.7;
			z-index: 1000;
		}
		.box{
			width: 398px;
			height: 300px;
			background: #fff;
			box-shadow: 0px 0px 1px #ccc;
			position: fixed;
			margin: auto;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			z-index: 1100;
			.con{
				width:300px;
				margin: 0 auto;
				    padding: 30px 10px 30px 30px;
				span{
			
					font-size: 24px;;
					color: #353a3f;
					font-weight: bold;
					display: block;
					text-align: center;
				}
				p{
					color: #353a3f;
					font-size: 20px;
					margin-top: 26px;
					vertical-align: middle;
					
					word-wrap:break-word;
					margin-top: 26px;
				}
			}
			.selectBtn{
				height: 42px;
				margin: 25px auto 0;
				width: 86%;
				.btn{
					float: left;
					width: 45%;
					
					text-align: center;
					line-height: 30px;
					color: #fff;
					line-height: 42px;
					border-radius: 20px;
					background-image: linear-gradient(45deg,#1bbc9d 0%,#009efd 100%);
					font-size:14px; 
					&:hover{
						cursor: pointer;
					}
					
				}
				.margin{
						margin-left: 20px;
					}
				
				
				
			}
		}
	}
	
</style>