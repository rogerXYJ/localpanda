<template>
	<div id="activitiesDetail">
		<!-- 头部 -->
		<HeaderCommon :logIn="logIn" :nowCurrency="nowExchange" @headCurrency="headCurrencyFn"></HeaderCommon>

		<!-- banner -->
		<div class="banner">
			<div class="swiper-container" id="swiper_bannerbox" v-swiper:mySwiper="bannerSwiper">
				<div class="swiper-wrapper">
					<div class="swiper-slide" :key="index" v-for="(slide, index) in detail.bannerPhotos">
						<img v-lazy="slide.url" lazy="error"  />
					</div>
				</div>
				<div class="swiper-pagination" id="swiper_banner_pagination"></div>
			</div>
		</div>

		<div class="main_box clearfix">

			<!-- 右侧 -->
			<div class="main_r"></div>


			<!-- 左侧内容烂 -->
			<div class="main_l">
				<!-- 面包屑 -->
				<div class="crumbs">
					<a href="/">Home</a> <i class="iconfont">&#xe64a;</i>
					<a :href="'/activity/list/'+detail.destinations[0]">{{detail.destinations[0]}} Activities</a>
				</div>
				
				<div class="activity_top">
					<h2><span :class="{'private':detail.groupType=='Private'}" v-if="detail.groupType">{{detail.groupType}}</span>{{detail.title}}</h2>
					<ul class="info_list">
						<!-- Duration -->
						<li v-if="/DAY/.test(detail.durationUnit)"><i class="iconfont">&#xe624;</i>Duration {{detail.duration}} {{setTimeStr(detail.duration,detail.durationUnit)}}</li>
						<li @click="showDurationInfo=true" v-else><i class="iconfont">&#xe624;</i>Duration {{detail.duration}} {{setTimeStr(detail.duration,detail.durationUnit)}} <span class="iconfont" v-if="!/DAY/.test(detail.durationUnit)">&#xe689;</span></li>
						
						<li v-if="getPickupTitle(detail.pickup) && detail.category!='Ticket'" @click="showPickupInfo=true"><i class="iconfont">&#xe68a;</i>{{getPickupTitle(detail.pickup)}} <span class="iconfont" v-if="detail.statement">&#xe689;</span></li>

						<!-- 语言 -->
						<li v-if="detail.groupType=='Group'"><i class="iconfont">&#xe627;</i>Offered in English</li>
						<li @click="showLanguagesInfo=true" v-else-if="detail.category!='Ticket'"><i class="iconfont">&#xe627;</i>English(and other languages)-speaking guide <span class="iconfont">&#xe689;</span></li>

						<li v-if="detail.destinations.length>1"><i class="iconfont">&#xe610;</i>{{detail.destinations.join(', ')}}</li>
						<li v-if="picInfo.fullRefund===1"><i class="iconfont">&#xe688;</i>Free cancellation  up to {{(picInfo.refundTimeLimit>2?picInfo.refundTimeLimit+' days':24*picInfo.refundTimeLimit+' hours')}} before your trip</li>
						<li v-if="detail.limits"><i class="iconfont">&#xe68b;</i>{{detail.limits}}</li>
					</ul>
				</div>

				<!-- Why you’ll love this trip -->
				<div class="detail_box why">
					<h3><i></i>Why you'll love this trip</h3>
					<p class="detail_p">{{detail.recommendedReason}}</p>
					
					<ul class="detail_txt_list">
						<li v-for="item in getTextArr(detail.highlights)" :key="item"><i class="dian"></i>{{item}}</li>
					</ul>
				</div>

				<!-- 行程板块 -->
				<div class="detail_box itinerary" v-if="detail.itinerary.length">
					<h3><span class="btn_viewall" @click="itineraryViewall">View all</span><i></i>Experience Details</h3>
					<div class="itinerary_tip" v-if="detail.groupType=='Private'">If you want to adjust your itinerary, feel free to contact us. Since the tour is private, our staff can help you make changes according to your needs.</div>
					<dl class="itinerary_list" v-for="(items,index) in detail.itinerary" :key="index">
						<dt @click="itineraryFn"><i class="iconfont i_down">&#xe667;</i><i class="iconfont i_up">&#xe666;</i><span></span>{{items.title}}</dt>
						<dd>
							<p>{{items.description}}</p>
							<img v-if="items.photo" v-lazy="items.photo.url" alt="">
						</dd>
					</dl>
				</div>

				<!-- 其他产品信息 -->
				<div class="detail_box other_box">
					
					<div class="other_list" v-if="inclusions.length">
						<!--  || detail.pickup -->
						<h3 @click="otherFn"><span class="iconfont i_down">&#xe667;</span><span class="iconfont i_up">&#xe666;</span><i></i>Inclusions</h3>
						<div class="other_content">
							<ul class="detail_txt_list">
								<li v-for="(item,index) in inclusions" :key="index">
									<i class="iconfont">&#xe65c;</i>{{item.title}}
									<p>{{item.content}}</p>
								</li>
								<li v-if="detail.pickup !== 0 && detail.category!='Ticket'">
									<i class="iconfont">&#xe65c;</i>{{getPickupTitle(detail.pickup)}}
									<p v-html="enterToBr(detail.statement)"></p>
								</li>
							</ul>
							
						</div>
					</div>

					<div class="other_list" v-if="exclusions.length">
						<h3 @click="otherFn"><span class="iconfont i_down">&#xe667;</span><span class="iconfont i_up">&#xe666;</span><i></i>Exclusions</h3>
						<div class="other_content">
							<ul class="detail_txt_list">
								<li v-for="(item,index) in exclusions" :key="index">
									<i class="iconfont red">&#xe606;</i>{{item.title}}
									<p>{{item.content}}</p>
								</li>
							</ul>
						</div>
					</div>

					<div class="other_list" v-if="detail.pickup===0 && detail.category !== 'Ticket'">
						<h3 @click="otherFn"><span class="iconfont i_down">&#xe667;</span><span class="iconfont i_up">&#xe666;</span><i></i>Meeting Point Info</h3>
						<div class="other_content">
							<ul class="detail_txt_list">
								<li v-for="(item,index) in detail.venues" :key="index"><i class="dian"></i>{{item}}</li>
							</ul>
						</div>
					</div>
					<div class="other_list" v-else-if="detail.category == 'Ticket' &&　getTextArr(detail.statement).length">
						<h3 @click="otherFn"><span class="iconfont i_down">&#xe667;</span><span class="iconfont i_up">&#xe666;</span><i></i>Usage Instructions</h3>
						<div class="other_content">
							<ul class="detail_txt_list">
								<li v-for="(item,index) in getTextArr(detail.statement)" :key="index"><i class="dian"></i>{{item}}</li>
							</ul>
						</div>
					</div>

					<div class="other_list" v-if="delEnter(detail.remark) || notice.length">
						<h3 @click="otherFn"><span class="iconfont i_down">&#xe667;</span><span class="iconfont i_up">&#xe666;</span><i></i>{{delEnter(detail.remark)?'Important Info':'Additional Info'}}</h3>
						<div class="other_content">
							<ul class="detail_txt_list">
								<li v-for="item in getTextArr(detail.remark)" :key="item">
									<i class="dian"></i>{{item}}
								</li>
								<h4 v-if="notice.length && delEnter(detail.remark)">Additional Info</h4>
								<li v-for="(item,index) in notice" :key="index">
									<i class="dian"></i>{{item.title}}
									<p>{{item.content}}</p>
								</li>
							</ul>
						</div>
					</div>

					<div class="other_list" v-if="delEnter(picInfo.refundInstructions)">
						<h3 @click="otherFn"><span class="iconfont i_down">&#xe667;</span><span class="iconfont i_up">&#xe666;</span><i></i>Rescheduling & Cancellation Policy</h3>
						<div class="other_content">
							<ul class="detail_txt_list">
								<li v-for="(item,index) in getTextArr(picInfo.refundInstructions)" :key="index"><i class="dian"></i>{{item}}</li>
							</ul>
						</div>
					</div>

				</div>

				<!-- 点评 -->
				<div class="detail_box reviews" v-if="reviewsData &&　reviewsData.records">
					<div class="reviews_title">
						<i class="title_line"></i>
						<span class="reviews_num">{{reviewsData.records==1 ? 'Review':'Reviews'}} ({{reviewsData.records}})</span>
						<div class="reviews_star" v-html="reviewsStarHtml(reviewsData.avgScore)"></div>
					</div>
					<div class="reviews_list" v-for="(item,index) in reviews" :key="index">
						<div class="reviews_list_top">
							
							<div class="reviews_photo">
								<span class="reviews_photo_def" v-if="!item.userPortraitPhoto">{{item.userName.substring(0,1)}}</span>
								<div class="reviews_photo_img" v-lazy:background-image="item.userPortraitPhoto.url" v-else></div>
								<!-- <img v-else v-lazy="item.userPortraitPhoto?item.userPortraitPhoto.url:''" alt=""> -->
							</div>
							<div class="reviews_list_info">
								<div class="reviews_list_title">
									<b>{{item.userName}}</b>
									<div class="reviews_star" v-html="reviewsStarHtml(item.score)"></div>
								</div>
								<p>{{item.createTime.substring(0,10)}}</p>
								<!-- May 24,2018 -->
							</div>
						</div>
						<div class="reviews_list_content" :content="item.content">{{item.content.length>200?item.content.substring(0,200)+'...':item.content}} <span class="reviews_text_more" v-if="item.content.length>200" @click="reviewsShowMore">View More</span> </div>
						<ul class="reviews_img_s">
							<li v-if="item.userCommentPhoto" v-for="(itemChild,index2) in item.userCommentPhoto" @click="showBigPic(index,index2)" :key="index2"><img v-lazy="itemChild.url" alt=""></li>
						</ul>
					</div>
					<div class="reviews_more" @click="loadMoreReviews" v-if="reviewsData && reviewsData.records>3 && reviewsData.records>reviews.length">Browse more</div>
				</div>

			</div>

			

			<div class="detail_box similar">
				<h3><i></i>Similar Experiences</h3>
			</div>

		</div>
		
		
		<FooterCommon :nowCurrency="nowExchange" @headCurrency="headCurrencyFn"></FooterCommon>
	</div>
