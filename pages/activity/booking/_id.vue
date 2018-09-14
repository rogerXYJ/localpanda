<template>
	<div class="fillYourInfo">
		<HeaderCommon :logIn="logIn" @getExchange="setExchange"></HeaderCommon>
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
						<textarea rows="3" v-if="opctions.pickup==1" @blur="gabulr(5)" placeholder="You can fill out your travel preferences here for us to personalize your trip" v-model="comments"></textarea>
						<textarea rows="3" v-else v-model="comments" @blur="gabulr(5)" placeholder="You can fill out your travel preferences here for us to personalize your trip"></textarea>
					</div>
				</div>
				<div class="coupon">
					<checkbox v-model="checkedAll" :change="changeFn">
						Have a Gift Card or Coupon Code? Proceed to checkout to redeem it.
						<a>Enter Coupon Code <i class="iconfont" v-if="checkedAll">&#xe667;</i>
							<i class="iconfont" v-else>&#xe666;</i>
						</a>
					</checkbox>
					<div class="couponInput" v-if="checkedAll">
						<input placeholder="Enter a gift card or promotional code" @input="couponCodeChange" id="coupon" @keyup.enter="validateCode" v-model="couponCode" />
						<button @click="validateCode">Enter</button>
						<p v-if="hasCode==0"><i class="iconfont">&#xe654;</i>- {{couponType=="RATE"?"":nowExchange.symbol}}{{couponType=="RATE"?couponRate*100:opctions.couponDiscount}}{{couponType=="RATE"?"%":""}} {{couponType=="RATE"?"off":""}} (Coupon discount)</p>
						<p v-if="hasCode==1" style="color: red;">The Coupon code you entered is invalid. Please try again.</p>
					</div>
				</div>
				<div class="Comments">
					<div class="information">
						<!--<p class="refundPolicy" style="font-size: 14px;">
							You can reschedule or cancel your trip at zero cost before Aug 31st, 2018.
							You can get a 100% refund up to {{opctions.refundTimeLimit}} hours before your trip.
						</p>-->
						<span class="iconfont" v-if="opctions.fullRefund&&timeout||!logIn">&#xe617;</span>
						<p class="refundPolicy" style="font-size: 14px;" v-if="opctions.fullRefund&&timeout">You can reschedule or cancel your trip at zero cost before {{formatDate(delmulDay(opctions.startDate,opctions.refundTimeLimit))}}.</p>
						<h5 v-if="!logIn">As a guest user, you can access your order details through your name and email</h5>
						
						<!--<p class="text" style="font-size: 14px;margin-top: 20px;" v-if="logIn!=1">You ordered as a guest. To view your order details, you can click "My Bookings" on the top bar then type in the reservee's email address and name you entered before to access that information.</p>-->
						
						<div class="nextBtn">
							<div class="next" @click.stop="placeOrder">NEXT</div>
						</div>
					</div>
				</div>
			</div>
			<div class="oderdetial">
				<div class="payfordetail">
					<div class="head clearfix">
						<div class="serviceform">
							<h3>{{opctions.title}}</h3>
							<p v-if="opctions.adultNum==1&&opctions.childrenNum==0">1 Person</p>
							<p v-else>{{opctions.peopleNum}} People</p>
						</div>

					</div>
					<div class="date">
						<p>{{opctions.startDate}}</p>
						<p v-if="opctions.startTime">{{opctions.startTime}}</p>
					</div>
					<div class="pic">
						<div class="adult clearfix">
							<div class="formula" v-if="opctions.childrenNum==0 && opctions.adultNum==1">{{nowExchange.symbol}}{{opctions.adultsPic}} x 1 Person</div>
							<div class="formula" v-else>{{nowExchange.symbol}} {{opctions.averagePrice}} x {{opctions.peopleNum}} People </div>
							<div class="adultPic">{{nowExchange.symbol}} {{opctions.adultsPic}}</div>
						</div>
						<div class="child" v-if="opctions.childrenNum>0&&opctions.childDiscount">
							<b>- {{nowExchange.symbol}}{{opctions.childDiscount}}</b>(Children discount)
						</div>
						<div class="child" v-if="couponType">
							<div>
								<b>- {{nowExchange.symbol}}{{opctions.couponDiscount}}</b>(Coupon discount)
							</div>
						</div>
					</div>
					<div class="total clearfix">
						<div class="totle-title">Total ({{opctions.currency}})</div>
						<div class="totalPic">{{nowExchange.symbol}}{{opctions.amount}}</div>
						<div class="picRate">
							<select class="currency_type" @change="changeCurrency" v-model="opctions.currency">
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
				<h3>What travellers are saying</h3>
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
</p>
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
		<div class="dialog" v-if="orderHasCouponRate">
			<div class="dialogContent">
				<p>The promotional code you entered is invalid. You can continue to pay at the original price or enter your code again.</p>
				<div class="btn">
					<button @click="continueFn">Continue</button>
					<button @click="enterAgain">Enter Again</button>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	if(process.browser) {
		//require('~/assets/js/pages/talk.js')
		//require('~/assets/js/pages/ga.js')
	}
	import Vue from 'vue'
	import { regExp ,formatDate} from '~/assets/js/plugin/utils'
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	import AlertGoBack from '~/components/Prompt/AlertGoBack';
	import Alert from '~/components/Prompt/Alert'
	import countryCode from '~/assets/js/countryCode.js'
	import { checkboxGroup, checkbox } from "~/plugins/panda/checkbox/";

	export default {
		async asyncData({
			route,
			store,
			error,
			apiBasePath,
			redirect,
			req
		},callback) {
			let id =route.params.id;
			console.log(id)
			let data={
					opctions: {
					averagePrice: 0,
					adultsPic: 10,
					childrenNum: 0,
					adultNum: 0,
					amount: 0,
					childDiscountP: 0,
					childDiscountPP: 0, //默认儿童优惠价
					couponDiscount: 0,
					currency: '',
					symbol: '',
					couponDiscount: 0 //优惠价格

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
				TravellerFirstName: '',
				TravellerFirstNameErr: false,
				TravellerlastName: '',
				TravellerlastNameErr: false,
				TravelleremailAddress: '',
				TravelleremailAddressErr: false,
				Travellerphone: '',
				TravellerphoneErr: false,

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
				checkedAll: false, //选择优惠券
				couponCode: '', //优惠券
				hasCode: 100, //0 查到优惠券显示提示   1 没有查到优惠券提示  100默认没有提示
				couponRate: '', //优惠率
				orderHasCouponRate: false, //下单 判断是否含有优惠券
				couponType: '', //优惠券类型
				standard: 0, //切换优惠价格的基准价格
				total:0,
				timeout:false,
				clickCountryCode:false,
				country:'',
				currency:{code: "USD", symbol: "$"}
			};

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
			if(userCookie.currency){
				data.currency = JSON.parse(decodeURIComponent(userCookie.currency));
				
			}
			
			try{
				var Promise1 = new Promise(function(resolve, reject){
					Vue.axios.get(apiBasePath + "product/activity/"+id+"/price?currency="+data.currency.code).then(function(res) {
						// var consoleTimeS2 = new Date().getTime();
						// 	console.log('价格接口花费时间：'+(consoleTimeS2-consoleTimeS)+' ms');
						resolve(res);
					}, function(res) {
						resolve(res);
					});
				});

			//价格明细
			var Promise2 = new Promise(function(resolve, reject){
				Vue.axios.get(apiBasePath + "product/activity/"+id+"/price/detail?currency="+data.currency.code).then(function(res) {
					// var consoleTimeS2 = new Date().getTime();
					// 	console.log('价格接口花费时间：'+(consoleTimeS2-consoleTimeS)+' ms');
					resolve(res);
				}, function(res) {
					resolve(res);
				});
			});
			Promise.all([Promise1,Promise2]).then(results=>{
				
				data.opctions.picInfo=results[0].data;
				
				data.opctions.picInfo.detail=results[1].data
				callback(null,data);

			})
		

		}catch(err) {
				console.log(err);
				return error({
					statusCode: 500,
					message: JSON.stringify(err)
				});
		}
		},
		name: 'fillYourInfo',
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
				]
			};
		},
		components: {
			HeaderCommon,
			FooterCommon,
			AlertGoBack,
			Alert,
			checkboxGroup,
			checkbox

		},
		methods: {
			//选择优惠券
			changeFn(e) {
				let self = this
				if(!e.target.checked) {
					self.hasCode = 100
					self.opctions.amount=this.returnFloat(this.opctions.adultsPic - this.opctions.childDiscount)
					self.couponRate = ''
					self.couponCode = '';
					self.couponType = ""
					console.log(self.opctions.childDiscount)
				}
			},
			//验证couponCode
			validateCode() {
				let self = this
				var opctions = self.opctions,
					details = opctions.details;
				var people = opctions.adultNum + opctions.childrenNum;
				var price = details[people - 1].price;
				if(self.couponCode){
					self.axios.get("https://api.localpanda.com/api/order/coupon/" + self.couponCode).then(res => {
						if(res.status == 200 && res.data) {
							self.hasCode = 0
							if(res.data.type) {
								self.couponType = res.data.type
								if(res.data.type == "RATE") {
									self.couponRate = res.data.discount
									self.opctions.couponDiscount =
										self.returnFloat(self.returnFloat(self.opctions.adultsPic - self.opctions.childDiscount) * self.couponRate)
									// console.log(self.opctions.adultsPic)
									// console.log(self.opctions.childDiscount)
								} else if(res.data.type == "FIXED") {
									self.standard = res.data.discount
									self.opctions.couponDiscount = self.standard
								}
								
								// for(var i=0;i<self.exchange.length;i++){
								// 	if(self.opctions.currency==self.exchange[i].code){
								// 		self.opctions.couponDiscount=self.returnFloat(self.opctions.couponDiscount*self.exchange[i].exchangeRate)
								// 		console.log(self.exchange[i].exchangeRate)
								// 		console.log(self.exchange[i].code)
								// 		console.log(self.opctions.currency)
								// 		break
								// 	}
								// }
								self.opctions.amount=self.returnFloat(self.opctions.adultsPic - self.opctions.childDiscount -self.opctions.couponDiscount)
								
							}
							
						} else {
							self.hasCode = 1

						}
					}, res => {})
				}
				
			},
			


			setExchange(val){
				this.exchange=val
			},
			//价格换算
			 changeCurrency(e) {
				var self = this; 
				var value = e.target.value,
				options=self.opctions;
				options.currency=value
				var exchange = this.exchange;
				for(var i = 0; i < exchange.length; i++) {
					var thisEx = exchange[i];
					if(thisEx.code == value) {
						this.nowExchange = thisEx;
						
					}
				}
				const p1 = new Promise(function (resolve, reject) {
						self.axios.get("https://api.localpanda.com/api/product/activity/"+options.activityId+"/price?currency="+value).then(function(res) {
							resolve(res)
						}, function(res) {
							
						});
					});

					const p2 = new Promise(function (resolve, reject) {
						self.axios.get("https://api.localpanda.com/api/product/activity/"+options.activityId+"/price/detail?currency="+value).then(function(res) {
							resolve(res)
						}, function(res) {
							
						});
					
					})
					Promise.all([p1,p2]).then(results=>{
							if(options.childDiscount){
								options.childDiscount=self.returnFloat(results[0].data.childDiscount)
							}
							options.details=results[1].data
							console.log(options.details)
							for(var i=0;i<results[1].data.length;i++){
								if(options.adultNum+options.childrenNum==results[1].data[i].capacity){
									options.adultsPic=self.returnFloat(results[1].data[i].price)
									options.averagePrice=self.returnFloat(results[1].data[i].perPersonPrice)
									options.amount=options.childrenNum > 0 && options.childDiscount ?
							self.returnFloat(self.returnFloat(results[1].data[i].price) - self.returnFloat(options.childrenNum * results[0].data.childDiscount)- (options.couponDiscount?options.couponDiscount:0)):
							self.returnFloat(results[1].data[i].price)
							
							}

							
						}	
							
							

					})
					Cookie.set('currency',JSON.stringify({
						code: this.nowExchange.code,
						symbol: this.nowExchange.symbol,
					}),{path:'/','expires':30})
			 
			 },
			//退款时间计算
			 delmulDay(dtstr, n) {
				var dt = new Date(dtstr.replace(/\-/g,'/'));
				console.log(dt)
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
						return (value+('0.'+zeroStr+'5')*1).toFixed(bit);
					}
					return value.toFixed(bit);
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
					console.log(that.showCode)
				
				} else if(that.phone == "" || !regExp.isMobil(that.phone)) {
					next = false
					that.errorFn("mobilePhone")
					that.phoneErr = true
					
				} else {
						next=true
						that.showCode=false
						 if(that.checkedAll) {
						 	if(that.couponType) {
						 		that.next()
						 	} else {
						 		that.orderHasCouponRate = true
						 	}
						 } else {
						 	that.next()
						 }
					if(next == false) {
						that.gaFail()
					}
				}
			},
			continueFn() {
				let self = this
				self.orderHasCouponRate = false
				self.next()
			},
			enterAgain() {
				let self = this
				self.orderHasCouponRate = false
				document.querySelector("#coupon").focus();
				self.hasCode = 100

			},
			couponCodeChange(){
				
				this.hasCode = 100
				this.opctions.amount=this.returnFloat(this.opctions.adultsPic - this.opctions.childDiscount)
				this.couponType = ""
			},
			errorFn(dom){
				let errDom=document.getElementById(dom)
				let htmlBody = document.documentElement;
				htmlBody.scrollTop=errDom.offsetTop
			},
			//下单
			next() {
				const that = this
				var obj; //that.addOder = true
				ga(gaSend, {
					hitType: 'event',
					eventCategory: 'activity_booking',
					eventAction: 'submit',
					eventLabel: 'activity_order_succ',
				});
				obj = {
					userId: localStorage.getItem("userid") ?
					localStorage.getItem("userid") : null,
					"activityId": that.opctions.activityId,
					"amount": that.opctions.amount,
					"currency": that.opctions.currency,
					"adultNum": that.opctions.adultNum,
					"childrenNum": that.opctions.childrenNum,
					"infantNum": 0,
					"startDate": that.opctions.startDate,
					"startTime": that.opctions.startTime,
					"averagePrice": that.opctions.averagePrice,
					"childDiscount": that.opctions.childDiscount,
					"comments": that.comments ? that.comments : null,
					"contactInfo": {
						"firstName": that.oderFirstName,
						"lastName": that.oderlastName,
						"phoneNumber": that.code + that.phone,
						"emailAddress": that.emailAddress,
						'nationality':that.country
					},
					"couponDiscount": that.couponType ? that.opctions.couponDiscount : null,
					"couponCode": that.couponType ? that.couponCode : null,
					"utcOffset": new Date().getTimezoneOffset() / 60 * -1,
					"deviceType": "PC",
					//"fullRefund":that.opctions.fullRefund,
					"finalRefundPeriod":that.opctions.fullRefund&&that.timeout?that.delmulDay(that.opctions.startDate,that.opctions.refundTimeLimit):null
				}
				console.log(obj)
				if(that.addOder == false) {
					that.addOder = true
					that.axios.put( "https://api.localpanda.com/api/order/activity", JSON.stringify(obj), {
						headers: {
							'Content-Type': 'application/json; charset=UTF-8'
						}
					}).then(function(response) {

						console.log(response)
						//var hostUrl = obj.currency=='CNY' ? 'https://www.localpanda.cn' : 'https://www.localpanda.com';
						var loginState = (that.logIn ? that.logIn : 0);
						window.location.href = "/activity/payment?objectId=" + response.data.response + '&login=' + loginState;

					}, function(response) {})
				}
			}

	},
		created: function() {

		},
		mounted: function() {
			var self=this
			var opctions = localStorage.getItem("orderInfo") ? JSON.parse(localStorage.getItem("orderInfo")) : ''

			if(opctions){
				for(var key in opctions){
					this.opctions[key]=opctions[key]
				}
			}
			// this.opctions.adultsPic=this.getBasisPrice()
			var details=this.opctions.picInfo.detail;
			var opctions=this.opctions.picInfo
		
			this.opctions.childDiscount=opctions.childDiscount?details.childDiscount:0
			for(var i = 0; i < details.length; i++) {
				if(this.opctions.adultNum+this.opctions.childrenNum==details[i].capacity){
					this.opctions.adultsPic=details[i].price
					this.opctions.averagePrice=details[i].perPersonPrice
					this.opctions.amount=opctions.childrenNum > 0 && opctions.childDiscount ?
							self.returnFloat(self.returnFloat(details[i].price) - self.returnFloat(opctions.childrenNum * opctions.childDiscount)- (opctions.couponDiscount?opctions.couponDiscount:0)):
							self.returnFloat(details[i].price)
				}
			}
			
			this.logIn = window.localStorage.getItem("logstate")
			
			var time1=new Date(this.opctions.startDate.replace(/-/g, '/')).getTime();
			var time2=new Date().getTime();
			if(parseFloat((time1-time2)/1000/60/60/24)>this.opctions.refundTimeLimit){
				this.timeout=true
			}else{
				this.timeout=false
			}


			this.goBackFn()
			console.log(this.opctions)
			var self = this;
			//设置默认币种
			self.nowExchange = {
				symbol: self.opctions.symbol,
				currency: self.opctions.currency
			};
			//加载币种
			// self.axios.get("https://api.localpanda.com/api/public/currency/all/"+self.opctions.currency).then(function(response) {
			// 	// console.log(response);
			// 	if(response.status == 200) {
			// 		self.exchange = response.data;
			// 		console.log(self.exchange )
			// 	}
			// }, function(response) {});
			self.codeList = self.countryCode
			self.travelCodeList = self.countryCode
			document.getElementsByTagName('body')[0].addEventListener("click", () => {
				self.showCode = false
				self.showTravellCode = false
			})

		},
		watch: {
			oderFirstName(val){
				if(val){
					this.test.test1=true
					console.log(this.test.test1)
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
					// var other = [];
					// var other1=[]
					// var str = val.replace(/\(/, "\\\(").replace(/\)/, "\\\)").replace(/\+/, '\\\+').replace(/\-/,'\\\-');
					// for(let i = 0; i < this.countryCode.length; i++) {
					// 	var str1=self.countryCode[i].country_name + "(+" + self.countryCode[i].prefix + ")"
					// 	if(new RegExp(str,"i").test(str1)){
					// 		if(val[0].toLowerCase()==str1[0].toLowerCase()){
					// 			var json = {
					// 				country_name: self.countryCode[i].country_name,
					// 				prefix: self.countryCode[i].prefix
					// 			}
					// 			other.push(json)
					// 		}else{
					// 			var json={
					// 				country_name: self.countryCode[i].country_name,
					// 				prefix: self.countryCode[i].prefix
					// 			}
					// 			other1.push(json)
					// 		}
							
							
					// 	}
					// }
					
					// self.codeList = other.concat(other1)
					//this.countryCode=arr
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

			}

		}
	}
</script>
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
						padding-bottom: 15px;
						border-bottom: 1px solid #dde0e0;
						.serviceform {
							h3 {
								font-size: 18px;
								margin-bottom: 0;
								font-weight: bold;
							}
							p {
								margin-top: 12px;
								font-size: 18px
							}
						}
					}
					.date {
						padding: 15px 0;
						border-bottom: 1px solid #dde0e0;
						p {
							font-size: 18px;
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
							
							border-radius: 3px;
							border: solid 1px #dde0e0;
							resize: none;
							padding:0 10px;
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


		
		
		
	}
</style>