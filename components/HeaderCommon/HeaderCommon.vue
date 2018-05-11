<template>
	<div id="header">
		<div class="heder-cont">
			<div class="log">
				<a href="/">
					<svg class="icon" aria-hidden="true">
					    <use xlink:href="#icon-logo1"></use>
					</svg>
				</a>
			</div>
			<ul class="init" v-if="isAnonymity">
				
			</ul>
			<ul class="init" v-if="(logIn==0||logIn==null)&&!isAnonymity">
				
				<li @click="showContact">Customize Your Trip<em class="hot">HOT</em></li>
				<li @click="isShowAnonymityback">My Bookings</li>
				<li @click="show">Log In</li>
				<li @click="goAboutUs">About Us</li>
				<li  @click="getscoll">Contact Us</li>
				
			</ul>
			<ul class="login" v-if="logIn==1">
				
				<li @click="showContact">Customize Your Trip<em class="hot">HOT</em></li>
				<li @click="goBook" style="margin-right: 40px;">My Bookings</li>
				<li @click="goAboutUs" style="margin-right: 40px;">About Us</li>
				<li @click="getscoll">Contact Us</li>
				<li @click.stop="contshow"><img :src="logimg" /></li>
				<div class="cont" :class="{'isshow':iscontshow}">
					<ol>
						<!--<li><a>Choose a Tour Guide</a></li>
						<li><a>Choose a Activity</a></li>-->
						<li @click.stop="goBook"><a>My Bookings</a></li>
						<li @click.stop="goPrefie"><a>My Profile</a></li>
						<!--<li><a>Account Settings</a></li>-->
						<li @click.top="fb_logout"><a>Log Out</a></li>
					</ol>
				</div>
			</ul>
			
		</div>
	
		<AlertTitle :alertTitleStatus="alertTitleStatus" v-on:alert-title-call-back="alertTitleCallBack">
			<h3 slot="alertTitleLogin">{{alertTitleLogin}}</h3>
			<p slot="alertTitleMessage">{{alertTitleMessage}}</p>
		</AlertTitle>
		<!--<Contact :ContactStatus="ContactStatus" v-on:isshowfn="isShowFn" v-on:contact-call-back="contactCallBack" :objectType="objectType"></Contact>-->
		<Alert   :isShowAlert="isShowAlert" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlert="getIsShowAlert"></Alert>
		<Anonymity :AnonymityStatus="AnonymityStatus"  v-on:anonymity-back="isAnonymityback"></Anonymity>
	</div>
</template>

<script>
	import {GetQueryString} from "~/assets/js/plugin/utils"
	if (process.BROWSER_BUILD) {
	  require('~/assets/font/iconfont.js')
	}
	import AlertTitle from '~/components/Prompt/AlertTitle'
	import Anonymity from '~/components/Prompt/Anonymity'
	import Alert from '~/components/Prompt/Alert'
	//import Contact from '~/components/Contact/Contact'
	export default {
		props:["logIn","isAnonymity","isIndex"],
		name: 'headercommon',
		data() {
			return {
				fbToken:'',
				alertTitleStatus: false, //alert弹框状态
				alertTitleLogin: "", //弹框标题
				alertTitleMessage: "", //弹框内容
				logimg:'',
				iscontshow:true,
				userid:'',
				ContactStatus:false,
				isShowAlert:false,
				alertTitle:'',
				alertMessage:"",
				objectType:'CONSULTING',
				deviceWidth:null,
				AnonymityStatus:"",//匿名订单
				loadJs:false,
				
				
			}
		},
		 components: {
	        AlertTitle,
	        Alert,
	        //Contact,
	        Anonymity
	
	    },
		methods: {
			isShowAnonymityback(){
				this.AnonymityStatus=true
			},
			
			isAnonymityback(val){
				this.AnonymityStatus=val
				
			},
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
				location.href="/travel/customize/step1"
			},
			contactCallBack(val){
				this.ContactStatus=false
			},
			contshow(){
				this.iscontshow=false
			},
			show(){
				this.alertTitleStatus=true
				this.alertTitleLogin="Log in to Local Panda",
				this.alertTitleMessage="Log in to add things to your wishlist and access your bookings from any device."	
			},
			alertTitleCallBack(val) {
				//回调后关闭弹框
				var that = this;
				
				that.alertTitleStatus = false;
			},
			getscoll(){
				//window.scrollTo(100,document.body.scrollHeight)
				window.location.href="/info/contact-us"
			},
			loadScript(url, callback) {
				var that=this
				var script = document.createElement('script');
			    var head = document.getElementsByTagName('head')[0];
			    var loaded;
			    script.src = url;
			    if(typeof callback === 'function'){
			        script.onload = script.onreadystatechange = function(){
			            if(!loaded && (!script.readyState || /loaded|complete/.test(script.readyState))){
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
					if(that.loadJs==true){
						that.logOut()
					}
				})
				
				
				
			},
			ChangeCallback(response,flag) {
				if(response.status === 'connected') {
					
				} else if(response.status === 'not_authorized') { //未经授权
					FB.logout(function(response) {})
				} else {
					//console.log('不是登陆到Facebook;不知道是否授权');
				}
				this.loadJs=true
			},
			logOut(){
				let that=this
				window.localStorage.removeItem("logstate")
				window.localStorage.removeItem("fbToken")
				window.localStorage.removeItem("key")
				window.localStorage.removeItem("userid")
				FB.logout(that.reload);
				
			},
			fb_logout() {
				let that=this
				that.loadScript("//connect.facebook.net/en_US/sdk.js",that.fbAsyncInit)
				
				
			},
			goBook(){
				window.location.href="/user/myBookings?menu=0&flag=1"
			},
			goAboutUs(){
				window.location.href="/info/about-us"
			},
			goPrefie(){
				window.location.href="/user/profile?menu=1&flag=1"
			},
			reload(){

				if(/\/user\//.test(location.pathname)){
					window.location.href="/"
				}else{
					location.reload();
				}
				
			},
			 checkSticky() {
	            if (window.scrollY > this.scrollTop) {
	                this.sticky = true;
	            } else {
	                this.sticky = false;
	            }
      		}
		},
		mounted() {
			let that=this
			
	  			document.getElementsByTagName("body")[0].addEventListener("click", function() {
					that.iscontshow = true

				})
				that.logimg=window.localStorage.getItem("key")
			
				that.fbToken=window.localStorage.getItem("fbToken")
				
			
		},
		created() {
			
			
     
			
		}
	}