</template>

<script>

	import HeaderCommon from "~/components/HeaderCommon/HeaderCommon";
	import FooterCommon from "~/components/FooterCommon/FooterCommon";
	import { delNullArr,getUrlParams,getParents } from "~/assets/js/plugin/utils";
	import Vue from 'vue';

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
			let urlTravelers = route.query.travelers; //用于默认填入游玩人数

			// 服务端渲染部分 这部分操作还没有页面实例，只是初始化页面数据
			let data = {
				id: id,
				detail: {}, //详情数据
				logIn: "",
				toast: "This activity was booked by another guest an hour ago",
				toastShow: false,
				participants:0,
				exchange:[],
				calendar:[],
				people:0,

				//点评
				reviews:[],
				reviewsData:[],

				//选择日期和人数板块
				showFixedBtn:true,
				showWinBg:false,
				showChangePeople:false,
				showPriceInfo:false,
				startDate:'',
				adultsText:'Adults',
				childrenText:'',
				checkTipText:'',
				changeAdults:0,
				changeChildren:0,
				bookAdults:0,
				bookChildren:0,
				bookPeople:0,
				price:0,
				perPersonPrice:0,
				amount:0,

				// 币种
				nowExchange:{code: "USD", symbol: "$"},
				selectCurrency:'USD',
			};

			//设置币种
			if(userCookie.currency){
				data.nowExchange = JSON.parse(decodeURIComponent(userCookie.currency));
				data.selectCurrency = data.nowExchange.code;
			}
			//设置人数
			if(userCookie.participants){
				data.participants=JSON.parse(decodeURIComponent(userCookie.participants))
			}

			
			try {
				//基本信息
				var Promise1 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath + "product/activity/" + id).then(function(res) {
						
						//获取可售日期
						if(!res.data.allAvailable){
							Vue.axios.get(apiBasePath + "product/activity/"+id+"/sale/calendar").then(function(response) {
								data.calendar = response.data?response.data:[];
								resolve(res);
							}, function() {
								resolve(res);
							});
						}else{
							resolve(res);
						}
					}, function(res) {
						resolve(res);
					});
				});

				
				//推荐信息
				var recommendOptions = {
					"id": id,
					'currency':data.nowExchange.code,
					'pageNum':1,
					'pageSize':3
				};
				if(data.participants){
					recommendOptions.participants = data.participants;
				}
				var Promise2 = new Promise(function(resolve, reject){
					Vue.axios.post(apiBasePath+"search/activity/recommend",JSON.stringify(recommendOptions),{
						headers: {
						'Content-Type': 'application/json'
						}
					}).then(function(res) {
						resolve(res);
					}, function(res) {
						resolve(res);
					});
					// Vue.axios.get(apiBasePath + "product/activity/"+id+"/recommend?currency="+data.nowExchange.code).then(function(res) {
					// 	resolve(res);
					// }, function(res) {
					// 	resolve(res);
					// });
				});

				//价格信息
				var Promise3 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath + "product/activity/"+id+"/price?currency="+data.nowExchange.code).then(function(res) {
						resolve(res);
					}, function(res) {
						resolve(res);
					});
				});

				//价格明细
				var Promise4 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath + "product/activity/"+id+"/price/detail?currency="+data.nowExchange.code).then(function(res) {
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
						resolve(res);
					}, function(res) {
						resolve(res);
					});
				});

				//banner
				var Promise6 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath+"public/photo/"+id+"/ACTIVITY_BANNER/list").then(function(res) {
						resolve(res);
					}, function(res) {
						resolve(res);
					});
				});

				//行程
				var Promise7 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath+"product/activity/"+id+"/itinerary/list").then(function(res) {
						resolve(res);
					}, function(res) {
						resolve(res);
					});
				});

				//包含
				var Promise8 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath+"product/activity/"+id+"/content/ITEMS_INCLUDED/list").then(function(res) {
						resolve(res);
					}, function(res) {
						resolve(res);
					});
				});

				//不包含
				var Promise9 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath+"product/activity/"+id+"/content/ITEMS_EXCLUDED/list").then(function(res) {
						resolve(res);
					}, function(res) {
						resolve(res);
					});
				});

				//注意事项
				var Promise10 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath+"product/activity/"+id+"/content/NOTICE/list").then(function(res) {
						resolve(res);
					}, function(res) {
						resolve(res);
					});
				});

				//导游信息
				var Promise11 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath+"product/ACTIVITY/"+id+"/guide/info/list").then(function(res) {
						resolve(res);
					}, function(res) {
						resolve(res);
					});
				});

				
				Promise.all([Promise1,Promise2,Promise3,Promise4,Promise5,Promise6,Promise7,Promise8,Promise9,Promise10,Promise11]).then(function(results){

					//基本信息
					var detailData = results[0].data;
					
					if(detailData.valid || route.query.valid==1) {//.valid == 1

						//基本信息
						data.detail = detailData;
						

						//价格信息
						data.picInfo = results[2].data;
						data.picInfo.departureTime ? (data.time = data.picInfo.departureTime[0]) : (data.time = "");
						data.picInfo.details = results[3].data;

						//设置儿童年龄提示文字
						data.childrenText = 'Chlidren (age 3-'+data.picInfo.childStandard+')';

						

						//点评信息
						var reviewsData = results[4];
						if(reviewsData.data){
							data.reviewsData = reviewsData.data;
							data.reviews = reviewsData.data.entities;
						}

						//banner图
						data.detail.bannerPhotos = results[5].data || [];
						//行程信息
						data.detail.itinerary = results[6].data || [];

						//包含
						data.inclusions = results[7].data || [];
						//不包含
						data.exclusions = results[8].data || [];
						//注意事项
						data.notice = results[9].data || [];
						//导游信息
						data.detail.guide = results[10].data;

						//推荐信息
						data.detail.recommend = results[1].data;


						if(detailData.latestBooking < 1) {
							data.toast = "This activity was booked by another guest in the past hour.";
						} else if(detailData.latestBooking == 1) {
							data.toast = "This activity was booked by another guest an hour ago.";
						} else {
							data.toast = "This activity was booked by another guest " + detailData.latestBooking + " hours ago.";
						}


					} else {
						//同步回调
						callback(null,error({
							statusCode: 404,
							message: "404"
						}));
					};


					var consoleTimeS2 = new Date().getTime();
					console.log('node end time:'+consoleTimeS2);
					console.log('在node端渲染，请求所有接口花费时间：'+(consoleTimeS2-consoleTimeS)+' ms');

					//同步回调
					// console.log(data);
					callback(null,data);
					

				});


			} catch(err) {
				console.log(err);
				return error({
					statusCode: 500,
					message: JSON.stringify(err)
				});
			}
			
			
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
			FooterCommon
		},
		data(options){
			
			return {
				showDurationInfo:false,
				showLanguagesInfo:false,
				showPickupInfo:false,

				isShowMeau:false,

				bannerSwiper: {
					lazy: true,
					autoplay: true,
					delay: 1000,
					autoplayDisableOnInteraction: false,
					slidesPerView: 3,
					initialSlide: 0,
					// speed: 1000,
					// loop: true,
					// navigation: {
					// 	nextEl: '.swiper-button-next',
					// 	prevEl: '.swiper-button-prev',
					// },
					// setWrapperSize: true,
					
				},


				//导游
				showGuideDetail:false,
				guideSwiper:null,
				hasGuide:false,
				checkGuideIndex:'',
				guideSwiperIndex:0,

				

				//点评页数
				thisReviewsData:'',
				showReviewsPic:false,
				reviewsIndex:1,
				pageNum:2,

				//inquiry
				dialogInquiryStatus:false,
				dialogStatus:false,
				emailTip:false,
				emailSendTip:false,
				showEmailBox:false,
				inqueryEmail:'',
				inqueryEmailOld:'',
				feedbackId: '',
			}
		},
		methods: {
			delEnter(text){
				if(!text)return '';
				return text.replace(/(^\s*)|(\s*$)/g, "").replace(/(^\r\n*)|(\r\n*$)/g, "");
			},
			getTextArr(text){
				if(!text)return [];
				var arr = text.split('\n');
				var newArr = [];
				for(var i=0;i<arr.length;i++){
					var thisData = arr[i];
					if(thisData.replace(/(^\s*)|(\s*$)/g, "")){
						newArr.push(thisData);
					}
				}
				return newArr;
			},
			getPickupTitle(pickup){
				if(pickup==1){
					return 'Pick-up and drop-off included';
				}else if(pickup==2){
					return 'Pick-up included, drop-off excluded';
				};
				return '';
			},
			enterToBr(text){
				return text ? text.replace(/\n/g,'<br>') : '';
			},
			otherFn(e){
				var thisList = getParents(e.target,'other_list');
				if(/active/.test(thisList.className)){
					thisList.className = 'other_list';
				}else{
					thisList.className = 'other_list active';
				}
			},
			reviewsShowMore(e){
				var parent = e.target.parentNode;
				parent.innerHTML = parent.getAttribute('content');
			},
			reviewsStarHtml(score){
				var thisHtml = '';
				for(var i=0;i<5;i++){
					if(/\./.test(score/2+'') && i == parseInt(score/2)){
						thisHtml += '<span class="star_list star_h"><i></i><div class="star_half"><span class="star_list"><i></i></span></div></span>';
					}else if(i>score/2-1){
						thisHtml += '<span class="star_list star_no"><i></i><div class="star_half"><span class="star_list"><i></i></span></div></span>';
					}else{
						thisHtml += '<span class="star_list"><i></i><div class="star_half"><span class="star_list"><i></i></span></div></span>';
					}
				}
				return thisHtml;
			},
			loadMoreReviews(e){
				var postData = {
					"activityId": this.id,
					'pageNum':this.pageNum,
					'pageSize':3
				};
				var thisBtn = e.target;
				var self = this;

				if(self.reviewsLoading){
					return false;
				}

				self.reviewsLoading = true;
				self.axios.post("https://api.localpanda.com/api/user/comment/list",JSON.stringify(postData),{
					headers: {
					'Content-Type': 'application/json'
					}
				}).then(function(response) {
					var entities = response.data.entities;
					if(entities && entities.length){
						if(entities.length<3){
							thisBtn.style.display = 'none';
						}else{
							thisBtn.style.display = 'block';
						};
						self.reviews = self.reviews.concat(entities);
						self.pageNum++;
					}else if(entities && entities.length==0){
						thisBtn.style.display = 'none';
					}
					//开启请求状态
					self.reviewsLoading = false;
					
				}, function(response) {
					self.reviewsLoading = false;
				});
			},
			setTimeStr(num,str){
				if(str.toLowerCase()=='hours'){
					return num===1 ? 'Hour' : 'Hours'
				}else if(str.toLowerCase()=='days'){
					return num===1 ? 'Day' : 'Days'
				}
			},
			itineraryFn(e){
				var thisList = getParents(e.target,'itinerary_list');
				if(/active/.test(thisList.className)){
					thisList.className = 'itinerary_list';
				}else{
					//加载图片
					var thisImg = thisList.querySelector('img');
					if(thisImg){
						thisImg.setAttribute('src',thisImg.getAttribute('data-src'));
					}
					thisList.className = 'itinerary_list active';
				}

				//View all 和 View less动态改变
				var itinerary_active = document.querySelectorAll('.itinerary_list.active'),
					itinerary_list = document.querySelectorAll('.itinerary_list');
				if(itinerary_active.length == itinerary_list.length){
					document.querySelector('.btn_viewall').innerHTML = 'View less';
				}else{
					document.querySelector('.btn_viewall').innerHTML = 'View all';
				}
				
			},
			itineraryViewall(e){
				var itinerary_list = document.querySelectorAll('.itinerary_list');
				
				if(e.target.innerHTML == 'View all'){
					e.target.innerHTML = 'View less';
					for(var i=0;i<itinerary_list.length;i++){
						var thisData = itinerary_list[i];
						//加载图片
						var thisImg = thisData.querySelector('img');
						if(thisImg){
							thisImg.setAttribute('src',thisImg.getAttribute('data-src'));
						}
						//展开样式
						thisData.className = 'itinerary_list active';
					}
				}else{
					e.target.innerHTML = 'View all';
					for(var i=0;i<itinerary_list.length;i++){
						var thisData = itinerary_list[i];
						thisData.className = 'itinerary_list';
					}
				}
				
				
			},
			zeroLength(text){
				var num = 0;
				for(var i=0;i<text.length;i++){
					var thisStr = text[i];
					if(thisStr==0 && i>1){
						num++;
					}
				}
				return num;
			},
			returnFloat(value) {
				value*=1;
				if(value) {
					var numberArr = (''+value).split('.');
					if(numberArr.length>1 && numberArr[1].length>2){
						if(this.zeroLength(numberArr[1])>5){
							return value.toFixed(2);
						}else{
							return (value+0.005).toFixed(2);
						}
					}
					return (value*1).toFixed(2);
				}else{
					return 0;
				}
			},
			headCurrencyFn(currency){
				this.currency = currency;
			}
		},
		mounted: function() {

			//币种信息
			this.exchange = this.currencyData;

			var cookieCurrency = JSON.parse(Cookie.get('currency'));

			//设置当前币种
			var currency= cookieCurrency ? cookieCurrency : {'code':'USD','symbol':'$'};
			if(this.nowExchange.code!=currency.code){
				this.nowExchange=currency;
			}
			
			//等待渲染完毕后调用
			this.$nextTick(function(){
				

			});
    	
		},
		watch: {
			
		}
	};
