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
				<!-- <div class="swiper-pagination" id="swiper_banner_pagination"></div> -->
			</div>
		</div>

		<div class="main_box clearfix">

			<!-- 右侧 -->
			<div class="main_r">
				<div class="book_all">
					<!-- 预定表单模块 -->
					<div class="book_content">
						<div class="book_head">
							<div class="price_select_box">
								<select v-model="selectCurrency" @change="changeCurrency">
									<option :value="item.code" :key="index" v-for="(item,index) in exchange">{{item.code}}</option>
								</select>
								<i class="iconfont">&#xe666;</i>
							</div>
							<div class="price_info">
								<b><span class="price_from" v-if="participants==0">From</span> {{nowExchange.symbol}}{{participants>0?returnFloat(getPeoplePrice(participants,true)):returnFloat(picInfo.bottomPrice)}}</b> {{returnText(participants)}} <i class="iconfont">&#xe659;</i>
							</div>
						</div>

						<ul class="book_list">
							<li>
								<h4>Date</h4>
								<div class="input_box" :class="{'holder':!startDate}">
									{{startDate?formatDate(startDate):'Date'}}
									<input v-model="startDate" id="js_changetime" type="text" readonly>
									<i class="iconfont">&#xe666;</i>
								</div>
							</li>
							<li>
								<h4>Guests</h4>
								<div class="input_box holder">
									<input class="opacity1" type="text" readonly placeholder="Adults" :value="(bookAdults?bookAdults+' '+(bookAdults>1?'Adults':'Adult'):'')+(bookChildren?' , '+bookChildren+' '+(bookChildren>1?'Children':'Child'):'')" @click.stop="showChangeFn">
									<i class="iconfont">&#xe666;</i>
								</div>
								<div class="change_travelers" v-if="showChangePeople">
									<div class="change_list">
										<div class="num_box">
											<span class="num_btn iconfont" @click="minusNum($event,1)" :class="{'stop':changeAdults<=1 || (changeAdults+changeChildren)<=picInfo.minParticipants}">&#xe64d;</span>
											<b>{{changeAdults}}</b>
											<span class="num_btn iconfont" @click="addNum($event,1)" :class="{'stop':(changeAdults+changeChildren)>=picInfo.maxParticipants}">&#xe64b;</span>
										</div>
										Adults
									</div>
									<div class="change_list">
										<div class="num_box">
											<span class="num_btn iconfont" @click="minusNum($event,2)" :class="{'stop':changeChildren<=0 || (changeAdults+changeChildren)<=picInfo.minParticipants}">&#xe64d;</span>
											<b>{{changeChildren}}</b>
											<span class="num_btn iconfont" @click="addNum($event,2)" :class="{'stop':(changeAdults+changeChildren)>=picInfo.maxParticipants || changeAdults==0}">&#xe64b;</span>
										</div>
										Children<br><small>{{'≤ '+picInfo.childStandard+' years old'}}</small>
									</div>
									<div class="change_list">
										<span class="btn" @click="setPeople">Submit</span>
									</div>
								</div>
							</li>
							<li v-if="bookPeople">
								<h4>Price Breakdown</h4>
								<dl class="book_price_info">
									<dt>
										<span>{{nowExchange.symbol}}{{returnFloat(perPersonPrice)}}×{{bookPeople}} {{bookPeople>1?'Travelers':'Traveler'}}</span>
										<span v-if="picInfo.childDiscount && bookChildren">-{{nowExchange.symbol}}{{returnFloat(picInfo.childDiscount*bookChildren)}} for {{bookChildren}} {{bookChildren>1?'Children':'Child'}}</span>
									</dt>
									<dd>{{nowExchange.symbol}}{{returnFloat(price)}}</dd>
								</dl>
								<dl class="book_price_info">
									<dt>Total Amount</dt>
									<dd>
										{{nowExchange.symbol}}{{amount}}</dd>
								</dl>
								
							</li>
							<li>
								<span class="btn" @click="bookNow">Book Now</span>
							</li>
							<li>
								<span class="btn_inquire" @click="ContactStatus=true">Inquire</span>
							</li>
							<li>
								<p class="book_tip" v-if="picInfo.refundTimeLimit && picInfo.fullRefund===1">Free cancellation  up to {{(picInfo.refundTimeLimit>2?picInfo.refundTimeLimit+' days':24*picInfo.refundTimeLimit+' hours')}} before your trip</p>
							</li>
							<li>
								<div class="hr"></div>
								<div class="Booked_box">Booked {{detail.sales}} times (last 30 days)</div>
							</li>
						</ul>
					</div>


					<!-- 预定保障模块 -->
				</div>
			</div>


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
								<li v-for="(item,index) in inclusions" :key="index" v-if="item.content!=''">
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
				<ul class="similar_list">
					<li :key="index" v-for="(i,index) in detail.recommend.entities">
						<a :href="'/activity/details/'+i.activityId">
							<div class="similar_img_box">
								<div class="similar_img" v-lazy:background-image="i.coverPhotoUrl"></div>
							</div>
							<div class="similar_info">
								<h4>{{i.title}}</h4>
								<span class="tag">{{i.category}}{{i.groupType?' · '+i.groupType:''}}</span>
								<p><b>Duration:</b>{{i.duration}} {{setTimeStr(i.duration,i.durationUnit)}}</p>
							</div>
							<div class="similar_list_foot">
								<span class="price"><i class="gray">{{participants==0?'From':''}}</i><b>{{nowExchange.code}} {{nowExchange.symbol}}{{participants==0?returnFloat(i.bottomPrice):returnFloat(i.perPersonPrice)}}</b>{{returnText(participants)}}</span>
								<!-- <div class="reviews_star" v-html="reviewsStarHtml(reviewsData.avgScore)"></div><span class="gray">(263)</span> -->
							</div>
						</a>
					</li>
				</ul>
			</div>

		</div>
		
		
		<FooterCommon :nowCurrency="nowExchange" @headCurrency="headCurrencyFn"></FooterCommon>
			
		<Contact :ContactStatus="ContactStatus" v-on:contactCallback="contactCallBack" :owner="detail.owner"  :objectType="'ACTIVITY'" :objectId="id"></Contact>
		<!-- service弹窗 -->
		<dialogBox v-model="inquiryStatus" confirmShow="true" confirmText="Confirm" @confirmCallback="confirmCallback" width="900">
			
			<div class="tip_title"> Thank you. You have submitted your Inquiry successfully! <br>We will get back to you within 1 day.</div>

			<div class="service_box">
				<p class="tip_detail">A confirmation email has been sent to “{{inqueryEmailOld}}”,<br>Please check. If you have not received it, please check your junk mail folder. If you still do not see it,<br>please <a @click="showEmailBox=true">click here</a> to enter your correct or alternative email address.</p>
				<div class="email_box" v-show="showEmailBox">
					<input type="text" v-model="inqueryEmail">
					<span class="btn_sendemail" @click="sendEmail">Resend email address</span>

					<div class="email_tip red" v-show="emailTip">Please enter a valid email</div>
					<div class="email_tip green" v-show="emailSendTip"><i class="iconfont">&#xe654;</i> Email address has been updated ,and We have sent an email to your new mailbox</div>
				</div>

				
			</div>

			<service></service>
			
		</dialogBox>


	</div>
