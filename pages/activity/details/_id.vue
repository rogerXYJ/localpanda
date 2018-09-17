<template>
	<div id="activitiesDetail">
		<HeaderCommon :logIn="logIn" :nowCurrency="currency" @headCurrency="headCurrencyFn" @getExchange="setExchange"></HeaderCommon>
		<Meau  v-show="isShowMeau" :nowCurrency="currency" @headCurrency="headCurrencyFn" :inclusions="inclusions" :highlights="highlights" :notice="notice" :exclusions="exclusions" :picInfo="picInfo" :photoList="photoList" :recommed="recommed" :travelersReviews="travelersReviews" :userABtestID="userABtestID" :ABtest="ABtest" ></Meau>
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
			:userABtestID="userABtestID" 
			:ABtest="ABtest" 
			:isABtestShow="isABtestShow"
			@currencyChange="currencyChangeFn" 
			v-model="currency"
			:participants="participants"
			:AvailableDate="AvailableDate"
			:exchange="exchange"

			></Activities>
		<FooterCommon :nowCurrency="currency" @headCurrency="headCurrencyFn"></FooterCommon>
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
	import bus from '~/assets/js/pages/bus.js'
	export default {
		name: "activitiesDetail",
		async asyncData({
			route,
			store,
			error,
			apiBasePath,
			redirect,
			req
		},callback) {

			//获取页面cookie
			var userCookie = {};
			if(req){
				var cookie = req.headers.cookie;
				if(cookie){
					var cookieArr = cookie.split(';');
					for(var i=0;i<cookieArr.length;i++){
						var thisCookie = cookieArr[i].split('=');
						userCookie[thisCookie[0].trim()] = (thisCookie[1]||'').trim();
					}
				}
			};

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
				pageNum:1,
				userABtestID:'',
				ABtest: false,
				isABtestShow:false,
				currency:{code: "USD", symbol: "$", exchangeRate: 1},
				participants:0,
				AvailableDate:[],
				exchange:[]

			};
			var response = {};
			let apiActivityPriceRes = {};
			let apiActivityRecommendRes = {};
			let photoList={};
			
			if(userCookie.currency){
				data.currency = JSON.parse(decodeURIComponent(userCookie.currency));
			}
			if(userCookie.participants){
				data.participants=userCookie.participants
			}
			//ABtest 点评
			// if(id == '11280' || id =='11068'){
			// 	data.ABtest = true;
			// }

			
			try {
				//基本信息
				var Promise1 = new Promise(function(resolve, reject){
					
					Vue.axios.get(apiBasePath + "product/activity/" + id).then(function(res) {
						// var consoleTimeS2 = new Date().getTime();
						// 	console.log('基本信息接口花费时间：'+(consoleTimeS2-consoleTimeS)+' ms');
						var resData={
							detailRes:res.data,
							availableDate:[]
						}
						//console.log(res.data.allAvailable)
						//resolve(resData)
						if(!res.data.allAvailable){
							Vue.axios.get(apiBasePath + "product/activity/" + id +'/sale/calendar').then(function(data) {
					
								resData.availableDate=data.data
								resolve(resData);
							},function(data){
								resolve(resData);
							})
						}else{
							resolve(resData);
						}
						
					}, function(res){
						resolve(res)
					});
				})
				
				//游客图片
				var Promise2 = new Promise(function(resolve, reject){
					resolve({});
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
					Vue.axios.get(apiBasePath + "product/activity/"+id+"/recommend?currency="+data.currency.code+(data.participants?'&participants='+data.participants:'')).then(function(res) {
						// var consoleTimeS2 = new Date().getTime();
						// 	console.log('推荐接口花费时间：'+(consoleTimeS2-consoleTimeS)+' ms');
						resolve(res);
						//console.log()
					}, function(res) {
						resolve(res);
					});
				});

				//价格信息
				var Promise4 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath + "product/activity/"+id+"/price?currency="+data.currency.code).then(function(res) {
						// var consoleTimeS2 = new Date().getTime();
						// 	console.log('价格接口花费时间：'+(consoleTimeS2-consoleTimeS)+' ms');
						resolve(res);
					}, function(res) {
						resolve(res);
					});
				});

				//价格明细
				var Promise7 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath + "product/activity/"+id+"/price/detail?currency="+data.currency.code).then(function(res) {
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
				//团期
				// var Promise12 = new Promise(function(resolve, reject){
					
				// });
				Promise.all([Promise1,Promise2,Promise3,Promise4,Promise5,Promise6,Promise7,Promise8,Promise9,Promise10,Promise11]).then(function(results){

					//基本信息
					response = results[0];
					var detailData = response.detailRes;
					var availableDate=response.availableDate
					//console.log(detailData)
					//console.log(detailData)
					data.AvailableDate=availableDate		
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
						//console.log(data.detail)
						//banner图
						data.detail.bannerPhotos = results[5].data || [];
						//行程信息
						data.detail.itineraries = results[7].data || [];
						
						
							
						
						//
					

						

						// data.AvailableDate=results[11].data||[];

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

					// console.log(apiActivityRecommendRes.data);

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
					(recommendTop = document.getElementById('footer').offsetTop);	
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
				
			},
			setExchange(val){
				this.exchange=val
				
			},
			headCurrencyFn(currency){
				this.currency = currency;
			}
		},
		mounted: function() {
			console.log(bus)
			var self = this;
			self.id!='undefined'?self.id:getUrlParams()
			this.logIn = window.localStorage.getItem("logstate");
			window.addEventListener("scroll", this.scorllBar);
			var galoadTimer = null;
			 var currency=JSON.parse(Cookie.get('currency'))?JSON.parse(Cookie.get('currency')):{code:'USD',symbol:'$'}
				if(this.currency!=currency){
					this.currency=currency
				}
    		
			// setTimeout(function(){
			// 	//获取ABtestID
			// 	var userABtestID = Cookie.get('userABtestID');
			// 	self.userABtestID = userABtestID?userABtestID:'';

			// 	//GA统计
			// 	self.isABtestShow = self.travelersReviews.entities && self.travelersReviews.entities.length && self.ABtest && self.userABtestID%2==0;
			// 	if(self.isABtestShow){

			// 		galoadTimer = setInterval(function(){
			// 			if(window.ga){
			// 				window.clearInterval(galoadTimer);
			// 				ga(gaSend, {
			// 					hitType: 'event',
			// 					eventCategory: 'activity_detail',
			// 					eventAction: 'abtest_comment',
			// 					eventLabel: 'load',
			// 				});
			// 			}
			// 		},500);


					
			// 		//console.log('ABtest产品，加载到了点评！');
			// 	}

			// },100);
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