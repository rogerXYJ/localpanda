<script>
	import { regExp, GetDateStr, addmulMonth } from '~/assets/js/plugin/utils'
	import flatPickr from 'vue-flatpickr-component';
	import 'flatpickr/dist/flatpickr.css';
	export default {
		name: "contact",
		data() {
			return {
				contactActive: false,
				name: '',
				nameErr: false,
				phone: '',
				phoneErr: false,
				email: '',
				emailErr: false,
				textInfo: '',
				textInfoErr: false,
				
				peopleNub: '',
				
				//日期参数 
				dateTime: '',
				
				options:{
					minDate: GetDateStr(1),
					maxDate: addmulMonth(GetDateStr(1), 12),
				},
				isshowchoose: false,
				
				istrue: false,
				destination: '',
				isclick:false,
				
			}
		},
		components: {
			flatPickr,
		},
		methods: {
			add() {
				this.peopleNub++
				
			},
			del() {
				
			
				if(this.peopleNub == 0) {
					this.peopleNub = 0
				} else {
					this.peopleNub--
				}
			
				
			},
			setContactActive(val) {
				
				this.contactActive = val;
			},
			showchoose() {
				this.isshowchoose = true

			},
			
			namefocus() {
				this.nameErr = false
			},
			phonefocus() {
				this.phoneErr = false
			},
			emailfocus() {
				this.emailErr = false
			},
			textInfofocus() {
				this.textInfoErr = false
			},
			dateTimefocus() {
				this.dateTimeErr = false
			},
			peopleNubfocus() {
				this.isshowchoose = true
			},
			dateClear() {
				this.dateTime = ""
			},

			cancle() {
				this.$emit('contactCallback', '');
				this.contactActive = false;
			},
			gaFail(){
				window.ga && ga("gtag_UA_107010673_1.send", {
						hitType: "event",
						eventCategory: "activity_detail",
						eventAction: "submit",
						eventLabel: "activity_inquiry_fail"
					});
			},
			ok() {
				let that = this
				let ok=false;


				// else if(that.peopleNub==0){
					
				// 	that.isshowchoose=true
				// 	ok=false
				// }


				if(that.textInfo == '') {
					that.textInfoErr = true
					ok=false
				}else if(that.name == '' || regExp.isNub(that.name) || regExp.isCode(that.name)) {
					that.nameErr = true
					ok=false
					//that.gaFail()
				} else if(!regExp.isEmail(that.email)) {
					that.emailErr = true
					ok=false
				}else{
					ok=true
					window.ga && ga("gtag_UA_107010673_1.send", {
						hitType: "event",
						eventCategory: "activity_detail",
						eventAction: "submit",
						eventLabel: "activity_inquiry_succ"
					});
					if(window.localStorage.getItem("userid")) {
						var obj = {
							userId: window.localStorage.getItem("userid"),
							objectType: that.objectType,
							userName: that.name,
							emailAddress: that.email,
							message: that.textInfo,
							//phoneNumber:that.phone?that.phone:null,
							travelDate: that.dateTime ? that.dateTime : null,
							participants: that.peopleNub,
							objectId: that.objectId ? that.objectId : null,
							destinations: that.destination ? that.destination : null,
							"utcOffset": new Date().getTimezoneOffset() / 60 * -1,
							owner:that.owner
						}
					} else {
						var obj = {
							objectType: that.objectType,
							userName: that.name,
							emailAddress: that.email,
							message: that.textInfo,
							//phoneNumber:that.phone?that.phone:null,
							travelDate: that.dateTime ? that.dateTime : null,
							participants: that.peopleNub,
							objectId: that.objectId ? that.objectId : null,
							destinations: that.destination ? that.destination : null,
							"utcOffset": new Date().getTimezoneOffset() / 60 * -1,
							owner:that.owner
						}
					}
					if(that.isclick==false){
						that.isclick=true
						that.axios.put("https://api.localpanda.com/api/user/feedback", JSON.stringify(obj), {
							headers: {
								'Content-Type': 'application/json'
							}
						}).then(function(response) {
							
							if(response.data.succeed) {
								that.isclick=false
							};

							// that.$emit("isshowfn", true);
							that.$emit('contactCallback', {'data':response.data,'email':that.email});
							that.contactActive = false;
							that.name = ""
							that.email = ""
							that.phone = ""
							that.dateTime = ""
							that.textInfo = ""
							that.destination = ""
							that.peopleNub=0

						}, function(response) {

						})
					}
					
				}
				if(ok==false){
					that.gaFail()
				}

			},

			/*
			 * Actions for self-defined button
			 */

		},
		watch: {
			ContactStatus: function(val, oldVal) {
				if(val) {
					this.contactActive = true;
					document.documentElement.style.overflow = "hidden";
				} else {
					this.contactActive = false;
					document.documentElement.style.overflow = "auto";
				}
			}
		},
		mounted() {

			
			var that = this
			document.getElementsByTagName("body")[0].addEventListener('click', function() {
				that.isshowchoose = false
				
			})
		},
		props: ['ContactStatus', "guideId", "enName", "objectType", "objectId","owner"]
	}
