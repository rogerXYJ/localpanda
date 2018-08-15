<template>
	<div id="activitiesDetail">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<Meau v-if="isShowMeau" :inclusions="inclusions" :highlights="highlights" :notice="notice" :exclusions="exclusions" :picInfo="picInfo" :photoList="photoList" :recommed="recommed" :travelersReviews="travelersReviews"></Meau>
		<ActivityBanner :bannerPhotos="detail.bannerPhotos" ></ActivityBanner>
		<Activities 
			:isShowMeau="isShowMeau"
			:remark="remark" 
			:notice="notice" 
			:inclusions="inclusions" 
			:exclusions="exclusions" 
			:introduction="introduction" 
			:isShowBookNow="isShowBookNow" 
			:isscroll="isscroll" 
			:picInfo="picInfo" 
			:id="id" 
			:detail="detail" 
			:highlights="highlights" 
			:destinations="destinations" 
			:itemsIncluded="itemsIncluded" 
			:destination="destination"
			:photoList="photoList"
			:recommed="recommed"
			:travelersReviews="travelersReviews"
			:pageSize="pageSize"
			:pageNum="pageNum"
			@currencyChange="currencyChangeFn"
			></Activities>
		<FooterCommon></FooterCommon>
		<div class="toast-container" v-if="toastShow">
			<div class="toast-message clearfix">
				<span>
       				<svg class="icon" aria-hidden="true">
					    <use xlink:href="#icon-tishi"></use>
					</svg>
       			</span>
				<div class="toast-text">
					{{toast}}
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	// if (process.browser) {
	//   require('~/assets/js/pages/talk.js')
	// }
	import HeaderCommon from "~/components/HeaderCommon/HeaderCommon";
	import FooterCommon from "~/components/FooterCommon/FooterCommon";
	import ActivityBanner from "~/components/pageComponents/activity/details/ActivityBanner";
	import Activities from "~/components/pageComponents/activity/details/Activities";
	import Meau from "~/components/pageComponents/activity/details/Meau";
	import { delNullArr,getUrlParams } from "~/assets/js/plugin/utils";
	import Vue from 'vue';
	export default {
		name: "activitiesDetail",
		async asyncData({
			route,
			store,
			error,
			apiBasePath,
			redirect
		},callback) {

			//callback(null, { title: res.data.title });

			var consoleTimeS = new Date().getTime();
			console.log('node start time:'+consoleTimeS);

			let id = route.params.id;
			// 服务端渲染部分 这部分操作还没有页面实例，只是初始化页面数据
			let data = {
				detail: {}, //详情数据
				highlights: [], //highlights字符串转成数组
				destinations: "", //目的地
				itemsIncluded: [], //itemsIncluded转成数组
				logIn: "",
				id: id,
				isShowMeau: false,
				isShowBookNow: false,
				isscroll: false,
				introduction: "",
				remark: [],
				destination: "",
				toast: "This activity was booked by another guest an hour ago",
				toastShow: false,
				inclusions:[],
				exclusions:[],
				notice:[],
				photoList:[],
				recommed:[],
				remarkData:[],
				travelersReviews: '',
				pageSize:3,
				pageNum:1
			};
			var response = {};
			let apiActivityPriceRes = {};
			let apiActivityRecommendRes = {};
			let photoList={};
			
			try {
				//基本信息
				var Promise1 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath + "product/activity/" + id).then(function(res) {
						// var consoleTimeS2 = new Date().getTime();
						// 	console.log('基本信息接口花费时间：'+(consoleTimeS2-consoleTimeS)+' ms');
						resolve(res);
					}, function(res) {
						resolve(res);
					});
				});

				

				//游客图片
				var Promise2 = new Promise(function(resolve, reject){
					resolve(res);
					// Vue.axios.get(apiBasePath+"public/photo/"+id+"/ACTIVITY_TRAVELER/list").then(function(res) {
					// 	// var consoleTimeS2 = new Date().getTime();
					// 	// 	console.log('游客图片接口花费时间：'+(consoleTimeS2-consoleTimeS)+' ms');
					// 	resolve(res);
					// }, function(res) {
					// 	resolve(res);
					// });
				});

				//推荐信息
				var Promise3 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath + "product/activity/"+id+"/recommend?currency=USD").then(function(res) {
						// var consoleTimeS2 = new Date().getTime();
						// 	console.log('推荐接口花费时间：'+(consoleTimeS2-consoleTimeS)+' ms');
						resolve(res);
					}, function(res) {
						resolve(res);
					});
				});

				//价格信息
				var Promise4 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath + "product/activity/"+id+"/price?currency=USD").then(function(res) {
						// var consoleTimeS2 = new Date().getTime();
						// 	console.log('价格接口花费时间：'+(consoleTimeS2-consoleTimeS)+' ms');
						resolve(res);
					}, function(res) {
						resolve(res);
					});
				});

				//价格明细
				var Promise7 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath + "product/activity/"+id+"/price/detail?currency=USD").then(function(res) {
						// var consoleTimeS2 = new Date().getTime();
						// 	console.log('价格接口花费时间：'+(consoleTimeS2-consoleTimeS)+' ms');
						resolve(res);
					}, function(res) {
						resolve(res);
					});
				});

				//点评
				var Promise5 = new Promise(function(resolve, reject){
					Vue.axios.post(apiBasePath+"user/comment/list",JSON.stringify({"activityId": id,'pageNum':1,'pageSize':3}),{
							headers: {
							'Content-Type': 'application/json'
							}
						}).then(function(res) {
							// var consoleTimeS2 = new Date().getTime();
							// console.log('点评接口花费时间：'+(consoleTimeS2-consoleTimeS)+' ms');
						resolve(res);
					}, function(res) {
						resolve(res);
					});
				});

				//banner
				var Promise6 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath+"public/photo/"+id+"/ACTIVITY_BANNER/list").then(function(res) {
						// var consoleTimeS2 = new Date().getTime();
						// 	console.log('游客图片接口花费时间：'+(consoleTimeS2-consoleTimeS)+' ms');
						resolve(res);
					}, function(res) {
						resolve(res);
					});
				});

				//行程
				var Promise8 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath+"product/activity/"+id+"/itinerary/list").then(function(res) {
						// var consoleTimeS2 = new Date().getTime();
						// 	console.log('游客图片接口花费时间：'+(consoleTimeS2-consoleTimeS)+' ms');
						resolve(res);
					}, function(res) {
						resolve(res);
					});
				});

				//包含
				var Promise9 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath+"product/activity/"+id+"/content/ITEMS_INCLUDED/list").then(function(res) {
						resolve(res);
					}, function(res) {
						resolve(res);
					});
				});

				//不包含
				var Promise10 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath+"product/activity/"+id+"/content/ITEMS_EXCLUDED/list").then(function(res) {
						resolve(res);
					}, function(res) {
						resolve(res);
					});
				});

				//注意事项
				var Promise11 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath+"product/activity/"+id+"/content/NOTICE/list").then(function(res) {
						resolve(res);
					}, function(res) {
						resolve(res);
					});
				});

				
				Promise.all([Promise1,Promise1,Promise3,Promise4,Promise5,Promise6,Promise7,Promise8,Promise9,Promise10,Promise11]).then(function(results){

					//基本信息
					response = results[0];
					var detailData = response.data;

					//console.log(detailData);
					
					if(detailData.valid || route.query.valid==1) {//.valid == 1
						
						detailData.highlights ?
							(data.highlights = delNullArr(detailData.highlights.split("\n"))) :
							"";
							
						detailData.itemsIncluded ?
							(data.itemsIncluded = delNullArr(
								detailData.itemsIncluded.split("\n")
							)) :
							"";
						data.destinations = detailData.destinations.join(", ");
						detailData.introduction ?
							(data.introduction = delNullArr(
								detailData.introduction.split("\n")
							)) :
							"";
						detailData.remark ?
							(data.remark = delNullArr(detailData.remark.split("\n"))) :
							"";
						data.destination = detailData.destinations[0];
						
						data.inclusions = results[8].data || [];
						data.exclusions = results[9].data || [];
						data.notice = results[10].data || [];
						//detailData.notice ? (data.notice=delNullArr(results[10].data.split("\n"))) : '';

						if(detailData.latestBooking < 1) {
							data.toast =
								"This activity was booked by another guest in the past hour.";
						} else if(detailData.latestBooking == 1) {
							data.toast = "This activity was booked by another guest an hour ago.";
						} else {
							data.toast =
								"This activity was booked by another guest " +
								detailData.latestBooking +
								" hours ago.";
						}


						data.detail = detailData;

						//banner图
						data.detail.bannerPhotos = results[5].data || [];
						//行程信息
						data.detail.itineraries = results[7].data || [];


					} else {
						//同步回调
						callback(null,error({
							statusCode: 404,
							message: "404"
						}));
					};

					//游客照片
					// photoList = results[1];
					// data.photoList=photoList.data;

					//推荐信息
					apiActivityRecommendRes = results[2];
					data.recommed = apiActivityRecommendRes.data;

					//价格信息
					apiActivityPriceRes = results[3];
					data.picInfo = apiActivityPriceRes.data;
					data.picInfo.departureTime ? (data.time = data.picInfo.departureTime[0]) : (data.time = "");
					data.picInfo.details = results[6].data;

					//点评信息
					var remarkData = results[4];
					if(remarkData.data){
						data.travelersReviews = remarkData.data;

						if(remarkData.data.entities){
							for(let i=0;i<remarkData.data.entities.length;i++){
								remarkData.data.entities[i].text280=false
							}
							data.travelersReviews=remarkData.data;
						}
					}
					


					var consoleTimeS2 = new Date().getTime();
					console.log('node end time:'+consoleTimeS2);
					console.log('在node端渲染，请求所有接口花费时间：'+(consoleTimeS2-consoleTimeS)+' ms');

					//同步回调
					callback(null,data);

				});


			} catch(err) {
				console.log(err);
				return error({
					statusCode: 500,
					message: JSON.stringify(err)
				});
			}

			
			
			//return data;
		},
		head() {
			let title = this.detail.title;
			let description = this.detail.category + " " + this.detail.duration + " " + this.detail.durationUnit + " " + this.detail.title;
			let keywords =this.detail.tourTypes?this.detail.tourTypes.join(","):""
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
			ActivityBanner,
			Activities,
			Meau
		},
		methods: {
			scorllBar() {
				
				let data = this;
				var hightLights;
				
					(document.getElementById("heightLights")?(hightLights =document.getElementById("heightLights").offsetTop):(hightLights =800))+
					document.getElementById("banner").offsetHeight +
					60 -
					76;
				var recommendTop;
				
				document.getElementById("recommend") ?
					(recommendTop = document.getElementById("recommend").offsetTop) :
					(recommendTop = 2000);
					
				if(window.scrollY > hightLights && window.scrollY < recommendTop) {
					data.isShowMeau = true;
					data.isShowBookNow = true;
					data.isscroll = true;
				} else if(window.scrollY > recommendTop) {
					data.isShowBookNow = false;
				} else {
					data.isShowMeau = false;
					data.isShowBookNow = false;
					data.isscroll = false;
				}
			},
			currencyChangeFn(data){
				this.recommed = data;
			}
		},
		mounted: function() {
			let data = this;
			data.id!='undefined'?data.id:getUrlParams()
			this.logIn = window.localStorage.getItem("logstate");
			window.addEventListener("scroll", this.scorllBar);
		},
		watch: {
			"detail.latestBooking": function(val, oldVal) {
				
				let data = this;
				if(val) {
					setTimeout(function() {
						data.toastShow = true;
					}, 3000);
				} else {
					data.toastShow = false;
				}
			}
		}
	};
