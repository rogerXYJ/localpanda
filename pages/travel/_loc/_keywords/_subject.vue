<template>
	<div class="landingPage">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="banner" v-lazy:background-image="photo">
			<div class="mask"></div>
			<span>{{title}}</span>
		</div>
		<div class="pageCont page-size">
			<div class="tags" >
				<h4>Explore</h4>
				<ul class="clearfix">
					<li v-for="i in tags">
						<a :href="i.keywords=='Customize Your Trip'?'/travel/customize/step1':'/travel/'+loc+'/'+keywords+'/'+i.urlField">
							<img v-lazy="i.photo.url" />
							<span>{{i.keywords}}</span>	
							<div class="mask"></div>
						</a>
					</li>
				</ul>
				<div class="main-title" id="tags">
					<h3>{{theme.title}}</h3>
					<p :key="index" v-for="(item,index) in theme.description">{{item}}</p>
				</div>
			</div>
			<div class="recommend" :class="{right:index%2}" :key="index" v-for="(item,index) in items">
				<h3>{{item.title}}</h3>
				<div class="introduce clearfix">
					
					<div class="introduce-pic" v-if="item.photo">
						<img v-lazy="item.photo.url"/>
					</div>
					
					<div class="introduce-text" :class="item.photo?'':'noImg'">
						<p v-for="j in delNullArr(item.description.split('\n'))">{{j}}</p>
					</div>
					
					
				</div>
				<div class="recommend-activity" v-if="item.products">
					<ul class="clearfix">
						<li v-for="i in item.products">
							<a :href="'/activity/details/'+i.activityId" target="_blank">
								<div class="headPic">
									<img v-lazy="i.coverPhotoUrl"/>
								</div>
								<div class="activityInfo">
									<div class="tourType">{{i.category}}{{i.groupType?' · '+i.groupType:''}}</div>
									<p>{{i.title}}</p>
									<div class="duration"><i class="iconfont">&#xe624;</i>Duration: {{i.duration}} {{i.durationUnit|firstUpperCase}}</div>
									<div class="price">From<b>${{returnFloat(i.bottomPrice)}}</b>PP</div>
								</div>
							</a>
						</li>
					</ul>
					<a v-if="item.linkUrl" :href="item.linkUrl" class="moreLink" target="_blank">{{item.linkText}} <i class="iconfont">&#xe620;</i></a>
				</div>
			</div>
			<div v-if="theme.linkUrl" class="btn"><a :href="theme.linkUrl" target="_blank">{{theme.linkText}}</a></div>
		</div>
		<div class="visitor">
			<div class="visitor-cont page-size">
				<h3>This is what guests are saying about our service</h3>
				<ul class="clearfix" v-if="loc=='Shanghai'">
					<li>
						<div class="visitor-headPic">
							<img v-lazy="'https://cloud.localpanda.com/static/content/reviews/Claudia.jpg'"/>
						</div>
						<div class="visitor-message">
							<b>Claudia Flores </b>
							<em>Mexico City, Mexico</em>
							<p>Local Panda had an incredible amount of attention and patience throughout my trip. I had a great tour that went way beyond my expectations.  The sites and smells of everywhere we visited around Shanghai were fantastic as well. My guide, Jamie, was nice, intelligent, great English, everything you want in a tour guide. Thanks again!!!</p>
						</div>
					</li>
					<li>
						<div class="visitor-headPic">
							<img v-lazy="'https://cloud.localpanda.com/static/content/reviews/SamMorgan.jpg'"/>
						</div>
						<div class="visitor-message">
							<b>Sam Morgan </b>
							<em>Brisbane, Australia</em>
							<p>I would like to say a very big thank you to our tour guide while visiting Shanghai. Jamie was very knowledgeable and very easy to get on with, with her lovely personality. We all enjoyed the two days spent with her. Thank you to Local Panda for helping with organizing our itinerary. </p>
						</div>
					</li>
					<li>
						<div class="visitor-headPic">
							<img v-lazy="'https://cloud.localpanda.com/static/content/reviews/Cynthia.jpg'"/>
						</div>
						<div class="visitor-message">
							<b>Cynthia Huang</b>
							<em>Los Angeles, California</em>
							<p>Local Panda takes the worry out of organizing things on your own in China. However beautiful China is, navigating the system can be daunting, if not impossible. I highly recommend Local Panda to help travelers who like to do things away from the cookie-cutter tours that are available to most travelers. </p>
						</div>
					</li>
				</ul>
				<ul class="clearfix" v-if="loc=='shanghai'">
					<li>
						<div class="visitor-headPic">
							<img v-lazy="'https://cloud.localpanda.com/static/content/reviews/Claudia.jpg'"/>
						</div>
						<div class="visitor-message">
							<b>Claudia Flores </b>
							<em>Mexico City, Mexico</em>
							<p>Local Panda had an incredible amount of attention and patience throughout my trip. I had a great tour that went way beyond my expectations.  The sites and smells of everywhere we visited around Shanghai were fantastic as well. My guide, Jamie, was nice, intelligent, great English, everything you want in a tour guide. Thanks again!!!</p>
						</div>
					</li>
					<li>
						<div class="visitor-headPic">
							<img v-lazy="'https://cloud.localpanda.com/static/content/reviews/SamMorgan.jpg'"/>
						</div>
						<div class="visitor-message">
							<b>Sam Morgan </b>
							<em>Brisbane, Australia</em>
							<p>I would like to say a very big thank you to our tour guide while visiting Shanghai. Jamie was very knowledgeable and very easy to get on with, with her lovely personality. We all enjoyed the two days spent with her. Thank you to Local Panda for helping with organizing our itinerary. </p>
						</div>
					</li>
					<li>
						<div class="visitor-headPic">
							<img v-lazy="'https://cloud.localpanda.com/static/content/reviews/Cynthia.jpg'"/>
						</div>
						<div class="visitor-message">
							<b>Cynthia Huang</b>
							<em>Los Angeles, California</em>
							<p>Local Panda takes the worry out of organizing things on your own in China. However beautiful China is, navigating the system can be daunting, if not impossible. I highly recommend Local Panda to help travelers who like to do things away from the cookie-cutter tours that are available to most travelers. </p>
						</div>
					</li>
				</ul>
				<ul class="clearfix" v-if="loc=='Beijing'">
					<li>
						<div class="visitor-headPic">
							<img v-lazy="'https://cloud.localpanda.com/static/content/reviews/Claudia.jpg'"/>
						</div>
						<div class="visitor-message">
							<b>Claudia Flores </b>
							<em>Mexico City, Mexico</em>
							<p>Local Panda had an incredible amount of attention and patience throughout my trip. I had a great tour that went way beyond my expectations.  The sites and smells of everywhere we visited around Shanghai were fantastic as well. My guide, Jamie, was nice, intelligent, great English, everything you want in a tour guide. Thanks again!!!</p>
						</div>
					</li>
					<li>
						<div class="visitor-headPic">
							<img v-lazy="'https://cloud.localpanda.com/static/content/reviews/Selvarani.jpg'"/>
						</div>
						<div class="visitor-message">
							<b>Selvarani Saravanamuthu</b>
							<em> Seattle, Washington</em>
							<p>I have to say a huge thank you to Local Panda for putting together this memorable trip. The tours have been par excellence, and I can't be happy enough about it. Local Panda have provided us with a wonderful and memorable experience we will cherish forever. I will not hesitate to recommend Local Panda to my friends when they plan their trip to China.   </p>
						</div>
					</li>
					<li>
						<div class="visitor-headPic">
							<img v-lazy="'https://cloud.localpanda.com/static/content/reviews/Cynthia.jpg'"/>
						</div>
						<div class="visitor-message">
							<b>Cynthia Huang</b>
							<em>Los Angeles, California</em>
							<p>Local Panda Exceeded our <br>expectations in every way. Our guide Rebecca was a Hangzhou native whose local knowledge of the city was beyond anything we could have hoped for. The personalized service sets Local Panda apart. If you want to see something, or do something off of the beaten path, they will go above and beyond to accommodate you." </p>
						</div>
					</li>
				</ul>
				<ul class="clearfix" v-if="loc=='beijing'">
					<li>
						<div class="visitor-headPic">
							<img v-lazy="'https://cloud.localpanda.com/static/content/reviews/Claudia.jpg'"/>
						</div>
						<div class="visitor-message">
							<b>Claudia Flores </b>
							<em>Mexico City, Mexico</em>
							<p>Local Panda had an incredible amount of attention and patience throughout my trip. I had a great tour that went way beyond my expectations.  The sites and smells of everywhere we visited around Shanghai were fantastic as well. My guide, Jamie, was nice, intelligent, great English, everything you want in a tour guide. Thanks again!!!</p>
						</div>
					</li>
					<li>
						<div class="visitor-headPic">
							<img v-lazy="'https://cloud.localpanda.com/static/content/reviews/Selvarani.jpg'"/>
						</div>
						<div class="visitor-message">
							<b>Selvarani Saravanamuthu</b>
							<em> Seattle, Washington</em>
							<p>I have to say a huge thank you to Local Panda for putting together this memorable trip. The tours have been par excellence, and I can't be happy enough about it. Local Panda have provided us with a wonderful and memorable experience we will cherish forever. I will not hesitate to recommend Local Panda to my friends when they plan their trip to China.   </p>
						</div>
					</li>
					<li>
						<div class="visitor-headPic">
							<img v-lazy="'https://cloud.localpanda.com/static/content/reviews/Cynthia.jpg'"/>
						</div>
						<div class="visitor-message">
							<b>Cynthia Huang</b>
							<em>Los Angeles, California</em>
							<p>Local Panda Exceeded our <br>expectations in every way. Our guide Rebecca was a Hangzhou native whose local knowledge of the city was beyond anything we could have hoped for. The personalized service sets Local Panda apart. If you want to see something, or do something off of the beaten path, they will go above and beyond to accommodate you." </p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<services></services>
		<Foot></Foot>
		<FooterCommon></FooterCommon>
		<themeMenu v-if="isMenu" :tags="tags" :loc="loc" :subject="subject" :keywords="keywords"></themeMenu>
		<email class="view" v-if="showEmail" @hidden="setHidden" @ishowFn="showFn"></email>
		
		<dailog 
			:isShowAlert="isShowAlert" 
			:alertTitle="alertTitle" 
			:alertMessage="alertMessage"
			@setIsShowAlert="getdailog"
			></dailog>
		
	</div>