</script>
<template>
	<div id="contact" v-bind:class="['alertTitleOuter',contactActive ? 'on' : 'off']">

		<div v-bind:class="{'boxshow animated zoomIn' : contactActive , 'boxshow animated zoomOut' : !contactActive}">
			<div class="false" @click="cancle"><i class="iconfont">&#xe629;</i></div>
			<div class="con">
				<h3 v-if="objectType=='CONSULTING'">Customize Your Trip</h3>
				<h3 v-else>Send My Inquiry</h3>
				<p v-if="objectType=='CONSULTING'">If you want to customize your trip, please send us your ideal trip information. We'll get back to you within one business day.</p>
				<ul v-if="objectType=='ACTIVITY'">
					<li>If you have questions or needs about any specific tour, we have professional consultants to answer your questions on a 1-1 basis.</li>

				</ul>
				<p v-if="objectType=='GUIDE'">Hi, I'm {{enName}}! Contact me if you want to know more about me or if you have anything you want to inquire from me. I'll reply you within one business day. </p>



				<div class="other">
					<b>Message<span>*</span></b>
					<textarea v-if="objectType=='CONSULTING'" placeholder="Please give us some further details about your trip, including your interests, requirements, or what kind of activities & experiences you are looking for" v-model="textInfo" :class="{err:textInfoErr}" @focus="textInfofocus"></textarea>
					<textarea v-else placeholder="Write a brief message to tell us a little bit about your trip including your plans, requirements, or interests." v-model="textInfo" :class="{err:textInfoErr}" @focus="textInfofocus"></textarea>
				</div>
				
				<!--<div class="email">
					<b>Email Address<span>*</span></b>
					<input :class="{err:emailErr}" v-model="email" @focus="emailfocus" @blur="emailbulr"/>
				</div>-->

				<div class="fillDate clearfix">
					<div class="date">
						<b>Date of Arrival</b>
						<div class="datetime">
							<i class="iconfont font-blue" v-if="!dateTime">&#xe60d;</i>
							<i class="iconfont cancelDate" v-else @click.stop="dateClear(dateTime)">&#xe647;</i>
							<flatPickr  v-model="dateTime" :config="options"></flatPickr>
						</div>
					</div>
					<div class="nuber">
						<b>Number of People</b>
						<!-- <span>*</span> -->
						<div class="peopleN">
							<div class="peopleshow" :class="{noBottom:isshowchoose}" @click.stop="showchoose">
								<i class="iconfont icon-people">&#xe63d;</i>
								<span v-if="peopleNub==0">Select People</span>
								<span v-if="peopleNub==1">1 Person</span>
								<span v-if="peopleNub>1">{{peopleNub}} People</span>
								<i class="iconfont icon-down" v-if="!isshowchoose">&#xe60f;</i>
								<i class="iconfont icon-down" v-else>&#xe63f;</i>
							</div>
							<div class="choosePeople" v-if="isshowchoose==true" @click.stop="peopleNubfocus">
								<div class="border">
									<b>People</b>
									<div class="operation">
										<em class="iconfont" @click.stop="del(0)">&#xe64d;</em>
										<input v-model="peopleNub" />
										<em class="iconfont" @click.stop="add(0)">&#xe64b;</em>
									</div>
								</div>
							</div>
						</div>

					</div>
					
					
				</div>

				<div class="fill clearfix">
					<div class="name">
						<b>Name<span>*</span></b>
						<input :class="{err:nameErr}" v-model="name" @focus="namefocus" />
					</div>
					<div class="phone">
						<!--<b>Phone Number</b>
						<input :class="{err:phoneErr}" v-model="phone" @focus="phonefocus"/>-->
						<b>Email Address<span>*</span></b>

						<input :class="{err:emailErr}" v-model="email" @focus="emailfocus" />
					</div>
				</div>

				<div class='destination' v-if="objectType=='CONSULTING'">
					<b>Destinations</b>
					<input v-model="destination" placeholder="Please list the destinations that you want to visit. (eg. Beijing, Forbidden City, etc)" />
				</div>
				

				<div class="btn">
					<a class="continue" @click.stop="ok()">SUBMIT</a>
					
				</div>

			</div>
		</div>

	</div>
