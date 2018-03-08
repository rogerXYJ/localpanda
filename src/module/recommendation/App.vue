<template>
	<div class="popularRecommendation">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="hotbanner" :class="loc=='Beijing'?'beijing':'shanghai'">
			<p v-if="loc=='Beijing'">
				<span>Beijing</span>
				History, Culture, and Art in China’s Capital
			</p>
			<p v-else>
				<span>Shanghai</span>
				Where China’s past and future collide
			</p>
		</div>
		<div class="topSeachInfo">
			<div class="searchList">
				<h3>{{information.title}}</h3>
				<p class="import-text">{{information.subtitle}}</p>
				<div class="topSearchList clearfix">
					<div class="topSearchList-item" v-for="item in activities">
						<p v-if="item.slogan" class="title" :title="item.slogan" style="-moz-box-orient: vertical;
						    -webkit-box-orient:vertical;">{{item.slogan}}</p>
						
						<div class="guide">
							<a :href="item.guideInfo.guideId?'https://www.localpanda.com/guide/detail/'+item.guideInfo.guideId:'#'">
								<div class="guideMsg clearfix">
									<div class="headPic">
										<img :src="item.guideInfo.headPortraitUrl" />
									</div>
									<div class="info">
										<h3>By<span>{{item.guideInfo.enName}}</span></h3>
										<p>Tour Given: {{item.guideInfo.serviceTimes}}</p>
										<div class="from-price">From <b>${{item.guideInfo.price}}</b> per day ({{item.guideInfo.hoursPerDay}}hours)</div>
									</div>
								</div>
								<ul v-if="item.highlights">
									<li v-for="i in delNullArr(item.highlights.split('\n'))">{{i}}</li>
								</ul>
							</a>
						</div>
						<div class="activity">
							<a :href="item.id?'https://www.localpanda.com/activity/detail/'+item.id:'#'">
								<div class="activity-photo" :style="{background: 'url('+ item.coverPhotoUrl +')'}">
									<div class="taglist">
										<div class="bottom">
											<span>{{item.tourTypes.split(',')[0]}}</span>
											<div class="activity-title">{{item.title}}</div>
										</div>
	
									</div>
	
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
			<div class='link'>
				<p>Below are our top {{loc}} tours, handpicked by Local Panda guides.</p>
				<a :href="'https://www.localpanda.com/guide/list/'+loc">Click here to see the full list of {{loc}} guides</a>
			</div>
			<div class="searchList" v-for="item in recommendations">
				<h3>{{item.title}}</h3>
				<p class="import-text">{{item.subtitle}}</p>
				<div class="topSearchList clearfix">
					<div class="topSearchList-item" v-for="i in item.activities">
						<p v-if="i.slogan" class="title" :title="i.slogan" style="-moz-box-orient: vertical;
						    -webkit-box-orient:vertical;">{{i.slogan}}</p>
						
						<div class="guide">
							<a :href="i.guideInfo.guideId?'https://www.localpanda.com/guide/detail/'+i.guideInfo.guideId:'#'">
								<div class="guideMsg clearfix">
									<div class="headPic">
										<img :src="i.guideInfo.headPortraitUrl" />
									</div>
									<div class="info">
										<h3>By<span>{{i.guideInfo.enName}}</span></h3>
										<p>Tour Given: {{i.guideInfo.serviceTimes}}</p>
										<div class="from-price">From <b>${{i.guideInfo.price}}</b> per day ({{i.guideInfo.hoursPerDay}}hours)</div>
									</div>
								</div>
								<ul v-if="i.highlights">
									<li v-for="j in delNullArr(i.highlights.split('\n'))">{{j}}</li>
								</ul>
							</a>
						</div>
						<div class="activity">
							<a :href="i.id?'https://www.localpanda.com/activity/detail/'+i.id:'#'">
								<div class="activity-photo" :style="{background: 'url(' + i.coverPhotoUrl + ')'}">
									<div class="taglist">
										<div class="bottom">
											<span>{{i.tourTypes.split(',')[0]}}</span>
											<div class="activity-title">{{i.title}}</div>
										</div>
	
									</div>
	
								</div>
							</a>
						</div>

					</div>
				</div>
			</div>
		</div>
		<FooterCommon></FooterCommon>
	</div>

