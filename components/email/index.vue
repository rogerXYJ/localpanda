<template>
	<div class="email">
		<div class="emailBox">
			<div class="bg">
				<i class="iconfont" @click="cancel">&#xe606;</i>
				<div class="emailContent">
					<div class="bg_box">
						<h3>Want More China Travel Inspiration & Tips?</h3>
						<p>Join the Local Panda Email Club for Free!</p>
						<div class="emailInput">
							<input  v-model="email" :class="{err:emailErr}" @focus="focusFn" placeholder="Enter your email"/>
							<button class="btn" @click="submit">Subscribe</button>
						</div>
						<div class="checkout">
							<checkbox v-model="checked">Do not display again</checkbox>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { regExp } from '~/assets/js/plugin/utils'
	import {checkbox} from "~/plugins/panda/checkbox/"
	export default {
		name: 'email',
		data() {
			return {
				email:'',
				emailErr:false,
				isclick:false,
				checked:false
			}
		},
		methods: {
			cancel(){
				if(this.checked==true){
					localStorage.setItem('key',true)
				}
				let obj={
					checked:this.checked,
					ishidden:false
				}
				let options={
					isshowFn:true,
					isShowAlert:false
				}
				this.$emit('hidden',obj)
				this.$emit('ishowFn',options)
				
			},
			focusFn(){
				this.emailErr=false
			},
			submit(){
				let that=this
				if(!regExp.isEmail(that.email)){
					that.emailErr=true
				}else{
					let obj={
						objectType:"SUBSCRIBE",
						userName:"x",
						emailAddress:that.email,
						message:"x",
						"utcOffset": new Date().getTimezoneOffset() / 60 * -1
					}
					if(!that.isclick){
						that.axios.put("https://api.localpanda.com/api/user/feedback", JSON.stringify(obj), {
							headers: {
								'Content-Type': 'application/json; charset=UTF-8'
							}
						}).then(res=>{
							
							if(res.data.succeed){
								that.isclick=true
								let obj={
									checked:true,
									ishidden:false
								}
								let options={
									isshowFn:true,
									isShowAlert:true
								}
								that.$emit('hidden',obj)
								that.$emit('ishowFn',options)
								localStorage.setItem('key',true)
							}
							
						},res=>{})
					}
				}
			}
			
		},
		
		components: {
			checkbox
		},
		mounted: function() {
			
		}
	}
</script>
<style lang="scss">
.email{
	.checkbox_content{
		color: #878e95;
		font-size: 16px;
	}
	.checkbox_box{
		background: #fff;
	}
}
	
</style>
<style lang="scss" scoped>
	
	.email{
		position:fixed;
		bottom: 0;
		right: 0;
		left: 0;
		top: 0;
		z-index: 999999;
		background: rgba(0,0,0,0.6);
		.emailBox{
			width: 750px;
			height: 470px;
			position:absolute;
			top:50%;
			left:50%;
			transform: translate(-50%,-50%);
			.bg{
				height: calc(100% - 20px);
				width: calc(100% - 20px);
				background: url("https://cloud.localpanda.com/content/landingpage/bg.png") no-repeat;
				background-position: center;
				background-size: cover;
				position: relative;
				padding: 10px;
				i{
					position: absolute;
					top: 22px;
					right: 22px;
					color: #fff;
					font-size: 20px;
					font-weight: bold;
					color: #fff;
					cursor: pointer;
				} 
			}
		}
		.emailContent{
			width: 670px;
			height: 254px;
			background: #353a3f;
			position: absolute;
			bottom: 30px;
			left: 50%;
			transform: translateX(-50%);
			background: rgba(0,0,0,0.6);
			
			.bg_box{
				margin-left: 64px;
				margin-top: 38px;
				
			}
			h3{
				color: #fff;
				font-weight: bold;
				font-size: 26px;
			}
			p{
				color: #fff;
				font-size: 16px;
				margin-top: 16px;
			}
			.emailInput{
				margin-top: 23px;
				input{
					width: 348px;
					height: 38px;
					background-color: #ffffff;
					border-radius: 19px;
					border: none;
					display: inline-block;
					vertical-align: top;
					margin-right: 16px;
					font-size: 16px;
				}
			}
			.checkout{
				margin-top: 38px;
			}
			.btn{
				width: 170px;
				height: 38px;
				display: inline-block;
				font-size: 16px;
				font-weight: bold;
				color: #f5f5f5;
			    border-radius: 21px;
			    background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%), linear-gradient( #1bbc9d, #1bbc9d);
			    background-blend-mode: normal, normal;
			}
		}
		.err{
			border:1px solid red;
			color: red;
		}
		
	}
</style>