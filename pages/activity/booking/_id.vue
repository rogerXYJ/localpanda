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
					
					<div class="cont">
						<div class="cont-item">
							<p>Country or Territory Code<b>*</b></p>
							<div class="code-box">
								<input id="code" :class="{err:codeErr}" @click.stop="focusCode(0)" @focus="focusCode(0)" @blur="gabulr(3)" @change="changeCode" autocomplete="off" v-model="mobileCode" :style="{backgroundColor:test.test4?'rgb(250, 255, 189)':'rgb(255, 255, 255)'}"/>
								<div class="countryCode" v-show="showCode" :class="codeList.length>0?'width100':''">
									<ul v-if="codeList.length>0">
										<li v-for="item in codeListHot" @click.stop="selectCode(item.country_name,item.prefix,0)"  v-if="codeListHot.length>0 && !mobileCode">{{item.country_name}} (+{{item.prefix}})</li>
										<li class="line" v-if="!mobileCode"></li>
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

					<div class="emalAddress">
						<p>Email Address<b>*</b></p>
						<input id="email" :class="{err:emailAddressErr}" @focus="fousEmal" @blur="gabulr(2)" v-model="emailAddress"  placeholder="We'll send your confirmation here" :style="{backgroundColor:test.test3?'rgb(250, 255, 189)':'rgb(255, 255, 255)'}"/>
					</div>

					<div class="comments">
						<h4>Other Information</h4>
						<textarea rows="3" v-if="opctions.pickup==1" @blur="gabulr(5)" placeholder="You can fill out your travel preferences here for us to personalize your trip" v-model="comments"></textarea>
						<textarea rows="3" v-else v-model="comments" @blur="gabulr(5)" placeholder="You can fill out your travel preferences here for us to personalize your trip"></textarea>
					</div>
				</div>

				<!-- 补填信息板块 -->
				<div class="pickup_info" v-show="opctions.pickup>0 || opctions.pickup==0 && opctions.venues && opctions.venues.length>1">
					<div class="pickup_detail" v-if="opctions.pickup>0">
						<h3 v-if="opctions.pickup && opctions.pandaPhoneCheck">Pick-up & Panda Phone Device delivery  InformationInformation <br><span class="ml0">If you haven't decided on the details, you can provide us with the info later. </span></h3>
						<h3 v-else>Pick-up Information <span>If you haven't decided on the details, you can provide us with the info later. </span></h3>
						<checkbox class="pickup_info_check" v-model="showPickupInfo" :change="pickupInfoChange">I have the info now</checkbox>
						
						<div class="hr mt15" v-show="showPickupInfo"></div>

						<div class="pickup_info_list" v-show="showPickupInfo">
							<h4>Pick-up Location</h4>
							<ul class="pickup_info_location">
								<li><radio v-model="pickupLocation" label="Hotel">Hotel</radio></li>
								<li><radio v-model="pickupLocation" label="Airport">Airport</radio></li>
								<li><radio v-model="pickupLocation" label="Cruise Port">Cruise Port</radio></li>
								<li><radio v-model="pickupLocation" label="Railway Station">Railway Station</radio></li>
								<li><radio v-model="pickupLocation" label="Address or Intersection">Address or Intersection</radio></li>
							</ul>

							<!-- 酒店 -->
							<div class="pickup_location_content" v-show="pickupLocation=='Hotel'">
								<h5><span class="red">*</span>Hotel Name & Address: </h5>
								<textarea v-model="pickupData.hotel" class="textarea js_validate" vType="text" rows="5"></textarea>
							</div>

							<!-- Airport -->
							<div class="pickup_location_content" v-show="pickupLocation=='Airport'">
								<ul class="location_list">
									<li><span><i class="red">*</i> Arrival Time</span> 
										<!-- <input class="js_validate js_changetime" vType="text" type="text" v-model="pickupData.arrivalTime"> selectableRange: '00:00:00 - 23:59:00',-->
										<el-time-picker 
											:class="{'arrivalTimeError':arrivalTimeError}" 
											v-model="pickupData.arrivalTime" 
											:picker-options="{
												format: 'HH:mm'
											}"
											value-format="HH:mm" 
											:default-value="new Date(opctions.startDate.split('-')[0], opctions.startDate.split('-')[1]-1, opctions.startDate.split('-')[2], 8, 0)"  
											placeholder="">
										</el-time-picker>
									</li>
									<li><span><i class="red">*</i> Flight Number</span> <input class="js_validate" vType="text" type="text" v-model="pickupData.flightNumber"></li>
									<li class="w_max"><span><i class="red">*</i> Airport</span> <input class="js_validate" vType="text" type="text" v-model="pickupData.airport"></li>
								</ul>
							</div>
							<!-- Cruise Port -->
							<div class="pickup_location_content" v-show="pickupLocation=='Cruise Port'">
								<ul class="location_list">
									<li><span><i class="red">*</i> Arrival Time</span> 
									<!-- <input class="js_validate js_changetime" vType="text" type="text" v-model="pickupData.arrivalTime"> -->
										<el-time-picker 
											:class="{'arrivalTimeError':arrivalTimeError}" 
											v-model="pickupData.arrivalTime" 
											:picker-options="{
												format: 'HH:mm'
											}"
											value-format="HH:mm" 
											:default-value="new Date(opctions.startDate.split('-')[0], opctions.startDate.split('-')[1]-1, opctions.startDate.split('-')[2], 8, 0)"  
											placeholder="">
										</el-time-picker>
									</li>
									<li><span><i class="red">*</i> Cruise Number</span> <input class="js_validate" vType="text" type="text" v-model="pickupData.cruiseNumber"></li>
									<li class="w_max"><span><i class="red">*</i> Cruise Port</span> <input class="js_validate" vType="text" type="text" v-model="pickupData.cruisePort"></li>
								</ul>
							</div>

							<!-- Railway Station -->
							<div class="pickup_location_content" v-show="pickupLocation=='Railway Station'">
								<ul class="location_list">
									<li><span><i class="red">*</i> Arrival Time</span> 
										<el-time-picker 
											:class="{'arrivalTimeError':arrivalTimeError}" 
											v-model="pickupData.arrivalTime" 
											:picker-options="{
												format: 'HH:mm'
											}"
											value-format="HH:mm" 
											:default-value="new Date(opctions.startDate.split('-')[0], opctions.startDate.split('-')[1]-1, opctions.startDate.split('-')[2], 8, 0)"  
											placeholder="">
										</el-time-picker>
									</li>
									<li><span><i class="red">*</i> Train Number</span> <input class="js_validate" vType="text" type="text" v-model="pickupData.trainNumber"></li>
									<li class="w_max"><span><i class="red">*</i> Railway Station</span> <input class="js_validate" vType="text" type="text" v-model="pickupData.railwayStation"></li>
								</ul>
							</div>

							<!-- Railway Station -->
							<div class="pickup_location_content" v-show="pickupLocation=='Address or Intersection'">
								<ul class="location_list location_list_address">
									<li><span><i class="red">*</i> Pick-up Time</span> 
										<!-- <input class="js_validate" vType="text" type="text" v-model="pickupData.pickupTime"> -->
										<el-time-picker 
											:class="{'arrivalTimeError':arrivalTimeError}" 
											v-model="pickupData.arrivalTime" 
											:picker-options="{
												format: 'HH:mm'
											}"
											value-format="HH:mm" 
											:default-value="new Date(opctions.startDate.split('-')[0], opctions.startDate.split('-')[1]-1, opctions.startDate.split('-')[2], 8, 0)"  
											placeholder="">
										</el-time-picker>
									</li>
									<li class="w_max"><span><i class="red">*</i> Address or Intersection</span> <input class="js_validate" vType="text" type="text" v-model="pickupData.address"></li>
								</ul>
							</div>




						</div>
					</div>

					<div class="venue_detail" v-else>
						<h3>Please select a Venue<span class="red">*</span></h3>
						<div class="red venue_tip" v-if="venueTip">Field is required</div>
						<div class="venue_check" v-for="item in opctions.venues" :key="item">
							<radio v-model="venueAddress" :label="item">{{item}}</radio>
						</div>
						
					</div>

					<div class="pickup_info_list" v-show="showPickupInfo && opctions.pandaPhoneCheck && opctions.pickup>0 || opctions.pickup==0 && opctions.pandaPhoneCheck">
						<h4>Panda Phone Device delivery Location</h4>
						<div class="pandaPhone_location">
							<div class="pandaPhone_location_check mt5">
								<radio v-model="pandaPhoneLocation" :label="true">I want my device to be delivered upon my pickup</radio>
							</div>
							<div class="pandaPhone_location_check">
								<radio v-model="pandaPhoneLocation" :label="false">I want to receive my device at a time/venue different from my pickup venue/time</radio>
							</div>
						</div>

						<div class="pandaPhone_info" v-show="!pandaPhoneLocation">
							<h5><span class="red">*</span> Panda Phone delivery address （ Hotel Only ）</h5>
							<div class="pandaPhone_info_list">
								<input class="w_max js_validate" vType="text" v-model="pandaPhoneAddress" type="text" placeholder="">
							</div>
						</div>
						<div class="pandaPhone_info" v-show="!pandaPhoneLocation">
							<h5><span class="red">*</span> Panda Phone delivery address （ Hotel Only ）</h5>
							<div class="pandaPhone_info_list">
								<input class="js_deliverytime js_validate" vType="text" v-model="arrivalDate" type="text" readonly placeholder="Please Select Date">
								<!-- <input class="ml50 js_validate" vType="text" v-model="arrivalTime" type="text" placeholder="Please Select Time"> -->
								<select class="pickup_time js_validate" vType="text" v-model="arrivalTime">
									<option value="I haven't decided yet">I haven't decided yet. I'll contact you later</option>
									<option value="7:30 AM">7:30 AM</option>
									<option value="8:00 AM">8:00 AM</option>
									<option value="8:30 AM">8:30 AM</option>
									<option value="9:00 AM">9:00 AM</option>
									<option value="9:30 AM">9:30 AM</option>
									<option value="10:00 AM">10:00 AM</option>
									<option value="10:30 AM">10:30 AM</option>
									<option value="11:00 AM">11:00 AM</option>
									<option value="11:30 AM">11:30 AM</option>
									<option value="12:00 PM">12:00 PM</option>
									<option value="12:30 PM">12:30 PM</option>
									<option value="1:00 PM">1:00 PM</option>
									<option value="1:30 PM">1:30 PM</option>
									<option value="2:00 PM">2:00 PM</option>
									<option value="2:30 PM">2:30 PM</option>
									<option value="3:00 PM">3:00 PM</option>
									<option value="3:30 PM">3:30 PM</option>
									<option value="4:00 PM">4:00 PM</option>
									<option value="4:30 PM">4:30 PM</option>
									<option value="5:00 PM">5:00 PM</option>
									<option value="5:30 PM">5:30 PM</option>
									<option value="6:00 PM">6:00 PM</option>
									<option value="6:30 PM">6:30 PM</option>
									<option value="7:00 PM">7:00 PM</option>
									<option value="7:30 PM">7:30 PM</option>
									<option value="8:00 PM">8:00 PM</option>
								</select>
							</div>
						</div>
						
					</div>
					
					
				</div>



				<!-- 优惠券 -->
				<!-- <div class="coupon">
					<checkbox v-model="checkedAll" :change="changeFn">
						Have a Gift Card or Coupon Code? Proceed to checkout to redeem it.
						<a>Enter Coupon Code <i class="iconfont" v-if="checkedAll">&#xe667;</i>
							<i class="iconfont" v-else>&#xe666;</i>
						</a>
					</checkbox>
					<div class="couponInput" v-if="checkedAll">
						<input placeholder="Enter a gift card or promotional code" @input="couponCodeChange" id="coupon" @keyup.enter="validateCode" v-model="couponCode" />
						<button @click="validateCode">Enter</button>
						<p v-if="hasCode===1"><i class="iconfont">&#xe654;</i>- {{couponType=="RATE"?"":nowExchange.symbol}}{{couponType=="RATE"?couponRate*100:opctions.couponDiscount}}{{couponType=="RATE"?"%":""}} {{couponType=="RATE"?"off":""}} (Coupon discount)</p>
						<p v-if="hasCode===0" style="color: red;">The Coupon code you entered is invalid. Please try again.</p>
					</div>
				</div> -->

				<!-- 手机业务 -->
				<div class="panda_phone">
					<checkbox v-model="opctions.pandaPhoneCheck">Add Panda Phone to this trip for USD $1</checkbox>
					<a @click="showPPDialog = true">What's this</a>
				</div>

				<div class="Comments">
					<div class="information">
						<!--<p class="refundPolicy" style="font-size: 14px;">
							You can reschedule or cancel your trip at zero cost before Aug 31st, 2018.
							You can get a 100% refund up to {{opctions.refundTimeLimit}} hours before your trip.
						</p>-->
						<span class="iconfont" v-if="opctions.picInfo&&opctions.picInfo.fullRefund&&timeout||!logIn">&#xe617;</span>
						<p class="refundPolicy" style="font-size: 14px;" v-if="opctions.picInfo&&opctions.picInfo.fullRefund&&timeout">You can reschedule or cancel your trip at zero cost before {{formatDate(delmulDay(opctions.startDate,opctions.picInfo.refundTimeLimit))}}.</p>
						<!-- <p class="refundPolicy" style="font-size: 14px;" v-if="opctions.picInfo.fullRefund && timeout">Free cancellation  up to {{(opctions.picInfo.refundTimeLimit>2?opctions.picInfo.refundTimeLimit+' days':24*opctions.picInfo.refundTimeLimit+' hours')}} before your trip</p> -->
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
						<h3>{{opctions.title}}</h3>
						<div class="serviceform">
							<p>Number of {{opctions.adultNum>1?'Adults':'Adult'}} :  {{opctions.adultNum}}</p>
							<p v-if="opctions.childrenNum">Number of {{opctions.childrenNum>1?'Children':'Child'}} :  {{opctions.childrenNum}}</p>
						</div>

					</div>
					<div class="date">
						<p>Travel Date :  {{formatDate(opctions.startDate)}}</p>
						<p v-if="opctions.startTime">{{opctions.startTime}}</p>
					</div>
					<div class="pic">
						<div class="adult clearfix">
							<!-- <div class="formula" v-if="opctions.childrenNum==0 && opctions.adultNum==1">{{nowExchange.symbol}}{{opctions.adultsPic}} x 1 Travelers</div> -->
							<div class="formula">{{nowExchange.symbol}}{{returnFloat(opctions.averagePrice)}} x {{opctions.adultNum*1+opctions.childrenNum*1}} {{(opctions.adultNum*1+opctions.childrenNum*1)>1?'Travelers':'Traveler'}}</div>
							<div class="adultPic">{{nowExchange.symbol}}{{returnFloat(opctions.adultsPic)}}</div>
						</div>
						<div class="child" v-if="opctions.pandaPhoneCheck">
							<b><span>+</span>{{nowExchange.symbol}}{{returnFloat(opctions.phoneHirePrice)}}</b> for Panda Phone
						</div>
						<div class="child" v-if="opctions.childrenNum>0&&opctions.childDiscount">
							<b><span>-</span>{{nowExchange.symbol}}{{returnFloat(opctions.childrenNum * opctions.childDiscount)}}</b> for {{opctions.childrenNum}} {{opctions.childrenNum>1?'Children':'Child'}}
						</div>
						
						<div class="child" v-if="couponType">
							<div>
								<b><span>-</span>{{nowExchange.symbol}}{{opctions.couponDiscount}}</b>Coupon discount
							</div>
						</div>
					</div>
					<div class="total clearfix">
						<div class="totle-title">Total Amount</div>
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
		<div class="dialog" v-if="orderHasCouponRate">
			<div class="dialogContent">
				<p>The promotional code you entered is invalid. You can continue to pay at the original price or enter your code again.</p>
				<div class="btn">
					<button @click="continueFn">Continue</button>
					<button @click="enterAgain">Enter Again</button>
				</div>
			</div>

		</div>
		

		<div class="next_info_tip_bg" v-show="showNextTip"></div>
		<div class="next_info_tip" v-show="showNextTip">
			<p>Your <b>{{nextTipStr}}</b> is still incomplete. You can complete the info after you finish your booking or continue to update now.</p>
			<div class="next_info_btn">
				<span @click="next">Update my info later</span>
				<span @click="showNextTip=false">Continue to update</span>
			</div>
		</div>



		<!-- panda phone弹窗 -->
		<div class="pp_dialog_bg" v-show="showPPDialog" @click="showPPDialog=false"></div>
		<div class="pp_dialog" v-show="showPPDialog">
			
			<div class="pp_congtent">
				<div class="pp_box">
					<h3>Did You Know that in China…</h3>
					<ul class="detail_txt_list">
						<li><i class="dian"></i>Uber and other popular ride-sharing apps aren’t present</li>
						<li><i class="dian"></i>Most major websites including google and all its services are blocked</li>
						<li><i class="dian"></i>Debit and credit cards are NOT widely accepted</li>
						<li><i class="dian"></i>In Shanghai alone there are 5 different streets named Zhongxing Road</li>
						<li><i class="dian"></i>Most shops & cafes require a China phone number to connect to wifi</li>
					</ul>
					<p>China can be very challenging to navigate without a little help. That’s why we’ve created the ultimate device to make your life easy so youcan enjoy your vacation. Introducing…</p>
				</div>
				<div class="pp_box mt20">
					<h3>The Panda Phone - All-in-one Mobile Travel Assistant</h3>
					<img class="mt10" src="https://cloud.localpanda.com/pandaphone/assistant.png" alt="">
				</div>
				<div class="pp_box mt10">
					<h3>All for the insane price for 5-day usage: $1</h3>
					<p class="mt10">Pick-up and drop-off are only available at city center hotels in Shanghai & Beijing.<br>For more information or requests before booking, email us at at service@localpanda.com</p>
					<p class="c_999 mt15">*For $1 you get up to 5 days of use. Each additional day after the first 5 days will cost an additional $1 (7 RMB). In order to take advantage of our special offer price you must book at least 1 tour or activity with Local Panda.</p>
					<p class="c_999 mt15">*A $150 USD deposit is required to use the Panda Phone, which will be refunded upon returning the phone when your trip ends. You can pay deposit upon receiving the phone in China (cash/PayPal), or paying online with a debit/credit card.</p>
					<br>
				</div>
			</div>
			
			<!-- <checkbox class="pp_checkbox green mt20" v-model="opctions.pandaPhoneCheck">Add Panda Phone to My Trip</checkbox> -->
			<div class="add_panda">
				<span class="btn" @click="addPanda">Add Panda Phone to My Trip</span>
				<!-- <checkbox class="pp_checkbox green mt20" v-model="pandaPhoneCheck">Add Panda Phone to My Trip</checkbox> -->
			</div>
			
			<div class="pp_close iconfont" @click="showPPDialog=false">&#xe606;</div>
		</div>


		<Loading :loadingStatus="loadingStatus"></Loading>
		
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
	import { checkboxGroup, checkbox } from "~/plugins/panda/checkbox/";
	import Loading from '~/components/Loading/Loading'
	import Flatpickr from 'flatpickr';
	require('~/assets/scss/G-ui/flatpickr.min.css')
	import Validate from "~/plugins/panda/validate/";

	
	

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
			let data={
					opctions: {
					averagePrice: 0,
					adultsPic: 0,
					childrenNum: 0,
					adultNum: 0,
					amount: 0,
					childDiscountP: 0,
					childDiscountPP: 0, //默认儿童优惠价
					currency: '',
					symbol: '',
					couponDiscount: 0, //优惠价格
					pandaPhoneCheck:false

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
				codeListHot:[],
				//显示code列表
				showCode: false,
				code: '', //区号
				checkedAll: false, //选择优惠券
				couponCode: '', //优惠券
				hasCode: 100, //0 查到优惠券显示提示   1 没有查到优惠券提示  100默认没有提示
				couponRate: '', //优惠率
				orderHasCouponRate: false, //下单 判断是否含有优惠券
				couponType: '', //优惠券类型
				discount:0,//优惠券金额或折扣比例
				standard: 0, //切换优惠价格的基准价格
				total:0,
				timeout:false,
				clickCountryCode:false,
				country:'',
				currency:{code: "USD", symbol: "$"},
				showPPDialog:false,

				//pick-up信息
				pickupData:{
					hotel: '',
					arrivalTime: '',
					flightNumber: '',
					airport: '',
					cruiseNumber: '',
					cruisePort: '',
					trainNumber: '',
					railwayStation: '',
					pickupTime: '',
					address: ''
				},
				showPickupInfo: false,
				venueTip:false,
				pickupLocation: 'Hotel',
				pandaPhoneLocation: true,
				venueAddress: '',
				pandaPhoneAddress: '',
				arrivalDate: '',
				arrivalTime: '',
				showNextTip: false,
				nextTipStr:'',
				loadingStatus:false,
				arrivalTimeError:false
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

			callback(null,data);
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
			checkboxGroup,
			checkbox,
			radioGroup,
			radio,
			Loading

		},
		methods: {
			//选择优惠券
			changeFn(e) {
				let self = this
				if(!e.target.checked) {
					self.hasCode = 100;
					//self.opctions.amount = this.returnFloat(this.opctions.adultsPic*1 + (this.opctions.pandaPhoneCheck?this.opctions.phoneHirePrice:0)*1 - this.opctions.childDiscount*this.opctions.childrenNum)
					self.couponRate = ''
					self.couponCode = '';
					self.couponType = "";
					//计算价格
					this.setPrice();
				}
			},
			//选中补填信息
			pickupInfoChange(){

			},
			//验证couponCode
			validateCode() {
				let self = this
				var opctions = self.opctions,
					details = opctions.details;
				var people = opctions.adultNum + opctions.childrenNum;
				// var price = details[people - 1].price;
				if(self.couponCode){
					self.axios.get("https://api.localpanda.com/api/order/coupon/" + self.couponCode).then(res => {
						if(res.status == 200 && res.data) {
							self.hasCode = 1;
							self.couponType = res.data.type;
							self.discount = res.data.discount;
							self.couponRate = res.data.discount;
							//折扣优惠券
							// if(self.couponType == "RATE") {
							// 	self.couponRate = res.data.discount;
							// 	self.opctions.discount = res.data.discount
							// 	//self.opctions.couponDiscount = self.returnFloat(self.returnFloat(self.opctions.adultsPic - self.opctions.childDiscount) * self.couponRate)
							// } else if(self.couponType == "FIXED") {
							// 	//固定价格的优惠券
							// 	self.opctions.couponDiscount = res.data.discount
							// }
							
							//计算价格
							self.setPrice();
							//self.opctions.amount=self.returnFloat(self.opctions.adultsPic + (this.opctions.pandaPhoneCheck?this.opctions.phoneHirePrice:0)*1 - self.opctions.childDiscount -self.opctions.couponDiscount)
							
						} else {
							self.hasCode = 0;

						}
					}, res => {})
				}
				
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
						var childDiscount = results[0].data.childDiscount;
						options.childDiscount= childDiscount?childDiscount:0;

						var detailData = results[1].data;
						options.details=detailData;

						for(var i=0;i<detailData.length;i++){
							if(options.adultNum+options.childrenNum==detailData[i].capacity){
								options.adultsPic=self.returnFloat(detailData[i].price)
								options.averagePrice=self.returnFloat(detailData[i].perPersonPrice);
								options.phoneHirePrice=results[0].data.phoneHirePrice;
								//计算价格
								this.setPrice();
								//options.amount=options.childrenNum > 0 && options.childDiscount ? self.returnFloat(detailData[i].price*1 + (this.opctions.pandaPhoneCheck?this.opctions.phoneHirePrice:0)*1 - options.childrenNum * results[0].data.childDiscount*1- (options.couponDiscount?options.couponDiscount:0)): this.returnFloat(detailData[i].price + (this.opctions.pandaPhoneCheck?this.opctions.phoneHirePrice:0)*1 - (options.couponDiscount?options.couponDiscount:0))
							
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
						if(numberArr[1][bit] === numberArr[1][bit+1] && numberArr[1][bit+1] === numberArr[1][bit+2]){
							if(numberArr[1][bit]==9){
								return (value*1).toFixed(bit);
							}else{
								return numberArr[0]+'.'+numberArr[1].substring(0,bit);
							}
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
			setNextTipStr(){
				//提示没有填写集合信息
					var str = '';
					var pandaPhoneCheck = this.opctions.pandaPhoneCheck;
					if(!this.venueAddress){
						str+=',Meeting Point Info';
					}
					
					//Pickup信息没有填写
					var pickupData = this.getPickupData();
					var hasNull = false;
					for(var key in pickupData){
						if(pickupData[key]){
							hasNull = true;
						}
					}
					if(hasNull && this.showPickupInfo){
						str+=',Pick-up Info'
					}

					//提示没有填写手机接送地
					if(pandaPhoneCheck){
						if(!this.arrivalDate || !this.arrivalTime || !this.pandaPhoneAddress){
							str+=',Panda Phone Device delivery Location  Info';
						};
					}
					this.nextTipStr = str.substring(1);
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
					
				}else if(that.checkedAll && !that.couponType){
					next = false;
					that.showCode=false;
					that.orderHasCouponRate = true;
				}else if(this.pickupLocation !='Hotel' && !this.pickupData.arrivalTime || !this.fromValidate.validate()){
					if(this.pickupLocation !='Hotel' && !this.pickupData.arrivalTime){
						this.fromValidate.validate();
						this.arrivalTimeError = true;
						document.querySelector('.pickup_info_location').scrollIntoViewIfNeeded();
					}
					
				}else if(this.venueAddress=='' && this.opctions.pickup==0){
					this.venueTip = true;
					// this.showNextTip = true;

					//设置提示
					// this.setNextTipStr();
					
				}else{
					next=true;
					that.next();
				}

				//失败ga统计
				if(next == false) {
					that.gaFail()
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
				this.couponType = "";
				
			},
			setPrice(){
				//减去儿童差价和加上pandaphone的总价
				var allPrice = this.returnFloat(this.opctions.adultsPic*1 + (this.opctions.pandaPhoneCheck?this.opctions.phoneHirePrice:0)*1 - this.opctions.childDiscount*this.opctions.childrenNum);

				//优惠券
				if(this.couponType == 'RATE'){
					this.opctions.couponDiscount = this.returnFloat(allPrice*this.discount);
				}else if(this.couponType == 'FIXED'){
					this.opctions.couponDiscount = this.returnFloat(this.discount);
				}

				//优惠后的金额
				this.opctions.amount = this.returnFloat(allPrice - (this.checkedAll?this.opctions.couponDiscount:0));
			},
			errorFn(dom){
				let errDom=document.getElementById(dom)
				let htmlBody = document.documentElement;
				htmlBody.scrollTop=errDom.offsetTop
			},
			addPanda(){
				this.opctions.pandaPhoneCheck=true;
				this.showPPDialog=false;
			},

			getPickupData(){
				var pickupLocation = this.pickupLocation;
				var pickupData = this.pickupData;

				if(this.opctions.pickup==0){
					return null;
				}else if(pickupLocation == 'Hotel'){
					return {
						type: 'Hotel',
						hotel: pickupData.hotel
					};
				}else if(pickupLocation == 'Airport'){
					return {
						type: 'Airport',
						arrivalTime: pickupData.arrivalTime,
						flightNumber: pickupData.flightNumber,
						airport: pickupData.airport
					};
				}else if(pickupLocation == 'Cruise Port'){
					return {
						type: 'Cruise Port',
						arrivalTime: pickupData.arrivalTime,
						cruiseNumber: pickupData.cruiseNumber,
						cruisePort: pickupData.cruisePort
					};
				}else if(pickupLocation == 'Railway Station'){
					return {
						type: 'Railway Station',
						arrivalTime: pickupData.arrivalTime,
						trainNumber: pickupData.trainNumber,
						railwayStation: pickupData.railwayStation
					};
				}else if(pickupLocation == 'Address or Intersection'){
					return {
						type: 'Address or Intersection',
						pickupTime: pickupData.arrivalTime,
						address: pickupData.address
					};
				}
			},
			getPhoneDelivery(){
				if(this.opctions.pickup==0 || this.pandaPhoneLocation){
					return null;
				};

				var data = {
					address: this.pandaPhoneAddress,
					arrivalDate: this.arrivalDate,
					arrivalTime: this.arrivalTime
				};
				return JSON.stringify(data);
			},
			//下单
			next() {
				const that = this;

				ga(gaSend, {
					hitType: 'event',
					eventCategory: 'activity_booking',
					eventAction: 'submit',
					eventLabel: 'activity_order_succ',
				});


				


				var putData = {
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
						'nationality': that.country,
						"meetingPoint": that.opctions.pickup==0? (that.venueAddress?that.venueAddress:null) : null,
						"phoneDelivery": that.getPhoneDelivery(),
						"pickup": that.showPickupInfo ? JSON.stringify(this.getPickupData()) : null,
						"phoneDeliverySameAsPickup": that.showPickupInfo ? that.pandaPhoneLocation : true
						// "passport": "string",
					},
					"couponDiscount": that.couponType ? that.opctions.couponDiscount : null,
					"couponCode": that.couponType ? that.couponCode : null,
					"utcOffset": new Date().getTimezoneOffset() / 60 * -1,
					"deviceType": "PC",
					//"fullRefund":that.opctions.fullRefund,
					"finalRefundPeriod":that.opctions.finalRefundPeriod,
					"phoneHirePrice":that.opctions.phoneHirePrice,
					"phoneHire":that.opctions.pandaPhoneCheck
				};


				ga('ecommerce:addItem', {
					'id': putData.activityId,                     // Transaction ID. Required.
					'name': that.opctions.title,    // Product name. Required.
					'category': 'Activity',         // Category or variation.
					'price': putData.amount,                 // Unit price.
					'quantity': putData.adultNum*1 + putData.adultNum*1,                  // Quantity.
					'currency': putData.currency
				});
				ga('ecommerce:send');
				
				if(that.addOder == false) {
					that.addOder = true;
					that.loadingStatus = true;
					that.axios.put( "https://api.localpanda.com/api/order/activity", JSON.stringify(putData), {
						headers: {
							'Content-Type': 'application/json; charset=UTF-8'
						}
					}).then(function(response) {
						var loginState = (that.logIn ? that.logIn : 0);
						window.location.href = "/activity/payment?objectId=" + response.data.response + '&login=' + loginState;
						
					}, function(response) {
						that.loadingStatus = false;
					})
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
					if(key!='childDiscount'){
						this.opctions[key]=opctions[key]
					}
					
				}
			}
			// this.opctions.adultsPic=this.getBasisPrice()
			var details=this.opctions.picInfo.details;
			var opctions=this.opctions.picInfo;
			
		
			this.opctions.childDiscount=opctions.childDiscount?opctions.childDiscount:0
			for(var i = 0; i < details.length; i++) {
				if(this.opctions.adultNum+this.opctions.childrenNum==details[i].capacity){
					this.opctions.adultsPic=details[i].price
					this.opctions.averagePrice=details[i].perPersonPrice;
					//计算价格
					this.setPrice();
					//this.opctions.amount= this.opctions.childrenNum > 0 && opctions.childDiscount ? self.returnFloat(self.returnFloat(details[i].price) + (this.opctions.pandaPhoneCheck?this.opctions.phoneHirePrice:0)*1 - self.returnFloat(this.opctions.childrenNum * opctions.childDiscount)- (this.opctions.couponDiscount?this.opctions.couponDiscount:0)):	self.returnFloat(details[i].price)
				}
			}

			console.log(this.opctions);
			var venues = this.opctions.venues;
			if(venues){
				this.venueAddress = venues[0];
			};

			this.$nextTick(()=>{

				// new Flatpickr('.js_changetime',{
				// 	minDate: new Date(),
				// 	dateFormat:'Y-m-d H:i'
				// });

				new Flatpickr('.js_deliverytime',{
					minDate: new Date(),
					disable:[this.opctions.startDate]
				});
				
				
				this.fromValidate = new Validate({
					inputClassName:'js_validate', //需要校验的input的className
					errorClassName:'valError',  //报错时，会自动在input上添加的className
					stopFocus: true
				});
			});

			
			this.logIn = window.localStorage.getItem("logstate")
			
			var time1=new Date(this.opctions.startDate.replace(/-/g, '/')).getTime();
			var time2=new Date().getTime();
			if(parseFloat((time1-time2)/1000/60/60/24)>this.opctions.refundTimeLimit){
				this.timeout=true
			}else{
				this.timeout=false
			}


			this.goBackFn()
			
			var self = this;

			self.opctions.symbol = self.currency.symbol;
			self.opctions.currency = self.currency.code;
			//设置默认币种
			self.nowExchange = {
				symbol: self.currency.symbol,
				code: self.currency.code
			};

			//加载币种
			this.exchange = this.currencyData;
			
			self.codeList = self.countryCode
			self.travelCodeList = self.countryCode
			document.getElementsByTagName('body')[0].addEventListener("click", () => {
				self.showCode = false
				self.showTravellCode = false
			})


			self.codeListHot = [
				{"country_name": "United States","prefix": "1"},
				{"country_name": "United Kingdom","prefix": "44"},
				{"country_name": "China Mainland","prefix": "86"},
				{"country_name": "Canada","prefix": "1"},
				{"country_name": "Australia",	"prefix": "61"},
				{"country_name": "New Zealand","prefix": "64"}
			];


			

			//Ga检测
			var gaTimer = setInterval(function(){
        if(ga){
					
					//电商ga
					ga('require', 'ecommerce');

					//加载ga
          ga(gaSend, {
						hitType: 'event',
						eventCategory: 'activity_booking',
						eventAction: 'load',
						eventLabel: 'js',
					});
          //停止检测
          window.clearInterval(gaTimer);
        }
      },300);
			

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
			venueAddress:function(val){
				this.venueTip = false;
			},
			'opctions.pandaPhoneCheck':function(val){
				//计算价格
				this.setPrice();
				if(val){
					this.showPPDialog=false;
				}
				//this.opctions.amount=this.returnFloat(this.opctions.adultsPic + (this.opctions.pandaPhoneCheck?this.opctions.phoneHirePrice:0)*1 - this.opctions.childDiscount*this.opctions.childrenNum - (this.opctions.couponDiscount?this.opctions.couponDiscount:0));
			}

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
			max-height: 320px;
			overflow-y: auto;
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
			.line{
				height: 1px;
				background-color: #ddd;
				overflow: hidden;
				width: calc(100% - 30px);
				margin: 0 auto;
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
								line-height: 34px;
								font-size: 18px;
								&:hover {
									border-color: #1bbc9d;
								}
							}
						}
					}
					input{
						border: 1px solid;
						border-radius: 3px;
						border-color:#858585 #c2c2c2 #c2c2c2;
						box-shadow:inset 0 1px 0 rgba(0,0,0,.1), inset 0 1px 1px rgba(0,0,0,.05);
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
							
							border: 1px solid;
							border-radius: 3px;
							border-color:#858585 #c2c2c2 #c2c2c2;
							box-shadow:inset 0 1px 0 rgba(0,0,0,.1), inset 0 1px 1px rgba(0,0,0,.05);
							resize: none;
							padding:6px 10px 10px;
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
							border: 1px solid;
							border-radius: 3px;
							border-color:#858585 #c2c2c2 #c2c2c2;
							box-shadow:inset 0 1px 0 rgba(0,0,0,.1), inset 0 1px 1px rgba(0,0,0,.05);
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

				.pickup_info{
					margin-top: 15px;
					padding: 15px 10px 20px;
					box-shadow: 0px 2px 6px 0px rgba(0, 0, 0,.1);
					width: 704px;
					background: #faf9f8;
					h3{
						font-size: 18px;
    				font-weight: bold;
						margin-top: 0;
						span{ font-size: 14px; font-weight: normal; margin-left: 10px; color: #666;}
					}
					.pickup_info_check{
						font-size: 16px;
						margin-top: 6px;
					}

					.pickup_info_list{
						h4{
							font-size: 16px;
							font-weight: bold;
							margin-top: 15px;
						}
						.pickup_info_location{
							overflow: hidden;
							margin-top: 10px;
							li{
								float: left;
								margin-right: 20px;
								font-size: 14px;
							}
						}
						.pickup_location_content{
							margin-top: 15px;
							h5{
								font-size: 16px;
							}
							.textarea{
								margin-top: 8px;
								width: 100%;
								box-shadow: inset 0 1px 0 rgba(0, 0, 0, .1), inset 0 1px 1px rgba(0, 0, 0, .05);
								padding: 6px 10px 10px;
								resize: none;
								border-radius: 3px;
							}
							.location_list{
								overflow: hidden;
								margin-top: 20px;
								li{
									float: left;
									width: 50%;
									line-height: 32px;
									font-size: 14px;
									margin-bottom: 15px;
									span{
										float: left;
										width: 110px;
										text-align: right;
										white-space: nowrap;
										margin-right: 10px;
									}
									input{
										height: 32px;
										line-height: 30px;
										font-size: 16px;
										vertical-align: top;
										border: 1px solid;
										border-color: #858585 #c2c2c2 #c2c2c2;
										border-radius: 3px;
										box-shadow: inset 0 1px 0 rgba(0, 0, 0, .1), inset 0 1px 1px rgba(0, 0, 0, .05);
									}
									
								}
								.w_max{
									width: 100%;
									input{
										width: 530px;
									}
								}
							}
							.location_list_address{
								li{
									width: 100%;
									span{
										width: 150px;
									}
								}
								.w_max{
									input{
										width: 430px;
									}
								}
							}
						}
						.pandaPhone_location_check{
							font-size: 16px;
							.radio_label{
								padding: 5px 0 5px 20px;
							}
						}
						.pandaPhone_info{
							margin-top: 10px;
							
							h5{
								
							}
							.pandaPhone_info_list{
								margin-top: 8px;
								padding-right: 36px;
								input,.pickup_time{
									height: 32px;
									line-height: 30px;
									font-size: 16px;
									vertical-align: top;
									border: 1px solid;
									border-color: #858585 #c2c2c2 #c2c2c2;
    							border-radius: 3px;
									box-shadow: inset 0 1px 0 rgba(0, 0, 0, .1), inset 0 1px 1px rgba(0, 0, 0, .05);
									width: 46%;
								}
								.pickup_time{
									margin-left: 50px;
								}
								.w_max{
									width: 100%;
								}
							}
						}
					}

					.venue_detail{
						h3{
							span{
								color: red;
								font-size: 18px;
							}
							margin-bottom: 5px;
						}
						.venue_check{
							font-size: 16px;
							.radio_label{
								padding: 5px 0 5px 20px;
							}
						}
						.venue_tip{
							font-size: 14px;
							padding: 5px 0 5px 28px;
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

		.pp_dialog_bg,.next_info_tip_bg{
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
		
		.next_info_tip{
			position: fixed;
			left: 50%;
			top: 50%;
			width: 800px;
			margin: -100px 0 0 -400px;
			padding: 30px 50px;
			background-color: #fff;
			z-index: 99;
			border: 1px solid #eee;
			box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
			p{
				font-size: 20px;
				b{
					color: #666;
				}
			}
			.next_info_btn{
				text-align: center;
				margin-top: 30px;
				span{
					margin: 0 20px;
					display: inline-block; width: 200px; height: 38px; line-height: 36px; text-align: center; color: #1bbc9d; border-radius:19px; color: #fff; font-size: 16px; cursor: pointer;
					background-image: -webkit-gradient(linear, right top, left top, from(#009efd), to(#1bbc9d));
					background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
					&:nth-child(1){
						color: #1bbc9d;
						background: #fff;
						border: 1px solid #1bbc9d;
					}
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
		.today{
			border-color:#ddd!important;
		}
		.valError{
			border: 1px solid #e14f3f!important;
		}
		.vTip{ display: none!important;}

		.location_list{
			.el-input__inner{
				width: 185px;
				height: 32px;
				line-height: 30px;
				font-size: 16px;
				vertical-align: top;
				border: 1px solid;
				border-color: #858585 #c2c2c2 #c2c2c2;
				border-radius: 3px;
				box-shadow: inset 0 1px 0 rgba(0, 0, 0, .1), inset 0 1px 1px rgba(0, 0, 0, .05);
				padding: 0 0 0 10px;
			}
			.el-input__icon{
				display: none;
			}
			.el-popper{
				margin: 8px;
			}
			.arrivalTimeError{
				input{
					border: 1px solid #f00!important;
				}
			}
		}
	}

</style>