</template>
<style lang="scss">
	.datetime{
	margin-top: 10px;
	.flatpickr-input{
		height: 30px!important;
		width: 347px!important;
		border: 1px solid  #dde0e0;
		box-sizing: border-box;
	}
	.flatpickr-calendar:before{
		border:none!important;
		
	}
}
</style>
<style lang="scss" scoped>
	//@import '~/assets/scss/base/_setting.scss';
	@import "~assets/scss/base/_animate.scss";
	@import'~/assets/font/iconfont.css';
	.alertTitleOuter {
		background: rgba(0, 0, 0, 0.5);
		height: 100%;
		width: 100%;
		position: fixed;
		z-index: 99999;
		top: 0;
		left: 0;
		&.on {
			display: block;
		}
		&.off {
			display: none;
		}
		.boxshow {
			.false {
				&:hover {
					cursor: pointer;
				}
				position: absolute;
				width: 22px;
				height: 22px;
				border-radius: 50%;
				background: #dde0e0;
				color: #fff;
				right: 10px;
				top: 11px;
				line-height: 24px;
				text-align: center;
			}
			width: 854px;
			/*height: 4.4rem;*/
			background: #fff;
			overflow: hidden;
			position: absolute;
			top: 0;
			left: 50%;
			margin-top: 100px;
			margin-left: -427px;
			box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
			.con {
				padding: 20px 30px 20px 50px;
				ul {
					margin-top: 15px;
					li {
						font-size: 16px;
						line-height: 20px;
						margin-top: 10px;
						&:first-child {
							margin-top: 0;
						}
					}
				}
				h3 {
					font-size: 24px;
					color: #353a3f;
					text-align: center;
					font-weight: 700;
				}
				p {
					color: #353a3f;
					font-size: 16px;
					margin-top: 15px;
					vertical-align: middle;
					white-space: normal;
					text-align: center;
				}
				b {
					display: block;
					font-size: 16px;
					span {
						color: red;
						font-weight: normal;
					}
				}
				.fill {
					width: 100%;
					margin-top: 15px;
					.name {
						float: left;
						input {
							width: 347px;
							height: 30px;
							border-radius: 3px;
							border: solid 1px #dde0e0;
							margin-top: 10px;
							font-size: 16px;
							box-sizing: border-box;
						}
					}
					.phone {
						float: left;
						margin-left: 30px;
						input {
							width: 347px;
							height: 30px;
							border-radius: 3px;
							border: solid 1px #dde0e0;
							margin-top: 10px;
							font-size: 16px;
							box-sizing: border-box;
						}
					}
				}
				.email {
					margin-top: 15px;
					input {
						width: 724px;
						height: 30px;
						border: solid 1px #dde0e0;
						margin-top: 10px;
						border-radius: 3px;
						font-size: 16px;
					}
				}
				.destination {
					margin-top: 15px;
					input {
						width: 724px;
						height: 30px;
						border: solid 1px #dde0e0;
						margin-top: 10px;
						border-radius: 3px;
						font-size: 16px;
					}
				}
				.other {
					margin-top: 15px;
					textarea {
						width: 724px;
						height: 80px;
						resize: none;
						border: solid 1px #dde0e0;
						margin-top: 10px;
						border-radius: 3px;
						font-size: 16px;
						padding: 10px 0 0 10px;
					}
				}
				.fillDate {
					margin-top: 15px;
					position: relative;
					z-index: 2;
					.date {
						float: left;
						.datetime {
							position: relative;
							line-height: 30px;
							i {
								position: absolute;
								left: 21px;
								font-size: 20px;
								z-index: 10;
								&.font-blue {
									color: #1bbc9d;
								}
								&.cancelDate {
									cursor: pointer;
									color: #dde0e0;
								}
							}
						}
					}
					.nuber {
						float: left;
						margin-left: 30px;
						width: 347px;
						position: relative;
						/*input{
							width: 357px;
							height: 46px;
							border-radius: 3px;
							border: solid 1px #dde0e0;
							margin-top: 10px;
							font-size: 18px;
						}*/
						.peopleN {
							position: relative;
							.peopleshow {
								margin-top: 10px;
								padding: 0 21px;
								width: 347px;
								height: 30px;
								line-height: 30px;
								border-radius: 3px;
								border: solid 1px #dde0e0;
								position: relative;
								box-sizing: border-box;
								cursor: pointer;
								i {
									position: absolute;
									&.icon-people {
										left: 21px;
										font-size: 20px;
										color: #1bbc9d;
									}
									&.icon-down {
										right: 21px;
										font-size: 8px;
									}
								}
								span {
									font-size: 16px;
									color: #353a3f;
									margin-left: 35px;
								}
							}
							.choosePeople {
								position: absolute;
								background: #fff;
								padding: 0 20px 20px;
								border-left: 1px solid #dde0e0;
								border-right: 1px solid #dde0e0;
								border-bottom: 1px solid #dde0e0;
								border-radius: 0 2px 2px 0;
								width: 347px;
								
								.border {
									padding-top: 20px;
									border-top: 1px solid #dde0e0;
									b {
										display: inline-block;
										line-height: 40px;
									}
									.operation {
										float: right;
										input {
											margin: 0 20px;
											width: 40px;
											height: 40px;
											border: 1px solid #dde0e0;
											font-size: 18px;
											font-weight: bold;
											text-align: center;
											padding: 0;
											&:hover {
												border-color: #dde0e0!important;
											}
										}
										em {
											cursor: pointer;
										}
									}
								}
							}
						}
					}
				}
				.btn {
					text-align: center;
					margin-top: 15px;
					a {
						display: inline-block;
						width: 120px;
						height: 42px;
						font-weight: bold;
						border-radius: 21px;
						border: solid 1px #1ab295;
						font-size: 14px;
						color: #1bbc9d;
						text-align: center;
						line-height: 40px;
						background-image: linear-gradient(-90deg, #009efd 0%, #1bbc9d 100%), linear-gradient(#1bbc9d, #1bbc9d);
						color: #FFF;
						cursor: pointer;
					}
				}
			}
		}
		.err {
			border: 1px solid red!important;
		}
		input,
		textarea {
			&:hover {
				border-color: #1ab295!important;
			}
		}
		.noBottom {
			border-bottom: none!important;
		}
	}
</style>