</template>

<script>

	import HeaderCommon from "~/components/HeaderCommon/HeaderCommon";
	import FooterCommon from "~/components/FooterCommon/FooterCommon";
	import Contact from '~/components/Contact/Contact';
	import service from '~/components/pageComponents/inquiry/service';
	import dialogBox from '~/plugins/panda/dialogBox';
	import Flatpickr from 'flatpickr';
	require('~/assets/scss/G-ui/flatpickr.min.css')
	import { addmulMonth,delNullArr,getUrlParams,getParents,formatDate } from "~/assets/js/plugin/utils";
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
			if(urlTravelers>0){
				data.participants=urlTravelers;
			}else if(userCookie.participants){
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
			FooterCommon,
			Contact,
			service,
			dialogBox
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
				ContactStatus:false,
				inquiryStatus:false,
				emailTip:false,
				emailSendTip:false,
				showEmailBox:false,
				inqueryEmail:'',
				inqueryEmailOld:'',
				feedbackId: ''
			}
		},
		methods: {
			formatDate:formatDate,
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
			returnText(peopleNum){
				if(this.picInfo.unifiedPricing){
					return ' pp';
				}
				return peopleNum?(peopleNum==1?' for 1 person':' pp for party of '+ peopleNum):' pp '
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
			getRecommend(){
				var self = this;
				//请求推荐信息
				var recommendOptions = {
					"id": self.id,
					'currency':self.nowExchange.code,
					'pageNum':1,
					'pageSize':3
				};
				if(self.participants){
					recommendOptions.participants = self.participants;
				}
				self.axios.post("https://api.localpanda.com/api/search/activity/recommend",JSON.stringify(recommendOptions),{
					headers: {
					'Content-Type': 'application/json'
					}
				}).then(function(res) {
					self.detail.recommend = res.data;
				}, function(res) {});
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
			setPeople(){
				this.bookAdults = this.changeAdults;
				this.bookChildren = this.changeChildren;
				this.bookPeople = this.bookAdults+this.bookChildren;
				this.showChangePeople = false;
			},
			setPeoplePrice(){
				var details = this.picInfo.details;
				var bookPeople = this.bookPeople;
				for(var i=0;i<details.length;i++){
					var thisData = details[i];
					if(thisData.capacity==bookPeople){
						this.price = thisData.price;
						this.perPersonPrice = thisData.perPersonPrice;
						this.amount = this.returnFloat(this.price - (this.picInfo.childDiscount?this.returnFloat(this.picInfo.childDiscount*this.bookChildren):0));
						break;
					}
				}
			},
			getPeoplePrice(peopleNum,pp){
				var price = this.picInfo.details
				for(var i =0;i<price.length;i++){
					if(peopleNum==price[i].capacity){
						return pp ? price[i].perPersonPrice : price[i].price;
					}
				}
				return price[price.length-1].perPersonPrice;
			},
			showChangeFn(){
				this.showChangePeople = true;
				if(this.bookPeople==0){
					this.changeAdults = this.picInfo.minParticipants;
				}
				
			},
			changeCurrency(e){
				var self = this;
				var value = e.target ? e.target.value : e;
				var picInfo = this.picInfo;
				var thisDetail = picInfo.details;
				
				var exchange = this.exchange;
				
				//换算折扣价
				self.axios.get("https://api.localpanda.com/api/product/activity/"+this.id+"/price?currency="+value).then(function(res) {
					if(self.picInfo.childDiscount){
						self.picInfo.childDiscount=res.data.childDiscount
					}
					self.picInfo.bottomPrice=res.data.bottomPrice
					self.picInfo.currency=res.data.currency
					
					//设置当前币种
					for(var i=0;i<exchange.length;i++){
						var thisEx = exchange[i];
						//检测当前货币类型
						if(thisEx.code==value){
							self.nowExchange = thisEx;
						}
					}
					//推荐产品
					self.getRecommend();

						
				}, function(res) {
					
				});
					
				self.axios.get("https://api.localpanda.com/api/product/activity/"+this.id+"/price/detail?currency="+value+(self.participants?'&participants='+self.participants:'')).then(function(res) {
						self.picInfo.details=res.data
						
						//重设book价格
						self.setPeoplePrice();

						self.sixArr=res.data
						if(self.participants>0){
							self.adultsPic =thisDetail[self.participants-1].price;	
						}
						if(res.data.length>6){
							self.isShowTable=true
							self.sixArr=res.data.concat().splice(0,6);
						}else{
							self.sixArr=res.data;
						}
				}, function(res) {
					
				});
				
				//切换币种
				// self.$emit('input',this.nowExchange);

				
				
			},
			headCurrencyFn(currency){
				this.currency = currency;
			},
			minusNum(e,type){
				if(/stop/.test(e.target.className))return;
				if(type===1){
					this.changeAdults--;
				}else{
					this.changeChildren--;
				}
			},
			addNum(e,type){
				if(/stop/.test(e.target.className))return;
				if(type===1){
					this.changeAdults++;
				}else{
					this.changeChildren++;
				}
			},
			addZero(num){
				return num>9 ? num : '0'+num;
			},
			getRefundDate(dateStr,days){
				var dt = new Date(dateStr.replace(/\-/g,'/'));
				dt.setDate(dt.getDate()-days);
				return dt.getFullYear() + "-" +this.addZero(dt.getMonth()+1) + "-" + this.addZero(dt.getDate());
			},
			bookNow(){
				var self = this;
				if(!self.startDate){
					setTimeout(function(){
						self.flatPickr.open();
					},80);
					self.showWinBg = true;
					return false;
				}

				if(this.bookPeople==0){
					self.showChangePeople = true;
					return false;
				}
				
				
				var orderInfo = {
		      activityId: this.id,
		      amount: this.amount,
					currency: this.picInfo.currency,
					symbol: this.nowExchange.symbol,
					adultNum: this.bookAdults,
					refundTimeLimit: this.picInfo.refundTimeLimit,
				  finalRefundPeriod:(this.picInfo.fullRefund?this.getRefundDate(this.startDate,this.picInfo.refundTimeLimit):null),  //最后退款日期
					childrenNum: this.bookChildren,
					infantNum: 0,
					startDate: this.startDate, //出游时间
					startTime: null,  //
					adultsPic: this.price,
					title: this.detail.title,
					childDiscount: this.picInfo.childDiscount*this.bookChildren, //儿童优惠总价
					childDiscountP: this.picInfo.childDiscount,  //儿童优惠平均价
				  pickup: this.detail.pickup,
				  owner:this.detail.owner,
		      averagePrice: this.perPersonPrice, //人均价 
		      guideId: this.checkGuideIndex!=='' ? this.detail.guide[this.checkGuideIndex].guideId : null
				};
				
				
				orderInfo = JSON.stringify(orderInfo);
		    localStorage.setItem("orderInfo", orderInfo);
				location.href="/activity/booking/"+this.id;
			},
			contactCallBack(val){
				if(val){
					var data = val.data;
					if(data && data.succeed){
						this.feedbackId = data.response;
						this.inqueryEmailOld = val.email;
						this.inquiryStatus = true;
					}else{
						this.isShowAlert=true
						this.alertMessage="Failed!"
					}
					
				}

				//关闭弹窗
				this.ContactStatus=false
			},
			showContact() {
				let that = this;
				window.ga && ga(gaSend, {
					hitType: "event",
					eventCategory: "activity_detail",
					eventAction: "Click",
					eventLabel: "activity_inquiry"
				});
				that.ContactStatus=true
				
			},
			confirmCallback(){
				this.inquiryStatus = false;
			},
			sendEmail(){
				var that = this;
				if(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.inqueryEmail)){

					//默认是修改feedback的邮箱
					var postData = {
						emailAddress: this.inqueryEmail,
						id: this.feedbackId
					};
					var postUrl = "https://api.localpanda.com/api/user/feedback";

					//修改邮箱请求
					that.axios.post(postUrl, JSON.stringify(postData), {
						headers: {
							'Content-Type': 'application/json'
						}
					}).then(function(response) {
						if(response.data.succeed) {
							that.emailSendTip = true;
							that.inqueryEmail = '';
						};

					}, function(response) {

					})
					this.emailTip = false;
				}else{
					this.emailTip = true;
				}
			},
		},
		mounted: function() {
			var self = this;
			//币种信息
			this.exchange = this.currencyData;

			var cookieCurrency = JSON.parse(Cookie.get('currency'));

			//设置当前币种
			var currency= cookieCurrency ? cookieCurrency : {'code':'USD','symbol':'$'};
			if(this.nowExchange.code!=currency.code){
				this.nowExchange=currency;
			}

			console.log(this.detail);
			console.log(this.picInfo);
			console.log(this.$data);

			
			//选择默认处理
			if(this.participants>this.picInfo.maxParticipants){
				this.participants = this.picInfo.maxParticipants;
			}else if(this.participants<this.picInfo.minParticipants){
				this.participants = this.picInfo.minParticipants;
			}
			if(this.participants){
				this.bookAdults = this.participants;
				this.changeAdults = this.participants;
			}
			
			
			//等待渲染完毕后调用
			this.$nextTick(function(){
				
				//日历可售
				var saleDate=[]
				for(var i=0;i<self.calendar.length;i++){
					saleDate.push(self.calendar[i].saleDate)
				}

				self.flatPickr = new Flatpickr('#js_changetime', {
					minDate: self.picInfo.earliestBookDate,
					maxDate: addmulMonth(self.picInfo.earliestBookDate, 12),
					enable:saleDate
				});

			});


			//点击自动设为人数
			document.addEventListener('click',function(e){
				var target = e.target;
				if(!getParents(target,'change_travelers') && self.showChangePeople && self.changeAdults){
					self.setPeople();
				}
			},false);
    	
		},
		watch: {
			bookAdults:function(val){
				this.bookPeople = val*1 + this.bookChildren;
			},
			bookChildren:function(val){
				this.bookPeople = val*1 + this.bookAdults;
			},
			bookPeople:function(val){
				//设置价格
				this.setPeoplePrice();
				this.participants = val;
			},
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
				max-height: 100%;
				img[lazy="loading"]{
					max-height: 200px;
				}
			}
		}
		.main_box{
			width: 1170px;
			margin: 30px auto 0;
			padding-bottom: 100px;
			.main_l{
				width: 735px;
			}

			/*右侧预定模块*/
			.main_r{
				float: right;
				width: 376px;

				.book_all{
					.book_content{
						box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
						border-radius: 8px 8px 0 0;
						
						.book_head{
							width: 100%;
							background-color: #353a3f;
							height: 50px;
							line-height: 50px;
							border-radius: 8px 8px 0 0;
							color: #fff;
							.price_select_box{
								position: relative;
								font-size: 16px;
								line-height: 22px;
								float: left;
								margin: 14px 15px 0 14px;
								i{
									position: absolute;
									right: 0;
									top: 0;
									height: 22px;
									line-height: 24px;
									vertical-align: top;
									font-size: 20px;
									font-weight: normal;
									color: #fff;
									overflow: hidden;
								}
								select{
									line-height: 22px;
									padding: 0 20px 0 10px;
									font-size: 16px;
									color: #fff;
									background: none;
									border: none;
									appearance:none;
									-moz-appearance:none;
									-webkit-appearance:none;
									position: relative;
									z-index: 2;
									option{
										background-color: #353a3f;
									}
								}
							}
							.price_info{
								font-size: 16px;
								b{
									font-size: 24px;
									vertical-align: top;
								}
								.iconfont{ color: #999;}
								.price_from{
									font-size: 14px;
									color: #eee;
									font-weight: normal;
								}
							}
						}
						.book_list{
							color: #353a3f;
							padding: 0 24px;
							li{
								margin-top: 14px;
								position: relative;
								h4{
									font-size: 14px;
									font-weight: bold;
									margin-bottom: 6px;
								}
								.input_box{
									border-radius: 3px;
									border: solid 1px #e3e5e9;
									position: relative;
									height: 44px;
									line-height: 42px;
									padding-left: 15px;
									font-size: 16px;
									input{
										position: absolute;
										left: 0;
										top: 0;
										z-index: 2;
										border: none;
										display: block;
										width: 100%;
										height: 44px!important;
										padding-left: 15px;
										background: none;
										cursor: pointer;
										opacity: 0;
										color: #353a3f;
										&::-webkit-input-placeholder{ color: #878e95;}
										&::-moz-placeholder { color: #878e95; }
										&::-ms-input-placeholder { color: #878e95; }
									}
									.opacity1{
										opacity: 1;
									}
									.iconfont{
										position: absolute;
										right: 12px;
										top: 50%;
										font-size: 22px;
										color: #353a3f;
										-webkit-transform: translateY(-50%);
										transform: translateY(-50%);
									}
								}
								.holder{
									color: #878e95;
								}
								.change_travelers{
									position: absolute;
									background-color: #fff;
									left: 0;
									top: 67px;
									z-index: 2;
									width: 100%;
									padding: 20px;
									box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
									.change_list{
										font-size: 22px;
										line-height: 32px;
										padding: 12px 0;
										-webkit-user-select: none; 
										-moz-user-select: none; 
										-ms-user-select: none; 
										-o-user-select: none; 
										user-select: none;
										.num_box{
											float: right;
											span{
												display: inline-block;
												width: 32px;
												height: 32px;
												line-height: 32px;
												text-align: center;
												font-size: 20px;
												cursor: pointer;
												color: #1bbc9d;
												vertical-align: top;
											}
											b{
												display: inline-block;
												height: 32px;
												line-height: 30px;
												border: 1px solid #ccc;
												width: 60px;
												text-align: center;
												vertical-align: top;
												margin: 0 6px;
												font-size: 18px;
											}
											.stop{
												color: #878e95;
											}
										}
										small{
											display: block;
											line-height: 18px;
											font-size: 13px;
											color: #878e95;
										}
									}
								}
							}
						}
						.book_price_info{
							border-top: #ebebeb solid 1px;
							overflow: hidden;
							padding: 12px 0;
							font-size: 16px;
							dt{
								float: left;
								span{
									display: block;
									line-height: 26px;
								}
							}
							dd{
								float: right;
								line-height: 26px;
								
							}
						}
						.hr{ height: 1px; background-color: #ebebeb;}
						.book_tip{ margin-top: 10px; font-size: 14px;}
						.Booked_box{
							padding: 16px 0;
							color: #878e95;
							font-size: 14px; 
						}
					}
					
					
					
				}
				
			}

			/*面包屑*/
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
			/*顶部信息*/
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

			/*公共模块*/
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

			/*亮点*/
			.why{
				.detail_p{
					margin-top: 12px;
				}
				.detail_txt_list{
					margin-top: 10px;
				}
			}

			/*行程*/
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

			/*其他版块信息*/
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

			/*点评*/
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
			
			/*推荐*/
			.similar{ 
				clear: both;
				margin-top: 30px;
				.similar_list{
					margin-top: 20px;
					li{
						float: left;
						width: 379px;
						height: 445px;
						margin-left: 16px;
						position: relative;
						box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
						border-radius: 6px;
						overflow: hidden;
						-webkit-transition:all 0.2s linear 0s;
						transition:all 0.2s linear 0s;
						&:nth-child(1){
							margin-left: 0;
						}
						&:hover{
							box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.2);
							.similar_img{
								-webkit-transform: scale(1.06);
								transform: scale(1.06);
							}
						}
						.similar_img_box{
							width: 100%;
							height: 253px;
							overflow: hidden;
							.similar_img{
								width:100%;
								height:100%;
								-webkit-transition:all 0.2s linear 0s;
								transition:all 0.2s linear 0s;
								background-size: cover;
								background-position: center center;
							}
							
						}
						.similar_info{
							padding: 0 15px;
						}
						h4{
							font-size: 16px;
							line-height: 21px;
							max-height: 64px;
							overflow: hidden;
							margin-top: 15px;
							margin-bottom: 12px;
						}
						.tag{
							color: #fff;
							display: inline-block;
							height: 20px;
							line-height: 20px;
							border-radius: 3px;
							padding: 0 10px;
							background-color: #f4b33f;
							font-size: 12px;
							text-transform: uppercase;
						}
						p{
							font-size: 14px;
							color: #878e95;
							margin-top: 10px;
							b{
								margin-right: 5px;
							}
						}
						.similar_list_foot{
							line-height: 30px;
							font-size: 14px;
							position: absolute;
							left: 0;
							bottom: 12px;
							width: 100%;
							padding: 0 15px;
							box-sizing:border-box;
							.price{
								float: right;
								b{
									font-size: 20px;
									margin: 0 3px;
								}
							}
							.gray{
								color: #878e95;
							}
							.reviews_star{
								float: left;
								margin-top: 8px;
								margin-right: 6px;
							}
						}
					}
				}
			}

			.btn{
				display: block;
				height: 42px;
				line-height: 42px;
				text-align: center;
				width: 100%;
				background-image: -webkit-gradient(linear, right top, left top, from(#009efd), to(#1bbc9d));
				background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
				border-radius: 21px;
				color: #fff;
				font-size: 16px;
				box-sizing: border-box;
				cursor: pointer;
			}
			.btn_inquire{
				display: block;
				height: 42px;
				line-height: 42px;
				box-sizing: border-box;
				text-align: center;
				color: #FFF;
				font-weight: bold;
				border-radius: 21px;
				border: solid 1px #1bbc9d;
				background: #fff;
				color: #1bbc9d;
				font-size:16px;
				cursor: pointer;
			}

		}


		.tip_title{
			padding-top: 20px;
			text-align: center;
			font-size: 22px;
		}

		.service_box{
			font-size: 14px;
			.tip_detail{ 
				margin-top: 20px; font-size: 14px; line-height: 22px;
				a{ color:#00B886; cursor: pointer;
					&:hover{ text-decoration: underline;}
				}
			}
			.email_box{
				margin-top: 10px;
				input{
					width: 300px;
					border: 1px solid #ddd;
					height: 32px;
					line-height: 32px;
				}
				.btn_sendemail{
					display: inline-block;
					height: 32px;
					border-radius: 16px;
					line-height: 30px;
					padding: 0 20px;
					font-size: 14px;
					cursor: pointer;
					background-image: -webkit-gradient(linear, right top, left top, from(#009efd), to(#1bbc9d));
					background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
					color: #fff;
					margin-left: 10px;
				}
			}
			.email_tip{
				margin-top: 9px;
				i{
					font-size: 14px;
				}
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