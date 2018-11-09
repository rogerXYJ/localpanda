<template>
	<div id="phone_detail">
		<!-- 头部 -->
		<HeaderCommon :logIn="logIn" :nowCurrency="nowExchange" @headCurrency="headCurrencyFn"></HeaderCommon>

		<!-- banner -->
		<div class="phone_top">
			<h1>Panda Phone Service</h1>
			<p>Booked 19 times (last 30 days)</p>
			<div class="banner">

			</div>
		</div>

		<div class="main_box clearfix">

			<!-- 右侧 -->
			<div class="main_r">
				<div class="book_all" :class="{'book_fixed':bookFixed}">
					<!-- 预定表单模块 -->
					<div class="book_content">
						<div class="book_head">
							<div class="price_select_box">
								<select v-model="selectCurrency">
									<option :value="item.code" :key="index" v-for="(item,index) in exchange">{{item.code}}</option>
								</select>
								<i class="iconfont">&#xe666;</i>
							</div>
							<div class="price_info">
								<b><span class="price_from">From</span> {{nowExchange.symbol}} {{participants*5}}</b>
							</div>
						</div>

						<ul class="book_list">
							<li>
								<h4>Available On</h4>
								<div class="input_box" :class="{'holder':!startDate}">
									{{startDate?formatDate(startDate):'Date'}}
									<input v-model="startDate" id="js_changetime" type="text" readonly>
									<i class="iconfont">&#xe666;</i>
								</div>
							</li>
							<li>
								<h4>Number of Travelers</h4>
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
										<span>{{nowExchange.symbol}}{{returnFloat(perPersonPrice)}} × {{bookPeople}} {{bookPeople>1?'Travelers':'Traveler'}}</span>
										<span v-if="pandaPhoneCheck">+{{nowExchange.symbol}}{{returnFloat(picInfo.phoneHirePrice)}} for Panda Phone</span>
										<span v-if="picInfo.childDiscount && bookChildren">-{{nowExchange.symbol}}{{returnFloat(picInfo.childDiscount*bookChildren)}} for {{bookChildren}} {{bookChildren>1?'Children':'Child'}}</span>
										
									</dt>
									<dd>{{nowExchange.symbol}}{{returnFloat(price)}}</dd>
								</dl>
								<dl class="book_price_info">
									<dt>Total Amount</dt>
									<dd>{{nowExchange.symbol}}<b>{{amount}}</b></dd>
								</dl>
								
							</li>
							<li class="clearfix">
								<span class="btn" @click="bookNow">Book Now</span>
								<!-- <span class="btn_inquire fl" @click="ContactStatus=true">Inquire</span> -->
							</li>
							
							<li>
								<p class="book_tip">Questions before booking? <a href="">Contact us</a></p>
							</li>
						</ul>
					</div>


				</div>
			</div>


			<!-- 左侧内容烂 -->
			<div class="main_l">
				
				

				<!-- Did You Know That in China -->
				<div class="detail_box inchina" id="inchina">
					<h3>Did You Know That in China</h3>
					<ul class="detail_txt_list">
						<li><i class="dian"></i>Uber and other popular ride-sharing apps aren’t present</li>
						<li><i class="dian"></i>Most major websites including google and all its services are blocked</li>
						<li><i class="dian"></i>Debit and credit cards are NOT widely accepted</li>
						<li><i class="dian"></i>In Shanghai alone there are 5 different streets named Zhongxing Road</li>
						<li><i class="dian"></i>Most shops & cafes require a China phone number to connect to wifi</li>
						<!-- <li v-for="item in getTextArr(detail.highlights)" :key="item"><i class="dian"></i>{{item}}</li> -->
					</ul>
					<p class="detail_p">China can be very challenging to navigate without a little help. <br>That’s why we’ve created the ultimate device to make your life easy so you can enjoy your vacation. Introducing…</p>
				</div>

				<!-- The Panda Phone -->
				<div class="detail_box">
					<h3>The Panda Phone - All-in-one Mobile Travel Assistant</h3>
					<ul class="detail_txt_list">
						<li><i class="dian"></i>Uber and other popular ride-sharing apps aren’t present</li>
						<li><i class="dian"></i>Most major websites including google and all its services are blocked</li>
						<li><i class="dian"></i>Debit and credit cards are NOT widely accepted</li>
						<li><i class="dian"></i>In Shanghai alone there are 5 different streets named Zhongxing Road</li>
						<li><i class="dian"></i>Most shops & cafes require a China phone number to connect to wifi</li>
						<!-- <li v-for="item in getTextArr(detail.highlights)" :key="item"><i class="dian"></i>{{item}}</li> -->
					</ul>
					<p class="detail_p">China can be very challenging to navigate without a little help. <br>That’s why we’ve created the ultimate device to make your life easy so you can enjoy your vacation. Introducing…</p>
				</div>

				<!-- The Panda Phone -->
				<div class="detail_box">
					<h3>Pricing details</h3>
					<p class="detail_p"><b>OPTION 1</b>: Purchase only the Panda Phone  Service <br>
