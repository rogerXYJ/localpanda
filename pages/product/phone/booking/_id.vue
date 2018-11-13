<template>
	<div class="fillYourInfo">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="fill">
			<h4 class="page_title">Secure booking — only takes 1 minute!</h4>
			<div class="safeguard">
				<span><i class="iconfont">&#xe654;</i>&nbsp;We protect your personal information</span>
				<span><i class="iconfont">&#xe654;</i>&nbsp;No hidden booking or credit card fees</span>
				<span><i class="iconfont">&#xe654;</i>&nbsp;100% secure payment</span>
				<span><i class="iconfont">&#xe654;</i>&nbsp;Instant confirmation after booking</span>
			</div>
			<div class="fillPageLeft">
				<div class="orderContact">
					<h4>Contact Information</h4>
					<div class="cont">
						<div class="cont-item">
							<p>First Name<b>*</b></p>
							<input id="firstName" :class="{err:oderFirstNameErr}" @focus="fousOderfisrtname" @blur="gabulr(0)" v-model="oderFirstName" :style="{backgroundColor:test.test1?'rgb(250, 255, 189)':'rgb(255, 255, 255)'}"/>
						</div>
						<div class="cont-item">
							<p>Last Name<b>*</b></p>
							<input id="lastName" :class="{err:oderlastNameErr}" @focus="fousoderlastName" @blur="gabulr(1)" v-model="oderlastName" :style="{backgroundColor:test.test2?'rgb(250, 255, 189)':'rgb(255, 255, 255)'}"/>
						</div>
					</div>
					<div class="emalAddress">
						<p>Email Address<b>*</b></p>
						<input id="email" :class="{err:emailAddressErr}" @focus="fousEmal" @blur="gabulr(2)" v-model="emailAddress"  placeholder="We'll send your confirmation here" :style="{backgroundColor:test.test3?'rgb(250, 255, 189)':'rgb(255, 255, 255)'}"/>
					</div>
					<div class="cont">
						<div class="cont-item">
							<p>Country or Territory Code<b>*</b></p>
							<div class="code-box">
								<input id="code" :class="{err:codeErr}" @click.stop="focusCode(0)" @focus="focusCode(0)" @blur="gabulr(3)" @change="changeCode" autocomplete="off" v-model="mobileCode" :style="{backgroundColor:test.test4?'rgb(250, 255, 189)':'rgb(255, 255, 255)'}"/>
								<div class="countryCode" v-show="showCode" :class="codeList.length>0?'width100':''">
									<ul v-if="codeList.length>0">
										<li v-for="item in codeList" @click.stop="selectCode(item.country_name,item.prefix,0)">{{item.country_name}} (+{{item.prefix}})</li>
									</ul>
									<div class="empty" v-else>There are no results that match your search.</div>
								</div>
							</div>

						</div>
						<div class="cont-item">
							<p>Mobile Phone<b>*</b></p>
							<input id="mobilePhone" :class="{err:phoneErr}" @focus="fousPhone" @blur="gabulr(4)" v-model="phone" placeholder="For our guide to contact you" :style="{backgroundColor:test.test5?'rgb(250, 255, 189)':'rgb(255, 255, 255)'}"/>
						</div>
					</div>
					<div class="comments">
						<h4>Other Information</h4>
						<textarea rows="3" @blur="gabulr(5)" placeholder="You can fill out your travel preferences here for us to personalize your trip" v-model="comments"></textarea>
					</div>
				</div>
				

				<!-- 手机业务 -->
				<div class="pandaPhone_delivery">
					<h4>Please provide  your delivery info below <span class="red">*</span></h4>
					<div class="panda_phone_check">
						<radio-group v-model="ppType" class="deposit_list">
							<!-- <radio :label="2">Airport</radio> -->
							<radio :label="3">Hotel</radio>
							<radio :label="1">I haven't decided yet. I'll contact you later</radio>
						</radio-group>
						<div class="mt10 red" v-show="pandaPhoneErr && !ppType">Field is required</div>
						<div class="phone_check_list" v-show="ppType==2">
							<div>&nbsp;&nbsp;&nbsp;&nbsp;Arrival Date: <input class="js_changetime js_validate" readonly v-model="arrivalDate" type="text"></div>
							<div class="mt10">Flight Number: <input class="js_validate" v-model="flightNumber" type="text"></div>
						</div>
						<!-- <div class="phone_check_list" v-else-if="ppType==3 && orderInfo.pickup">
							Hotel Name & Address: <input class="w500" v-model="hotel" type="text">
							<p class="mt10">Your Panda Phone will be delivered by your guide at the start of your trip. </p>
						</div> -->
						<div class="phone_check_list" v-show="ppType==3">
							<div>
								Hotel Name & Address: <input class="w500" :class="{err:hotelErr}" @focus="hotelErr=false" v-model="hotel" type="text">
							</div>
							<div class="mt10">
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								Pick-up Date: 
								<select class="pickup_date" :class="{err:pickUpDateErr}" v-model="pickUpDate" @focus="pickUpDateErr=false">
									<option value="I haven't decided yet">I haven't decided yet. I'll contact you later</option>
									<option value="7:30 AM Beijing Time">7:30 AM Beijing Time</option>
									<option value="8:00 AM Beijing Time">8:00 AM Beijing Time</option>
									<option value="8:30 AM Beijing Time">8:30 AM Beijing Time</option>
									<option value="9:00 AM Beijing Time">9:00 AM Beijing Time</option>
									<option value="9:30 AM Beijing Time">9:30 AM Beijing Time</option>
									<option value="10:00 AM Beijing Time">10:00 AM Beijing Time</option>
									<option value="10:30 AM Beijing Time">10:30 AM Beijing Time</option>
									<option value="11:00 AM Beijing Time">11:00 AM Beijing Time</option>
									<option value="11:30 AM Beijing Time">11:30 AM Beijing Time</option>
									<option value="12:00 PM Beijing Time">12:00 PM Beijing Time</option>
									<option value="12:30 PM Beijing Time">12:30 PM Beijing Time</option>
									<option value="1:00 PM Beijing Time">1:00 PM Beijing Time</option>
									<option value="1:30 PM Beijing Time">1:30 PM Beijing Time</option>
									<option value="2:00 PM Beijing Time">2:00 PM Beijing Time</option>
									<option value="2:30 PM Beijing Time">2:30 PM Beijing Time</option>
									<option value="3:00 PM Beijing Time">3:00 PM Beijing Time</option>
									<option value="3:30 PM Beijing Time">3:30 PM Beijing Time</option>
									<option value="4:00 PM Beijing Time">4:00 PM Beijing Time</option>
									<option value="4:30 PM Beijing Time">4:30 PM Beijing Time</option>
									<option value="5:00 PM Beijing Time">5:00 PM Beijing Time</option>
									<option value="5:30 PM Beijing Time">5:30 PM Beijing Time</option>
									<option value="6:00 PM Beijing Time">6:00 PM Beijing Time</option>
									<option value="6:30 PM Beijing Time">6:30 PM Beijing Time</option>
									<option value="7:00 PM Beijing Time">7:00 PM Beijing Time</option>
									<option value="7:30 PM Beijing Time">7:30 PM Beijing Time</option>
									<option value="8:00 PM Beijing Time">8:00 PM Beijing Time</option>
								</select>
							</div>
							<p class="mt10">One of our travel assistants will hand-deliver the Panda phone to you. We will confirm your delivery location, date, and time with you via email prior to your trip. Please check your email prior to departure for updates. </p>
						</div>

						<!-- I haven't decided yet -->
						<div class="panda_phone_no" v-if="ppType==1">
							<p>You chose: “I haven't decided yet. I'll contact you later” for your delivery information, so we will still need to confirm this prior to your departure.</p>
							<p>You will receive a booking email from service@localpanda.com. Once you've confirmed your travel plans please reply to our email and provide us with your delivery date and location.  Please provide this information at least 24 hours prior to your departure so we can ensure delivery of your Panda Phone.</p>
							<p>Thank you for choosing Local Panda, we hope you have a great trip!</p>
							<p>If you have any questions or concerns, feel free to contact us using the info at the bottom of the page.</p>
						</div>

					</div>
				</div>

				<div class="Comments">
					<div class="information">
						<div class="nextBtn">
							<div class="next" @click.stop="placeOrder">NEXT</div>
						</div>
					</div>
				</div>
			</div>
			<div class="oderdetial">
				<div class="payfordetail">
					<div class="head clearfix">
						<h3>Panda Phone Service</h3>
					</div>
					<div class="date">
						<p>Duration : {{options.days}} {{options.days>1?'Days':'Day'}}<span>{{formatDate(options.startDate)}} - {{formatDate(options.endDate)}}</span></p>
					</div>
					<div class="pic">
						<div class="adult clearfix">
							<!-- <div class="formula">{{nowExchange.symbol}}{{5+options.days-1}} (Panda Phone) x {{options.devicesNum}}</div> -->
							<div class="formula">{{options.days}} {{options.days>1?'Days':'Day'}} × {{options.devicesNum}} {{options.devicesNum>1?'Devices':'Device'}}</div>
							<div class="adultPic">{{nowExchange.symbol}}{{returnFloat(options.totalPrice)}}</div>
						</div>
					</div>
					<div class="total clearfix">
						<div class="totle-title">Total Amount</div>
						<div class="totalPic">{{nowExchange.symbol}} {{returnFloat(options.totalPrice)}}</div>
						<div class="picRate">
							<select class="currency_type" @change="changeCurrency" v-model="options.currency">
								<option :value="item.code" v-for="item in exchange" :key="item.currency">{{item.code}}</option>
							</select>
							<span class="iconfont">&#xe666;</span>
						</div>
					</div>
				</div>
				<div class="serve">
					<h5>HAVING 	TROUBLE BOOKING?</h5>
					<!-- <a href="/inquiry/talk" target="_blank">Chat with Us</a> -->
					<p>Email us: <span>service@localpanda.com</span></p>
				</div>
			</div>

			<div class="visitors">
				<h3>What travelers are saying</h3>
				<ul class="clearfix">
					<li>
						<p class="appraise">Local Panda had an incredible amount of attention and patience throughout my trip. My guide, Jamie, was intelligent and articulative. Thanks again!</p>
						<div class="travellers clearfix">
							<div class="travellersPhoto">
								<img v-lazy="'https://cloud.localpanda.com/static/content/reviews/Claudia.jpg'">
							</div>
							<div class="travellersMessage">
								<p><b>Claudia Flores </b>  ( Mexico )</p>
								<p>August 2018</p>
							</div>
						</div>
					</li>
					<li>
						<p class="appraise">I have to say a huge thank you to Local Panda for putting together this memorable trip we will Cheris forever. Thetours have been par excellence.</p>
						<div class="travellers clearfix">
							<div class="travellersPhoto">
								<img v-lazy="'https://cloud.localpanda.com/static/content/reviews/SamMorgan.jpg'">
							</div>
							<div class="travellersMessage">
								<p><b>Sam Morgan </b>  ( Australia )</p>
								<p>August 2018</p>
							</div>
						</div>
					</li>
					<li>
						<p class="appraise">Rebecca's  knowledge was beyond anything we could've hoped for. The personalized service sets Local Panda apart. Choose Panda if you want to do something off of the beaten path!</p>
						<div class="travellers clearfix">
							<div class="travellersPhoto">
								<img  v-lazy="'https://cloud.localpanda.com/static/content/reviews/Cynthia.jpg'">
							</div>
							<div class="travellersMessage">
								<p><b>Cynthia Huang</b>   ( California )</p>
								<p>July 2018</p>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<AlertGoBack :isShowAlertTitle="isShowAlertTitle" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlertFn="getIsShowAlertFn"></AlertGoBack>
		<!--<Alert :isShowAlert="isShowAlert" :alertTitle='alertTitle' :alertMessage="alertMessage" v-on:setIsShowAlert="getIsShowAlert"></Alert>-->
		<FooterCommon></FooterCommon>



	</div>
