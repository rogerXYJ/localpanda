<template>
	<div class="guideDetail">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div id="guideMessage">
			
			<div class="guideMessage-m">
				<div class="linkseting">
					<a href="../../index.html">Home</a>
					<em class='iconfont'>&#xe64a;</em>
					<a v-if="detail.location=='Shanghai'" :href="'../list/'+detail.location">Shanghai Guides</a>
					<a v-else :href="'../list/'+detail.location">Beijing Guides</a>
					<em class='iconfont'>&#xe64a;</em>
					<span>{{detail.enName}}</span>
				</div>
				<div class="personalDetails">
					<div class="guide-hd">
						<div class="guidePic">
							<img :src="detail?detail.guidePhoto.headPortraitUrl:''" alt="" />
							<!--<span>View Photos (5)</span>-->
						</div>
						<div class="guidePic-right">
							<h3>Hi, I’m {{detail.enName}}!</h3>
							<p>{{detail.location}} · {{detail.gender}}</p>
							<div class="tags">
								<span v-for="item in tourTypesInStr">{{item}}</span>

							</div>
							<div class="guideBtn">
								<!--<button class="btnlinner">book service</button>-->
								<button class="btnlinner" @click="getscoll()">Check Availability</button>
								<span @click="showContact">Send My Inquiry</span>
							</div>
						</div>
					</div>
					<div class="aboutMe">
						<h3>About Me</h3>
						<div class="about" :class="{overflow:active}">
							<div class="selfIntro" v-html="selfIntro"></div>

							<div class="fel">
								<h3>My Experiences</h3>
								<div v-html="features"></div>
							</div>
						</div>
						<div v-if="showbtn==0" class="viewMore" @click="show(1)">View more</div>
						<div v-if="showbtn==1" class="viewMore" @click="show(0)">View less</div>

					</div>
					<div class="TourbyMe clearfix" v-if="activities.length>0">
						<h3>My Tours</h3>
						<ul>
							<li v-for="(item,index) in activities">
								<a :href="item.id?'../../activity/detail/'+item.id:'#'" target="__blank">
									<div class="tourPic">
										<img :src="item.coverPhotoUrl" />
										<div class="maskerInfo">
											<div class="maskerInfop">
												<div>
													<h3>Activity Intensity</h3>
													<span v-for="i in item.intensity"></span>
												</div>
												<div>
													<h3>Activity Difficulty</h3>
													<span v-for="i in item.difficulty"></span>
												</div>
												<div>
													<h3>Activity Time</h3>
													<p>{{item.duration}} hours total</p>
												</div>
											</div>

										</div>
									</div>
									<div class="type">
										<div class="type-one">
											<span>{{item.tourTypes}}</span>
										</div>
										<div class="type-two"><span>
									{{item.title}}
								</span></div>
										<!--<p>From<span>${{item.price}}</span></p>-->
									</div>
								</a>
							</li>

						</ul>
					</div>
				</div>
				<div class="guideskillDetail">
					<h3>Language(s)</h3>
					<p @click="explanation">explanation</p>
					<div class="skill">
						<div class="engilsh clearfix" v-for="i in language">
							<div class="language">{{i.language}}</div>
							<div class="levelNum">
								<span v-for="item in i.levelNum"></span>
							</div>
							<div class="level">{{i.level}}</div>
						</div>
					</div>
					<div class="impression">
						<h3>My Impression</h3>
						<div class="tagList">
							<span v-for="item in tagsInStr">{{item}}</span>
						</div>

					</div>
					<div class="TourGiven">
						<h3>Tours Given</h3>
						<div class="TourGivenNub">{{detail.serviceTimes}}</div>
					</div>
					<div class="card">
						<div class="GuideNumber" v-if="detail.guideCardNumber">
							<h3>Guide Number</h3>
							<p>{{detail.guideCardNumber}}</p>
						</div>

						<div class='cardImg' v-if="detail.guideCardNumber&&detail.guidePhoto.guideCardPhotoUrl" @mouseenter.stop="onImg" @mouseleave.stop="leaveImg">
							<img style="height: 100%;" :src="detail.guidePhoto.guideCardPhotoUrl" />
							<div class="showImg" :class="{show:showpic}">
								<img style="width: 100%;" :src="detail.guidePhoto.guideCardPhotoUrl" />
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
		<PackageOptions :guideId="guideId" :detail="detail"></PackageOptions>
		<FooterCommon></FooterCommon>
		<pic :alertPicStatus="alertPicStatus" v-on:alert-call-back="alertCallBack"></pic>
		<Explanation :alertTitleStatus="alertTitleStatus" v-on:alert-title-call-back="alertTitleCallBack"></Explanation>
		<Contact :ContactStatus="ContactStatus" v-on:isshowfn="isShowFn" v-on:contact-call-back="contactCallBack" :objectId="guideId" :enName="detail.enName" :objectType="objectType"></Contact>
		<Alert   :isShowAlert="isShowAlert" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlert="getIsShowAlert"></Alert>
	</div>