First day = $5<br>
Day 2 and onward = $1 per day<br>
Renting the Panda Phone without booking a tour costs $5 for the first day and an additional $1 for each day after. (e.g. if you use for 15 days the price will be $5 (first day) + $14 (following 14 days) …<span>+ More</span></p>
				</div>

				<!-- Pick-up -->
				<div class="detail_box">
					<h3>Pick-up details</h3>
					<p class="detail_p">Pick-up and drop-off are only available at city center accommodations in Shanghai & Beijing. For instance, if you choose to pick up your Panda Phone at your hotel in Shanghai, one of our staff will be waiting for you in the lobby at your estimated check-in time. Please present the confirmation email of …<span>+ More</span></p>
				</div>

				<!-- How it works -->
				<div class="detail_box">
					<h3>How it works</h3>
					<h4>Step 1</h4>
					<p class="detail_p">While booking, please fill out your pickup info so we know where and when to deliver your Panda Phone.</p>
					<h4>Step 2</h4>
					<p class="detail_p">Pay the deposit and receive the Panda Phone at your pre-determined pick-up location. See “Your Deposit” for more info. Open the WeChat app to communicate with our customer service …<span>+ More</span></p>
				</div>

				<!-- Your deposit -->
				<div class="detail_box">
					<h3>Your deposit</h3>
					<p class="detail_p">We require a $150 USD (1000 RMB)  deposit that will be securely held while you are in possession of the Panda Phone. Your deposit will be returned once you have completed your trip and handed it back to our staff.</p>
					<h4>There are 2 options for paying your deposit:</h4>
					<p class="detail_p">1. Via credit/debit card simultaneously with your tour booking. Your deposit will be returned directly to minor damage that does not impede the phoneʼs functionality …<span>+ More</span></p>
				</div>

				<!-- WeChat -->
				<div class="detail_box">
					<h3>WeChat Mobile Pay(Optional)</h3>
					<p class="detail_p">
						<img src="http://placehold.it/210x316/dddddd" width="210" height="316" alt="">
						In recent years, mobile apps like WeChat and Alipay have become the most widely used and accepted forms of payment in China by a wide margin. Each Panda Phone comes with a pre-registered WeChat mobile wallet which we can help you fill up. All you have to do is send us the amount youʼd like to add via cash (rmb only) or PayPal and we will transfer the money into your WeChat Wallet.Setting up WeChat Mobile Pay is highly recommended as it will allow you to take advantage of local apps such as Didi ride sharing (Chinese Uber) and Mobike bike sharing. Since the WeChat Wallet on your phone has already been set up by our staff you DO NOT need to input any personal information such as your passport or credit card into your Panda Phone device in order to take advantage of WeChat Mobile Pay. See the WeChat Mobile Pay section below for payment details. Any money you have left over on the phone at the end of the trip we can give back to you in Cash when you return your Panda Phone. Please let us know in advance on WeChat the amount remaining in your wallet that youʼd like returned so we can have exact change on hand.If you require using a credit or debit card to charge your WeChat Wallet and do not have a PayPal account, please contact our customer service on payment options.</p>
				</div>

				<!-- Pick-up -->
				<div class="detail_box">
					<h3>Using the Phone & Our Service</h3>
					<p class="detail_p">Upon receiving the phone, we will send you some tutorials on the various apps and features on the phone as well as how to use them. If you are having trouble using the phone at any time, please reach out to our customer service team through WeChat or email us at service@localpanda.com.…<span>+ More</span></p>
				</div>


			</div>

			
			

		</div>

		
		<!-- 公共底部 -->
		<FooterCommon :nowCurrency="nowExchange" @headCurrency="headCurrencyFn"></FooterCommon>
		
		<!-- inquiry -->
		<Contact :ContactStatus="ContactStatus" v-on:contactCallback="contactCallBack" :owner="'detail.owner'"  :objectType="'ACTIVITY'" :objectId="'pandaPhone'"></Contact>
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
	import dialogBox from '~/plugins/panda/dialogBox';
	import Contact from '~/components/Contact/Contact';
	import service from '~/components/pageComponents/inquiry/service';
	import Flatpickr from 'flatpickr';
	require('~/assets/scss/G-ui/flatpickr.min.css')
	import { addmulMonth,delNullArr,getUrlParams,getParents,formatDate } from "~/assets/js/plugin/utils";
	import Vue from 'vue';

	export default {
		name: "phoneDetail",
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


	
			// 服务端渲染部分 这部分操作还没有页面实例，只是初始化页面数据
			let data = {
				logIn: "",
				participants:0,
				exchange:[],


				//选择日期和人数板块
				bookFixed:false,
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
				pandaPhoneCheck:false,
				showPPDialog:false,

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
				data.participants=userCookie.participants;
			}

			callback(null,data);

			//基本信息
			// var Promise1 = new Promise(function(resolve, reject){
			// 	Vue.axios.get(apiBasePath + "product/activity/" + id).then(function(res) {
			// 		//获取可售日期
			// 		if(!res.data.allAvailable){
			// 			Vue.axios.get(apiBasePath + "product/activity/"+id+"/sale/calendar").then(function(response) {
			// 				data.calendar = response.data?response.data:[];
			// 				resolve(res);
			// 			}, function() {
			// 				resolve(res);
			// 			});
			// 		}else{
			// 			resolve(res);
			// 		}
			// 	}, function(res) {
			// 		resolve(res);
			// 	});
			// });
			
			
			// Promise.all([Promise1]).then(function(results){

			// 	//基本信息
			// 	var detailData = results[0].data;

			// 	//同步回调
			// 	callback(null,data);
			// }).catch(function(err){
			// 	return error({
			// 		statusCode: 500,
			// 		message: JSON.stringify(err)
			// 	});
			// });
			
		},
		head() {
			let title = '';
			let description = '';
			let keywords = '';
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
			var self = this;
			return {
				showDurationInfo:false,
				showLanguagesInfo:false,
				showPickupInfo:false,

				isShowMeau:false,

				


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
				reviewsShowImg:false,
				reviewsImgList:[],
				swiperOptionTop: {
					initialSlide:0,
					navigation : {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					},
					
					 lazy: {
						loadPrevNext: true,
					},
					on: {
						slideChangeTransitionStart: function(){
							var activeIndex = this.activeIndex;
							//return
							var list = self.swiperThumbs.$el[0].getElementsByClassName('swiper-slide');
							for(var i=0;i<list.length;i++){
								if(i==this.activeIndex){
									list[i].className = 'swiper-slide swiper-slide-visible imgActive';
								}else{
									list[i].className = list[i].className.replace(/imgActive/,'');
								}
							}
						}
					}
				},
				swiperOptionThumbs: {
					lazy: {
						loadPrevNext: true,
					},
					initialSlide :0,
					watchSlidesProgress : true,
					watchSlidesVisibility : true,
					slidesPerView : 5,
					on:{
						tap: function(e){
							
							var list = this.$el[0].getElementsByClassName('swiper-slide');
							for(var i=0;i<list.length;i++){
								if(i==this.clickedIndex){
									list[i].className = 'swiper-slide swiper-slide-visible imgActive';
								}else{
									list[i].className = list[i].className.replace(/imgActive/,'');
								}
								
							}
						}
					}
				},

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
			
			changeCurrency(){
				var self = this;
				var selectCurrency = this.selectCurrency;
				var exchange = this.exchange;

				
			},
			headCurrencyFn(currency){
				this.nowExchange = currency;
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


				ga(gaSend, {
					hitType: "event",
					eventCategory: "activity_detail",
					eventAction: "click",
					eventLabel:"book_succeed"
				});
				
				
				var orderInfo = {
		      
				};
				
				
				orderInfo = JSON.stringify(orderInfo);
		    localStorage.setItem("orderInfo", orderInfo);
				location.href="/product/phone/booking/"+this.id;
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
			scrollFn(){
				var self = this;
				var $main_r = document.querySelector('.main_r');
				var $book_all = document.querySelector('.book_all');

				window.onscroll = function(){
					var Y = window.scrollY,
					T = $main_r.offsetTop-60;
					// maxT = $similar.offsetTop-$book_all.clientHeight-60;
					if(Y>T){
						self.bookFixed = true;
						// if(Y>maxT){
						// 	$book_all.style = 'position: relative;top:0;'
						// }else{
						// 	$book_all.style = '';
						// }
					}else{
						self.bookFixed = false;
					}
				}
			},
			
		},
		mounted: function() {
			var self = this;
			//币种信息
			this.exchange = this.currencyData;

			//登录状态
			this.logIn = window.localStorage.getItem("logstate");

			
			//设置当前币种
			var cookieCurrency = JSON.parse(Cookie.get('currency'));
			var currency= cookieCurrency ? cookieCurrency : {'code':'USD','symbol':'$'};
			if(this.nowExchange.code!=currency.code){
				this.nowExchange=currency;
			}
			
			//人数处理
			if(this.participants){
				//选择默认处理
				if(this.participants>10){
					this.participants = 10;
				}else if(this.participants<1){
					this.participants = 1;
				}
			}
			
			
			//等待渲染完毕后调用
			this.$nextTick(function(){
				
				//日历可售
				self.flatPickr = new Flatpickr('#js_changetime', {
					minDate: new Date()
				});

			});


			//点击自动设为人数
			document.addEventListener('click',function(e){
				var target = e.target;
				if(!getParents(target,'change_travelers') && self.showChangePeople && self.changeAdults){
					//self.setPeople();
				};
				
			},false);

			//导航,预定悬浮
			this.scrollFn();

			
			
    	
		},
		watch: {
			bookAdults:function(val){
				this.bookPeople = val*1 + this.bookChildren;
				ga(gaSend, {
					hitType: "event",
					eventCategory: "activity_detail",
					eventAction: "select",
					eventLabel:"guests"
				});

				ga(gaSend, {
					hitType: "event",
					eventCategory: "activity_detail",
					eventAction: "select",
					eventLabel:"detail_select"
				});
			},
			bookChildren:function(val){
				this.bookPeople = val*1 + this.bookAdults;
			},
			bookPeople:function(val){
				//设置价格
				this.setPeoplePrice();
				this.participants = val;
				//刷新推荐产品价格
				this.getRecommend();
			},
			nowExchange:function(val){
				//设置价格
				this.selectCurrency = val.code;
				// this.changeCurrency(val.code);
			},
			startDate:function(){
				ga(gaSend, {
					hitType: "event",
					eventCategory: "activity_detail",
					eventAction: "select",
					eventLabel:"date"
				});

				ga(gaSend, {
					hitType: "event",
					eventCategory: "activity_detail",
					eventAction: "select",
					eventLabel:"detail_select"
				});
			},
			selectCurrency:function(){
				this.changeCurrency();
			},
			pandaPhoneCheck:function(val){
				this.setPeoplePrice();
				if(val){
					//弹层勾选
					if(this.showPPDialog){
						ga(gaSend, {
							hitType: "event",
							eventCategory: "activity_detail",
							eventAction: "select",
							eventLabel:"phone_select_layer"
						});
						this.showPPDialog=false;
					}else{
						//页面勾选
						ga(gaSend, {
							hitType: "event",
							eventCategory: "activity_detail",
							eventAction: "select",
							eventLabel:"phone_select"
						});
					}
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	#phone_detail {
		/*顶部信息*/
		.phone_top{
			padding-top: 20px;
			width: 1170px;
			margin: 0 auto;
			h1{
				font-size: 32px;
				font-weight: bold;
			}
			p{
				color: #878e95;
				padding: 10px 0 20px;
				font-size: 16px;
			}
			.banner{ 
				background-color: #eee;
				height: 430px;
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
					font-size: 12px;
					margin-top: 1px;
				}
				p{
					color: #878e95;
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
					width: 376px;
					position: relative;
					z-index: 3;
					
					.book_content{
						box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
						border-radius: 8px;
						background-color: #fff;
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
									margin-right: 5px;
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
							padding: 0 24px 20px;
							li{
								margin-top: 14px;
								position: relative;
								h4{
									font-size: 14px;
									font-weight: bold;
									margin-bottom: 8px;
								}
								.input_box{
									border-radius: 3px;
									border: solid 1px #e3e5e9;
									position: relative;
									height: 40px;
									line-height: 38px;
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
										height: 38px!important;
										line-height: 38px!important;
										padding-left: 15px;
										background: none;
										cursor: pointer;
										opacity: 0;
										color: #353a3f;
										&::-webkit-input-placeholder{ color: #878e95;}
										&::-moz-placeholder { color: #878e95; opacity: 1; }
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
										.btn{
											width: 100%;
										}
									}
								}
								.pp_tip{
									color: #878e95;
									font-size: 14px;
									margin-top: 5px;
									span{
										color: #1bbc9d;
										text-decoration: underline;
										margin-left: 4px;
										cursor: pointer;
									}
								}
							}
						}
						.book_price_info{
							border-top: #ebebeb solid 1px;
							overflow: hidden;
							padding: 8px 0;
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
							float: right;
							line-height: 28px;
							color: #878e95;
							font-size: 14px; 
						}
						.inquire_text{
							line-height: 26px;
							font-size: 18px;
							color: #1bbc9d;
							cursor: pointer;
							float: left;
							// font-weight: bold;
							i{margin-right: 5px; font-size: 20px; position: relative; top: 2px; vertical-align: top;}
							b{
								text-decoration: underline;
								vertical-align: top;
							}
						}
						.middle_line{
							float: left;
							margin-left: 30px;
							width: 1px;
							background-color: #bbb;
							height: 18px;
							margin-top: 6px;
						}
					}
					
					.book_ensure{
						background-color: #f2fbf9;
						cursor: pointer;
						border-radius: 8px;
						padding: 15px 20px;
						margin-top: 10px;
						-webkit-transition:all 0.3s linear 0s;
						transition:all 0.3s linear 0s;
						li{
							padding-left: 25px;
							color: #353a3f;
							font-size: 16px;
							padding: 4px 0 4px 25px;
							i{
								float: left;
								margin-left: -25px;
								margin-top: 4px;
								color: #1bbc9d;
								font-size: 12px;
							}
							h4{
								font-weight: bold;
								padding-bottom: 6px;
								font-size: 16px;
								width: 350px;
								span{ margin-left: 5px;}
							}
						}
						.pd0{
							padding: 0;
						}
						&:hover{
							background-color: #e4f5f1;
						}
					}
					
					
				}
				.book_fixed{
					position: fixed;
					top: 60px;
					// .book_ensure{
					// 	display: none;
					// }
				}
				
			}

			
			

			/*公共模块*/
			.detail_box{
				padding: 30px 0 0;
				border-top: #dde0e0 solid 1px;
				margin-top: 35px;
				h3{
					font-size: 24px;
					font-weight: bold;
					color: #353a3f;
					overflow: hidden;
					line-height:34px;
					margin-bottom: 10px;
				}
				h4{ 
					font-weight: bold;
					font-size: 16px;
					line-height: 24px;
				}
				.detail_p{
					font-size: 16px;
					line-height: 24px;
					img{
						float: right;
						margin-left: 20px;
						// margin-top: 60px;
					}
				}
			}

			

			/*亮点*/
			.inchina{
				padding-top: 0;
				margin-top: 0;
				border: none;
				.detail_p{
					margin-top: 12px;
				}
				.detail_txt_list{
					margin-top: 10px;
				}
			}


			
	
			.btn{
				display: block;
				height: 42px;
				line-height: 42px;
				text-align: center;
				background-image: -webkit-gradient(linear, right top, left top, from(#009efd), to(#1bbc9d));
				background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
				border-radius: 21px;
				color: #fff;
				font-size: 16px;
				box-sizing: border-box;
				cursor: pointer;
				font-weight: bold;
			}
			.btn_inquire{
				display: block;
				width: 48%;
				margin-left: 4%;
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