</template>

<script>
	import HeaderCommon from '../../components/HeaderCommon/HeaderCommon'
	import FooterCommon from '../../components/FooterCommon/FooterCommon';
	//import {delNullArr} from '../../assets/js/plugin/utils.js'
	export default {
		name: 'popularRecommendation',
		data() {
			return {
				showBook: false,
				information: '',
				activities: [],
				recommendations: [],
				loc:'',
				keyword:'',
			}
		},
		components: {
			HeaderCommon,
			FooterCommon
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

			getMes() {
				let that = this
				that.axios.get("https://www.localpanda.com/api/recommend/"+that.loc+"/"+that.keyword).then(function(resopnse) {
					that.information = resopnse.data
					that.activities = resopnse.data.activities
					that.recommendations = resopnse.data.recommendations
				}, function(resopnse) {

				})
			}

		},
		mounted: function() {
			this.loc=location.href.split('/').reverse()[1]
			
			this.keyword=location.href.split('/').reverse()[0].replace(/\-/g,"%20");
			this.getMes()
			this.logIn = window.localStorage.getItem("logstate")
			var title=document.getElementsByTagName("title")[0];
			var keywords=document.querySelector("meta[name=keywords]");
			var description=document.querySelector("meta[name=description]");
			title.innerHTML="The Top Local "+that.loc+" Tours | The Best Authentic "+that.loc+" Activities and Experiences."
			keywords.setAttribute("content","Things to do in Beijing, Beijing destinations, Beijing landmarks, top things to see in Beijing, Beijing tourist attractions, Best Beijing tours, Beijing tours, Beijing walking tours, Beijing sightseeing,")
			keywords.setAttribute("content","Things to do in "+that.loc+", "+that.loc+" destinations, "+that.loc+" landmarks, top things to see in "+that.loc+", "+that.loc+" tourist attractions, Best "+that.loc+" tours, "+that.loc+" tours, "+that.loc+" walking tours, "+that.loc+" sightseeing, Great Wall tours")
			if(that.loc=="Beijing"){
				description.setAttribute("content","Experience the best things to do in "+that.loc+", walking & biking tours, history & culture tours, explore the Forbidden City, Temple of Heaven, Great Wall, Tiananmen Square, and Summer Palace, see dying hutongs, enjoy Peking duck & opera, cooking & Tai Chi classes, and cheap shopping")
			}else if(that.loc=="Shanghai"){
				description.setAttribute("content","Experience the best things to do in "+that.loc+", walking & biking tours, history & culture tours, explore the bund & French concession, see local dying neighborhoods, enjoy tea ceremonies, wet markets, and cheap shopping")
			}else if(that.loc=="Suzhou"){
				description.setAttribute("content","Experience the best things to do in "+that.loc+", walking & biking tours, history & culture tours, explore Suzhou Gardens, Canals, and Silk crafts & production, see ancient water towns, enjoy stunning photography, local traditions, and cheap shopping")
			}

		}
	}
</script>
<style lang="scss">
	@import '../../assets/scss/_main.scss';
	@import '../../assets/font/iconfont.css';
	body,
	html {
		height: 100%;
		background: #FAF9F8!important;
	}
	
	#headercommon {
		background: #fff!important;
		box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
	}