</template>

<script>
	import Vue from "vue";
	import email from '~/components/email'
	import dailog from "~/components/email/dailog"
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon'
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	import Foot from '~/components/FooterCommon/Foot';
	import services from '~/components/pageComponents/landingPage/services'
	import themeMenu from '~/components/pageComponents/landingPage/themeMenu'
	import { delNullArr } from "~/assets/js/plugin/utils";
	export default {
		name: 'landingPage',
		async asyncData ({route, store, error, apiBasePath, redirect }) {
			let loc=route.params.loc;
			let keyword=route.params.keywords;
			let subject=route.params.subject
			let data={
			 	logIn: '',
			 	loc:loc,
			 	keywords:keyword,
			 	subject:subject,
			 	title:'',   //广告位 title
			 	photo:'',	//头图
			 	//主题
			 	theme:{
			 		title:'',
			 		description:[],
			 		linkUrl:'',
			 		linkText:''
			 	},
			 	tdk:{},
				tags:[],
				items:"",
				showEmail:false,
				checked:false,
				isMenu:false,
				isShowAlert:false,
				alertTitle:'Successful! Thank you for subscribing us',
				alertMessage:'You will receive our hand-picked travel inspiration, tips and offerings for you.',
				isTrue:false,
				
				time:null,
			}
			let listdata={}
			let obj={
				"destination": data.loc,
				"urlField": data.keywords,
				"subject": data.subject
			}
			try {
				
		        listdata = await Vue.axios.post(apiBasePath+"content/landingpage/subject",JSON.stringify(obj), {
							headers: {
								'Content-Type': 'application/json; charset=UTF-8'
							}
						});
						
			       	data.title=listdata.data.title
					data.photo=listdata.data.photo.url
					data.tags=listdata.data.subjects
					data.items=listdata.data.items
					data.tdk=listdata.data.tdk
					//主题 标题和内容
					for(let i=0;i<listdata.data.subjects.length;i++){
						if(data.subject==listdata.data.subjects[i].urlField){
							data.theme={
								title:listdata.data.subjects[i].title,
								description:delNullArr(listdata.data.subjects[i].description.split("\n")),
								linkUrl:listdata.data.subjects[i].linkUrl,
	 							linkText:listdata.data.subjects[i].linkText
							}
							
						}
					}
			 	//console.log(data.theme)
		      } catch (err) {
		      	
		    }
			return data
		},
		head(){
			let title=this.tdk.title?this.tdk.title:''
			let keywords=this.tdk.keywords
			let description=this.tdk.description
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
		components: {
			HeaderCommon,
			FooterCommon,
			services,
			themeMenu,
			Foot,
			email,
			dailog
		},
		methods: {
			showFn(val){
				this.isTrue=val.isShowAlert
				if(this.isTrue){
					this.isShowAlert=true
				}
				clearTimeout(this.time);
			},
			setHidden(val){
				this.showEmail=val.ishidden
				this.checked=val.checked
			},
			getdailog(val){
				this.isShowAlert=val
			},
			delNullArr(array) {
				for(var i = 0; i < array.length; i++) {
					if(array[i] == "" || typeof(array[i]) == "undefined") {
						array.splice(i, 1);
						i = i - 1;

					}

				}
				return array;
			},
			
			returnFloat(value) {
				var value = Math.round(parseFloat(value) * 100) / 100;
				var xsd = value.toString().split(".");
				if(xsd.length == 1) {
					value = value.toString() + ".00";
					return value;
				}
				if(xsd.length > 1) {
					if(xsd[1].length < 2) {
						value = value.toString() + "0";
					}
					return value;
				}
			},
			scorllBar(){
				let height=document.querySelector(".tags").offsetTop
				if(window.scrollY>height){
					this.isMenu=true
					
				}else{
					this.isMenu=false
				}
				
			},
			showEmailFn(){
				ga(gaSend, {
					hitType: 'event',
					eventCategory: 'content_lp',
					eventAction: 'popup',
					eventLabel: 'email_subscribe',

				});
				this.showEmail=true
			}
			

		},
		filters: {

			firstUpperCase(val) {
				if(val)
					return val.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
			}
		},
		mounted: function() {
			let that = this
			//this.isShowAlert=true
			//this.showEmail=true
			that.logIn = localStorage.getItem("logstate");
			window.addEventListener("scroll", this.scorllBar);
//			window.addEventListener("scroll", this.scorllBar1);
			
			if(location.href.indexOf("#")!=-1){
				document.documentElement.scrollTop=document.querySelector("#tags").offsetTop-100
			}
			if(localStorage.getItem("key")){
				clearTimeout(that.time)
			}else{
				that.time=setTimeout(this.showEmailFn,5000);
			}
			
		},
		watch:{
			checked:function(val,oldVal){
				if(val){
					this.showEmail=false
					clearTimeout(this.time)
				}
			}
		}
	}
</script>
<style lang="scss">
	//@import '~/assets/scss/_main.scss';
	//@import '~/assets/font/iconfont.css';
	@font-face {
		font-family:"pacifico";
		src: url('https://cloud.localpanda.com/static/font/pacifico.ttf');
		
	}
	#header {
		background: #fff!important;
		box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
	}
