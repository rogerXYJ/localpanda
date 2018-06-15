<template>
	<div class="email">
		<div class="emailContent">
			<i class="iconfont" @click="cancel">&#xe606;</i>
			<h3>Want More China Travel Inspiration & Tips?</h3>
			<p>Join the Local Panda Email Club for Free!</p>
			<div class="emailInput">
				<input  v-model="email" :class="{err:emailErr}" @focus="focusFn" placeholder="Enter your email"/>
				<button class="btnlinner" @click="submit">Subscribe</button>
			</div>
			<div class="checkout">
				<checkbox v-model="checked">Do not display again</checkbox>
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
				let obj={
					checked:true,
					ishidden:false
				}
				this.$emit('hidden',obj)
				this.$emit('ishowFn',true)
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
						that.axios.post("https://api.localpanda.com/api/user/feedback/commit", JSON.stringify(obj), {
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
								that.$emit('hidden',obj)
								that.$emit('ishowFn',true)
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
	.btnlinner{
		margin-top:0;
		width: 128px;
		height: 38px;
		display: inline-block;
		font-size: 16px;
		font-weight: bold;
	}
	.checkbox_content{
		color: #878e95;
		font-size: 16px;
	}
	.checkbox_box{
		background: #fff;
	}
</style>
<style lang="scss" scoped>
	
	.email{
		position:fixed;
		bottom: 20px;
		right: 20px;
		z-index: 999999;
		.emailContent{
			padding: 54px 80px;
			background: #353a3f;
			position: relative;
			i{
				position: absolute;
				top: 12px;
				right: 12px;
				color: #fff;
				font-size: 20px;
				font-weight: bold;
				color: #fff;
				cursor: pointer;
			} 
			h3{
				color: #fff;
				font-weight: bold;
				font-size: 20px;
			}
			p{
				color: #fff;
				font-size: 16px;
				margin-top: 20px;
			}
			.emailInput{
				margin-top: 20px;
				input{
					width: 284px;
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
				margin-top: 20px;
			}
		}
		.err{
			border:1px solid red;
			color: red;
		}
		
	}
</style>