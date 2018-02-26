<template>
	<div class="topSeach">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="hotbanner" :class="loc=='Beijing'?'beijing':'shanghai'">
			<p v-if="loc=='Beijing'">
				<span>Beijing</span> History, Culture, and Art in China’s Capital
			</p>
			<p v-else>
				<span>Shanghai</span> Where China’s past and future collide
			</p>
		</div>
		<div class="topSeachInfo">
			<div class="searchList">
				<h3>{{information.title}}</h3>
				
				<div class="topSearchList clearfix">
					<div class="topSearchList-item" v-for="item in activities">
						<a :href="'https://www.localpanda.com/activity/details/'+item.activityId" target="_blank">
							<p v-if="item.recommendedReason" class="title" :title="item.recommendedReason" style="-moz-box-orient: vertical;
							    -webkit-box-orient:vertical;">{{item.recommendedReason}}</p>
							<div class="activity">

								<div class="activity-photo" v-lazy:background-image="item.coverPhotoUrl">

								</div>

							</div>
							<div class="activitDe">
								<div class="info">
									<div class="activeType clearfix">
										<div class="tourType"><i class="iconfont">&#xe653;</i>{{item.category}}</div>
										<div class="duration"><i class="iconfont">&#xe624;</i>Duration: {{item.duration}} {{item.durationUnit|firstUpperCase}}</div>
									</div>
									<div class="titleText" style="-moz-box-orient: vertical;
							    -webkit-box-orient:vertical;">
										{{item.title}}
									</div>
									<div class="totalPic">
										<div class="oldpic" v-if="item.originalPrice">${{item.originalPrice}}</div>
										<div class="nowPic">From <b>${{item.bottomPrice}}</b><span>  pp</span></div>
									</div>
								</div>
								
							</div>
							<div class="highlights">
									<b><span>Highlights</span></b>
									<ul v-if="item.highlights">
										<li v-for="i in delNullArr(item.highlights.split('\n'))">{{i}}</li>
									</ul>
								</div>
						</a>
					</div>
				</div>
			</div>
			<div class="searchList" v-for="i in recommendations">
				<h3>{{i.title}}</h3>
				
				<div class="topSearchList clearfix">
					<div class="topSearchList-item" v-for="item in i.references">
						<a :href="'https://www.localpanda.com/activity/details/'+item.activityId" target="_blank">
							<p v-if="item.recommendedReason" class="title" :title="item.recommendedReason" style="-moz-box-orient: vertical;
							    -webkit-box-orient:vertical;">{{item.recommendedReason}}</p>
							<div class="activity">

								<div class="activity-photo" v-lazy:background-image="item.coverPhotoUrl">

								</div>

							</div>
							<div class="activitDe">
								<div class="info">
									<div class="activeType clearfix">
										<div class="tourType"><i class="iconfont">&#xe653;</i>{{item.category}}</div>
										<div class="duration"><i class="iconfont">&#xe624;</i>Duration: {{item.duration}} {{item.durationUnit|firstUpperCase}}</div>
									</div>
									<div class="titleText" style="-moz-box-orient: vertical;
							    -webkit-box-orient:vertical;">
										{{item.title}}
									</div>
									<div class="totalPic">
										<div class="oldpic" v-if="item.originalPrice">${{item.originalPrice}}</div>
										<div class="nowPic">From <b>${{item.bottomPrice}}</b><span>  pp</span></div>
									</div>
								</div>

							</div>
							<div class="highlights">
								<b><span>Highlights</span></b>
								<ul v-if="item.highlights">
									<li v-for="j in delNullArr(item.highlights.split('\n'))">{{j}}</li>
								</ul>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
		<Bottom  :scrollTop="300"></Bottom>
		<FooterCommon></FooterCommon>
	</div>

</template>