</style>
<style lang="scss" scoped>
	//@import '~/assets/scss/base/_setting.scss';
	.page-size{
		width:1170px;
		margin: 0 auto;
	}
	.landingPage {
		.banner{
			height:500px;
			background-size:cover!important;
			background-position:center!important;
			background-repeat: no-repeat!important;
			color:#fff;
			font-size:86px;
			font-weight:bold;
			text-align: center;
			position:relative;
			font-family:"pacifico";
			display: flex;
            justify-content: center;/*实现水平居中*/
            align-items:center; /*实现垂直居中*/
			span{
				position: relative;
				z-index: 2;
				
			}
			
		}
		.pageCont{
			padding-bottom: 80px;
			.tags{
				padding-top: 58px;
				h4{
					font-size: 24px;
					font-weight: bold;
				}
				ul{
					
					li{
						margin-top: 18px;
						float: left;
						width: 274px;
						height: 74px;
						margin-right: 24px;
						border-radius: 6px;
						font-size:18px;
    					position:relative;
    					overflow:hidden; 
    					&:hover{
    						img{
    							transform: scale(1.2);	
    						}  
						}
    					
						&:nth-child(4n+4){
							margin-right: 0;
						}
						a{
							height: 74px;
							img{
	    						width: 100%;
	    						height: 100%;
	    						border-radius: 6px;
	    						transition: .5s;
	    					}
							display: block;
							color: #fff;
							
							
							span{
								width:100%;
								position: absolute;
								left:50%;
								top: 50%;
								transform: translate(-50%,-50%);
								font-size:18px;
								text-align: center;
								z-index:20;
							}
						}
						
						
					}
				}
				.main-title{
					margin-top: 58px;
					h3{
						font-size: 36px;
						font-weight: bold;
					}
					p{
						margin-top: 14px;
						font-size: 24px;
						line-height: 30px;
					}
				}
			}
			
			.recommend{
				margin-top: 50px;
				
				h3{
					font-size: 30px;
					font-weight: bold;
				}
				.introduce{
					margin-top: 14px;
					.introduce-pic{
						float: left;
						width: 478px;
						height: 318px;
						margin-right:50px;
						img{
							width: 100%;
							height: 100%;
						}
					}
					.introduce-text{
						padding-left: 528px;
						font-size:18px;
						line-height: 24px;
						
					}
					.noImg{
							padding: 0!important;
						}
				}
				.recommend-activity{
					
					ul{
						li{
							&:hover {
								transform: translateY(-10px);
								box-shadow: 0px 10px 20px 0px rgba(53, 58, 63, 0.1);
							}
							transition: .3s transform;
							box-shadow: 0 2px 6px 0 rgba(53,58,63,.1);
							margin-top: 24px;
							float: left;
							width: 274px;
							margin-right: 24px;
							.headPic{
								height: 182px;
								img{
									width: 100%;
									height: 100%;
								}
							}
							.activityInfo{
								
								padding: 0 20px 20px;
								.tourType{
									font-size: 14px;
									color:#d87b65;
									padding: 10px 0 12px;
								}
								p{
									font-size: 18px;
									font-weight: bold;
									height: 74px;
						              line-height: 24px;
						              text-overflow: ellipsis;
						              display: -webkit-box;
						              display: -moz-box;
						              -moz-box-orient: vertical;
						              -webkit-box-orient: vertical;
						              -webkit-line-clamp: 3;
						              word-wrap: break-word;
						              overflow: hidden;
						     
						              font-weight: bold;
								}
								.duration {
									margin-top: 10px;
									font-size: 14px;
									color: #878e95;
									i {
										font-size: 12px;
										margin-right: 8px;
									}
								}
								.price{
									margin-top: 10px;
									font-size: 14px;
									b{
										font-size: 18px;
										margin:0 6px;
									}
								}
							}
							&:nth-child(4n+4){
								margin-right: 0;
							}
						}
					}
					.moreLink{
						display: block;
						margin-top:38px;
						color:#1bbc9d;
						text-align: right;
						font-size:20px;
							i{
								vertical-align: middle;
								font-size: 12px;
								margin-bottom: 3px;
								display: inline-block;
								
							}
							&:hover{
								text-decoration: underline;
							}
						
						
					}
				}
			}
			.right{
				.introduce{
					.introduce-pic{
						float:right;
						margin-right: 0;
						margin-left: 50px;
					}
					.introduce-text{ padding-left: 0; padding-right: 528px;}
				}
				
			}
			.btn{
				width: 573px;
				height: 42px;
				border-radius: 20px;
				border: solid 2px #1bbc9d;
				text-align: center;
				line-height:42px;
				margin:80px auto 0;
				
				a{
					font-size: 16px;
					color:#1bbc9d;
					font-weight: bold;
				}
			}
		}
		.visitor{
			background:#faf9f8;
			padding: 80px 0;
			.visitor-cont{
				h3{
					font-size: 18px;
					text-align:center;
				}
				ul{
					margin-top: 34px;
					li{
						width: 30%;
						float: left;
						margin-right: 5%;
						&:last-child{
							margin-right: 0;
						}
						.visitor-headPic{
							width: 146px;
							height: 146px;
							margin:0 auto;
							img{
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}
						}
						.visitor-message{
							b{
								display: block;
								font-size: 20px;
								margin-top: 24px;
								
							}
							em{
								display: block;
								font-size: 16px;
								font-weight: bold;
								margin: 4px 0 12px;
								
							}
							p{
								font-size: 16px;
							}
							text-align: center;
						}
					}
				}
			}
			
		}
		.mask{
				position: absolute;
				left: 0;
				top: 0;
				min-width: 100%;
				min-height: 100%;
				background: rgba(0,0,0,0.4);
			}
		.view{
			animation: fa 1s ease-in-out forwards;
			opacity: 0;
		}
		@keyframes fa{
			from{opacity: 0}
			to{opacity: 1}
		}
	}
</style>