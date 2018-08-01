<template>
	<div id="header">
		<div class="heder-cont clearfix">
			<div class="headleft">
				<div class="log">
					<a href="/">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-logo1"></use>
						</svg>
					</a>
	
				</div>
				<div class="search" @click.stop="showSearch">
					<i class="iconfont">&#xe67a;</i>
					<span>Attraction, Activity, Destination</span>
				</div>
			</div>
			<ul class="init" v-if="isAnonymity">

			</ul>
			<ul class="init" v-if="(logIn==0||logIn==null)&&!isAnonymity">

				<li @click="showContact">Customize Your Trip<em class="hot">HOT</em></li>
				<li @click="isShowAnonymityback">My Bookings</li>
				<li @click="show">Log In</li>
				<!--<li @click="goAboutUs">About Us</li>-->
				<li @mouseenter="showContactUs=true" @mouseleave="showContactUs=false">Contact Us</li>

			</ul>
			<ul class="login" v-if="logIn==1">
				<li @click="showContact">Customize Your Trip<em class="hot">HOT</em></li>
				<li @click="goBook" style="margin-right: 40px;">My Bookings</li>
				<!--<li @click="goAboutUs" style="margin-right: 40px;">About Us</li>-->
				<li @mouseenter="showContactUs=true" @mouseleave="showContactUs=false">Contact Us</li>
				<li @click.stop="contshow"><img :src="logimg" /></li>
				<div class="cont" :class="{'isshow':iscontshow}">
					<ol>
						<!--<li><a>Choose a Tour Guide</a></li>
						<li><a>Choose a Activity</a></li>-->
						<li @click.stop="goBook">
							<a>My Bookings</a>
						</li>
						<li @click.stop="goPrefie">
							<a>My Profile</a>
						</li>
						<!--<li><a>Account Settings</a></li>-->
						<li @click.stop="fb_logout">
							<a>Log Out</a>
						</li>
					</ol>
				</div>
			</ul>

		</div>
		<div class="contact_box" v-show="showContactUs">
			<div class="contact_item clearfix">
				<span class="iconfont font">&#xe67d;</span>
				<div class="contact_cont">
					<h3><b>Phone numbers</b></h3>
					<h4>For urgent matters plase call us.</h4>
					<div class="phone">
						<div>
							<i>
								<svg class="iconCountry" aria-hidden="true">
									 <use xlink:href="#icon-china"></use>
								</svg>
							</i>
							<span>(CN) +86 21 8018 2090</span>
						</div>
						<div>
							<i>
								<svg class="iconCountry" aria-hidden="true">
									 <use xlink:href="#icon-usa"></use>
								</svg>
							</i>
							<span>(US) +1 888 930 8849</span>
						</div>	
					</div>				
				</div>
			</div>
			<div class="contact_item pad20 clearfix">
				<span class="iconfont font">&#xe67f;</span>
				<div class="contact_cont">
					<h3><b>Service@localpanda.com</b></h3>
					<h4>We respond within one hour during opening hours.</h4>
				</div>
			</div>
			<div class="contact_item pad20 clearfix">
				<span class="iconfont font">&#xe67e;</span>
				<div class="contact_cont">
					<h3><b>WhatsApp</b></h3>
					<h4>We respond within one hour during opening hours.</h4>
					<p>+86 166 2018 3842</p>
				</div>
			</div>
			<div class="contact_item pad20 clearfix">
				<span class="iconfont font">&#xe66c;</span>
				<div class="contact_cont">
					<h3><b>WeChat</b></h3>
					<h4>Add our public account and communicate with our customer service.</h4>
					<div class="QR_code"><img src="https://resource.localpanda.cn/static/icon/LPwechat.jpg" alt=""></div>
				</div>
			</div>
		</div>
		<AlertTitle :alertTitleStatus="alertTitleStatus" v-on:alert-title-call-back="alertTitleCallBack">
			<h3 slot="alertTitleLogin">{{alertTitleLogin}}</h3>
			<p slot="alertTitleMessage">{{alertTitleMessage}}</p>
		</AlertTitle>
		<!--<Contact :ContactStatus="ContactStatus" v-on:isshowfn="isShowFn" v-on:contact-call-back="contactCallBack" :objectType="objectType"></Contact>-->
		<Alert :isShowAlert="isShowAlert" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlert="getIsShowAlert"></Alert>
		<Anonymity :AnonymityStatus="AnonymityStatus" v-on:anonymity-back="isAnonymityback"></Anonymity>

		<div class="searchBox" v-if="showBgSearch" @click.stop="showBgSearch=true">
			<div class="close"><i class="iconfont" @click.stop="close">&#xe606;</i></div>
			<div class="contentBox">

				<div class="searchBox_index clearfix">
					<div class="searchInput">
						<input id="searchInput" @keyup="searchkey" maxlength="60" placeholder="Attraction, Activity, Destination" @keyup.enter="seachFn" @focus="input_highlight=true" @blur="input_highlight=false" v-model="search" />
						<span class="input_highlight" :class="{border:input_highlight}">{{search}}</span>
					</div>
					<div class="select_people">
						<select v-model="selectPeople">
							<option v-for="(item,index) in selectOptions" :value="item.value">
								<label>{{item.text}}</label>
							</option>
						</select>
						<i class="iconfont">&#xe60f;</i>
					</div>
					<div class="searchBtn"  @click.stop="seachFn">
						<button>Search</button>
					</div>
				</div>
				<div class="hotRecommend clearfix" v-if="showRecommend">
					<div class="city">
						<h3>Popular Destinations</h3>
						<ul>
							<li v-for="item in options">
								<a target="_blank" @click.stop="gaRecommendation" :href="getUrl(item,'recommend')">{{item}}</a>
							</li>

						</ul>
					</div>
					<div class="theme">
						<h3>Popular Choices</h3>
						<ul>
							<li v-for="item in thems">
								<a target="_blank" @click.stop="gaRecommendation" :href="getUrl(item,'recommend')">{{item}}</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="seachList" v-show="aa">
					<ul>
						<li v-for="item in seachContentList">
							<a target="_blank" :href="getUrl(item.value,'suggest')" @click="gaSuggestion">
								<i class="iconfont" v-if="item.type=='DESTINATION'">&#xe610;</i>
								<i class="iconfont" v-else>&#xe609;</i>
								<span v-html="textHighlight(item.value)"></span>
							</a>
						</li>
					</ul>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import { GetQueryString } from "~/assets/js/plugin/utils"
	if(process.BROWSER_BUILD) {
		require('~/assets/font/iconfont.js')
	}
	import AlertTitle from '~/components/Prompt/AlertTitle'
	import Anonymity from '~/components/Prompt/Anonymity'
	import Alert from '~/components/Prompt/Alert'
	//import Contact from '~/components/Contact/Contact'
	export default {
		props: ["logIn", "isAnonymity", "isIndex","showSeachList"],
		name: 'headercommon',
		data() {
			return {
				fbToken: '',
				alertTitleStatus: false, //alert弹框状态
				alertTitleLogin: "", //弹框标题
				alertTitleMessage: "", //弹框内容
				logimg: '',
				iscontshow: true,
				userid: '',
				ContactStatus: false,
				isShowAlert: false,
				alertTitle: '',
				alertMessage: "",
				objectType: 'CONSULTING',
				deviceWidth: null,
				AnonymityStatus: "", //匿名订单
				loadJs: false,
				showContactUs:false,
				//搜索
				search: '',
				seachContentList: [],
				showBgSearch: false,
				selectPeople: 2,
				selectOptions: [{
						value: 1,
						text: "1 Person"
					},
					{
						value: 2,
						text: "2 People"
					},
					{
						value: 3,
						text: "3 People"
					},
					{
						value: 4,
						text: "4 People"
					},
					{
						value: 5,
						text: "5 People"
					},
					{
						value: 6,
						text: "6 People"
					},
					{
						value: 7,
						text: "7 People"
					},
					{
						value: 8,
						text: "More than 8 people"
					},
				],
				options: ['Shanghai', 'Beijing', "Xi'an", "Guilin", 'Chengdu',"Tibet"],
				thems: ["Panda", "Watertown", "Great Wall", "Terra-Cotta Warriors", "Forbidden City", "Li River", "Layover Tour", "Day trips", "Local Food", "Dumplings", "Landmarks", "Short Excursions", "Family Friendly","Lama Monks","Mt.Kailash","Everest Base Camp"],
				showRecommend: true,
				input_highlight:false,
				aa:false
			}
		},
		components: {
			AlertTitle,
			Alert,
			//Contact,
			Anonymity

		},
		methods: {
				//点击搜索按钮
			seachFn(){
				this.search=this.search.replace(/^\s+|\s+$/g,'');
				if(this.search){
					this.Ga("search","search")
					this.Ga("search","direct")
					location.href = this.getUrl(this.search,'direct');
					
				}
				
			},
			searchkey(){
				let search= this.search
				let that=this
				search=search.replace(/^\s+|\s+$/g,'');
				if(search){
					that.showRecommend = false
					that.aa=true
					let postData = {
							keyword: search,
							size: 10
						}
						that.axios.post('https://api.localpanda.com/api/search/suggest', JSON.stringify(postData), {
	
							headers: {
								'Content-Type': 'application/json; charset=UTF-8'
							}
	
						}).then(res => {
							that.seachContentList = res.data
						}, res => {})

				}else{
					that.aa=false
					that.showRecommend = true
				}
			},
			getUrl(value,type){
				return '/activity/list/China?keyword=' + value+'&participants='+this.selectPeople+'&type='+type;	
			},
			gaSuggestion(){
				this.Ga('search','suggestion')
				this.Ga('search','search')
			},
			gaRecommendation(){
				this.Ga('search','recommendation')
				this.Ga('search','search')
			},
			//搜索补全高亮
			textHighlight(value) {
				var reg = new RegExp(this.search, 'gi');
				var textReg = value.match(reg);
				if(textReg) {
					textReg = textReg[0];
				}
				return value.replace(reg, "<b style='color:#1bbc9d'>" + textReg + "</b>");
			},
			close(){
				this.showBgSearch = false
			},
			//显示搜索
			showSearch() {
				this.showBgSearch = true
				this.$emit('closeSearchList',false)
				setTimeout(() => {
					document.getElementById("searchInput").focus();
				}, 200)

				
			},
			hideBodyScroll(){
				document.body.style.overflowY = 'hidden';
			},
			showBodyScroll(){
				document.body.style.overflowY = 'inherit';
			},
			isShowAnonymityback() {
				this.AnonymityStatus = true
			},

			isAnonymityback(val) {
				this.AnonymityStatus = val

			},
			isShowFn(val) {
				this.istrue = val
				if(this.istrue == true) {
					this.isShowAlert = true
					this.alertTitle = "Submission completed!"
					this.alertMessage = "Thank you for your feedback.We will get back to you within 1 day."
					this.istrue = false
				} else {
					this.isShowAlert = true
					this.alertMessage = "Failed!"
				}
			},
			getIsShowAlert(val) {
				this.isShowAlert = val
			},
			showContact() {
				location.href = "/travel/customize/step1"
			},
			contactCallBack(val) {
				this.ContactStatus = false
			},
			contshow() {
				this.iscontshow = false
			},
			show() {
				this.alertTitleStatus = true
				this.alertTitleLogin = "Log in to Local Panda",
					this.alertTitleMessage = "Log in to add things to your wishlist and access your bookings from any device."
			},
			alertTitleCallBack(val) {
				//回调后关闭弹框
				var that = this;

				that.alertTitleStatus = false;
			},
			getscoll() {
				
			},
			loadScript(url, callback) {
				var that = this
				var script = document.createElement('script');
				var head = document.getElementsByTagName('head')[0];
				var loaded;
				script.src = url;
				if(typeof callback === 'function') {
					script.onload = script.onreadystatechange = function() {
						if(!loaded && (!script.readyState || /loaded|complete/.test(script.readyState))) {
							script.onload = script.onreadystatechange = null;
							loaded = true;
							callback();

						}
					}
				}
				head.appendChild(script);
			},
			fbAsyncInit() {

				let that = this
				FB.init({
					appId: '487179281653793',
					cookie: true,
					xfbml: true,
					version: 'v2.10'
				});

				FB.AppEvents.logPageView();

				// check on loading
				FB.getLoginStatus(function(response) {

					that.ChangeCallback(response);
					if(that.loadJs == true) {
						that.logOut()
					}
				})

			},
			ChangeCallback(response, flag) {
				if(response.status === 'connected') {

				} else if(response.status === 'not_authorized') { //未经授权
					FB.logout(function(response) {})
				} else {
					//console.log('不是登陆到Facebook;不知道是否授权');
				}
				this.loadJs = true
			},
			logOut() {
				let that = this
				window.localStorage.removeItem("logstate")
				window.localStorage.removeItem("fbToken")
				window.localStorage.removeItem("key")
				window.localStorage.removeItem("userid")
				FB.logout(that.reload);

			},
			fb_logout() {
				let that = this
				that.loadScript("//connect.facebook.net/en_US/sdk.js", that.fbAsyncInit)

			},
			goBook() {
				window.location.href = "/user/myBookings?menu=0&flag=1"
			},
			goPrefie() {
				window.location.href = "/user/profile?menu=1&flag=1"
			},
			reload() {

				if(/\/user\//.test(location.pathname)) {
					window.location.href = "/"
				} else {
					location.reload();
				}

			},
			checkSticky() {
				if(window.scrollY > this.scrollTop) {
					this.sticky = true;
				} else {
					this.sticky = false;
				}
			},
			Ga(action,label){
				ga(gaSend, {
					hitType: 'event',
					eventCategory: 'activity_list',
					eventAction: action,
					eventLabel: label,

				});
			},
		},
		mounted() {
			let that = this
			this.search=this.$route.query.keyword?this.$route.query.keyword:''
			document.body.addEventListener("click", function() {
				that.iscontshow = true,
				that.showBgSearch=false

			})
			that.logimg = window.localStorage.getItem("key")

			that.fbToken = window.localStorage.getItem("fbToken")

		},
		watch: {
			search(val, oldVal) {
				
			},
			showBgSearch(val){
				if(val){
					this.hideBodyScroll()
				}else{
					this.showBodyScroll()
				}
			}
		}

	}