</script>

<style lang="scss" scoped>
	#activitiesDetail {
		.banner {
			position: relative;
			img {
				width: 100%;
				height: 100%;
			}
			.swiper-slide{
				max-width:33.33vw;
			}
		}
		.main_box{
			width: 1170px;
			margin: 30px auto 0;
			padding-bottom: 100px;
			.main_l{
				width: 735px;
			}
			.main_r{
				float: right;
				width: 376px;
			}
			.crumbs{
				font-size: 14px;
				background-color: #fff;
				color: #878e95;
				vertical-align: top;
				overflow: hidden;
				*{
					float: left;
					line-height: 20px;
					color: #878e95;
				}
			}
			.activity_top{
				padding-top: 0.3rem;
				h2{
					font-size: 32px;
					font-weight: bold;
					span{ color: #fff; background-color: #f4b33f; font-size: 18px; line-height: 28px; display: inline-block; padding: 0 10px; border-radius: 5px; vertical-align: middle; margin-right: 10px; font-weight: normal; float: left; margin-top: 6px;}
					.private{ background-color: #1bbc9d;}
				}
				.info_list{
					overflow: hidden;
					margin-top: 20px;
					li{
						width: 50%;
						float: left;
						font-size: 16px;
						padding: 6px 0 6px 20px;
						i{font-size: 16px; float: left; margin-left: -20px; margin-top: 2px;}
						span.iconfont{ vertical-align: top; margin-left:2px; position: relative; top: 3px;}
					}
				}
			}

			.detail_box{
				padding: 30px 0;
				border-top: #dde0e0 solid 1px;
				margin-top: 30px;
				h3{
					font-size: 24px;
					font-weight: bold;
					color: #353a3f;
					overflow: hidden;
					line-height:34px;
					i{
						float: left;
						margin-top: 7px;
						margin-right: 12px;
						width: 4px;
						height: 20px;
						background-color: #1bbc9d;
						border-radius: 2px;
					}
					.iconfont{
						float: right;
						font-size: 20px;
					}
				}
				.detail_p{
					font-size: 16px;
					line-height: 24px;
				}
			}

			.detail_txt_list{
				li{
					padding:2px 0 2px 20px;
					font-size: 16px;
					line-height: 24px;
					i{
						float: left;
						margin-left: -20px;
						margin-top: 5px;
					}
					.dian{
						margin-left: -15px;
						width: 5px;
						height: 5px;
						margin-top: 10px;
						border-radius: 50%;
						background-color: #353a3f;
					}
					.iconfont{
						font-size: 0.22rem;
						margin-top: 0.02rem;
					}
					p{
						color: #878e95;
					}
				}
			}

			.why{
				.detail_p{
					margin-top: 12px;
				}
				.detail_txt_list{
					margin-top: 10px;
				}
			}

			.itinerary{
				padding-bottom: 0.2rem;
				.btn_viewall{
					float: right;
					color: #1bbc9d;
					border: 1px solid #1bbc9d;
					line-height: 32px;
					padding: 0 22px;
					border-radius: 16px;
					font-weight: normal;
					font-size: 16px;
					cursor: pointer;
				}
				.itinerary_tip{
					color: #666;
					padding: 15px 0 20px;
					font-size: 16px;
				}
				.itinerary_list{
					border-top: 1px solid #dde0e0;
					padding: 5px 0;
					&:nth-child(2){ border:none;}
					dt{
						font-size: 18px;
						font-weight: bold;
						line-height: 56px;
						cursor: pointer;
						position: relative;
						z-index: 2;
						i{
							float: right;
							font-size: 20px;
							color: #878e95;
						}
						span{
							float: left;
							margin:26px 12px 0 0;
							width: 5px;
							height: 5px;
							border-radius: 50%;
							background-color: #353a3f;
						}
						.i_up{
							display: block;
						}
						.i_down{
							display: none;
						}
					}
					dd{
						padding-bottom: 20px;
						margin-top: -10px;
						display: none;
						p{
							line-height: 23px;
							font-size: 16px;
							margin-top: 10px;
						}
						img{
							display: block;
							max-width: 100%;
							min-height: 3rem;
							margin-top: 18px;
							border-radius: 5px;
						}
					}
				}
				.active{
					dt{
						.i_up{
							display: none;
						}
						.i_down{
							display: block;
						}
					}
					dd{
						display: block;
					}
					
				}
			}

			.other_box{
				padding-top: 15px;
				.other_list{
					border-top: 1px solid #ddd;
					&:nth-child(1){ border: none; margin-top: -0.2rem;}
					h3{
						height: 80px;
						line-height: 80px;
						cursor: pointer;
						i{
							margin-top: 30px;
						}
						
					}
					h4{
						margin-top: 0.2rem;
						padding: 0.2rem 0 0 0.45rem;
						font-size: 0.3rem;
						font-weight: bold;
					}
					.other_content{
						margin-top: -0.2rem;
						padding: 0 0 0.5rem;
						display: none;
					}
					.i_up{
						display: block;
					}
					.i_down{
						display: none;
					}
				}
				.active{
					.other_content{
						display: block;
					}
					.i_up{
						display: none;
					}
					.i_down{
						display: block;
					}
				}
			}

			.reviews{
				.reviews_title{
					font-size: 24px;
					font-weight: bold;
					color: #353a3f;
					overflow: hidden;
					line-height:34px;
					.title_line{
						float: left;
						margin-top: 7px;
						margin-right: 12px;
						width: 4px;
						height: 20px;
						background-color: #1bbc9d;
						border-radius: 2px;
					}
					.reviews_num{
						float: left;
						display: inline-block;
						font-weight: bold;
					}
					.reviews_star{
						float: left;
						vertical-align: top;
						margin: 10px 0 0 10px;
						line-height: 18px;
					}
				}
				.reviews_list{
					padding: 20px 0;
					border-bottom: #ddd solid 1px;
					// &:nth-child(2){
					// 	border: none
					// }
					
					.reviews_list_top{
						overflow: hidden;
						.reviews_photo{
							float: left;
							width: 44px;
							height: 44px;
							border-radius: 50%;
							overflow: hidden;
							margin-right: 18px;
							background-size: cover;
							img{
								vertical-align: top;
							}
							.reviews_photo_img{ width: 100%; height: 100%; background-size: cover;}
							.reviews_photo_def{
								display: block;
								width: 100%;
								height: 100%;
								line-height: 44px;
								font-size: 22px;
								color: #fff;
								text-align: center;
								background-image: -webkit-gradient(linear, right top, left top, from(#009efd), to(#1bbc9d));
								background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
							}
						}
						.reviews_list_info{
							float: left;
							.reviews_list_title{
								margin-top: 2px;
								font-size: 16px;
								b{ float: left;}
							}
							p{
								margin-top: 5px;
								font-size: 14px;
							}
						}
						.reviews_star{
							margin-left: 20px;
							margin-top: 3px;
							line-height: 14px;
						}
					}
					.reviews_list_content{
						font-size: 16px;
						margin-top: 15px;
						word-wrap:break-word;
						line-height: 24px;
						.reviews_text_more{
							color: #1bbc9d;
							cursor: pointer;
						}
					}
					.reviews_img_s{
						overflow: hidden;
						li{
							float: left;
							width: 109px;
							margin-left: 15px;
							margin-top: 10px;
							overflow: hidden;
							cursor: pointer;
							&:nth-child(1){
								margin-left: 0;
							}
							img{
								width: 100%;
								vertical-align: top;
							}
						}
					}
				}
				
				.reviews_more{
					width: 154px;
					height: 42px;
					line-height: 40px;
					margin: 50px auto 0;
					border-radius: 0.44rem;
					color: #fff;
					text-align: center;
					font-size: 16px;
					background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%), linear-gradient(#1bbc9d, #1bbc9d);
					background-blend-mode: normal,normal;
					border-radius: 20px;
					cursor: pointer;
				}
			}
			
			.similar{ 
				clear: both;
				margin-top: 30px;
			}

		}
	}
</style>

<style lang="scss">
	#activitiesDetail{
		min-width:1200px;


		.reviews_star{
			display: inline-block;
			.star_list{
				display: inline-block;
				overflow: hidden;
				position: relative;
				vertical-align: top;
				width: 14px;
				height: 14px;
				padding: 1px;
				border-radius: 50%;
				background-image: -webkit-gradient(linear, right top, left top, from(#009efd), to(#1bbc9d));
				background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
				i{
					display: inline-block;
					width: 100%;
					height: 100%;
					background-color: #fff;
					border-radius: 50%;
					position: relative;
					overflow: hidden;
					vertical-align: top;
					&:after{
						content: "";
						display: block;
						width: 50%;
						height: 50%;
						border-radius: 50%;
						overflow: hidden;
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%,-50%);
						-webkit-transform: translate(-50%,-50%);
						background-image: -webkit-gradient(linear, right top, left top, from(#009efd), to(#1bbc9d));
						background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
					}
				}
			}
			.star_half{
				position: absolute;
				right: 0;
				top: 0;
				width: 100%;
				height: 100%;
				overflow: hidden;
				display: none;
				.star_list{
					position: absolute;
					right: 0;
					top: 0;
					margin: 0!important;
					background: #ddd;
					i{
						&:after{
							background: #ddd;
						}
					}
				}
			}
		}
		.star_no{
			.star_half{
				width: 100%;
				display: block;
			}
		}
		.star_no{
			.star_half{
				width: 100%;
				display: block;
			}
		}
		.star_h{
			.star_half{
				width: 50%;
				display: block;
			}
		}

		.reviews{
			.reviews_title{
				.reviews_star{
					.star_list{
						width: 18px;
						height: 18px;
					}
				}
			}
		}
		
	}
</style>