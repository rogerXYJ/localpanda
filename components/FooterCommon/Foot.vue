<template>
	<div id="footercommon">
		<div class="footInfo">
			<div class="footLeft">
				<h3>Get in touch with us</h3>
				<p>If you have any questions, suggestions, or just want to chat, feel free to contact us using the boxes below. We'll get back to you within 1 business day.</p>
				<div class="inpt">
					<input type="" name="" class="name"  :class="{borderflase:nameError}" @focus="nameF" value="" placeholder="Name" v-model="name" />
					<input type="" name="" class="email" :class="{borderflase:emailError}" value="" placeholder="Mail" v-model="email" />
				</div>
				<div class="text">
					<textarea placeholder="Message" :class="{borderflase:textareaError}" v-model="textarea"></textarea>
				</div>
				<button class="btnlinner" @click="submit">SUBMIT</button>
			</div>
			<div class="footRight">
				<h3>Reach out</h3>
				<p>We provide activities led by private guides, group tours and customized trips with authentic China expeirence for you! Contact our customer service with any questions you have.</p>
				<div class="emaillog">
					<div>
						<i class="iconfont" style="font-size: 17px;">&#xe649;</i>Contact
					</div>
					<p>+86 (21) 8018-2090</p>
					<p>+1 (888) 930-8849 (US toll free)</p>
					<p>service@localpanda.com</p>
					
				</div>
				<div class="address">
					<div><i class="iconfont">&#xe610;</i>Address</div>
					<p>762 Tianshan Rd,6F F-Town Room 630, </p>
					<p>Changning District, Shanghai 200051</p>
				</div>
			</div>
		</div>
		
		<Alert :isShowAlert="isShowAlert" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlert="getIsShowAlert"></Alert>
	</div>
	
	
	
	
</template>
<script>
	import { regExp } from '~/assets/js/plugin/utils'
	import Alert from '../Prompt/Alert'

	export default {
		props:["showBook","logIn"],
		name: 'footercommon',
		data() {
			return {
				name: '',
				email: '',
				textarea: '',
				nameError: false,
				emailError: false,
				textareaError: false,
				isShowAlert: false,//弹框返回状态
				alertMessage: "",//弹框内容
				alertTitle:'',
				isclick:false
				
			}
		},
		components:{
			Alert
		},
		methods: {
			getIsShowAlert(val) {
				this.isShowAlert = val;
			},
			gaFail(){
				ga(gaSend, {
						hitType: 'event',
						eventCategory: 'public',
						eventAction: 'submit',
						eventLabel: 'feedback_fail',
	
					});
			},
			submit() {
				let status=false
				const that = this
				if(that.name==''|| regExp.isNub(that.name)||regExp.isCode(that.name)) {
					that.nameError = true
					status=false
				} else if(!regExp.isEmail(that.email)) {
					that.emailError = true
					status=false
				} else if(that.textarea == "") {
					that.textareaError = true
					status=false
				} else {
					status=true
					ga(gaSend, {
						hitType: 'event',
						eventCategory: 'public',
						eventAction: 'submit',
						eventLabel: 'feedback_succ',
	
					});
					if(window.localStorage.getItem("userid")){
						var obj = {
							userId:window.localStorage.getItem("userid"),
							objectType:"GENERAL",
							userName: that.name,
							emailAddress: that.email,
							message: that.textarea,
							"utcOffset": new Date().getTimezoneOffset() / 60 * -1
							
						}
					}else{
						var obj = {
							objectType:"GENERAL",
							userName: that.name,
							emailAddress: that.email,
							message: that.textarea,
							"utcOffset": new Date().getTimezoneOffset() / 60 * -1
							
						}
					}
					if(that.isclick==false){
						that.isclick=true
						that.axios.put("https://api.localpanda.com/api/user/feedback", JSON.stringify(obj), {
							headers: {
								'Content-Type': 'application/json; charset=UTF-8'
							}
						}).then(function(response) {
							that.isclick=false
							if(response.data.succeed){
								that.isShowAlert=true
								that.alertTitle="Submission completed!"
								that.alertMessage="Thank you for your feedback.We will get back to you within 1 day."
								that.name=""
								that.email=""
								that.textarea=""
							}else{
								that.isShowAlert=true
								that.alertMessage="Failed!"
								that.name=""
								that.email=""
								that.textarea=""
							}
							
						}, function(response) {
	
						})
					}
						
					
				}
				if(status==false){
					that.gaFail();
				}
			},
			nameF() {
				this.nameError = false
			},
			emailF() {
				this.emailError = false
			},
			textF() {
				this.textareaError = false
			}

		},
		mounted() {
			
			
		},
		
		created(){
		}
	}
</script>
<style lang="scss">
#footercommon{
	.btnlinner {
		margin-top: 20px;
		width: 114px;
	}
}
	
</style>
<style lang="scss" scoped>
	#footercommon {
		padding: 80px 0;
		border-top: 1px solid #ebebeb;
		background: #fff;
		.footInfo {
			margin: 0 auto;
			width: 1170px;
			overflow: auto;
			.footLeft {
				float: left;
				width: 671px;
				h3 {
					font-size: 18px;
					color: #353a3f;
					font-weight: bold;
					
					
					
				}
				p {
					margin: 30px 0;
					padding-right: 20px;
					font-size: 16px;
				}
				.inpt {
					display: flex;
					display: -webkit-flex;
					display: -ms-flex;
					flex-direction: row;
					-webkit-flex-direction: row;
					-moz-flex-direction: row;
					-ms-flex-direction: row;
					align-items: center;
					input {
						border:1px solid #ebebeb;
						flex: 1;
						-webkit-flex: 1;
						-moz-box-flex: 1;
						-ms-flex: 1;
						margin-right: 17px;
						
						height: 34px;
						color: #353a3f;
						font-size: 14px;
						&:last-child {
							margin-right: 0;
						}
						
					}
				}
				.text {
					margin-top: 16px;
					height: 141px;
					width: 671px;
					textarea {
						border:1px solid #ebebeb;
						width: 100%;
						height: 131px;
						padding-top: 10px;
						padding-left: 10px;
						
						resize:none;
						font-size: 14px;
					}
				}
			}
			.footRight {
				float: right;
				width: 340px;
				h3 {
					font-size: 18px;
					color: #353a3f;
					font-weight: bold;
					
				
				}
				p {
					width: 340px;
					margin-top: 30px;
					font-size: 16px;
					&.no-margin {
						margin: 0;
					}
				}
				.emaillog,
				.address {
					margin-top: 20px;
					div {
						font-size: 16px;
						color: #1bbc9d;
						i{
							margin-right: 8px;
						}
					}
					p {
						margin-top: 10px;
					}
				}
			}
		}
	
		
	}
	.borderflase {
		border: 1px solid red!important;
	}
	
	
	
</style>