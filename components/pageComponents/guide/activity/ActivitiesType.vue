<template>
	<div id="ActivitiesType">
		<div class="activitiesTypeInfo">
			<div class="linkseting">
				<a href="/">Home</a>
				<em class="iconfont">&#xe64a;</em>
				<a v-if="ActivitiesInfo.guideLocation=='Shanghai'" :href="'/guide/list/'+ActivitiesInfo.guideLocation">Shanghai Guides</a>
				<a v-else :href="'/guide/list/'+ActivitiesInfo.guideLocation">Beijing Guides</a>
				<em class="iconfont">&#xe64a;</em>
				<a :href="'/guide/detail/'+ActivitiesInfo.guideId">{{ActivitiesInfo.guideName}}</a>
				<em class="iconfont">&#xe64a;</em>
				<span>Activity</span>
			</div>
			<h3>{{ActivitiesInfo.title}}</h3>
			<p>Theater walk · {{ActivitiesInfo.destinations}}</p>
			<ul>
				<li>
					<div class="item"><i class="iconfont">&#xe624;</i>Duration: {{ActivitiesInfo.duration}} hours
					</div>
						<div class="item"><i class="iconfont" style="font-size:22px">&#xe626;</i>Intensity:
							<span v-if="ActivitiesInfo.intensity==1">
							<em class="bacg" v-for="i in ActivitiesInfo.intensity"></em>
							<em></em>
							<em></em>
							<em></em>
							<em></em>
						</span>
						<span v-if="ActivitiesInfo.intensity==2">
							<em class="bacg" v-for="i in ActivitiesInfo.intensity"></em>
							<em></em>
							<em></em>
							<em></em>
						</span>
						<span v-if="ActivitiesInfo.intensity==3">
							<em class="bacg" v-for="i in ActivitiesInfo.intensity"></em>
							<em></em>
							<em></em>
						</span>
						<span  v-if="ActivitiesInfo.intensity==4">
							<em class="bacg" v-for="i in ActivitiesInfo.intensity"></em>
							<em></em>
						</span>
						<span  v-if="ActivitiesInfo.intensity==5">
							<em class="bacg" v-for="i in ActivitiesInfo.intensity"></em>
							
						</span>
					</div>
				</li>
				<li>
					<div class="item"><i class="iconfont">&#xe627;</i>Languages: Offered in English</div>
					<div class="item"><i class="iconfont" style="font-size: 22px;">&#xe628;</i>Difficulty:
						<span v-if="ActivitiesInfo.difficulty==1">
							<em class="bacg" v-for="i in ActivitiesInfo.difficulty"></em>
							<em></em>
							<em></em>
							<em></em>
							<em></em>
						</span>
						<span v-if="ActivitiesInfo.difficulty==2">
							<em class="bacg" v-for="i in ActivitiesInfo.difficulty"></em>
							<em></em>
							<em></em>
							<em></em>
						</span>
						<span v-if="ActivitiesInfo.difficulty==3">
							<em class="bacg" v-for="i in ActivitiesInfo.difficulty"></em>
							<em></em>
							<em></em>
						</span>
						<span  v-if="ActivitiesInfo.difficulty==4">
							<em class="bacg" v-for="i in ActivitiesInfo.difficulty"></em>
							<em></em>
						</span>
						<span  v-if="ActivitiesInfo.difficulty==5">
							<em class="bacg" v-for="i in ActivitiesInfo.difficulty"></em>
							
						</span></div>
				</li>
			</ul>
			<!--<div class="say">
				<div class="guideHead clearfix">
					<a :href="'https://www.localpanda.com/guide/detail/'+ActivitiesInfo.guideId" target="_blank"><img :src="ActivitiesInfo.guidePhotoUrl"></a>	
					<div class="Experience">Experience<br /> Hosted by <a :href="'https://www.localpanda.com/guide/detail/'+ActivitiesInfo.guideId" target="_blank">{{ActivitiesInfo.guideName}}</a></div>
					<a :href="'https://www.localpanda.com/guide/detail/'+ActivitiesInfo.guideId+'#'" target="_blank"><div class="oderme">Order Me</div></a>
				</div>

				<div class="saycont">
					<p>{{ActivitiesInfo.recommendedReason}}
					</p>

				</div>

			</div>-->
			<div class="expect">
				<div class="expectHead">
					<h3>What to Expect</h3>
					<p>{{ActivitiesInfo.introduction}}
					</p>
				</div>
				<ul>
					<li v-for="item in ActivitiesInfo.details">
						
						<p>{{item.title}}</p>
						<div class="activitieImg" v-if="item.photo">
							<img :src="item.photo.url" alt=""/>
						</div>
						
						<p>{{item.description}}</p>
					</li>
				</ul>
			</div>
			<div class="provide" v-if="itemsIncluded.length>0">
				<h3>Important Information</h3>
				<ul>
					<li v-for="item in itemsIncluded">{{item}}</li>
					
				</ul>
				
			</div>
			<div class="provide" v-else></div>
			<div class="notes" v-if="ActivitiesInfo.remark">
				<h3>Notes</h3>
				<p>{{ActivitiesInfo.remark}}</p>
			</div>
		

		</div>
		<div class="payfor">
			<div class="pay">
				<div class="payformoney">
					<span>Tour code: {{ActivitiesInfo.id}}</span>
					<!--<p>From<b>${{ActivitiesInfo.price}}</b></p>-->
					<p>Chinese' New Year is approaching! Get a <b>$30</b> refund by simply sending us an inquiry about your upcoming trip!</p>
					
				</div>
				<div class="bookbtn">
					<button class="btnlinner" @click="showContact">Free Inquiry</button>
					<!--<p>This tour is led by {{ActivitiesInfo.guideName}}. Click below to visit the guide's page and book their time!</p>
					<em><a :href="'https://www.localpanda.com/guide/detail/'+ActivitiesInfo.guideId+'#'" target="_blank">Book this guide</a></em>-->
				</div>
			</div>
		
			<div class="hostActivities">
				<h3>Similar Experiences</h3>
				<ul>
					<li v-for="item in activities">
						<a :href="'/guide/activity/'+item.id" target="_blank">
							<div class="listCont">
							
								<!--<img class="log" >-->
								<div class="img">
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
								
								
							</div>
							<div class="listInfo">
								<div class="local-guide">{{item.tourTypes}}</div>
								<p class="slogan">{{item.title}}</p>
								<!--<p>From<span>${{item.price}}</span></p>-->
							</div>
	
						</a>
					</li>
				</ul>
				
				
			</div>
		</div>
		<Contact :ContactStatus="ContactStatus" v-on:contactCallback="contactCallBack" :objectId="ActivitiesInfo.id" :enName="ActivitiesInfo.guideName" :objectType="objectType"></Contact>
		<Alert   :isShowAlert="isShowAlert" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlert="getIsShowAlert"></Alert>
	</div>
	
