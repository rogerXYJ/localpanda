<template>
	<div id="alertTitle" class="alertTitle" v-if="isShowAlert">
		<div class="fixed"></div>
		<div v-bind:class="{'box animated zoomIn' : isShowAlert , 'box animated zoomOut' : !isShowAlert}">
			<div class="con">
				<span :class="{magin:isShowAlert}">{{alertTitle}}</span>
				<p>{{alertMessage}}</p>
				<div class="btn" v-on:click="conmmitFn">Inquire</div>
				<div class="btncancel"@click="Cancel">Cancel</div>
			</div>
			
		</div>
	</div>
</template>
<script>
	export default {
		name: "alertTitle",
		props: ['isShowAlert','alertTitle','alertMessage'],
		data() {
			return {
				isShowTitle:true,  //是否有标题

			}
		},
		methods: {
			conmmitFn() {
				this.$emit("setIsShowAlert",!this.isShowAlert)	
				document.documentElement.scrollTop=document.querySelector("#footercommon").offsetTop-100
			},
			Cancel(){
				this.$emit("setIsShowAlert",!this.isShowAlert)	
			}
		},
		watch: {
			alertTitle: function(val,oldVal){ //监听是否有标题
				if(val == ""){ 
					this.isShowTitle = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/scss/base/_setting.scss";
	@import "../../assets/scss/base/_animate.scss";
	.alertTitle {
		.fixed{
			width: 100%;
			height: 100%;
			position: fixed;
			top:0;
			left:0;
			background: #000;
			opacity: 0.7;
			z-index: 10000000000;
		}
		.box{
			width: 522px;
			height: 306px;
			background: #fff;
			box-shadow: 0px 0px 1px #ccc;
			position: fixed;
			margin: auto;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			z-index: 10000000001;
			.con{
				padding:54px; 
				span{
			
					font-size: 22px;;
					color: #353a3f;
					font-weight: bold;
					display: block;
					text-align: center;
				}
				p{
					margin-top: 30px;
					color: #353a3f;
					font-size: 18px;
					vertical-align: middle;
					text-align: center;
					word-wrap:break-word;

				}
			}
			.btn{
				
				height: 42px;
				border-radius: 20px;
				background-image: linear-gradient(45deg,#1bbc9d 0%,#009efd 100%);
				margin-top: 30px;
				text-align: center;
				line-height: 30px;
				color: #fff;
				line-height: 42px;
				font-size:18px; 
				&:hover{
					cursor: pointer;
				}
			}
			.btncancel{
				height: 42px;
				border-radius: 20px;
				text-align: center;
				line-height: 30px;
				color: #1bbc9d;
				line-height: 42px;
				font-size:18px; 
				&:hover{
					cursor: pointer;
				}
			}
		}
	}
	
</style>