</script>
<style lang="scss">
body{
		min-width: 1300px;
	}

</style>
<style lang="scss" scoped>
	/** contact us **/

	.contact_box{
		position: absolute;
		right: 0;
		top: 60px;
		background: #fff;
		width: 320px;
		z-index: 66666;
		box-shadow: 0px 2px 6px 0px 
		rgba(0, 0, 0, 0.1);
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		padding: 24px 0 29px;
		.contact_item{
			margin:0 16px;
			border-bottom: 1px solid  #ebebeb;
			&:last-child{
				border-bottom: 0!important;
				padding-bottom: 0!important;
			}
			.font{
				float: left;
				font-size: 18px;
				color:#1bbc9d;
				margin-right: 20px;
			}
			.contact_cont{
				float: left;
				width: 84%;
				h3{
					font-size: 16px;
					//text-align: left!important;
				};
				h4{
					font-size: 14px;
					color:#878e95;
					margin-top:5px;
					//text-align: left!important;
				}
				.phone{
					margin-top: 20px;
					div{
						padding: 15px 0;
						&:first-child{
							border-bottom: 1px solid #ebebeb;	
						}
						
					}
					span{
						display: inline-block;
						margin-left: 8px;
						font-size: 14px;
						font-weight: bold;
					}
				}
				p{
					font-size: 16px;
					font-weight: bold;
					margin-top: 30px;
				}
				.QR_code{
					margin-top: 25px;
					width: 98px;
					height: 98px;
					background: #ccc;
					img{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
	
	.pad20{
		padding: 20px 0;
	}
	
	.border{
		border-top: 2px solid #1bbc9d!important;
		
	}
	.searchBox {
		position: fixed;
		top: 0;
		left: 0;
		background: #fff;
		z-index: 100000;
		width: 100%;
		box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, 0.2);
		.close {
			height: 60px;
			line-height: 60px;
			color: #1bbc9d;
			text-align: right;
			margin-right: 20px;
			i {
				cursor: pointer;
				font-size: 14px;
			}
		}
		.contentBox {
			margin: 0 auto;
			width: 1112px;
			padding-bottom: 76px;
			.hotRecommend {
				transition: all 0.4s ease-out 0s;
				;
				padding: 54px 0 47px 20px;
				border-bottom-left-radius: 6px;
				border-bottom-right-radius: 6px;
				width: calc(100% - 30px);
				background: #fff;
				z-index: 20;
				h3 {
					text-align: left;
					font-size: 16px;
					font-weight: bold;
				}
				.city {
					float: left;
					width: 376px;
					ul {
						li {
							float: left;
							margin-right: 64px;
							margin-top: 28px;
							font-size: 16px;
							a{
								&:hover{
									color:#1bbc9d;
								}	
							}
							
						}
					}
				}
				.theme {
					border-left: 1px solid #ebebeb;
					float: left;
					padding-left: 73px;
					width: 632px;
					ul {
						li {
							float: left;
							margin-right: 64px;
							margin-top: 28px;
							font-size: 16px;
							a{
								&:hover{
									color:#1bbc9d;
								}	
							}
						}
					}
				}
			}
			.seachList {
				transition: all 0.4s ease-out 0s;
				;
				padding-top: 54px;
				background: #fff;
				ul {
					li {
						padding-left: 30px;
						text-align: left;
						font-size: 16px;
						height: 48px;
						line-height: 48px;
						span {
							b {
								color: #1bbc9d!important;
							}
						}
						&:hover {
							background: #f5f7f7;
						}
						i {
							font-size: 16px;
							margin-right: 24px;
						}
					}
				}
			}
			.searchBox_index {
				.searchInput {
					width: 752px;
					position: relative;
					float: left;
					input {
						border: none;
						font-size: 26px;
						width: 100%;
						height: 47px;
						border-bottom: 1px solid #dde0e0;
						box-sizing: border-box;
						text-overflow: ellipsis;
						white-space: nowrap;
						padding: 0;
					}
					;
					.input_highlight {
						z-index: 10;
						position: absolute;
						bottom: 0;
						left: 0;
						height: 0;
						font-size: 26px;
						overflow: hidden;
						color: transparent;
						user-select: none;
						max-width: 100%;
						border-top: 1px solid #000a12;
					}
				}
				.select_people {
					display: inline-block;
					position: relative;
					line-height: 46px;
					height: 46px;
					font-size: 16px;
					border-bottom: 1px solid #dde0e0;
					select {
						width: 170px;
						height: 46px;
						border: 0;
						background-color: transparent;
						appearance: none;
					}
					i {
						position: absolute;
						right: 0;
						font-size: 8px;
					}
				}
				.searchBtn {
					float: right;
					button {
						width: 166px;
						height: 47px;
						line-height: 47px;
						background-image: linear-gradient(-90deg, #009efd 0%, #1bbc9d 100%);
						border-radius: 6px;
						font-size: 16px;
						color: #fff;
						font-weight: bold;
					}
				}
			}
		}
	}
	.iconCountry {
       width: 20px; 
       height: 14px;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
	.icon {
		width: 280px;
		height: 34px;
		vertical-align: middle;
		fill: currentColor;
		overflow: hidden;
	}
	
	#header {
		height: 60px;
		background: #fff;
		.heder-cont {
			width: 100%;
			min-width: 1170px;
			height: 60px;
			.headleft{
				float: left;
			}
			.log {
				margin-left: 38px;
				width: 280px;
				height: 55px;
				line-height: 60px;
				display: inline-block;
				span {
					font-size: 46px;
					vertical-align: middle;
					color: #221714;
					&:last-child {
						color: #1dd4b0!important;
						margin-left: 4px;
					}
				}
			}
			.search {
				display: inline-block;
				margin-left: 40px;
				position: relative;
				height: 36px;
				line-height: 36px;
				width: 330px;
				border-radius: 6px;
				background-color: #edf0f0;
				i {
					font-size: 16px;
					position: absolute;
					left: 14px;
				}
				span {
					display: inline-block;
					padding-left: 39px;
					color: #878e95;
					font-size: 16px;
				}
				;
			}
			.init {
				float: right;
				margin-right: 38px;
				li {
					position: relative;
					float: left;
					font-size: 16px;
					margin-left: 40px;
					line-height: 60px;
					height: 60px;
					.hot {
						padding: 3px 9px;
						background: #e14f3f;
						border-radius: 20px;
						font-size: 12px;
						color: #fff;
						font-weight: bold;
						margin-left: 8px;
					}
					&:first-child {
						margin-left: 0;
					}
					&:hover {
						cursor: pointer;
						color: #00B886;
						&:after {
							content: "";
							height: 2px;
							width: 100%;
							background-image: linear-gradient(-90deg, #009efd 0%, #1bbc9d 100%);
							display: block;
							position: absolute;
							left: 0;
							bottom: 1px;
						}
					}
				}
			}
			.login {
				float: right;
				margin-right: 38px;
				position: relative;
				height: 55px;
				li {
					.hot {
						padding: 3px 9px;
						background: #e14f3f;
						border-radius: 20px;
						font-size: 12px;
						color: #fff;
						font-weight: bold;
						margin-left: 8px;
					}
					line-height: 55px;
					float: left;
					font-size: 16px;
					cursor: pointer;
					&:first-child {
						margin-right: 40px;
						&:hover {
							color: #1bbc9d!important;
						}
					}
					img {
						border-radius: 50%;
						width: 28px;
						height: 28px;
						margin-left: 40px;
						vertical-align: middle;
					}
				}
			}
			.cont {
				position: absolute;
				right: 0;
				top: 62px;
				z-index: 22222;
				width: 280px;
				box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
				ol {
					padding: 0 30px;
					background: #fff;
					li {
						float: inherit;
						line-height: 50px!important;
						border-bottom: 1px solid #ebebeb;
						font-size: 16px;
						&:first-child {
							margin-right: 0;
						}
						&:last-child {
							border: none;
						}
						a {
							color: #353a3f;
						}
						&:hover {
							a {
								color: #1bbc9d!important;
							}
							border-color: #1bbc9d!important;
						}
					}
				}
			}
		}
		/** phone **/
		.hederCountMob {
			height: 1.333333rem;
			line-height: 1.333333rem;
			text-shadow: 2.5px 2.5px 10px rgba(0, 0, 0, .3);
			color: #fff;
			.logMobel {
				i {
					font-size: 1.066666rem;
				}
			}
			.meau {
				position: absolute;
				right: 0.266666rem;
				top: 0;
				font-size: 0.48rem;
			}
			.meauList {
				width: 4.773333rem;
				background: #fff;
				position: absolute;
				right: 0;
				top: 1.04rem;
				ol {
					padding: 0.453333rem 0;
					li {
						height: 1.146666rem;
						line-height: 1.146666rem;
						color: #353a3f;
						font-size: 0.373333rem;
						padding-left: 0.453333rem;
					}
				}
			}
		}
		.isshow {
			display: none;
		}
	}
</style>