</template>

<script>
	import HeaderCommon from '../../components/HeaderCommon/HeaderCommon';

	import PackageOptions from './components/PackageOptions'
	import Pic from './components/Pic'
	import FooterCommon from '../../components/FooterCommon/FooterCommon';
	import { GetQueryString,getUrlParams } from '../../assets/js/plugin/utils'
	import Explanation from '../../components/Prompt/Explanation'
	import Contact from './components/Contact'
	import Alert from '../../components/Prompt/Alert'
	export default {
		name: 'guideDetail',
		data() {
			return {
				guideId:"",
				detail: '',
				tourTypesInStr: '',
				tagsInStr: '',
				language: '',
				activities: '',
				tourTypes: '',
				picmsg: '',
				allTourPic: [],
				features: '',
				selfIntro: '',
				active: false,
				logIn: '',
				showbtn: 0,
				alertTitleStatus: false,
				alertPicStatus: false,
				showpic: false,
				ContactStatus:false,
				isShowAlert:false,
				alertTitle:'',
				alertMessage:"",
				istrue:false,
				objectType:"GUIDE"

			}
		},
		components: {
			HeaderCommon,
			FooterCommon,
			PackageOptions,
			Explanation,
			Pic,
			Contact,
			Alert

		},
		methods: {
			isShowFn(val){
				this.istrue=val
				if(this.istrue==true){
					this.isShowAlert=true
					this.alertTitle="Submission completed!"
					this.alertMessage="Thank you for your feedback.We will get back to you within 1 day."
					this.istrue=false
				}else{
					this.isShowAlert=true
					this.alertMessage="Failed!"
				}
			},
			getIsShowAlert(val){
				this.isShowAlert=val
			},
			showContact(){
				let that=this
				ga('gtag_UA_107010673_1.send', {
					  hitType: 'event',
					  eventCategory: 'Button',
					  eventAction: 'Click',
					  eventLabel: 'guide_inquiry',
					  eventValue: that.guideId
					});
				that.ContactStatus=true
			},
			contactCallBack(val){
				this.ContactStatus=false
			},
			onImg() {
				this.showpic = true
			},
			leaveImg() {
				this.showpic = false
				
			},
			explanation() {
				this.alertTitleStatus = true
			},
			alertCallBack(val) {
				this.alertPicStatus = false;
			},
			alertTitleCallBack(val) {
				//回调后关闭弹框
				var that = this;

				that.alertTitleStatus = false;
			},
			getSelf() {
				let that = this
				that.axios.get('https://www.localpanda.com/api/guide/basic/' + that.guideId).then(function(response) {
					that.detail = response.data;
					that.tourTypesInStr = response.data.tourTypesInStr.split(","),
					that.tagsInStr = response.data.tagsInStr.split(",")
					that.features = response.data.features.replace(/\r?\n/g, "<br/>");
					that.selfIntro = response.data.selfIntro.replace(/\r?\n/g, "<br/>");
					
					var title=document.getElementsByTagName("title")[0];
					var keywords=document.querySelector("meta[name=keywords]");
					var description=document.querySelector("meta[name=description]")
					title.innerHTML="I’m Local Guide "+that.detail.enName+" | The Best Professional "+that.detail.location+" Tour Guides."
					keywords.setAttribute("content",""+that.detail.location+" Tour Guide, "+that.detail.location+" Professional Guide, Things to do in "+that.detail.location+", "+that.detail.location+" destinations, "+that.detail.location+" history, "+that.detail.location+" culture, "+that.detail.location+" locals, "+that.detail.location+" tourist attractions, "+that.detail.location+" tours")
					description.setAttribute("content","Book the best local tour guides in "+that.detail.location+", authentic tours & experiences, real local activities, cut the lines with professional guides, "+that.detail.location+"’s best history, culture, food, architecture, art, and photo, and nightlife tours.")
					
					
				}, function(response) {
					window.location.href="../../falsePage.html"
				})
			},
			getLanguage() {
				let that = this
				that.axios.get('https://www.localpanda.com/api/guide/language/' + that.guideId).then(function(response) {
					//console.log(response)
					that.language = response.data

				}, function(response) {
					window.location.href="../../falsePage.html"
				})
			},
			getActivities() {
				let that = this
				that.axios.get('https://www.localpanda.com/api/guide/activity/brief/' + that.guideId).then(function(response) {

					that.activities = response.data

					if(response.data.length == 0) {
						that.showbtn = 1
						that.active = true
					}
				}, function(response) {
					window.location.href="../../falsePage.html"
				})
			},

			getCar() {
				let that = this
				that.axios.get('https://www.localpanda.com/api/guide/vehicle/' + that.guideId).then(function(response) {
					//console.log(response)
					/*that.activities=response.data*/

				}, function(response) {

				})
			},

			getscoll() {
				let that=this
				ga('gtag_UA_107010673_1.send', {
					  hitType: 'event',
					  eventCategory: 'Button',
					  eventAction: 'Click',
					  eventLabel: 'guide_check',
					   eventValue: that.guideId
				});
				document.querySelector("#packageOptions").scrollIntoView();
			},
			show(id) {
				let that=this
				if(id == 0) {
					this.active = false
					this.showbtn = 0
					
				} else {
					this.active = true
					this.showbtn = 1
					ga('gtag_UA_107010673_1.send', {
					  hitType: 'event',
					  eventCategory: 'Button',
					  eventAction: 'Click',
					  eventLabel: 'guide_view_more',
					   eventValue: that.guideId
					});
				}

			},
			gets(){
				document.querySelector("#packageOptions").scrollIntoView();
			}

		},
		created: function() {
			this.logIn = window.localStorage.getItem("logstate")
			this.guideId=getUrlParams()
			this.getSelf()
			
		},
		mounted: function() {
			
			this.getLanguage()
			this.getActivities()
			this.getCar()
			
			

		},
		updated(){
			if(document.URL.indexOf("#")!=-1){
			
        		this.gets()
        		
					
			}
		}
	}