</script>
<style lang="scss">
	//@import '~/assets/scss/_main.scss';
	//@import '~/assets/font/iconfont.css';
	.acitivity_detail{
		min-width:1200px;
	}
</style>
<style lang="scss" scoped>
	//@import '~/assets/scss/base/_setting.scss';
	
	.icon {
		width: 36px;
		height: 36px;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}
	
	#activitiesDetail {
		overflow-x: hidden;
		background: #fff;
		.bannerImg {
			height: 552px;
			img {
				width: 100%;
				height: 100%;
			}
			.pic {
				position: relative;
				width: 1170px;
				margin: 0 auto;
				.view {
					position: absolute;
					width: 100px;
					height: 36px;
					line-height: 36px;
					text-align: center;
					background: #fff;
					box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
					border-radius: 3px;
					bottom: 20px;
				}
			}
		}
		.toast-container {
			position: fixed;
			bottom: 12px;
			left: 12px;
			animation: fa 8s ease-in-out forwards;
			padding: 10px 20px;
			transform: translateY(100%);
			width: 260px;
			background: #565e66;
			.toast-text {
				float: right;
				font-size: 16px;
				color: #fff;
				width: 200px;
			}
			@keyframes fa {
				0% {
					transform: translateY(100%);
				}
				10% {
					transform: translateY(0);
				}
				20% {
					transform: translateY(0);
					opacity: 1;
				}
				50% {
					transform: translateY(0);
					opacity: 1;
				}
				70% {
					transform: translateY(0);
					opacity: 1;
				}
				100% {
					transform: translateY(0);
					opacity: 0;
				}
			}
		}
	}
</style>