</script>
<style lang="scss">
   
  
     
    
</style>
<style lang="scss" scoped>
	
	
	.icon {
       width: 280px; 
       height: 34px;
       vertical-align: middle;
       fill: currentColor;
       overflow: hidden;
    }
	#header{
		height: 60px;
		background: #fff;
		.heder-cont{
			width: 100%;
			min-width: 1170px;
			height: 60px;
			.log{
				margin-left:38px;
				width: 184px;
				height: 55px;
				line-height: 60px;
				display: inline-block;
				  
				span{
					font-size:46px;
					vertical-align: middle;
					color:#221714;
					&:last-child{
						color: #1dd4b0!important;
						margin-left:4px;
					}
				}
				
			}
			.init{
				float: right;
				margin-right: 38px;
				li{
					position: relative;
					float: left;
					font-size: 16px;
					margin-left: 40px;
					line-height:60px; 
					height: 60px;
					.hot{
						padding: 3px 9px;
						background: #e14f3f;
						border-radius: 20px;
						font-size: 12px;
						color: #fff;
						font-weight: bold;
						margin-left: 8px;
					}
					&:first-child{
						margin-left: 0;
					}
					&:hover{
						cursor: pointer;
						color:  #00B886;
						&:after{
							content: "";
					         height: 2px;
					         width: 100%;
					         background-image: linear-gradient(-90deg,#009efd 0%, #1bbc9d 100%);
					         display: block;
					         position: absolute;
					         left: 0;
					         bottom: 1px;
						}
					}
				}
			}
			.login{
				float: right;
				margin-right: 38px;
				position: relative;
				height: 55px;
				
					li{
						.hot{
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
						&:first-child{
							margin-right: 40px;
							&:hover{
								color:#1bbc9d!important;
								
							}
						}
						img{
							border-radius: 50%;
							width: 28px;
							height: 28px;
							margin-left: 40px;
							vertical-align: middle;
						}
					
				}
				
				
			}
			.cont{
					position: absolute;
					right: 0;
					top: 62px;
					z-index: 22222;
					width: 280px;
					box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
					ol{
						padding:0 30px;
						background:#fff;
						li{
							float: inherit;
							line-height: 50px!important;
							border-bottom:1px solid #ebebeb;
							font-size: 16px; 
							&:first-child{
								margin-right: 0;
							}
							&:last-child{
								border:none;
							}
							a{
								color: #353a3f;
							}
							&:hover{
								a{
									color:#1bbc9d!important;
								}
								
								border-color: #1bbc9d!important;
							}
							
							
						}
					}
				}
		}
		
		/** phone **/
		.hederCountMob{
			height: 1.333333rem;
			line-height: 1.333333rem;
			text-shadow :2.5px 2.5px 10px rgba(0,0,0,.3);
			color: #fff;
			.logMobel{
				i{
					font-size: 1.066666rem;
				}
			}
			.meau{
				position: absolute;
				right: 0.266666rem;
				top: 0;
				font-size: 0.48rem;
			}
			.meauList{
				width: 4.773333rem;
				background: #fff;
				position:absolute;
				right: 0;
				top: 1.04rem;
				ol{
					padding:0.453333rem 0;
					li{
						height: 1.146666rem;
						line-height: 1.146666rem;
						color:#353a3f;
						font-size: 0.373333rem;
						padding-left: 0.453333rem;
					}
				}
			}
		}
		.isshow{
			display: none;
		}
	}
	
</style>