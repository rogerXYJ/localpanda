<template>
	<div class="fillYourInfo">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="fill">
			<div class="fillPageLeft">
				<div class="link">
					<a href="javascript:">1. Fill in your information</a>
					<i class="iconfont">&#xe620;</i>
					<a href="javascript:">2. confirmation</a>
				</div>
				<h3>Fill in your information</h3>
				<div class="orderContact">
					<h4>Reservation Information</h4>
					<div class="cont">
						<div class="cont-item">
							<p>First Name<b>*</b></p>
							<input :class="{err:oderFirstNameErr}" @focus="fousOderfisrtname" @blur="gabulr(0)" v-model="oderFirstName" />
						</div>
						<div class="cont-item">
							<p>Last Name<b>*</b></p>
							<input :class="{err:oderlastNameErr}" @focus="fousoderlastName" @blur="gabulr(1)" v-model="oderlastName" />
						</div>
					</div>
					<div class="emalAddress">
						<p>Email Address<b>*</b></p>
						<input :class="{err:emailAddressErr}" @focus="fousEmal" @blur="gabulr(2)" v-model="emailAddress" />
						<span>Your voucher will be sent here, make sure it is correct</span>
					</div>
					<div class="cont">
						<div class="cont-item">
							<p>Country Code<b>*</b></p>
							<div class="code-box">
								<input :class="{err:codeErr}" @click.stop="focusCode(0)" @focus="focusCode(0)" @blur="gabulr(3)" v-model="mobileCode" />
								<div class="countryCode" v-if="showCode" :class="codeList.length>0?'width100':''">
									<ul v-if="codeList.length>0">
										<li v-for="item in codeList" @click.stop="selectCode(item.country_name,item.prefix,0)">{{item.country_name}} (+{{item.prefix}})</li>
									</ul>
									<div class="empty" v-else>There are no results that match your search.</div>
								</div>
							</div>

						</div>
						<div class="cont-item">
							<p>Mobile Phone<b>*</b></p>
							<input :class="{err:phoneErr}" @focus="fousPhone" @blur="gabulr(4)" v-model="phone" />
						</div>
					</div>
					<div class="comments">
						<h4>Other Required Information</h4>
						<textarea v-if="opctions.category=='Private Tour'" @blur="gabulr(5)" placeholder="please provide your hotel address so the guide can pick you up." v-model="comments"></textarea>
						<textarea v-else v-model="comments" @blur="gabulr(5)"></textarea>
					</div>
				</div>
				<div class="check">
					<span>Check this box if the contact for the reservation does NOT match the Primary Traveler.</span>
					<em v-if="check==0" @click="checkFn(0)" class="checkbox"></em>
					<em v-if="check==1" @click="checkFn(1)" class="checkbox backgrond iconfont">&#xe61e;</em>
				</div>
				<div class="addOrderContact" v-if="check==1">
					<ul>
						<li>
							<h4>Key Traveler</h4>

							<div class="name">
								<div class="firstName">
									<p>First Name<b>*</b></p>
									<input :class="{err:TravellerFirstNameErr}" @focus="fousFirst()" v-model="TravellerFirstName" />

								</div>
								<div class="lastname">
									<p>Last Name<b>*</b></p>
									<input :class="{err:TravellerlastNameErr}" @focus="fousLastName()" v-model="TravellerlastName" />
								</div>
							</div>
							<div class="emalAddress">
								<p>Email Address<b>*</b></p>
								<input :class="{err:TravelleremailAddressErr}" @focus="fousidcard" v-model="TravelleremailAddress" />
							</div>
							<div class="nuber">
								<div class="paddnumber">
									<p>Country Code</p>
									<div class="code-box">
										<input :class="{err:TravelleremailAddressErr}" @click.stop="focusCode(1)" @focus="focusCode(1)" @blur="gabulr(3)" v-model="mobileTravellCode" />
										<div class="countryCode" v-if="showTravellCode">
											<ul v-if="travelCodeList.length>0">
												<li v-for="item in travelCodeList" @click.stop="selectCode(item.country_name,item.prefix,1)">{{item.country_name}} (+{{item.prefix}})</li>
											</ul>
											<div class="empty" v-else>There are no results that match your search.</div>
										</div>
									</div>

								</div>
								<div class="Mobilephone">
									<p>Mobile Phone(optional)</p>
									<input :class="{err:TravellerphoneErr}" @focus="fousphonenumb()" @blur="gabulr(4)" v-model="Travellerphone" />
								</div>
							</div>
						</li>
					</ul>
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
						<p v-if="hasCode==1" style="color: red;">The promotional code you entered is invalid. Please try again.</p>
					</div>
				</div>
				<div class="Comments">
					<div class="information">
						<p class="refundPolicy" style="color: red;font-size: 14px;">You can get a 100% refund up to {{opctions.refundTimeLimit}} hours before your trip.</p>
						<p class="text" style="font-size: 14px;margin-top: 20px;" v-if="logIn!=1">You ordered as a guest. To view your order details, you can click "My Bookings" on the top bar then type in the reservee's email address and name you entered before to access that information.</p>
						<div class="nextBtn">
							<div class="next" @click="placeOrder">NEXT</div>
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
				<div class="bookbtn">
					<p>Pay With:</p>
					<div class="payfor">
						<img style="width:200px" src="https://resource.localpanda.cn/static/icon/stripe.png" />
					</div>
					<div style=" width:316px;font-size: 16px;line-height: 20px;display: block; margin-top: 20px;"><b>Secure Payment:</b> </br>We use Stripe's online payment system, which sends your payment info directly to Stripe's secure servers, so your data is never sent to Local Panda's servers and cannot be stolen.</div>
				</div>
			</div>

		</div>
		<AlertGoBack :isShowAlertTitle="isShowAlertTitle" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlertFn="getIsShowAlertFn"></AlertGoBack>
		<Alert :isShowAlert="isShowAlert" :alertTitle='alertTitle' :alertMessage="alertMessage" v-on:setIsShowAlert="getIsShowAlert"></Alert>
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
		require('~/assets/js/pages/talk.js')
		//require('~/assets/js/pages/ga.js')
	}
	import Vue from 'vue'
	import { regExp } from '~/assets/js/plugin/utils'
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	import AlertGoBack from '~/components/Prompt/AlertGoBack';
	import Alert from '~/components/Prompt/Alert'
	import countryCode from '~/assets/js/countryCode.js'
	import { checkboxGroup, checkbox } from "~/plugins/panda/checkbox/";

	export default {
		async asyncData({
			apiBasePath
		}) {
			return {
				apiBasePath: apiBasePath
			}
		},
		name: 'fillYourInfo',
		data() {
			return {
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
			}

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
				var price = details[people - 1].defaultPrice;
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
									console.log(self.opctions.adultsPic)
									console.log(self.opctions.childDiscount)
								} else if(res.data.type == "FIXED") {
									self.standard = res.data.discount
									self.opctions.couponDiscount = self.standard
								}
								
//								for(var i=0;i<self.exchange.length;i++){
//									if(self.opctions.currency==self.exchange[i].code){
//										self.opctions.couponDiscount=self.returnFloat(self.opctions.couponDiscount*self.exchange[i].exchangeRate)
//										console.log(self.exchange[i].exchangeRate)
//										console.log(self.exchange[i].code)
//										console.log(self.opctions.currency)
//										break
//									}
//								}
								self.opctions.amount=self.returnFloat(self.opctions.adultsPic - self.opctions.childDiscount -self.opctions.couponDiscount)
								
							}
							
						} else {
							self.hasCode = 1

						}
					}, res => {})
				}
				
			},
			//价格换算
			changeCurrency(e) {
				var self = this;
				var value = e.target.value,
					opctions = self.opctions,
					details = opctions.details;
				var people = opctions.adultNum + opctions.childrenNum;
				//当前人数的默认价格
				var price = details[people - 1].defaultPrice;
				var standard = self.standard
				//换算折扣价
				var exchange = this.exchange;
				for(var i = 0; i < exchange.length; i++) {
					var thisEx = exchange[i];
					//检测当前货币类型
					if(thisEx.code == value) {
						//设置当前币种
						this.nowExchange = thisEx;
						//切换价格详情币种
						opctions.adultsPic = this.returnFloat(price * thisEx.exchangeRate);
						opctions.childDiscount = this.returnFloat(opctions.childDiscountPP * opctions.childrenNum * thisEx.exchangeRate);
						if(self.couponType == "RATE") {
							opctions.couponDiscount = this.returnFloat((opctions.adultsPic-opctions.childDiscount) * self.couponRate)
						} else if(self.couponType == "FIXED") {
							opctions.couponDiscount = this.returnFloat(standard * thisEx.exchangeRate)
						}else{
							opctions.couponDiscount=0
						}
						opctions.averagePrice = this.returnFloat(opctions.adultsPic / people);
						opctions.amount = this.returnFloat(opctions.adultsPic - this.returnFloat(opctions.childrenNum * thisEx.exchangeRate * opctions.childDiscountPP) - opctions.couponDiscount);
						
						opctions.symbol = thisEx.symbol;
						
						self.total=opctions.amount
						
						
						break;
					}
				}

			},
			checkFn(id) {
				if(id == 0) {
					this.check = 1

				} else {
					this.check = 0
					this.TravellerFirstName = ''
					this.TravellerlastName = ''
					this.TravelleremailAddress = ''
					this.Travellerphone = ''

				}
			},
			getIsShowAlert(val) {
				this.isShowAlert = val;
			},
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
			selectCode(country, code, index) {
				ga(gaSend, {
					hitType: 'event',
					eventCategory: 'activity_booking',
					eventAction: 'select',
					eventLabel: 'country_code_select',
				});
				if(index == 0) {

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
				value *= 1;
				if(value) {
					var numberArr = ('' + value).split('.');
					if(numberArr.length > 1 && numberArr[1].length > 2) {
						return(value + 0.005).toFixed(2);
					}
					return value.toFixed(2);
				} else {
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
				let self = this;
				if(self.checkedAll) {
					if(self.couponType) {
						self.next()
					} else {
						self.orderHasCouponRate = true
					}
				} else {
					self.next()
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
				
			//下单
			next() {
				let next = false
				const that = this
				var obj; //that.addOder = true
				var couponDiscount;
				if(that.oderFirstName == "" || regExp.isNub(that.oderFirstName) || regExp.isCode(that.oderFirstName)) {
					//that.gaFail()
					next = false
					that.oderFirstNameErr = true
					that.isShowAlert = true
					that.alertMessage = "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled."
				} else if(that.oderlastName == "" || regExp.isNub(that.oderlastName) || regExp.isCode(that.oderlastName)) {
					//that.gaFail()
					next = false
					that.oderlastNameErr = true
					that.isShowAlert = true
					that.alertMessage = "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled."
				} else if(!regExp.isEmail(that.emailAddress)) {
					//that.gaFail()
					next = false
					that.emailAddressErr = true
					that.isShowAlert = true
					that.alertMessage = "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled."
				} else if(!that.mobileCode) {
					//that.gaFail()
					next = false
					that.codeErr = true
					that.isShowAlert = true
					that.alertMessage = "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled."
				} else if(that.phone == "" || !regExp.isMobil(that.phone)) {
					//that.gaFail()
					next = false
					that.phoneErr = true
					that.isShowAlert = true
					that.alertMessage = "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled."
				} else {
					if(that.check == 1) {
						if(that.TravellerFirstName == "" || regExp.isNub(that.TravellerFirstName) || regExp.isCode(that.TravellerFirstName)) {
							//that.gaFail()
							next = false
							that.TravellerFirstNameErr = true
							that.isShowAlert = true
							that.alertMessage = "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled."
						} else if(that.TravellerlastName == "" || regExp.isNub(that.TravellerlastName) || regExp.isCode(that.TravellerlastName)) {
							//that.gaFail()
							next = false
							that.TravellerlastNameErr = true
							that.isShowAlert = true
							that.alertMessage = "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled."
						} else if(!regExp.isEmail(that.TravelleremailAddress)) {
							//that.gaFail()
							next = false
							that.TravelleremailAddressErr = true
							that.isShowAlert = true
							that.alertMessage = "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled."
						} else if(!regExp.isMobil(that.Travellerphone)) {
							that.TravellerphoneErr = true
							that.isShowAlert = true
							that.alertMessage = "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled."
						} else {
							next = true
							ga(gaSend, {
								hitType: 'event',
								eventCategory: 'activity_booking',
								eventAction: 'submit',
								eventLabel: 'activity_order_succ',
							});
							obj = {
								"userId": that.opctions.userId,
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
								"couponDiscount": that.couponType ? that.opctions.couponDiscount : null,
								"couponCode": that.couponType ? that.couponCode : null,
								"contactInfo": {
									"firstName": that.oderFirstName,
									"lastName": that.oderlastName,
									"phoneNumber": that.code + that.phone,
									"emailAddress": that.emailAddress
								},
								"travelerInfo": {
									"firstName": that.TravellerFirstName,
									"lastName": that.TravellerlastName,
									"phoneNumber": that.travellCode + that.Travellerphone,
									"emailAddress": that.TravelleremailAddress
								},
								"utcOffset": new Date().getTimezoneOffset() / 60 * -1,
								"deviceType": "PC"
							}

							if(that.addOder == false) {
								that.addOder = true
								that.axios.put("https://api.localpanda.com/api/order/activity", JSON.stringify(obj), {
									headers: {
										'Content-Type': 'application/json; charset=UTF-8'
									}
								}).then(function(response) {

									var loginState = (that.logIn ? that.logIn : 0);
									//var hostUrl = obj.currency == 'CNY' ? 'https://www.localpanda.cn' : 'https://www.localpanda.com';
									window.location.href = "/activity/payment?objectId=" + response.data.response + '&login=' + loginState;

								}, function(response) {})
							}

						}
						if(next == false) {
							that.gaFail()
						}
					} else {
						next = true
						ga(gaSend, {
							hitType: 'event',
							eventCategory: 'activity_booking',
							eventAction: 'submit',
							eventLabel: 'activity_order_succ',
						});
						obj = {
							"userId": that.opctions.userId,
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
								"emailAddress": that.emailAddress
							},
							"couponDiscount": that.couponType ? that.opctions.couponDiscount : null,
							"couponCode": that.couponType ? that.couponCode : null,
							"utcOffset": new Date().getTimezoneOffset() / 60 * -1,
							"deviceType": "PC"
						}
						if(that.addOder == false) {
							that.addOder = true
							that.axios.put(this.apiBasePath + "order/activity", JSON.stringify(obj), {
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
					if(next == false) {
						that.gaFail()
					}
				}
			}

		},
		created: function() {

		},
		mounted: function() {
			this.opctions = localStorage.getItem("orderInfo") ? JSON.parse(localStorage.getItem("orderInfo")) : ''
			this.logIn = window.localStorage.getItem("logstate")
			this.goBackFn()

			var self = this;
			//设置默认币种
			self.nowExchange = {
				symbol: self.opctions.symbol,
				currency: self.opctions.currency
			};
			//加载币种
			self.axios.get("https://api.localpanda.com/api/public/currency/all/USD").then(function(response) {
				// console.log(response);
				if(response.status == 200) {
					self.exchange = response.data;
					console.log(self.exchange )
				}
			}, function(response) {});
			self.codeList = self.countryCode
			self.travelCodeList = self.countryCode
			document.getElementsByTagName('body')[0].addEventListener("click", () => {
				self.showCode = false
				self.showTravellCode = false
			})

		},
		watch: {
			
			mobileCode: function(val, oldVal) {
				let self = this
				if(val) {
					if(val.length == 1) {
						ga(gaSend, {
							hitType: 'event',
							eventCategory: 'activity_booking',
							eventAction: 'input',
							eventLabel: 'country_code_input',
						});
					}
					self.codeList = [];
					var other = [];
					var str = val.replace(/\(/, "\\\(").replace(/\)/, "\\\)").replace(/\+/, '\\\+')

					for(let i = 0; i < this.countryCode.length; i++) {

						if(new RegExp(("^" + str), "i").test(self.countryCode[i].country_name + "(" + "+" + self.countryCode[i].prefix + ")")) {
							var json = {
								country_name: self.countryCode[i].country_name,
								prefix: self.countryCode[i].prefix
							}
							other.push(json)

						}
					}
					self.codeList = other
					//this.countryCode=arr

					//console.log(self.codeList)
				} else {
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
			mobileTravellCode: function(val, oldVal) {
				let self = this
				if(val) {
					self.travelCodeList = [];
					var other = [];
					var str = val.replace(/\(/, "\\\(").replace(/\)/, "\\\)").replace(/\+/, '\\\+')
					for(let i = 0; i < this.countryCode.length; i++) {

						if(new RegExp(("^" + str), "i").test(self.countryCode[i].country_name + "(" + "+" + self.countryCode[i].prefix + ")")) {
							var json = {
								country_name: self.countryCode[i].country_name,
								prefix: self.countryCode[i].prefix
							}
							other.push(json)

						} else {

						}
					}

					self.travelCodeList = other
					//this.countryCode=arr

					//console.log(self.codeList)
				} else {
					self.travelCodeList = self.countryCode

				}
			}
		}
	}
</script>
<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';
	#header {
		box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
	}
	
	body {
		min-width: 1200px;
	}
	
	.checkbox_label .checkbox_content {
		white-space: normal!important;
	}
</style>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
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
			height: 200px;
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
		top: 52px;
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
				&:hover {
					color: #fff;
					height: 40px;
					background-image: linear-gradient(-90deg, #009efd 0%, #1bbc9d 100%);
				}
			}
		}
	}
	
	.width100 {
		width: 110%!important;
	}
	
	.emalAddress {
		margin-top: 25px;
		width: 100%;
		p {
			font-size: 18px;
			margin-bottom: 10px;
			font-weight: bold;
		}
		input {
			width: calc(100% - 22px);
			height: 44px;
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
			padding: 60px 0 100px;
			position: relative;
			.oderdetial {
				position: absolute;
				top: 60px;
				right: 0;
				.payfordetail {
					box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
					background: #fff;
					padding: 30px 30px 40px;
					width: 316px;
					.head {
						padding-bottom: 30px;
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
						padding: 30px 0;
						border-bottom: 1px solid #dde0e0;
						p {
							font-size: 18px;
						}
					}
					.pic {
						padding: 30px 0;
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
							margin-top: 20px;
							font-size: 18px;
						}
					}
					.total {
						padding-top: 30px;
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
					margin-top: 20px;
					padding: 30px;
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
				.orderContact {
					margin-top: 35px;
					padding-bottom: 33px;
					border-bottom: 1px solid #dde0e0;
					b {
						color: red;
					}
					h4 {
						font-size: 18px;
						font-weight: bold;
					}
					.cont {
						margin-top: 25px;
						display: flex;
						.cont-item {
							flex: 1;
							p {
								font-size: 18px;
								margin-bottom: 10px;
								font-weight: bold;
							}
							input {
								width: 345px;
								height: 44px;
								font-size: 18px;
								border: 1px solid #dde0e0;
								border-radius: 3px;
								&:hover {
									border-color: #1bbc9d;
								}
							}
						}
					}
					.comments {
						margin-top: 25px;
						h4 {
							font-size: 18px;
							font-weight: bold;
							margin-bottom: 10px;
						}
						textarea {
							width: 684px;
							height: 40px;
							border-radius: 3px;
							border: solid 1px #dde0e0;
							resize: none;
							padding: 20px;
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
						p {
							font-size: 18px;
							margin-top: 30px;
							a {
								color: #1bbc9d;
							}
						}
					}
					.nextBtn {
						margin-top: 20px;
						.next {
							width: 90px;
							height: 46px;
							font-weight: bold;
							text-align: center;
							line-height: 46px;
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
					margin-top: 25px;
					font-size: 14px;
					box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
					padding: 20px;
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
		}
	}
</style>