<script>
	import HeaderCommon from '../../components/HeaderCommon/HeaderCommon'
	import FooterCommon from '../../components/FooterCommon/FooterCommon';
	import Bottom from './components/Bottom'
	export default {
		name: 'topSeach',
		data() {
			return {
				logIn:'',
				showBook: false,
				information: '',
				activities: [],
				recommendations: [],
				loc: location.href.split('/').reverse()[1],
				keyword: location.href.split('/').reverse()[0]
			}
		},
		components: {
			HeaderCommon,
			FooterCommon,
			Bottom
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
				that.axios.get("https://www.localpanda.com/api/recommend/" + that.loc + "/" + that.keyword).then(function(resopnse) {
					console.log(resopnse)
					that.information = resopnse.data
					that.activities = resopnse.data.references
					that.recommendations = resopnse.data.recommendations
				}, function(resopnse) {

				})
			}

		},
		filters:{
			
			firstUpperCase(val) {
				if(val)
		  		return val.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
			}
		},
		mounted: function() {
			let that = this
			that.getMes()
			that.logIn = window.localStorage.getItem("logstate");
			var title = document.getElementsByTagName("title")[0];
			var keywords = document.querySelector("meta[name=keywords]");
			var description = document.querySelector("meta[name=description]");
			title.innerHTML = "The Top Local " + that.loc + " Tours | The Best Authentic " + that.loc + " Activities and Experiences."
			keywords.setAttribute("content", "Things to do in " + that.loc + ", " + that.loc + " destinations, " + that.loc + " landmarks, top things to see in " + that.loc + ", " + that.loc + " tourist attractions, Best " + that.loc + " tours, " + that.loc + " tours, " + that.loc + " walking tours, " + that.loc + " sightseeing")
			if(that.loc == "Beijing") {
				description.setAttribute("content", "Experience the best things to do in " + that.loc + ", walking & biking tours, history & culture tours, explore the Forbidden City, Temple of Heaven, Great Wall, Tiananmen Square, and Summer Palace, see dying hutongs, enjoy Peking duck & opera, cooking & Tai Chi classes, and cheap shopping")
			} else if(that.loc == "Shanghai") {
				description.setAttribute("content", "Experience the best things to do in " + that.loc + ", walking & biking tours, history & culture tours, explore the bund & French concession, see local dying neighborhoods, enjoy tea ceremonies, wet markets, and cheap shopping")
			} else if(that.loc == "Suzhou") {
				description.setAttribute("content", "Experience the best things to do in " + that.loc + ", walking & biking tours, history & culture tours, explore Suzhou Gardens, Canals, and Silk crafts & production, see ancient water towns, enjoy stunning photography, local traditions, and cheap shopping")
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
	
	#header {
		background: #fff!important;
		box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
	}
</style>
<style lang="scss" scoped>
	@import "../../assets/scss/base/_setting.scss";
	.topSeach {
		.hotbanner {
			display: -webkit-box;
			-webkit-box-pack: center;
			-webkit-box-align: center;
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
				span {
					display: block;
					font-size: 38px;
					font-weight: bold;
					margin-bottom: 6px;
					text-shadow: 2.5px 2.5px 10px rgba(0, 0, 0, .3);
				}
				text-align: center;
				text-shadow :2.5px 2.5px 10px rgba(0,
				0,
				0,
				.3);
				color: #fff;
				font-size: 20px;
			}
		}
		.topSeachInfo {
			padding-bottom: 100px;
			width: 1170px;
			margin: 0 auto;
			.link {
				margin-top: 80px;
				text-align: center;
				p {
					font-size: 16px;
					color: #353a3f;
				}
				a {
					font-size: 18px;
					color: #1bbc9d;
					text-decoration: underline;
				}
			}
			.searchList {
				margin-top: 60px;
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
					margin-top: 10px;
					.topSearchList-item {
						position: relative;
						float: left;
						overflow: hidden;
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
							border-left: 4px solid #1bbc9d;
							text-overflow: ellipsis;
							display: -webkit-box;
							display: -moz-box;
							-moz-box-orient: vertical;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 3;
							-moz-line-clamp: 3;
							-o-text-overflow: ellipsis;
							word-wrap: break-word;
							margin: 30px 20px 20px;
							font-size: 20px;
							font-weight: bold;
							position: relative;
							padding-left: 14px;
							line-height: 24px;
						}
						.activity {
							.activity-photo {
								width: 370px;
								height: 248px;
								background-repeat: no-repeat!important;
								background-size: cover!important;
								position: relative;
								.type {
									position: absolute;
									top: 10px;
									left: 10px;
									padding: 5px;
									font-size: 14px;
									font-weight: bold;
									background: #f4b33f;
									color: #fff;
								}
							}
						}
						.activitDe {
							padding: 0 20px 20px;
							.activeType {
								height: 48px;
								line-height: 48px;
								.tourType {
									float: left;
									color: #d87b65;
									font-size: 14px;
									i {
										font-size: 12px;
										margin-right: 8px;
									}
								}
								.duration {
									float: right;
									font-size: 14px;
									color: #878e95;
									i {
										font-size: 12px;
										margin-right: 8px;
									}
								}
							}
							.titleText {
								width: 100%;
								height: 48px;
								text-overflow: ellipsis;
								display: -webkit-box;
								display: -moz-box;
								-moz-box-orient: vertical;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
								-moz-line-clamp: 2;
								-o-text-overflow: ellipsis;
								word-wrap: break-word;
								font-size: 20px;
								font-weight: bold;
								text-align: left;
								overflow: hidden;
							}
							.totalPic {
								padding: 20px 0;
								.oldpic {
									text-align: right;
									font-size: 14px;
									color: #878e95;
									text-decoration: line-through;
								}
								.nowPic {
									text-align: right;
									font-size: 14px;
									color: #878e95;
									b {
										color: #353a3f;
										font-size: 20px;
									}
									span{
										color: #353a3f;
									}
								}
							}
						}
						&:hover .highlights{
							-webkit-transition: all .5s cubic-bezier(0, 1, 0.5, 1);
								transition: all .5s cubic-bezier(0, 1, 0.5, 1);
								transform: translateY(0);
						}
					.highlights {
						position: absolute;
						top: 0;
						left: 0;
						transform: translateY(200%);
						-webkit-transition: all .5s cubic-bezier(0, 1, 0.5, 1);
						transition: all .5s cubic-bezier(0, 1, 0.5, 1);
						background-image: linear-gradient(135deg, #009efd 0%, #1bbc9d 100%);
						width: 100%;
						height:100%;
						b{
								color: #fff;
								font-size: 20px;
								
								margin-top: 50px;
								display: block;
								text-align:center;
								span{
									position: relative;
									&:after{
										left: 50%;
										margin-left: -50%;
										content: "";
								         height: 2px;
								         width: 100%;
								         background: #fff;
								         bottom: -24px;
								         display: block;
								         position: absolute;
								         
									}
								}
								
							}
						ul {
							padding: 50px 20px 0;
							height: 250px;
							li {
								color: #FFF;
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
									background: #FFF;
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
		.margin {
			margin-top: 30px;
		}
	}
</style>