</style>
<style lang="scss" scoped>
	@import "../../assets/scss/base/_setting.scss";
	.popularRecommendation {
		.hotbanner {
			display:-webkit-box;
             -webkit-box-pack:center;
             -webkit-box-align:center;
			&.beijing {
				background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Beijing.jpg") no-repeat;
				background-size: cover;
			}
			&.shanghai {
				background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Shanghai.jpg") no-repeat;
				background-size: cover;
			}
			height:260px;
			p {
				span{
					display: block;
					font-size: 38px;
					font-weight: bold;
					margin-bottom: 6px;
					text-shadow :2.5px 2.5px 10px rgba(0,0,0,.3);
				}
				text-align: center;
				text-shadow :2.5px 2.5px 10px rgba(0,0,0,.3);
				color: #fff;
				font-size: 20px;
				
			}
		}
		.topSeachInfo {
			padding-bottom: 100px;
			width: 1170px;
			margin: 0 auto;
			.link{
				margin-top: 80px;
				text-align: center;
				p{
					font-size:16px;
					color:  #353a3f;
				}
				a{
					font-size: 18px;
					color: #1bbc9d;
					text-decoration: underline;
				}
			}
			.searchList {
				margin-top: 80px;
				h3 {
					text-align: center;
					font-size: 32px;
					color: #3a3a3a;
					font-weight: bold;
					 
				}
				.import-text {
					text-align: center;
					font-size: 16px;
					color: #3a3a3a;
					width: 800px;
					margin: 10px auto 0;
					line-height: 24px;
				}
				.topSearchList {
					
					margin-top: 17px;
					.topSearchList-item {
						float:left;
						transition: .3s transform;
						&:hover {
							transform: translateY(-10px);
							box-shadow: 0px 10px 20px 0px rgba(53, 58, 63, 0.1);
						}
						background: #fff;
						margin-right:30px;
						&:nth-child(3n+0) {
							margin-right: 0;
						}
						width:370px;
						margin-top: 30px;
						.title {
						    height: 72px;
						    width: 330px;
						    overflow: hidden;
						    border-left: 4px solid  #1bbc9d;
						    text-overflow: ellipsis;
						    display: -webkit-box;
						    display: -moz-box;
						    -moz-box-orient: vertical;
						    -webkit-box-orient:vertical;
						    
						    -webkit-line-clamp: 3;
						     -moz-line-clamp:3;
						     -o-text-overflow: ellipsis;
						    word-wrap: break-word;
							margin: 30px 20px 20px;
							font-size: 20px;
							font-weight: bold;
							position: relative;
							padding-left: 14px;
							line-height: 24px;
							/*&:after {
								position: absolute;
								content: "...";
								background: #fff;
								bottom: 0;
								right: 0;
							}*/
							
						}
						.activity {
							.activity-photo {
								width: 370px;
								height: 248px;
								background-repeat: no-repeat!important;
								background-size:cover!important;
								position: relative;
								.taglist {
									width: 100%;
									height: 110px;
									background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
									;
									position: absolute;
									bottom: 0px;
									left: 0px;
									color: #fff;
									.bottom {
										margin-top: 42px;
										padding: 0 20px;
										span {
											font-size: 16px;
										}
										.activity-title {
											overflow: hidden;
											text-overflow: ellipsis;
											white-space: nowrap;
											margin-top: 6px;
											font-weight: bold;
											font-size: 20px;
										}
									}
								}
							}
						}
						.guide {
							background: #fff;
							padding:0 20px 30px 20px;
							.guideMsg {
								.headPic {
									width: 100px;
									height: 100px;
									float: left;
									img {
										border-radius: 50%;
										width: 100%;
										height: 100%;
									}
								}
								.info {
									float: right;
									padding: 15px 0;
									h3 {
										text-align: left;
										font-size: 16px;
										color: #878e95;
										font-weight: normal;
										span {
											font-size: 18px;
											color: #1bbc9d;
											text-decoration: underline;
											margin-left: 6px;
											font-weight: bold;
										}
									}
									p {
										font-size: 16px;
										color: #878e95;
										margin-top: 6px;
									}
									.from-price {
										margin-top: 12px;
										font-size: 16px;
										color: #878e95;
										b {
											color: #353a3f;
											font-size: 18px;
										}
									}
								}
							}
							ul {
								margin-top: 20px;
								height:242px;
								li {
									color: #353a3f;
									font-size: 16px;
									position: relative;
									padding-left: 16px;
									margin-top: 12px;
									line-height: 22px;
									&:first-child {
										margin-top: 0;
									}
									&:after {
										position: absolute;
										content: "";
										width: 4px;
										height: 4px;
										border-radius: 50%;
										background: #1bbc9d;
										left: 0;
										top: 8px;
									}
								}
							}
						}
					}
				}
			}
		}
		.margin{
			margin-top: 30px;
		}
	}
</style>