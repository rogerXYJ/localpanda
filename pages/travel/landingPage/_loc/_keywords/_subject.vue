<template>
	<div class="landingPage">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="banner" :style="{backgroundImage:'url('+photo+')'}">
			<div class="mask"></div>
			<span>{{title}}</span>
		</div>
		<div class="pageCont page-size">
			<div class="tags">
				<h4>Explore</h4>
				<ul class="clearfix">
					<li v-for="i in tags">
						<a :href="'/travel/landingPage/'+loc+'/'+keywords+'/'+i.keywords">
							<img :src="i.photo.url" />
							<span>{{i.keywords}}</span>	
							<div class="mask"></div>
						</a>
					</li>
				</ul>
				<div class="main-title">
					<h3>{{theme.title}}</h3>
					<p :key="index" v-for="(item,index) in theme.description">{{item}}</p>
				</div>
			</div>
			<div class="recommend" :key="index" v-for="(item,index) in items">
				<h3>{{item.title}}</h3>
				<div class="introduce clearfix">
					<div class="introduce-pic" v-if="item.photo.url">
						<img :src="item.photo.url"/>
					</div>
					<div class="introduce-text" :class="item.photo.url?'':'noImg'">
						{{item.description}}
					</div>
				</div>
				<div class="recommend-activity" v-if="item.products">
					<ul class="clearfix">
						<li v-for="i in item.products">
							<a :href="'/activity/details/'+i.activityId">
								<div class="headPic">
									<img :src="i.coverPhotoUrl"/>
								</div>
								<div class="activityInfo">
									<div class="tourType">{{i.category}} · {{i.duration}} {{i.durationUnit|firstUpperCase}}</div>
									<p>{{i.title}}</p>
									<div class="price">From<b>${{returnFloat(i.bottomPrice)}}</b>PP</div>
								</div>
							</a>
						</li>
					</ul>
					<a v-if="item.linkUrl" :href="item.linkUrl" class="moreLink">{{item.linkText}} <i class="iconfont">&#xe620;</i></a>
				</div>
			</div>
			<div v-if="theme.linkUrl" class="btn"><a :href="theme.linkUrl">{{theme.linkText}}</a></div>
		</div>
		<div class="visitor">
			<div class="visitor-cont page-size">
				<h3>This is what guests are saying about our service</h3>
				<ul class="clearfix">
					<li>
						<div class="visitor-headPic">
							<img src="~static/banner/6.png"/>
						</div>
						<div class="visitor-message">
							<b>Christophe</b>
							<p>I am the one who is in love with travel. I use to work at a hostel before and every time I get a chance I try to explore a new place here in Shanghai.</p>
						</div>
					</li>
					<li>
						<div class="visitor-headPic">
							<img src="~static/banner/6.png"/>
						</div>
						<div class="visitor-message">
							<b>Christophe</b>
							<p>I am the one who is in love with travel. I use to work at a hostel before and every time I get a chance I try to explore a new place here in Shanghai.</p>
						</div>
					</li>
					<li>
						<div class="visitor-headPic">
							<img src="~static/banner/6.png"/>
						</div>
						<div class="visitor-message">
							<b>Christophe</b>
							<p>I am the one who is in love with travel. I use to work at a hostel before and every time I get a chance I try to explore a new place here in Shanghai.</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<services></services>
		<FooterCommon></FooterCommon>
	</div>

</template>

<script>
	import Vue from "vue";
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon'
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	import services from '~/components/pageComponents/landingPage/services'
	import { delNullArr } from "~/assets/js/plugin/utils";
	export default {
		name: 'landingPage',
		async asyncData ({route, store, error, apiBasePath, redirect }) {
			let loc=route.params.loc;
			let keywords=route.params.keywords;
			let subject=route.params.subject
			let data={
			 	logIn: '',
			 	loc:loc,
			 	keywords:keywords,
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
				tags:[],
				
				
				items:""
			}
			let listdata={}
			/*try {
		        listdata = await Vue.axios.get(apiBasePath+"/recommend/"+ data.loc + "/" + data.keyword)
		       
			 	
		      } catch (err) {
		      	
		    }*/
	 		
			 
			return data
		},
		head(){
			let title="22"
			let keywords="33"
			let description="111"
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
			services
		},
		methods: {
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
			

		},
		filters: {

			firstUpperCase(val) {
				if(val)
					return val.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
			}
		},
		mounted: function() {
			let that = this
			let obj={
					"destination": that.loc,
					"keywords": that.keywords,
					"subject": that.subject
			}
			that.axios.post('https://api.localpanda.com/api/content/landingpage/subject',JSON.stringify(obj), {
							headers: {
								'Content-Type': 'application/json; charset=UTF-8'
							}
						}).then((res)=>{
							that.title=res.data.title
							that.photo=res.data.photo.url
							that.tags=res.data.subjects
							that.items=res.data.items
							//主题 标题和内容
							for(let i=0;i<res.data.subjects.length;i++){
								if(that.subject==res.data.subjects[i].keywords){
									that.theme={
										title:res.data.subjects[i].title,
										description:delNullArr(res.data.subjects[i].description.split("\n")),
										linkUrl:res.data.subjects[i].linkUrl,
			 							linkText:res.data.subjects[i].linkText
									}
									
								}
							}
							
						},(res)=>{})
			that.logIn = localStorage.getItem("logstate");
			
		}
	}
</script>
<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';
	@font-face {
		font-family:"pacifico";
		src: url('https://d2q486kjf9cwwu.cloudfront.net/static/font/pacifico.ttf');
		
	}
	#header {
		background: #fff!important;
		box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
	}
</style>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
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
			line-height:500px;
			text-align: center;
			position:relative;
			font-family:"pacifico";
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
    							transform: scale(1.5);	
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
				margin-top: 88px;
				
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
						img{
							width: 100%;
							height: 100%;
						}
					}
					.introduce-text{
						
						margin-left: 508px;
						
						font-size:18px;
						line-height: 24px;
						
					}
					.noImg{
							margin-left: 0!important;
						}
				}
				.recommend-activity{
					margin-top: 24px;
					ul{
						li{
							float: left;
							width: 274px;
							margin-left: 24px;
							.headPic{
								height: 182px;
								img{
									width: 100%;
									height: 100%;
								}
							}
							.activityInfo{
								.tourType{
									font-size: 14px;
									color:#d87b65;
									padding: 10px 0 12px;
								}
								p{
									font-size: 18px;
									font-weight: bold;
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
							&:first-child{
								margin-left: 0;
							}
						}
					}
					.moreLink{
						display: block;
						margin-top:38px;
						color:#1bbc9d;
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
								font-size: 18px;
								margin: 24px 0 11px;
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
	}
</style>