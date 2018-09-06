<template>
	<div class="profile">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="profile-count">
			<MenuTab :menu="menu" :logIn="logIn"></MenuTab>
			<div class="preinfo">
				<div class="line">
					<div class="detail">
						<div class="head">
							<h3>User details</h3>
							<p>Your details will be stored securely and won't be shared publicly.</p>
						</div>
						<div class="Profile_picture" v-if="imgurl">
							<h3>Profile picture</h3>
							<div class="headimg">
								<div class="hidden">
									<img :src="imgurl" />
								</div>

								<div class="bolck">
									<img :src="imgurl" />
								</div>
							</div>
						</div>
						<div class="name">
							<div class="first-name">
								<h3>User name</h3>
								<input v-model="firstName" readonly="readonly" />
							</div>
							<!--<div class="last-name">
	    						<h3>Last name</h3>
	    						<input v-model="lastName" readonly="readonly" />
	    					</div>-->

						</div>
						<div class="gender">
							<h3>I Am</h3>
							<div class="gender-cont">{{gender}}</div>
						</div>
						<div class="email" v-if="email">
							<h3>Email Address</h3>
							<input v-model="email" readonly="readonly" />
						</div>
					</div>
				</div>

			</div>
		</div>
		<FooterCommon></FooterCommon>

	</div>
</template>

<script>
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon'
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
    import MenuTab from "~/components/MenuTab";
    import Vue from 'vue'
	export default {
		name: 'profile',
		async asyncData({ route, store, error, apiBasePath, redirect }) {
			let menu = route.query.menu || 0;
			let flag = route.query.flag || 1;
			let data = {
				logIn:'',
				firstName: '',
				gender: '',
				email: '',
				imgurl: '',
				userId: '',
                menu,
                flag,
				apiBasePath
			}
			return data;
		},
		components: {
			MenuTab,
			HeaderCommon,
			FooterCommon
		},
		 head() {
			let title = 'My Profile - Localpanda.com ';
			let description = 'Review your profile with Local Panda '
			let keywords ='My Profile, Local Panda'
			return {
				title: title,
				meta: [{
						hid: "keywords",
						name: "keywords",
						content: keywords
					},
					{
						hid: "description",
						name: "description",
						content: description
					}
				]
			};
		},
		methods: {
			getinfo() {
				let that = this
				that.axios.get(this.apiBasePath+"user/profile/" + that.userId).then(function(response) {
					//console.log(response.data)
					if(response.data.userName) {
						that.firstName = response.data.userName
					} else {
						that.firstName = "UserName"
					}
					that.gender = response.data.gender
					that.email = response.data.emailAddress
					
					that.imgurl = response.data.headPortrait
				}, function(response) {})
			}
		},
		mounted: function() {
			
			this.userId = window.localStorage.getItem("userid")
			this.getinfo()
			
			window.localStorage.setItem("flag", this.flag)
			this.logIn=window.localStorage.getItem("logstate")
		},
		created() {
		}
	}
</script>
<style lang="scss">
	//@import '~/assets/scss/_main.scss';
	//@import '~/assets/font/iconfont.css';
	.profile{
	#header {
		box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
	}
	}
</style>
<style lang="scss" scoped>
	//@import '~/assets/scss/base/_setting.scss';
	.profile {
		.profile-count {
			width: 1170px;
			margin: 0 auto;
			position: relative;
			
				.preinfo {
					margin: 0 0 0 250px;
					padding-top:60px;
					height: 100%;
					box-shadow: -1px 0px 0px 0px rgba(53, 58, 63, 0.1);
					.line {
						padding-left:60px;
						padding-bottom:100px;
						
					.detail {
						padding: 60px;
						width: 740px;
						box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
						.head {
							padding-bottom: 14px;
							border-bottom: 1px solid #dde0e0;
							h3 {
								font-size: 24px;
								color: #353a3f;
								font-weight: bold;
							}
							p {
								color: #878e95;
								font-size: 18px;
								line-height: 36px;
							}
						}
						.Profile_picture {
							margin-top: 40px;
							h3 {
								font-size: 16px;
								font-weight: bold;
								margin-bottom: 17px;
							}
							.headimg {
								width: 130px;
								height: 130px;
								position: relative;
								.hidden {
									width: 130px;
									height: 130px;
									opacity: .3;
									img {
										width: 100%;
										height: 100%;
									}
								}
								.bolck {
									height: 130px;
									width: 130px;
									position: absolute;
									left: 50%;
									top: 50%;
									margin-left: -65px;
									margin-top: -65px;
									opacity: 1;
									vertical-align: middle;
									img {
										width: 100%;
										height: 100%;
										border-radius: 50%;
									}
								}
							}
						}
						.name {
							margin-top: 28px;
							.first-name {
								h3 {
									font-size: 16px;
									font-weight: bold;
									margin-bottom: 20px;
								}
								input {
									display: block;
									width: 540px;
									height: 46px;
									border: solid 1px #dde0e0;
									font-size: 18px;
									;
								}
							}
							.last-name {
								margin-top: 24px;
								h3 {
									font-size: 16px;
									font-weight: bold;
									margin-bottom: 20px;
								}
								input {
									display: block;
									width: 540px;
									height: 46px;
									border: solid 1px #dde0e0;
								}
							}
						}
						.gender {
							margin-top: 21px;
							h3 {
								font-size: 16px;
								font-weight: bold;
								margin-bottom: 20px;
							}
							.gender-cont {
								width: 118px;
								height: 46px;
								background-color: #faf9f8;
								border-radius: 3px;
								border: solid 1px #dde0e0;
								text-align: center;
								line-height: 46px;
								font-size: 18px;
								color: #353a3f;
							}
						}
						.email {
							margin-top: 22px;
							h3 {
								font-size: 16px;
								font-weight: bold;
								margin-bottom: 20px;
							}
							input {
								display: block;
								width: 540px;
								height: 46px;
								border: solid 1px #dde0e0;
								font-size: 18px;
							}
						}
					}
				}
			}
		}
	}
</style>