</template>

<script>
	
	import Contact from '~/components/Contact/Contact';
	import Alert from '~/components/Prompt/Alert';
	
	export default {
		props:["ActivitiesInfo","itemsIncluded","activities"],
		name: 'ActivitiesDetail',
		data() {
			return {
				ContactStatus:false,
				isShowAlert:false,
				alertTitle:'',
				alertMessage:"",
				istrue:false,
				objectType:'ACTIVITY'
				
			}
		},
		components: {
			Contact,
			Alert
		},
		methods: {
			
			getIsShowAlert(val){
				this.isShowAlert=val
			},
			showContact(){
				let that=this
				that.ContactStatus=true
			},
			contactCallBack(val){
				this.istrue=val?true:false;
				if(this.istrue==true){
					this.isShowAlert=true
					this.alertTitle="Submission completed!"
					this.alertMessage="Thank you for your feedback.We will get back to you within 1 day."
					this.istrue=false
				}else{
					this.isShowAlert=true
					this.alertMessage="Failed!"
				}
				this.ContactStatus=false
			},
			
				getscoll(){
					window.location.href='/guide/detail/'+this.ActivitiesInfo.guideId
				},
			
		},
		mounted: function() {
			
		}
	}
</script>

<style lang="scss">
	
	#header{
		box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
	}
	