</script>
<style lang="scss">
	@import '../../assets/scss/_main.scss';
	@import '../../assets/font/iconfont.css';
	#headercommon {
		box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
	}
	
	.text {
		width: 671px!important;
	}
	
	
</style>
<style lang="scss" scoped>
	@import "../../assets/scss/base/_setting.scss";
	.guideDetail {
		width:100%;
		#guideMessage {
			
			.guideMessage-m {
				
				width: 1170px;
				margin: 0 auto;
				position: relative;
				.linkseting{
					padding-top: 24px;
					a{
						color: #878e95;
						font-size: 14px;
						&:hover{
							text-decoration: underline;
						}
					}
					em{
						font-size: 12px;
					}
					span{
						color: #878e95;
						font-size: 14px;
					}
				}
				.personalDetails {
					margin-top: 24px;
					width: 734px;
					.guide-hd {
						clear: both;
						.guidePic {
							float: left;
							position: relative;
							width: 376px;
							height: 252px;
							overflow: hidden;
							img {
								width: 100%;
								height: 100%;
							}
							span {
								position: absolute;
								width: 120px;
								height: 36px;
								box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
								font-size: 14px;
								color: #353a3f;
								left: 20px;
								bottom: 20px;
								background: #fff;
								border-radius: 3px;
								text-align: center;
								line-height: 36px;
							}
						}
						.guidePic-right {
							float: left;
							width: 318px;
							height: 252px;
							position: relative;
							margin-left: 40px;
							h3 {
								font-size: 32px;
								color: #353a3f;
								font-weight: bold;
							}
							p {
								margin-top: 2px;
								font-size: 14px;
								color: #1bbc9d;
							}
							.tags {
								margin-top: 10px;
								span {
									display: inline-block;
									padding: 0px 10px;
									height: 20px;
									background-color: #faf9f8;
									border-radius: 20px;
									font-size: 12px;
									color: #353a3f;
									margin-right: 10px;
									margin-bottom: 10px;
								}
							}
							.guideBtn {
								position: absolute;
								bottom: 6px;
								span {
									font-size: 14px;
									margin-left: 17px;
									text-decoration: underline;
									color: #1bbc9d;
									cursor: pointer;
									font-weight: bold;
								}
								.btnlinner {
									width: 168px!important;
									margin-top: 0!important;
									font-weight: bold;
									font-size: 14px!important;
									a{
										color:#fff;
									}
								}
							}
						}
					}
					.aboutMe {
						width: 100%;
						clear: both;
						padding: 40px 0 34px;
						.viewMore {
							margin-top: 18px;
							color: #1bbc9d;
							font-size: 18px;
							cursor: pointer;
						}
						h3 {
							color: #353a3f;
							font-size: 24px;
							font-weight: bold;
							margin-bottom: 30px;
						}
						;
						.about {
							margin-top: 30px;
							font-size: 18px;
							position: relative;
							line-height: 26px;
							color: #353a3f;
							/* 3 times the line-height to show 3 lines */
							height: 78px;
							overflow: hidden;
							&.overflow {
								overflow: inherit;
								height: auto;
								&:after {
									content: '';
								}
							}
							&:after {
								content: "...";
								color: #353a3f;
								position: absolute;
								bottom: 0px;
								right: 0;
								padding: 0 10px 1px 10px;
								background: #fff;
							}
						}
						.fel {
							margin-top: 30px;
						}
					}
					.TourbyMe {
						border-top: 1px solid #dde0e0;
						padding: 35px 0 40px;
						h3 {
							color: #353a3f;
							font-size: 24px;
							font-weight: bold;
						}
						ul {
							li {
								float: left;
								margin-right: 20px;
								margin-top: 30px;
								&:not(:first-child) {
									&:nth-of-type(3n+3) {
										margin-right: 0;
									}
								}
								.tourPic {
									width: 230px;
									height: 154px;
									position: relative;
									overflow: hidden;
									img {
										width: 100%;
										height: 100%;
									}
									&:hover .maskerInfo {
										-webkit-transition: all .5s cubic-bezier(0, 1, 0.5, 1);
										transition: all .5s cubic-bezier(0, 1, 0.5, 1);
										transform: translateY(0);
									}
									.maskerInfo {
										position: absolute;
										width: 100%;
										height: 100%;
										top: 0;
										transform: translateY(200%);
										-webkit-transition: all .5s cubic-bezier(0, 1, 0.5, 1);
										transition: all .5s cubic-bezier(0, 1, 0.5, 1);
										background-image: linear-gradient(135deg, #009efd 0%, #1bbc9d 100%);
										.maskerInfop {
											text-align: center;
											margin: 16px 0;
											div {
												margin-top: 10px;
												color: #fff;
												h3 {
													font-size: 10px;
													font-weight: bold;
													color: #fff;
												}
												span {
													display: inline-block;
													width: 9px;
													height: 9px;
													background: #fff;
													border-radius: 50%;
													margin-left: 5px;
													margin-top: 4px;
													&:first-child {
														margin-left: 0;
													}
												}
												p {
													font-size: 10px;
												}
											}
										}
									}
								}
								.type {
									margin-top: 16px;
									width: 230px;
									P {
										margin-top: 6px;
										font-size: 16px;
										color: #353a3f;
										span {
											font-size: 20px!important;
											margin-left: 8px;
										}
									}
									.type-one {
										font-size: 14px;
										color: #d87b65;
										span {
											display: inline-block;
											margin-right: 10px;
											&:last-child {
												margin-right: 0;
											}
										}
									}
									.type-two {
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
										font-size: 20px;
										color: #353a3f;
										font-weight: bold;
										margin-top: 6px;
										width: 230px;
										
									}
								}
							}
						}
					}
				}
				.guideskillDetail {
					background: #fff;
					position: absolute;
					right: 0;
					top: 60px;
					width: 316px;
					padding: 40px 30px;
					box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
					border-top: 4px solid #1bbc9d;
					h3 {
						font-size: 24px;
						color: #353a3f;
						font-weight: bold;
						text-align: center;
					}
					p {
						cursor: pointer;
						font-size: 18px;
						color: #1bbc9d;
						text-align: center;
						text-decoration: underline;
						margin-top: 20px;
					}
					.skill {
						margin-top: 20px;
						.engilsh {
							margin-bottom: 5px;
							.language {
								font-size: 16px;
								color: #353a3f;
								float: left;
								width: 60px;
							}
							.levelNum {
								float: left;
								margin-left: 20px;
								span {
									display: inline-block;
									width: 30px;
									height: 12px;
									margin-right: 2px;
									background: #1bbc9d;
									vertical-align: middle;
									&:last-child {
										margin-right: 0;
									}
								}
							}
							.level {
								float: right;
								font-size: 16px;
								color: #353a3f;
							}
						}
					}
					.impression {
						margin-top: 24px;
						h3 {
							font-weight: bold;
						}
						.tagList {
							margin-top: 24px;
							span {
								padding: 0px 10px;
								background-color: #1bbc9d;
								border-radius: 20px;
								color: #fff;
								font-size: 12px;
								margin: 0 14px 14px 0;
								display: inline-block;
								height: 20px;
								line-height: 20px;
							}
						}
					}
					.TourGiven {
						margin-top: 24px;
						.TourGivenNub {
							margin: 14px auto 14px;
							width: 60px;
							height: 60px;
							background-color: #faf9f8;
							line-height: 60px;
							text-align: center;
							border-radius: 50%;
							font-size: 24px;
							font-weight: bold;
						}
					}
					.card {
						box-shadow: none;
						p {
							margin-top: 14px;
							color: #353a3f;
							font-size: 18px;
							text-decoration: none;
						}
						.cardImg {
							width: 90px;
							height: 138px;
							margin: 14px auto 0;
							position: relative;
							.showImg {
								width: 260px;
								background: #fff;
								padding: 20px;
								position: absolute;
								top: -20px;
								left: -360px;
								box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
								opacity: 0;
								
							}
						}
					}
				}
			}
		}
		.show {
			animation: fain .5s ease-in-out forwards;
		}
		@keyframes fain {
			0% {
				transform: scale(0);
				opacity: 0;
			}
			100% {
				transform: scale(1);
				opacity: 1;
			}
		}
	}
</style>