</template>

<script>
	if(process.browser) {
		//require('~/assets/js/pages/talk.js')
		// require('~/assets/js/ga/booking.js');
	}
	import Vue from 'vue'
	import { regExp ,formatDate} from '~/assets/js/plugin/utils'
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	import AlertGoBack from '~/components/Prompt/AlertGoBack';
	import Alert from '~/components/Prompt/Alert'
	import countryCode from '~/assets/js/countryCode.js'
	import { radioGroup, radio } from "~/plugins/panda/radio/";

	export default {
		// async asyncData({
		// 	route,
		// 	store,
		// 	error,
		// 	apiBasePath,
		// 	redirect,
		// 	req
		// },callback) {
		// 	let id =route.params.id;
			

		// 	var userCookie = {};
		// 	if(req){
		// 		var cookie = req.headers.cookie;
		// 		if(cookie){
		// 			var cookieArr = cookie.split(';');
		// 			for(var i=0;i<cookieArr.length;i++){
		// 				var thisCookie = cookieArr[i].split('=');
		// 				userCookie[thisCookie[0].trim()] = (thisCookie[1]||'').trim();
		// 			}
		// 		}
		// 	};
		// 	if(userCookie.currency){
		// 		data.currency = JSON.parse(decodeURIComponent(userCookie.currency));
				
		// 	}

		// 	callback(null,data);

		// },
		name: 'fillYourInfo',
		data(){
			
			return {
				options: {
					startDate: '',
					endDate: '',
					days: 0,
					devicesNum: 0,
					incrementalPrice:'', //超出每天加价1美元
					startingPrice:0, //起始价格5美元
					totalPrice:0,
					currency: 'USD',
					symbol: '$',
					
				},
				test:{
					test1:false,//firstName
					test2:false,//lastName
					test3:false,//email
					test4:false,//国家区号
					test5:false,//phone
				},
				//订单联系人
				oderFirstName: '',
				oderFirstNameErr: false,
				oderlastName: '',
				oderlastNameErr: false,
				emailAddress: '',
				emailAddressErr: false,
				phone: '',
				phoneErr: false,
				mobileCode: '',
				codeErr: '',

				//出游联系人
				// TravellerFirstName: '',
				// TravellerFirstNameErr: false,
				// TravellerlastName: '',
				// TravellerlastNameErr: false,
				// TravelleremailAddress: '',
				// TravelleremailAddressErr: false,
				// Travellerphone: '',
				// TravellerphoneErr: false,

				TravellerCodeErr: false,
				mobileTravellCode: "", //选中国家区号
				TravellerCode: '', //区号
				showTravellCode: false,

				comments: '', //提交意见咨询

				isShowAlertTitle: false, //弹框返回状态
				alertMessage: "", //弹框内容
				alertTitle: "", //弹框标题
				logIn: '', //是否登陆
				isShowAlert: false, //错误弹框
				check: 0, //checked
				addOder: false,

				//汇率换算
				nowExchange: {}, //{'rate':1,'currency':'USD','symbol':'$'}
				exchange: [],
				//国家
				countryCode: countryCode.phone_countries,
				codeList: [], //联系人国家选择列表
				travelCodeList: [], //游玩人国家选择列表
				//显示code列表
				showCode: false,
				code: '', //区号
				// checkedAll: false, //选择优惠券
				// couponCode: '', //优惠券
				// hasCode: 100, //0 查到优惠券显示提示   1 没有查到优惠券提示  100默认没有提示
				// couponRate: '', //优惠率
				// orderHasCouponRate: false, //下单 判断是否含有优惠券
				// couponType: '', //优惠券类型
				// discount:0,//优惠券金额或折扣比例
				// standard: 0, //切换优惠价格的基准价格
				total:0,
				timeout:false,
				clickCountryCode:false,
				country:'',
				currency:{code: "USD", symbol: "$"},
				showPPDialog:false,

				//手机送达方式
				pandaPhoneErr: false,
				hotelErr:false,
				pickUpDateErr:false,
				ppType:'',
				arrivalDate:'',
				flightNumber:'',
				hotel:'',
				pickUpDate:'',
				showPhoneTip:false
			};
		},
		head() {
			let title = 'Fill in your Booking details informaiton ';
			let description = 'Fill out your info so we can confirm your booking!'
			let keywords =''
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
				],
				script: [
					{
						src: 'https://www.google-analytics.com/analytics.js',
						type: 'text/javascript'
					}
				]
			};
		},
		components: {
			HeaderCommon,
			FooterCommon,
			AlertGoBack,
			Alert,
			radioGroup,
			radio

		},
		methods: {
			
			//价格换算
			 changeCurrency(e) {
				var self = this; 
				var value = e.target.value,
				options=self.options;
				options.currency=value
				var exchange = this.exchange;
				
				
				self.axios.get("https://api.localpanda.com/api/product/phone/price?currency="+options.currency+"&days="+options.days+"&deviceNum="+options.devicesNum).then(function(res) {

					for(var i = 0; i < exchange.length; i++) {
						var thisEx = exchange[i];
						if(thisEx.code == value) {
							self.nowExchange = thisEx;
						}
					}
					
					self.options.incrementalPrice = res.data.incrementalPrice;
					self.options.startingPrice = res.data.startingPrice;
					self.options.totalPrice = res.data.totalPrice;

					Cookie.set('currency',JSON.stringify({
						code: self.nowExchange.code,
						symbol: self.nowExchange.symbol,
					}),{path:'/','expires':30})
				}, function(res) {});

			 
			},
			//退款时间计算
			delmulDay(dtstr, n) {
				var dt = new Date(dtstr.replace(/\-/g,'/'));
				dt.setDate(dt.getDate()-n);
				return dt.getFullYear() + "-" +parseInt(dt.getMonth()+1) + "-" + dt.getDate();
			},
			//国际时间转成美国时间
			formatDate:formatDate,

			getIsShowAlertFn(val) {
				this.isShowAlertTitle = val;
			},

			goBackFn() {
				let $this = this
				if(window.history && window.history.pushState) {
					window.addEventListener('popstate', function() {
						var hashLocation = location.hash;
						var hashSplit = hashLocation.split("#!/");
						var hashName = hashSplit[1];
						if(hashName !== '') {
							var hash = window.location.hash;
							if(hash === '') {
								$this.isShowAlertTitle = true
								$this.alertMessage = "If you leave the page, the information will not be saved. Are you sure to leave?";
							}

						}
					})
					window.history.pushState('popstate', null, '#');

				}
			},
			gabulr(id) {
				if(id == 0) {
					if(this.oderFirstName) {
						ga(gaSend, {
							hitType: 'event',
							eventCategory: 'activity_booking',
							eventAction: 'input',
							eventLabel: 'first_name',
						});
						ga(gaSend, {
							hitType: 'event',
							eventCategory: 'activity_booking',
							eventAction: 'input',
							eventLabel: 'booking_input',
						});
					}

				} else if(id == 1) {
					if(this.oderlastName) {
						ga(gaSend, {
							hitType: 'event',
							eventCategory: 'activity_booking',
							eventAction: 'input',
							eventLabel: 'last_name',
						});
						ga(gaSend, {
							hitType: 'event',
							eventCategory: 'activity_booking',
							eventAction: 'input',
							eventLabel: 'booking_input',
						});
					}

				} else if(id == 2) {
					if(this.emailAddress) {
						ga(gaSend, {
							hitType: 'event',
							eventCategory: 'activity_booking',
							eventAction: 'input',
							eventLabel: 'email_address',
						});
						ga(gaSend, {
							hitType: 'event',
							eventCategory: 'activity_booking',
							eventAction: 'input',
							eventLabel: 'booking_input',
						});
					}

				} else if(id == 3) {
					if(this.mobileCode) {

					}
				} else if(id == 4) {
					if(this.phone) {
						ga(gaSend, {
							hitType: 'event',
							eventCategory: 'activity_booking',
							eventAction: 'input',
							eventLabel: 'phone_number',
						});
						ga(gaSend, {
							hitType: 'event',
							eventCategory: 'activity_booking',
							eventAction: 'input',
							eventLabel: 'booking_input',
						});
					}
				} else {
					if(this.comments) {
						ga(gaSend, {
							hitType: 'event',
							eventCategory: 'activity_booking',
							eventAction: 'input',
							eventLabel: 'comment',
						});
						ga(gaSend, {
							hitType: 'event',
							eventCategory: 'activity_booking',
							eventAction: 'input',
							eventLabel: 'booking_input',
						});
					}

				}

			},
			changeCode(){
				this.clickCountryCode=false
			},
			selectCode(country, code, index) {
				this.clickCountryCode=true
				ga(gaSend, {
					hitType: 'event',
					eventCategory: 'activity_booking',
					eventAction: 'select',
					eventLabel: 'country_code_select',
				});
				if(index == 0) {
					this.country=country
					this.mobileCode = country + "(+" + code + ")"
					this.code = "(+" + code + ")"
					this.showCode = false
				} else {
					this.mobileTravellCode = country + "(+" + code + ")"
					this.TravellerCode = "(+" + code + ")"
					this.showTravellCode = false
				}

			},
			fousOderfisrtname() {
				this.oderFirstNameErr = false
			},
			fousoderlastName() {
				this.oderlastNameErr = false
			},
			fousEmal() {
				this.emailAddressErr = false
			},
			fousPhone() {
				this.phoneErr = false
			},
			fousFirst() {
				this.TravellerFirstNameErr = false

			},
			fousLastName(i) {
				this.TravellerlastNameErr = false
			},
			fousidcard(i) {
				this.TravelleremailAddressErr = false
			},
			fousphonenumb(i) {
				this.TravellerphoneErr = false
			},
			focusCode(index) {
				if(index == 0) {
					this.codeErr = false
					this.showCode = true

				} else {
					this.showTravellCode = true
					this.TravellerCodeErr = false

				}

			},
			returnFloat(value) {
				if(value) {
					var bit = bit || 2;
					var numberArr = (''+value).split('.');
					if(numberArr.length>1 && numberArr[1].length>bit){
						var zeroStr = '';
						for(var i=0;i<bit;i++){
							zeroStr+='0';
						}
						//解决浮点数bug
						if(numberArr[1][bit] && numberArr[1][bit+1] && numberArr[1][bit+2]){
							return numberArr[0]+'.'+numberArr[1].substring(0,bit);
						}
						
						return (value+('0.'+zeroStr+'5')*1).toFixed(bit);
					}
					return (value*1).toFixed(bit);
				}else{
					return 0;
				}
			},
			gaFail() {
				ga(gaSend, {
					hitType: 'event',
					eventCategory: 'activity_booking',
					eventAction: 'submit',
					eventLabel: 'activity_order_fail',
				});
			},
			//判断是否使用优惠券下单
			placeOrder() {
				let that=this
				let next = false
				if(that.oderFirstName == "" || regExp.isNub(that.oderFirstName) || regExp.isCode(that.oderFirstName)) {
					next = false
					that.errorFn("firstName")
					that.oderFirstNameErr = true
				} else if(that.oderlastName == "" || regExp.isNub(that.oderlastName) || regExp.isCode(that.oderlastName)) {
					next = false
					that.errorFn("lastName")
					that.oderlastNameErr = true
					
				} else if(!regExp.isEmail(that.emailAddress)) {
					next = false
					that.errorFn("email")
					that.emailAddressErr = true
					
				} else if(!that.mobileCode.replace(/(^\s+)|(\s+$)/g, "")||!this.clickCountryCode) {
					next = false
					that.errorFn("code")
					that.codeErr = true
					that.showCode=true
				
				} else if(that.phone == "" || !regExp.isMobil(that.phone)) {
					next = false
					that.errorFn("mobilePhone")
					that.phoneErr = true
					
				}else if(!that.ppType) {
					next = false;
					that.pandaPhoneErr = true;
				}else if(that.ppType==3 && !that.hotel){
					next = false;
					that.hotelErr = true;
				}else if(that.ppType==3 && !that.pickUpDate){
					next = false;
					that.pickUpDateErr = true;
				} else {
					next=true
					that.showCode=false
					that.next()
					if(next == false) {
						that.gaFail()
					}
				}
			},
			setPrice(){
				
			},
			errorFn(dom){
				let errDom=document.getElementById(dom)
				let htmlBody = document.documentElement;
				htmlBody.scrollTop=errDom.offsetTop
			},
			pandaPhoneInfo(orderId){
				var putData = {
					"pickUpDate": this.pickUpDate,
					"flightNumber": this.flightNumber,
					"hotel": this.hotel,
					"orderId": orderId
				};
				if(this.ppType==2){
					delete putData.hotel;
				}else if(this.ppType==3){
					delete putData.flightNumber;
				}
				this.axios.put('https://api.localpanda.com/api/order/phone/info', JSON.stringify(putData), {
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(function(response) {
					if(response.data.succeed) {
						var loginState = (self.logIn ? self.logIn : 0);
						var href = "/product/phone/payment/?orderId=" + orderId + '&login=' + loginState;
						window.location.href = href;
					};

				}, function(response) {

				});
			},
			//下单
			next() {
				const self = this
				var obj; 
				ga(gaSend, {
					hitType: 'event',
					eventCategory: 'activity_booking',
					eventAction: 'submit',
					eventLabel: 'activity_order_succ',
				});


				


				obj = {
					"userId": localStorage.getItem("userid") ? localStorage.getItem("userid") : null,
					"businessType": "PHONE",
					"contactInfo": {
						"firstName": self.oderFirstName,
						"lastName": self.oderlastName,
						"phoneNumber": self.code + self.phone,
						"emailAddress": self.emailAddress,
						'nationality': self.country
					},
					"comments": self.comments ? self.comments : null,
					"startDate": self.options.startDate,
					"endDate": self.options.endDate,
					"deviceNum": self.options.devicesNum,
					"currency": self.options.currency,
					"phoneHirePrice": self.options.totalPrice,
					"amount": self.options.totalPrice,
					"utcOffset": new Date().getTimezoneOffset() / 60 * -1,
					"deviceType": "PC",
				};

				ga('ecommerce:addItem', {
					'name': 'Panda Phone Service',    // Product name. Required.
					'category': 'PandaPhone',         // Category or variation.
					'price': obj.amount,                 // Unit price.
					'quantity': 1,                  // Quantity.
					'currency': obj.currency
				});
				ga('ecommerce:send');
				
				if(self.addOder == false) {
					self.addOder = true
					self.axios.put( "https://api.localpanda.com/api/order/phone", JSON.stringify(obj), {
						headers: {
							'Content-Type': 'application/json;'
						}
					}).then(function(response) {
						
						self.pandaPhoneInfo(response.data.response);
					}, function(response) {})
				}
			}

	},
		created: function() {

		},
		mounted: function() {
			var self=this
			var options = localStorage.getItem("phoneOrderInfo") ? JSON.parse(localStorage.getItem("phoneOrderInfo")) : ''

			if(options){
				for(var key in options){
					if(key!='childDiscount'){
						this.options[key]=options[key]
					}
					
				}
			}
			
			console.log(this.options);
			
			this.goBackFn();
			
			var self = this;

			//设置默认币种
			self.nowExchange = {
				symbol: self.options.symbol,
				code: self.options.code
			};

			//加载币种
			this.exchange = this.currencyData;
			
			self.codeList = self.countryCode
			self.travelCodeList = self.countryCode
			document.getElementsByTagName('body')[0].addEventListener("click", () => {
				self.showCode = false
				self.showTravellCode = false
			})


			//电商ga
			ga('require', 'ecommerce');
			

		},
		watch: {
			oderFirstName(val){
				if(val){
					this.test.test1=true
				}else{
					this.test.test1=false
				}
			},
			oderlastName(val){
				if(val){
					this.test.test2=true
				}else{
					this.test.test2=false
				}
			},
			emailAddress(val){
				if(val){
					this.test.test3=true
				}else{
					this.test.test3=false
				}
			},
			phone(val){
				if(val){
					this.test.test5=true
				}else{
					this.test.test5=false
				}
			},
			mobileCode: function(val, oldVal) {
				let self = this
				val=val.replace(/(^\s+)|(\s+$)/g, "")
				
				if(val) {
					this.test.test4=true
					if(val.length == 1) {
						ga(gaSend, {
							hitType: 'event',
							eventCategory: 'activity_booking',
							eventAction: 'input',
							eventLabel: 'country_code_input',
						});
					}
					self.codeList = [];
					var newVal = val.replace('(','\\(').replace(')','\\)').replace('+','\\+').replace('-','\\-');
					var thisKey = [],
						otherKey = [];
					var countryCode = this.countryCode;
					for(var i=0;i<this.countryCode.length;i++){
						var thisData = this.countryCode[i];
						var regStr = thisData.country_name;
						if(/(^-?[0-9]\d*$)/.test(newVal)){
							regStr = thisData.prefix;
						}
						if((new RegExp(newVal,'i')).test(regStr)){
							thisKey.push(thisData);
						}else{
							otherKey.push(thisData);
						}
					}
					thisKey.sort(function(a,b){
						if(/(^-?[0-9]\d*$)/.test(newVal)){
							return a.prefix.indexOf(newVal)-b.prefix.indexOf(newVal);
						}
						return a.country_name.toLowerCase().indexOf(newVal)-b.country_name.toLowerCase().indexOf(newVal);
					})
					self.codeList = thisKey;

				} else {
					this.test.test4=false
					self.codeList = self.countryCode

				}
			},
			showCode: function(val, oldVal) {
				if(val) {
					ga(gaSend, {
						hitType: 'event',
						eventCategory: 'activity_booking',
						eventAction: 'click',
						eventLabel: 'country_code_open',
					});
				}

			},
			thisEx:function(){

			},

		}
	}
</script>

<style lang="scss" scoped>
	//@import '~/assets/scss/base/_setting.scss';
	.visitors{
		margin-top:80px;
		h3{
			font-size:24px;
			font-weight:bold;
		}
		ul{
			margin-top:30px;
			li{
				height:285px;
				border-radius: 5px;
				margin-left:20px;
				float: left;
				width:376px;
				padding:30px;
				padding-bottom:20px;
				border: solid 1px #ebebeb;
				&:first-child{
					margin-left:0
				}
				.appraise{
					font-size:16px;
				}
				.travellers{
					margin-top:36px;
					.travellersPhoto{
						float:left;
						width:80px;
						height:80px;
						border-radius: 50%;
						img{
							width:100%;
							height:100%;
							border-radius: 50%;
						}
					}
					.travellersMessage{
						float:left;
						margin-left:19px;
						p{
							margin-top:10px;
							font-size:14px;
							color: #878e95;
							b{
								font-size:18px;
								color: #353a3f;
							}
						}
					}
				}
				
			}
		}
	}
	/** 服务 **/
	.serve{
		padding:30px;
		margin-top: 20px;
		background:#faf9f8;
		text-align:center;
		h5{
			
			font-size:18px;
			font-weight:bold;
		}
		a{
			display: block;
			height: 36px;
			background-color: #ffffff;
			border-radius: 18px;
			border: solid 1px #dde0e0;
			
			line-height:36px;
			margin-top:15px;
			font-size:16px;
		}
		p{
			margin-top:20px;
			
			font-size:16px;
			span{
				color:#fe483e;
			}
		}
	
	}
	/** 下单 优惠券不存在提示**/
	
	.dialog {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.6);
		.dialogContent {
			position: absolute;
			width: 400px;
			height: 280px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background: #fff;
			padding: 50px 10px 30px;
			p {
				font-size: 18px;
				font-weight: bold;
				text-align: center;
				margin-top: 30px;
			}
		}
		.btn {
			margin: 40px auto 0;
			text-align: center;
			button {
				width: 150px;
				height: 40px;
				&:first-child {
					margin-right: 20px;
				}
				color:#fff;
				font-weight:bold;
				font-size: 14px;
				background-image: linear-gradient(-90deg, #009efd 0%, #1bbc9d 100%);
				border-radius: 20px;
				cursor: pointer;
			}
		}
	}
	
	.code-box {
		position: relative;
	}
	
	.countryCode {
		position: absolute;
		top: 37px;
		left: 0;
		width: calc(100% - 10px);
		box-shadow: 0px 2px 10px 0px rgba(53, 58, 63, 0.2);
		background: #fff;
		z-index: 2;
		ul {
			max-height: 240px;
			overflow: auto;
			li {
				padding: 0 10px 0 30px;
				height: 40px;
				line-height: 40px;
				font-size: 14px;
				cursor: pointer;
				&:hover {
					color: #fff;
					height: 40px;
					background-image: linear-gradient(-90deg, #009efd 0%, #1bbc9d 100%);
				}
			}
		}
	}
	
	.width100 {
		width: 100%!important;
	}
	
	.emalAddress {
		margin-top: 15px;
		
		p {
			font-size: 18px;
			margin-bottom: 6px;
			font-weight: bold;
		}
		input {
			width: calc(100% - 30px);
			height: 36px;
			font-size: 18px;
			border: 1px solid #dde0e0;
			border-radius: 3px;
			&:hover {
				border-color: #1bbc9d;
			}
		}
	}
	
	.fillYourInfo {
		.fill {
			width: 1170px;
			margin: 0 auto;
			padding: 40px 0 80px;
			position: relative;
			.page_title{
				font-size:24px;
				color: #1bbc9d;
				font-weight:bold;
			}
			.safeguard{
				margin-top:24px;
				span{
					display:inline-block;
					margin-right:18px;
					color: #52b589;
					font-size:16px;
					i{
						font-size:12px;
					}
					&:last-child{
						margin-right:0;
					}

				}
			}
			.oderdetial {
				position: absolute;
				top: 135px;
				right: 0;
				.payfordetail {
					box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
					background: #fff;
					padding: 15px 30px;
					width: 376px;
					.head {
						
						h3 {
								font-size: 18px;
								font-weight: bold;
							}
						.serviceform {
							margin-top: 15px;
							padding: 15px 0;
							border-top: 1px solid #dde0e0;
							border-bottom: 1px solid #dde0e0;
							p {
								line-height: 24px;
								font-size: 18px
							}
						}
					}
					.date {
						padding: 15px 0;
						border-bottom: 1px solid #dde0e0;
						p {
							font-size: 18px;
							// span{ font-size: 14px;}
							span{ display: block; padding:8px 0 0 85px; font-size: 14px;}
						}
					}
					.pic {
						padding: 15px 0;
						border-bottom: 1px solid #dde0e0;
						.adult {
							.formula {
								float: left;
								font-size: 18px;
							}
							.adultPic {
								float: right;
								font-size: 18px;
							}
						}
						.child {
							margin-top: 15px;
							font-size: 18px;
							span{
								float: left;
								width: 18px;
								text-align: center;
							}
						}
					}
					.total {
						padding-top: 15px;
						.totle-title {
							float: left;
							font-size: 18px;
						}
						.totalPic {
							float: right;
							font-size: 18px;
							font-weight: bold;
						}
					}
				}
				.picRate {
					color: #666;
					float: right;
					position: relative;
					margin: -4px 20px 0 0;
					span {
						font-size: 10px;
					}
					.iconfont {
						position: absolute;
						right: 0;
						top: 0;
						height: 30px;
						line-height: 30px;
						text-align: center;
						font-size: 18px;
					}
					.currency_type {
						border: none;
						padding-right: 20px;
						font-size: 16px;
						background: none;
						height: 30px;
						color: #666;
						option {
							color: #666;
						}
						position: relative;
						z-index: 2;
						-webkit-appearance: none;
						-moz-appearance: none;
						appearance: none;
					}
				}
				.bookbtn {
					margin-top: 10px;
					padding:15px 30px;
					background: #faf9f8;
					p {
						font-size: 18px;
						font-weight: bold;
					}
					.payfor {
						span {
							display: inline-block;
							width: 58px;
							height: 36px;
							margin-right: 10px;
						}
					}
				}
			}
			.fillPageLeft {
				width: 734px;
				.link {
					a {
						font-size: 16px;
						color: #dde0e0;
						cursor: auto;
						&:first-child {
							color: #353a3f;
						}
					}
					i {
						font-size: 10px;
						color: #dde0e0;
						margin: 0 20px;
					}
				}
				h3 {
					font-size: 36px;
					color: #353a3f;
					font-weight: bold;
					margin-top: 55px;
				}
				h5{
					
					span{
						font-size: 18px;
						vertical-align: baseline;
						display: inline-block;
						margin-right:5px;
					}
					font-size: 14px;
					
				}
				.orderContact {
					margin-top: 15px;
					
					b {
						color: red;
					}
					h4 {
						font-size: 18px;
						font-weight: bold;
					}
					.cont {
						width: calc(100% - 15px);
						margin-top: 15px;
						display: flex;
						.cont-item {
							
							flex: 1;
							p {
								font-size: 18px;
								margin-bottom: 6px;
								font-weight: bold;
							}
							input {
								width: 345px;
								height: 36px;
								font-size: 18px;
								border: 1px solid;
								border-radius: 3px;
								border-color:#858585 #c2c2c2 #c2c2c2;
								box-shadow:inset 0 1px 0 rgba(0,0,0,.1), inset 0 1px 1px rgba(0,0,0,.05);
								&:hover {
									border-color: #1bbc9d;
								}
							}
						}
					}
					.comments {
						margin-top: 15px;
						h4 {
							font-size: 18px;
							font-weight: bold;
							margin-bottom: 6px;
						}
						textarea {
							width: calc(100% - 30px);
							color: #353a3f;
							border-radius: 3px;
							border: solid 1px #dde0e0;
							resize: none;
							padding:6px 10px;
							font-size: 18px;
						}
					}
					span {
						display: inline-block;
						font-size: 16px;
						color: #878e95;
						margin-top: 5px;
					}
				}
				.check {
					margin-top: 40px;
					position: relative;
					span {
						font-size: 16px;
						color: #878e95;
						margin-left: 40px;
					}
					.checkbox {
						position: absolute;
						left: 0;
						width: 26px;
						height: 26px;
						text-align: center;
						border: 1px solid #dde0e0;
						border-radius: 50%;
						top: 50%;
						margin-top: -16px;
						cursor: pointer;
						line-height: 28px;
						color: #fff;
						font-size: 12px;
					}
					.backgrond {
						background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
					}
				}
				.addOrderContact {
					margin-top: 40px;
					padding-bottom: 34px;
					border-bottom: 1px solid #dde0e0;
					p {
						font-size: 16px;
						margin-top: 15px;
					}
					ul {
						li {
							position: relative;
							/*border-bottom: 1px solid #dde0e0;*/
							&:last-child {
								border: none;
							}
							b {
								color: red;
							}
							h4 {
								font-size: 18px;
								color: #353a3f;
								margin-top: 40px;
								font-weight: bold;
							}
							.name {
								display: flex;
								.firstName,
								.lastname {
									flex: 1;
									p {
										font-size: 18px;
										font-weight: bold;
										margin-bottom: 10px;
									}
									input {
										width: 345px;
										height: 44px;
										font-size: 18px;
										border-radius: 3px;
										border: solid 1px #dde0e0;
										&:hover {
											border-color: #1bbc9d;
										}
									}
								}
							}
							.nuber {
								margin-top: 10px;
								display: flex;
								.paddnumber,
								.Mobilephone {
									flex: 1;
									p {
										font-size: 18px;
										font-weight: bold;
										margin-bottom: 10px;
									}
									input {
										width: 345px;
										height: 44px;
										font-size: 18px;
										border-radius: 3px;
										border: solid 1px #dde0e0;
										&:hover {
											border-color: #1bbc9d;
										}
									}
								}
							}
						}
					}
				}
				.Comments {
					margin-top: 30px;
					.information {
						span{
							float:left;
						}
						h5{
							padding-left:25px;
							color:#878e95;
						}
						p {
							padding-left:25px;
							font-size: 18px;
							a {
								color: #1bbc9d;
							}
						}
					}
					.nextBtn {
						margin-top: 20px;
						.next {
							width: 90px;
							height: 40px;
							font-weight: bold;
							text-align: center;
							line-height: 40px;
							background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
							color: #fff;
							border-radius: 20px;
							font-size: 16px;
							cursor: pointer;
						}
					}
				}
				.coupon {
					background: #faf9f8;
					margin-top: 15px;
					font-size: 14px;
					box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
					padding: 10px;
					width:704px;
					a {
						color: #1bbc9d;
					}
					.couponInput {
						margin-top: 10px;
						padding-left: 25px;
						input {
							width: 60%;
							height: 42px;
							border-radius: 5px;
							border: solid 1px #dde0e0;
						}
						button {
							display: inline-block;
							height: 42px;
							line-height: 42px;
							width: 20%;
							margin-left: 5%;
							border-radius: 20px;
							color: #fff;
							font-weight: bold;
							background-image: linear-gradient(-90deg, #009efd 0%, #1bbc9d 100%);
						}
						p {
							font-size: 14px;
							margin-top: 10px;
							font-weight: bold;
							i {
								font-size: 12px;
								color: #1bbc9d;
							}
						}
					}
				}
				.panda_phone{
					background: #faf9f8;
					margin-top: 15px;
					font-size: 14px;
					box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
					padding: 10px;
					width:704px;
					a{
						color: #1bbc9d;
						cursor: pointer;
						vertical-align: top;
						line-height: 22px;
						margin-left: 30px;
						&:hover{
							text-decoration: underline;
						}
					}
				}
			}

			.pandaPhone_delivery{
				margin-top: 25px;
				h4{
					font-size: 18px;
					font-weight: bold;
				}
				.panda_phone_check{
					margin-top: 10px;
					font-size: 16px;
					.phone_check_list{
						margin-top: 10px;
						padding: 10px 0;
						font-size: 16px;
						input{
							padding: 0 10px;
							height: 32px;
							line-height: 32px;
							margin:0 50px 0 10px;
							border: 1px solid #ccc;
							font-size:16px;
						}
						.w500{
							width: 500px;
						}
					}
					.pickup_date{
						padding: 0 10px;
						margin-left: 10px;
						height: 32px;
						line-height: 32px;
						width: 500px;
					}
					.panda_phone_no{
						font-size: 16px;
						margin-top: 20px;
						p{
							// color: #353a3f;
							margin-top: 10px;
							span{ color: #878e95; margin-right: 5px;}
						}
					}
				}
			}


		}
		.empty {
			padding: 30px 50px;
			text-align: center;
			font-size: 16px;
		}
		.err {
			border-color: red!important;
			color: red!important;
		}

		.pp_dialog_bg{
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 99;
			background-color: rgba(0, 0, 0, 0.6);
		}
		.pp_dialog{
			position: fixed;
			left: 50%;
			top: 50%;
			margin-left: -380px;
			// margin-top: 19px;
			width: 760px;
			padding: 45px 10px 40px 40px;
			background-color: #fff;
			box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
			transform: translateY(-50%);
			border-radius: 5px;
			z-index: 99;
			h3{
				font-size: 24px;
				font-weight: bold;
			}
			.pp_congtent{
				padding-right: 30px;
				max-height: calc(100vh - 210px);
				overflow-y: auto;
				&::-webkit-scrollbar { width: 8px;  }
				&::-webkit-scrollbar-track { background-color: #eeeeee;  border-radius: 4px; }
				&::-webkit-scrollbar-thumb { border-radius: 4px;  background-color: #d3d3d3; }
			}
			.detail_txt_list{
				margin-top: 10px;
				.dian{
					background-image: -webkit-gradient(linear, right top, left top, from(#009efd), to(#1bbc9d));
					background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
				}
			}
			p{
				margin-top: 6px;
				line-height: 24px;
				font-size: 16px;
			}
			.pp_close{
				position: absolute;
				top: 10px;
				right: 10px;
				font-size: 20px;
				padding: 10px;
				cursor: pointer;
				&:hover{
					color: #000;
				}
			}
			.pp_checkbox{
				font-size:16px;
				line-height: 16px;
				.checkbox_box{
					width: 16px;
					height: 16px;
					.iconfont{
						font-size:15px;
					}
					
				}
				.checkbox_content{
					padding: 0 0 0 6px;
				}
				dfn{
					color: #fe483e;
					font-style: normal;
				}
			}
			.add_panda{
				text-align: center;
				.btn{
					display: inline-block;
					margin-top: 10px;
					padding: 0 30px;
					height: 36px;
					line-height: 36px;
					border-radius: 18px;
					cursor: pointer;
					color: #fff;
					font-size: 14px;
					background-image: -webkit-gradient(linear, right top, left top, from(#009efd), to(#1bbc9d));
					background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
				}
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
		
		
	}
</style>

<style lang="scss">
	//@import '~/assets/scss/_main.scss';
	//@import '~/assets/font/iconfont.css';
	.fillYourInfo{
		background:#fff;
		#header{
			box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
		}
		input::-webkit-input-placeholder,textarea::-webkit-input-placeholder { /* WebKit, Blink, Edge */
	    	color:   #878e95;
	    	font-size:14px ;
		}
		input:-moz-placeholder,textarea:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
		   color:    #878e95;
		   font-size:14px ;
		}
		input::-moz-placeholder,textarea::-moz-placeholder { /* Mozilla Firefox 19+ */
		   color:    #878e95;
		   font-size:14px ;
		}
		input:-ms-input-placeholder,textarea:-ms-input-placeholder { /* Internet Explorer 10-11 */
		   color:   #878e95;
		   font-size:14px ;
		}
		body {
			min-width: 1200px;
		}
		
		.checkbox_label .checkbox_content {
			white-space: normal!important;
		}	

		// #header .heder-cont{
		// 	.init,.headleft .search{ display: none;}
		// }
		#header {
			.init{
				li{
					&:nth-child(0){
						display: none;
					}
					&:nth-child(1){
						display: none;
					}
					&:nth-child(3){
						display: none;
					}
					
				}
			}
			.login{
				.selectCurrency{
					display: none;
				}
			}
			
			.search{ 
				display: none!important;
			}
			
		}
		.footerInfo{
			li:nth-child(5){
				display: none!important;
			}
		}
	}

</style>