</style>
<style lang="scss" scoped>
	//@import '~/assets/scss/base/_setting.scss';
	#ActivitiesType {
		overflow:auto;
		background:#fff!important;
		position: relative;
		width: 1170px;
		margin: 2px auto 0;
		.activitiesTypeInfo {
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
					color: #878e95;
				}
				span{
					color: #878e95;
					font-size: 14px;
				}
			}
			width: 734px;
			float: left;
			h3 {
				font-size: 32px;
				color: #353a3f;
				margin-top: 24px;
				font-weight: bold;
				line-height: 36px;
			}
			p {
				font-size: 18px;
				color: #353a3f;
				margin-top: 14px;
			}
			ul {
				padding: 34px 0;
				margin-top: 24px;
				border-top: 1px solid #dde0e0;
				border-bottom: 1px solid #dde0e0;
				li {
					display: flex;
					font-size: 18px;
					margin-top: 20px;
					&:first-child {
						margin-top: 0;
					}
					.item {
						flex: 1;
						i {
							margin-right: 12px;
							font-size: 18px;
						}
						em {
							display: inline-block;
							width: 12px;
							height: 12px;
							border: 1px solid #878e95;
							border-radius: 50%;
							margin-left: 4px;
							vertical-align: middle;
							
						}
					}
				}
			}
			.say {
				padding-bottom: 34px;
				border-bottom: 1px solid #dde0e0;
				.guideHead {
					padding-left: 30px;
					
					margin-top: 34px;
					
					img {
						float: left;
						width: 100px;
						height: 100px;
						border-radius: 50%;
					}
					.Experience {
						float: left;
						margin-left: 16px;
						margin-top: 32px;
						font-size: 20px;
						line-height: 24px;
						a{
							color: #1bbc9d;
						};
						
					}
					.oderme{
						float: left;
						width:168px;
						height: 42px;
						text-align: center;
						line-height: 42px;
						border-radius: 20px;
						background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%), linear-gradient(#1bbc9d, #1bbc9d);
						margin-top: 32px;
						margin-left: 48px;
						
						color:#fff;
						font-size: 16px;
						font-weight: bold;
							
						
					}
				}
				.saycont {
					font-size: 18px;
					line-height: 26px;
					background:#f5f5f5;
					border-radius: 3px;
					background-size:cover;
					
					margin-top: 22px;
					padding: 30px;
					
					
				}
			}
			.expect {
				padding: 34px 0;
				
				border-bottom: 1px solid #dde0e0;
				.expectHead {
					h3 {
						margin-top: 0;
					}
					p {
						margin-top: 34px;
						line-height: 30px;
						font-size: 18px;
					}
				}
				ul {
					border: none;
					padding: 0;
					li {
						margin-top: 30px;
						padding: 0;
						display: inherit;
						h3 {
							font-size: 18px;
							font-weight: bold;
						}
						.activitieImg{
							margin-top: 30px;
							width: 734px;
							height: 488px;
							img {
								
								width: 100%;
								height: 100%;
							}
						}
						
					}
					
				}
			}
			.provide {
				padding: 35px 0  100px;
				h3 {
					margin-top: 0;
					font-size: 24px;
					font-weight: bold;
				}
				ul {
					border: none;
					padding: 0;
					li {
						padding-left: 20px;
						display: inherit;
						margin-top: 15px;
						font-size: 18px;
						position: relative;
						left: 16px;
						&:after {
							content: '';
							position: absolute;
							width: 4px;
							height: 4px;
							border-radius: 50%;
							background: #1bbc9d;
							left: 0px;
							top: 10px;
						}
						&:first-child {
							margin-top: 30px;
						}
						
					}
				}
			}
			.notes {
				padding: 34px 0;
				border-bottom: 1px solid #dde0e0;
				h3 {
					margin-top: 0;
					font-size: 24px;
					font-weight: bold;
				}
				p {
					margin-top: 20px;
					line-height: 20px;
				}
			}
			.place {
				padding: 34px 0;
				h3 {
					margin-top: 0;
					font-size: 24px;
					font-weight: bold;
				}
				p {
					margin-top: 20px;
					line-height: 20px;
				}
				.map {
					height: 380px;
					background: #009EFD;
					width: 100%;
					margin-top: 30px;
				}
			}
			.comment {
				h3 {
					margin-top: 0;
					font-size: 24px;
					font-weight: bold;
				}
				ul {
					border: none;
					padding: 0;
					li {
						display: inherit;
						padding: 26px 0;
						border-bottom: 1px solid #dde0e0;
						.header-img {
							overflow: auto;
							img {
								float: left;
								width: 48px;
								height: 48px;
							}
							.headertext {
								float: left;
								margin-left: 8px;
								p {
									font-size: 14px;
									&:first-child {
										font-size: 18px;
									}
								}
							}
						}
						.commentText {
							margin-top: 20px;
						}
					}
				}
			}
			.btnmore {
				margin: 36px auto 142px;
				text-align: center;
			}
		}
		.payfor {
			float: right;
			margin: 60px 20px 0 0;
			width: 376px;
			.pay {
				padding: 31px 25px 41px;
				box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
				.payformoney {
					
					span {
						font-size: 14px;
						color: #878e95;
					}
					p {
						padding-top: 20px;
						border-top: 1px solid #dde0e0;
						margin-top: 20px;
						font-size: 18px;
						line-height: 24px ;
						
					}
				}
				.payfortime {
					margin-top: 24px;
					h3 {
						font-size: 18px;
						font-weight: bold;
					}
					;
				}
				.Guests {
					margin-top: 20px;
					h3 {
						font-size: 18px;
						font-weight: bold;
					}
				}
				.bookbtn{
					text-align: center;
					.btnlinner{
						width: 326px;
						height: 50px;
						font-size: 20px;
						font-weight: bold;
						border-radius: 30px;
						margin-top: 20px;
					}
					p{
						font-size: 18px;
						line-height: 24px ;
						margin-top: 30px;
					}
					em{
						display: block;
						text-align: center;
						margin-top: 20px;
						a{
							text-decoration: underline;
							color: #1bbc9d;
							font-size: 18px;
						}
					}
				}
			}
			.ShareThisTour{
				margin-top: 30px;
				text-align: center;
				h3{
					font-size: 16px;
				}
				.log{
					margin-top: 20px;
					span{
						font-size: 24px;
						color:#aeb5bc;
						display: inline-block;
						margin-right: 18px;
						&:last-child{
							margin-right: 0;
						}
					}
				}
			}
			.hostActivities{
				margin-top: 30px;
				padding: 30px 30px 42px;
				box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
				h3{
					font-size: 24px;
					font-weight: bold;
					color: #353a3f;
				};
				ul{
					li{
						margin-top: 30px;
						width: 316px;
						a {
						display: block;
						.listCont {
							width: inherit;
							height: 210px;
							position: relative;
							.log {
								position: absolute;
								bottom: -22px;
								right: 18px;
								width: 44px;
								height: 44px;
								border-radius: 50%;
								z-index: 10;
							}
							.img{
								width: 316px;
								height: 210px;
								position: relative;
								overflow: hidden;
								img{
									width: 100%;
									height: 100%;
								}
							}
							&:hover .maskerInfo{
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
									margin: 27px 0;
									div {
										margin-top: 12px;
										color: #fff;
										&:first-child {
											margin-top: 0;
										}
										h3{
											font-size: 16px;
											font-weight: bold;
											color: #fff;
										}
										span{
											display: inline-block;
											width: 14px;
											height: 14px;
											background: #fff;
											border-radius: 50%;
											margin-left: 10px;
											margin-top:7px; 
											&:first-child{
												margin-left: 0;
											}
										}
										p{
											font-size: 16px;
										}
									}
									
								}
							}
						}
						.listInfo {
							margin-top: 15px;
							.local-guide {
								font-size: 14px;
								color:#d87b65;
							}
							P {
								margin-top: 6px;
								font-size: 16px;
								color: #353a3f;
								span {
									font-size: 20px!important;
									margin-left: 8px;
								}
								&.slogan {
									font-size: 20px;
									font-weight: bold;
								}
							}
						}
					}
					}
				}
			}
		}
		.bacg{
			width: 14px!important;
			height: 14px!important;
			background: #878e95;
			border:none!important;
			margin-left: 7px!important;
			
		}
	}
</style>