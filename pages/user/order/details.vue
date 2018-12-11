<template>
	<div class="orderDetails" @click="bodyClick">
		<HeaderCommon :logIn="logIn"></HeaderCommon>

		<div class="main">
			<!-- 面包屑 -->
			<div class="crumbs">
				<a href="/">Home</a> <i class="iconfont">&#xe64a;</i>
				<!-- <a :href="'/user/myBookings?email='+email+'&orderid='+details.orderId">My Bookings</a> <i class="iconfont">&#xe64a;</i> -->
				<a :href="'/user/myBookings?menu=0&flag=1'">My Bookings</a> <i class="iconfont">&#xe64a;</i>
				<span class="c_999">Order Details</span>
			</div>

			<!-- <h2>Order Details</h2> -->
			<div class="content_box">
				<h3>Booking  Information</h3>
				<div class="content_detail clearfix">
					<div class="img_box">
						<img :src="details.activityInfo.coverPhotoUrl" alt="">
						<a :href="'/activity/details/'+details.activityInfo.activityId" target="_blank">Book Again</a>
					</div>
					<ul class="content_list list_float">
						<li><b>Booking ID :</b>{{details.orderId}}</li>
						<li><b>Booking Time : </b>{{formatDate(details.createTime.substring(0,10))}}{{details.createTime.substring(10)}} (EST)</li>
						<li><b>Order Status :</b>{{getStatus(details.status)}}</li>
						<li><b>Amount :</b>{{details.currency}} {{details.symbol}} {{details.amount}}</li>
						<li><b>Number of Travelers :</b>{{details.adultNum+(details.adultNum>1?'Adults':'Adult')}} , {{details.childrenNum+(details.childrenNum>1?'Children':'Child')}}</li>
						<li><b>Travel Date :</b>{{formatDate(details.startDate)}}</li>
						<li class="wmax"><b>Product :</b><a :href="'/activity/details/'+details.activityInfo.activityId" target="_blank">{{details.activityInfo.title}}</a></li>
						<li><b>Duration :</b>{{details.activityInfo.duration}}{{getDurationUnit(details.activityInfo.duration,details.activityInfo.durationUnit)}}</li>
						<li><b>Category :</b>{{details.activityInfo.category?details.activityInfo.category:'Panda Phone'}}</li>
						<li v-if="details.phoneHire"><b>Panda Phone Service </b>{{details.phoneDepositPayOnline?'(deposit included)':''}}</li>
						<li v-if="details.phoneHire"><b>Deposit payment options :</b>{{details.phoneDepositPayOnline?'Online':'Offline'}}</li>
					</ul>
				</div>
			</div>

			<div class="content_box">
				<h3>Contact Information</h3>
				<div class="content_detail">
					<ul class="content_list list_float">
						<li><b>First Name :</b>{{details.contactInfo.firstName}}</li>
						<li><b>Last Name : </b>{{details.contactInfo.lastName}}</li>
						<li><b>Email Address :</b>{{details.contactInfo.emailAddress}}</li>
						<li><b>Mobile Phone :</b>{{details.contactInfo.phoneNumber}}</li>
						<li><b>Country or Territory Code :</b>{{details.contactInfo.nationality}}</li>
					</ul>
				</div>
			</div>

			<div class="content_box" v-if="details.activityInfo.pickup==0 && details.activityInfo.venues">
				<h3 v-if="details.contactInfo.phoneDeliverySameAsPickup && details.phoneHire && !details.contactInfo.phoneDelivery">Meeting Point & Panda Phone Device delivery Information</h3>
				<h3 v-else>Meeting Point Information</h3>
				<div class="content_detail">
					<ul class="content_list" v-if="details.contactInfo.meetingPoint">
						<li><b>Venue :</b>{{details.contactInfo.meetingPoint}}</li>
					</ul>
					<div class="content_btn" @click="pickupDialog=true" v-else>The field is empty. Please enter your info</div>
				</div>
			</div>

			<div class="content_box" v-if="details.activityInfo.pickup>0">
				<h3 v-if="details.contactInfo.phoneDeliverySameAsPickup && details.phoneHire && !details.contactInfo.phoneDelivery">Pick-up & Panda Phone Device delivery  Information</h3>
				<h3 v-else>Pick-up Information</h3>
				<div class="content_detail">
					<div v-if="details.contactInfo.pickup">
						<ul class="content_list" v-if="getValue(details.contactInfo.pickup,'Pick-up Location')=='Hotel'">
							<li><b>Pick-up Location :</b>{{getValue(details.contactInfo.pickup,'Pick-up Location')}}</li>
							<li><b>Pick-up Time :</b>{{getValue(details.contactInfo.pickup,'Pick-up Time')}}</li>
							<li><b>Hotel Name & Address : </b>{{getValue(details.contactInfo.pickup,'Hotel Name & Address')}}</li>
						</ul>
						<ul class="content_list" v-else-if="getValue(details.contactInfo.pickup,'Pick-up Location')=='Airport'">
							<li><b>Pick-up Location :</b>{{getValue(details.contactInfo.pickup,'Pick-up Location')}}</li>
							<li><b>Flight Number :</b>{{getValue(details.contactInfo.pickup,'Flight Number')}}</li>
							<li><b>Arrival Time : </b>{{getValue(details.contactInfo.pickup,'Arrival Time')}}</li>
							<li><b>Airport : </b>{{getValue(details.contactInfo.pickup,'Airport')}}</li>
						</ul>
						<ul class="content_list" v-else-if="getValue(details.contactInfo.pickup,'Pick-up Location')=='Cruise Port'">
							<li><b>Pick-up Location :</b>{{getValue(details.contactInfo.pickup,'Pick-up Location')}}</li>
							<li><b>Cruise Number :</b>{{getValue(details.contactInfo.pickup,'Cruise Number')}}</li>
							<li><b>Arrival Time : </b>{{getValue(details.contactInfo.pickup,'Arrival Time')}}</li>
							<li><b>Cruise Port : </b>{{getValue(details.contactInfo.pickup,'Cruise Port')}}</li>
						</ul>
						<ul class="content_list" v-else-if="getValue(details.contactInfo.pickup,'Pick-up Location')=='Railway Station'">
							<li><b>Pick-up Location :</b>{{getValue(details.contactInfo.pickup,'Pick-up Location')}}</li>
							<li><b>Train Number :</b>{{getValue(details.contactInfo.pickup,'Train Number')}}</li>
							<li><b>Arrival Time : </b>{{getValue(details.contactInfo.pickup,'Arrival Time')}}</li>
							<li><b>Railway Station : </b>{{getValue(details.contactInfo.pickup,'Railway Station')}}</li>
						</ul>
						<ul class="content_list" v-else-if="getValue(details.contactInfo.pickup,'Pick-up Location')=='Address or Intersection'">
							<li><b>Pick-up Location :</b>{{getValue(details.contactInfo.pickup,'Pick-up Location')}}</li>
							<li><b>Pick-up Time :</b>{{getValue(details.contactInfo.pickup,'Pick-up Time')}}</li>
							<li><b>Address or Intersection : </b>{{getValue(details.contactInfo.pickup,'Address or Intersection')}}</li>
						</ul>
					</div>
					<div class="content_btn" @click="pickupDialog=true" v-else>The field is empty. Please enter your info</div>
				</div>
			</div>

			<div class="content_box" v-if="details.phoneHire && !details.contactInfo.phoneDeliverySameAsPickup || details.contactInfo.phoneDelivery">
				<h3>Panda Phone Device delivery  Information</h3>
				<div class="content_detail">
					<ul class="content_list" v-if="details.contactInfo.phoneDelivery">
						<li><b>Delivery Address :</b>{{getValue(details.contactInfo.phoneDelivery,'Panda Phone Delivery Address ( Hotel Only )')}}</li>
						<li><b>Delivery Date & Time : </b>{{formatDate(getValue(details.contactInfo.phoneDelivery,'Delivery Date ( Beijing Time )')) + ' ' +getValue(details.contactInfo.phoneDelivery,'Delivery Time ( Beijing Time )')}}</li>
					</ul>
					<div class="content_btn" @click="pickupDialog=true" v-else>The field is empty. Please enter your info</div>
				</div>
			</div>


			<div class="content_box" v-if="details.activityInfo.passportRequired">
				<h3>Passport Informaiton</h3>
				<div class="content_detail">
					<div class="content_passport" v-if="details.contactInfo.passport">
						<div class="content_passport_list" v-for="(items,index) in getParse(details.contactInfo.passport)" :key="index">
							<h4 class="mt0">Traveler {{index+1}}</h4>
							<ul class="content_list list_float">
								<li><b>First Name :</b>{{items['First Name']}}</li>
								<li><b>Last Name :</b>{{items['First Name']}}</li>
								<li><b>Passport Number :</b>{{items['Passport Number']}}</li>
								<li><b>Birthday :</b>{{items['Birthday']}}</li>
								<li><b>Gender :</b>{{items['Gender']}}</li>
								<li><b>Nationality :</b>{{items['Nationality']}}</li>
							</ul>
						</div>
					</div>
					<div class="content_btn" @click="passportDialog=true" v-else>The field is empty. Please enter your info</div>
				</div>
			</div>




		</div>
		

		<FooterCommon></FooterCommon>

		
		<!-- service弹窗 -->
		<dialogBox v-model="pickupDialog" confirmShow="true" confirmText="Confirm" @confirmCallback="pickupDialogCallback" width="900">
			<!-- 补填信息板块 -->
			<div class="pickup_info">
				<div class="pickup_detail" v-if="details.activityInfo.pickup">

					<div class="pickup_info_list">
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
							<ul class="location_list location_list_address">
								<li><span><i class="red">*</i> Pick-up Time</span> 
									<!-- <input class="js_validate" vType="text" type="text" v-model="pickupData.pickupTime"> -->
									<el-time-picker 
										:class="{'arrivalTimeError':arrivalTimeError}" 
										@focus="arrivalTimeError=false" 
										v-model="pickupData.arrivalTime" 
										:picker-options="{
											format: 'HH:mm'
										}"
										value-format="HH:mm" 
										:default-value="new Date(details.startDate.split('-')[0], details.startDate.split('-')[1]-1, details.startDate.split('-')[2], 8, 0)"  
										placeholder="">
									</el-time-picker>
								</li>
								<li class="w_max"><span><i class="red">*</i> Hotel Name & Address</span> <textarea class="textarea js_validate" vType="text" type="text" v-model="pickupData.hotel" rows="2"></textarea></li>
							</ul>
							<!-- <h5><span class="red">*</span>Hotel Name & Address: </h5>
							<textarea v-model="pickupData.hotel" class="textarea js_validate" vType="text" rows="5"></textarea> -->
						</div>

						<!-- Airport -->
						<div class="pickup_location_content" v-show="pickupLocation=='Airport'">
							<ul class="location_list">
								<li><span><i class="red">*</i> Flight Number</span> <input class="js_validate" vType="text" type="text" v-model="pickupData.flightNumber"></li>
								<li><span><i class="red">*</i> Arrival Time</span> 
									<!-- <input class="js_validate js_changetime" vType="text" type="text" v-model="pickupData.arrivalTime"> selectableRange: '00:00:00 - 23:59:00',-->
									<el-time-picker 
										:class="{'arrivalTimeError':arrivalTimeError}" 
										@focus="arrivalTimeError=false" 
										v-model="pickupData.arrivalTime" 
										:picker-options="{
											format: 'HH:mm'
										}"
										value-format="HH:mm" 
										:default-value="new Date(details.startDate.split('-')[0], details.startDate.split('-')[1]-1, details.startDate.split('-')[2], 8, 0)"  
										placeholder="">
									</el-time-picker>
								</li>
								
								<li class="w_max"><span><i class="red">*</i> Airport</span> <input class="js_validate" vType="text" type="text" v-model="pickupData.airport"></li>
							</ul>
						</div>
						<!-- Cruise Port -->
						<div class="pickup_location_content" v-show="pickupLocation=='Cruise Port'">
							<ul class="location_list">
								<li><span><i class="red">*</i> Cruise Number</span> <input class="js_validate" vType="text" type="text" v-model="pickupData.cruiseNumber"></li>
								<li><span><i class="red">*</i> Arrival Time</span> 
								<!-- <input class="js_validate js_changetime" vType="text" type="text" v-model="pickupData.arrivalTime"> -->
									<el-time-picker 
										:class="{'arrivalTimeError':arrivalTimeError}" 
										@focus="arrivalTimeError=false" 
										v-model="pickupData.arrivalTime" 
										:picker-options="{
											format: 'HH:mm'
										}"
										value-format="HH:mm" 
										:default-value="new Date(details.startDate.split('-')[0], details.startDate.split('-')[1]-1, details.startDate.split('-')[2], 8, 0)"  
										placeholder="">
									</el-time-picker>
								</li>
								
								<li class="w_max"><span><i class="red">*</i> Cruise Port</span> <input class="js_validate" vType="text" type="text" v-model="pickupData.cruisePort"></li>
							</ul>
						</div>

						<!-- Railway Station -->
						<div class="pickup_location_content" v-show="pickupLocation=='Railway Station'">
							<ul class="location_list">
								<li><span><i class="red">*</i> Train Number</span> <input class="js_validate" vType="text" type="text" v-model="pickupData.trainNumber"></li>
								<li><span><i class="red">*</i> Arrival Time</span> 
									<el-time-picker 
										:class="{'arrivalTimeError':arrivalTimeError}" 
										@focus="arrivalTimeError=false" 
										v-model="pickupData.arrivalTime" 
										:picker-options="{
											format: 'HH:mm'
										}"
										value-format="HH:mm" 
										:default-value="new Date(details.startDate.split('-')[0], details.startDate.split('-')[1]-1, details.startDate.split('-')[2], 8, 0)"  
										placeholder="">
									</el-time-picker>
								</li>
								
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
										@focus="arrivalTimeError=false" 
										v-model="pickupData.arrivalTime" 
										:picker-options="{
											format: 'HH:mm'
										}"
										value-format="HH:mm" 
										:default-value="new Date(details.startDate.split('-')[0], details.startDate.split('-')[1]-1, details.startDate.split('-')[2], 8, 0)"  
										placeholder="">
									</el-time-picker>
								</li>
								<li class="w_max"><span><i class="red">*</i> Address or Intersection</span> <input class="js_validate" vType="text" type="text" v-model="pickupData.address"></li>
							</ul>
						</div>




					</div>
				</div>

				<div class="venue_detail" v-else-if="!details.contactInfo.meetingPoint && details.activityInfo.venues && details.activityInfo.venues[0]!=''">
					<h3>Please select a Venue<span class="red">*</span></h3>
					<div class="red venue_tip" v-if="venueTip">Field is required</div>
					<div class="venue_check" v-for="item in details.activityInfo.venues" :key="item">
						<radio v-model="venueAddress" :label="item">{{item}}</radio>
					</div>
					
				</div>

				<div class="pickup_info_list" v-if="details.phoneHire">
					<h4 v-if="details.activityInfo.venues && details.activityInfo.pickup==0 || details.activityInfo.pickup>0">Panda Phone Device Delivery Information</h4>
					<div class="pandaPhone_location" v-if="details.activityInfo.venues && details.activityInfo.pickup==0 || details.activityInfo.pickup>0">
						<div class="pandaPhone_location_check mt5">
							<radio v-model="pandaPhoneLocation" :label="true">I want my device to be delivered upon my pickup</radio>
						</div>
						<div class="pandaPhone_location_check">
							<radio v-model="pandaPhoneLocation" :label="false">I want to receive my device at a venue/time different from my pickup venue/time</radio>
						</div>
					</div>

					<div class="pandaPhone_info" v-show="!pandaPhoneLocation || !details.activityInfo.venues && details.activityInfo.pickup==0">
						<h5><span class="red">*</span> Panda Phone Delivery Address ( Hotel Only )</h5>
						<div class="pandaPhone_info_list">
							<input class="w_max js_validate" vType="text" v-model="pandaPhoneAddress" type="text" placeholder="">
						</div>
					</div>
					<div class="pandaPhone_info" v-show="!pandaPhoneLocation || !details.activityInfo.venues && details.activityInfo.pickup==0">
						<h5><span class="red">*</span> Delivery Date & Time ( Beijing Time )</h5>
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
		</dialogBox>

		<!-- passportDialog -->
		<dialogBox v-model="passportDialog" confirmShow="true" confirmText="Submit" @confirmCallback="passportDialogCallback" width="900">
			<p class="passport_tip">Every traveler's passport information is needed for booking this trip</p>
			<dl class="passport_list" v-for="(items,index) in passportData" :key="index" v-if="passportData.length">
				<dt>Traveller {{index+1}}</dt>
				<dd>
					<ul class="passport_list_info clearfix">
						<li><b><span class="red">*</span> Passport Number</b><input class="input js_validate_passport" v-model="items['Passport Number']" vType="text" type="text"></li>
						<li><b><span class="red">*</span> Birthday</b>
							<div class="date_box">
								<input class="input js_validate_passport" :class="{'valError':!items['Birthday']&&passportDialogClick}" v-model="items['Birthday']" vType="text" type="text">
								<el-date-picker
									v-model="items['Birthday']"
									type="date" 
									value-format="yyyy-MM-dd" 
									placeholder="选择日期">
								</el-date-picker>
							</div>
							
						</li>
						<li><b><span class="red">*</span> First Name</b><input class="input js_validate_passport" v-model="items['First Name']" vType="text" type="text"></li>
						<li><b><span class="red">*</span> Last Name</b><input class="input js_validate_passport" v-model="items['Last Name']" vType="text" type="text"></li>
						<li><b><span class="red">*</span> Nationality</b><input class="input js_validate_passport js_nationality" @click.stop="nationalityChange($event,index)" v-model="items['Nationality']" vType="text" type="text">
							<div class="countryCode">
								<ul v-if="codeList.length>0">
									<li v-for="(item,index2) in codeListHot" @click.stop="changeNationality(index,item.country_name)"  v-if="codeListHot.length>0 && !items['Nationality']">{{item.country_name}}</li>
									<li class="line" v-if="!items['Nationality']"></li>
									<li v-for="(item,index2) in codeList" @click.stop="changeNationality(index,item.country_name)">{{item.country_name}}</li>
								</ul>
								<div class="empty" v-else-if="items['Nationality']">There are no results that match your search.</div>
							</div>
						</li>
						<li><b><span class="red">*</span> Gender</b>
							<radio v-model="items['Gender']" label="Male">Male</radio>
							<radio v-model="items['Gender']" label="Female">Female</radio>
							<span class="red gender_tips" v-if="!items['Gender'] && passportDialogClick">Field is required</span>
						</li>
					</ul>
				</dd>
			</dl>
		</dialogBox>

		<Loading :loadingStatus="loadingStatus"></Loading>

	</div>
</template>

<script>
	import { regExp ,formatDate} from '~/assets/js/plugin/utils'
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon'
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	import { radioGroup, radio } from "~/plugins/panda/radio/";
	import { checkboxGroup, checkbox } from "~/plugins/panda/checkbox/";
	import dialogBox from '~/plugins/panda/dialogBox';
	import Loading from '~/components/Loading/Loading'
	import Validate from "~/plugins/panda/validate/";
	import countryCode from '~/assets/js/countryCode.js'
	import Flatpickr from 'flatpickr';
	require('~/assets/scss/G-ui/flatpickr.min.css')

	import Vue from 'vue';

	export default {
		name: 'orderDetails',
		async asyncData({ route, store, error, apiBasePath, redirect }) {
			let query = route.query;
			var type = query.type,
				email = query.email,
				orderId = query.orderId;
			
			if(!type || !email || !orderId){
				return error({
					statusCode: 500,
					message: JSON.stringify(error)
				});
			}

			
			let data = {
				logIn:'',
				email: email,
				apiBasePath: apiBasePath,

				details:{},

				pickupDialog: false,
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
				passportData:[],
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
				arrivalTimeError:false,
				passportDialog:false,
				passportDialogClick:false,
				loadingStatus:false,

				countryCode: countryCode.phone_countries,
				codeListHot: [],
				codeList: countryCode.phone_countries,
				mobileCode: '',
				focusPassIndex:0
			};

			var detailData = await Vue.axios.get(apiBasePath+"order/activity/detail?orderId="+orderId+"&email="+email);
			data.details = detailData.data;

			//判断护照信息，初始化护照表单
			if(!data.details.contactInfo.passport){
				var people = data.details.adultNum*1 + data.details.childrenNum*1;
				for(var i=0;i<people;i++){
					data.passportData.push({
						"Passport Number":'',
						"Birthday":'',
						"First Name":'',
						"Last Name":'',
						"Nationality":'',
						"Gender":'',
					});
				}
			}
			

			return data;
		},
		components: {
			HeaderCommon,
			FooterCommon,
			dialogBox,
			checkboxGroup,
			checkbox,
			radioGroup,
			radio,
			Loading
		},
		 head() {
			let title = 'Order Details';
			let description = 'Review your profile with Local Panda '
			let keywords ='My Profile, Local Panda'
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
		methods: {
			formatDate,
			getStatus(type){
				if(type == 'PAYMENT_PENDING'){
					return 'Payment Pending';
				}else if(type == 'PAYMENT_SUCCESS' || type == 'CONFIRM_WAITING'){
					return 'To be confirmed';
				}else if(type == 'BOOKING_SUCCESS'){
					return 'Confirmed';
				}else if(type == 'COMPLETED'){
					return 'Tour completed';
				}else if(type == 'REFUNDING'){
					return 'Refund in progress';
				}else if(type == 'REFUNDED'){
					return 'Refund completed';
				}else if(type == 'CANCELED'){
					return 'Canceled';
				};
			},
			getDays(startDate,endDate){
				var startArr = startDate.split('-'),
					endArr = endDate.split('-');
				var dateS = new Date(startArr[0],startArr[1]-1,startArr[2]).getTime(),
          dateE = new Date(endArr[0],endArr[1]-1,endArr[2]).getTime();
				var days = (dateE - dateS)/1000/60/60/24+1;
				return days;
			},
			getDurationUnit(number,type){
				if(type=='HOURS'){
					if(number>1){
						return 'Hours';
					}else{
						return 'Hour';
					}
				}else{
					if(number>1){
						return 'Days';
					}else{
						return 'Day';
					}
				}
			},
			getPickupData(){
				var pickupLocation = this.pickupLocation;
				var pickupData = this.pickupData;

				if(this.details.activityInfo.pickup==0){
					return null;
				}else if(pickupLocation == 'Hotel'){
					return {
						"Pick-up Location": 'Hotel',
						"Pick-up Time": pickupData.arrivalTime,
						"Hotel Name & Address": pickupData.hotel
					};
				}else if(pickupLocation == 'Airport'){
					return {
						"Pick-up Location": 'Airport',
						"Flight Number": pickupData.flightNumber,
						"Arrival Time": pickupData.arrivalTime,
						"Airport": pickupData.airport
					};
				}else if(pickupLocation == 'Cruise Port'){
					return {
						"Pick-up Location": 'Cruise Port',
						"Cruise Number": pickupData.cruiseNumber,
						"Arrival Time": pickupData.arrivalTime,
						"Cruise Port": pickupData.cruisePort
					};
				}else if(pickupLocation == 'Railway Station'){
					return {
						"Pick-up Location": 'Railway Station',
						"Train Number": pickupData.trainNumber,
						"Arrival Time": pickupData.arrivalTime,
						"Railway Station": pickupData.railwayStation
					};
				}else if(pickupLocation == 'Address or Intersection'){
					return {
						"Pick-up Location": 'Address or Intersection',
						"Pick-up Time": pickupData.arrivalTime,
						"Address or Intersection": pickupData.address
					};
				}
			},
			getPhoneDelivery(){
				if(this.pandaPhoneLocation){
					return null;
				}
				var data = {
					"Delivery Date ( Beijing Time )": this.arrivalDate,
					"Delivery Time ( Beijing Time )": this.arrivalTime,
					"Panda Phone Delivery Address ( Hotel Only )": this.pandaPhoneAddress
				};
				return data;
			},
			getParse(objStr){
				var obj = objStr;
				if(typeof objStr == 'string'){
					obj = JSON.parse(obj);
				}
				return obj;
			},
			getValue(objStr,key){
				if(objStr){
					var obj = objStr;
					if(typeof objStr != 'object'){
						obj = JSON.parse(obj);
					}
					return obj[key];
				}else{
					return '';
				}
				
			},
			bodyClick(){
				this.hideCode();
			},
			hideCode(){
				var countryCode = document.querySelectorAll('.countryCode');
				for(var i=0;i<countryCode.length;i++){
					var thisData = countryCode[i];
					thisData.style.display = 'none';
				}
			},
			changeNationality(index,value){
				// this.codeList = this.countryCode;
				
				this.passportData[index].Nationality = value;
				this.hideCode();
			},
			nationalityChange(e,index){
				this.hideCode();
				e.target.className = e.target.className.replace(' valError','');
				var parent = e.target.parentNode.querySelector('.countryCode');
				parent.style.display = 'block';
				this.complete(e.target.value);
				this.focusPassIndex = index;
			},
			pickupDialogCallback(){
				this.fromValidate = new Validate({
					inputClassName:'js_validate', //需要校验的input的className
					errorClassName:'valError',  //报错时，会自动在input上添加的className
					stopFocus: true
				});
				
				if(this.details.activityInfo.pickup && !this.pickupData.arrivalTime){
					this.fromValidate.validate();
					this.arrivalTimeError = true;
					if(document.querySelector('.pickup_info_location')){
						document.querySelector('.pickup_info_location').scrollIntoViewIfNeeded();
					}
					
				}else if(!this.venueAddress && this.details.activityInfo.pickup==0){
					this.venueTip = true;
				}else if(this.fromValidate.validate()){
					var self = this;
					self.loadingStatus = true;

					var postData = {
						orderId: this.details.orderId,
						contactInfo:{
							pickup: self.getPickupData() ? JSON.stringify(self.getPickupData()) : null,
							phoneDeliverySameAsPickup: self.pandaPhoneLocation,
							phoneDelivery: self.getPhoneDelivery() ? JSON.stringify(self.getPhoneDelivery()) : null
						}
					};

					if(self.details.activityInfo.venues && self.details.activityInfo.pickup==0){
						postData.contactInfo.meetingPoint = self.venueAddress;
					}


					self.axios.post( "https://api.localpanda.com/api/order/activity/extra/info", JSON.stringify(postData), {
						headers: {
							'Content-Type': 'application/json'
						}
					}).then(function(response) {
						self.loadingStatus = false;
						self.pickupDialog = false;

						self.details.contactInfo.pickup = postData.contactInfo.pickup;
						self.details.contactInfo.phoneDelivery = postData.contactInfo.phoneDelivery;
						self.details.contactInfo.meetingPoint = postData.contactInfo.meetingPoint;
						
					}, function(response) {
						self.loadingStatus = false;
						self.pickupDialog = false;
					});

					


				}
			},
			passportDialogCallback(){
				this.passportDialogClick = true;
				if(this.fromValidatePassport.validate() && !document.querySelector('.gender_tips')){
					
					

					var self = this;
					self.loadingStatus = true;

					var postData = {
						orderId: this.details.orderId,
						contactInfo:{
							passport: JSON.stringify(this.passportData)
						}
					};
					self.axios.post( "https://api.localpanda.com/api/order/activity/extra/info", JSON.stringify(postData), {
						headers: {
							'Content-Type': 'application/json'
						}
					}).then(function(response) {
						self.loadingStatus = false;
						self.passportDialog = false;
						self.details.contactInfo.passport = self.passportData;
					}, function(response) {
						self.loadingStatus = false;
						self.passportDialog = false;
					});
					
				}
			},
			complete(val){
				let self = this;
				val=val.replace(/(^\s+)|(\s+$)/g, "")
				
				if(val) {
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
					self.codeList = self.countryCode

				}
			}
		},
		mounted: function() {
			console.log(this.details);
			console.log(this.$data);

			this.logIn = window.localStorage.getItem("logstate");

			// if(this.logIn){
			// 	var userInfo = window.localStorage.getItem("obj");
			// 	this.email = userInfo ? (JSON.parse(userInfo)).emailAddress : '';
			// }

			var contactInfo = this.details.contactInfo;
			var obj = {"lastName":contactInfo.lastName,"firstName":contactInfo.firstName,"emailAddress":contactInfo.emailAddress};
			localStorage.setItem('obj',JSON.stringify(obj));

			this.$nextTick(()=>{
				new Flatpickr('.js_deliverytime',{
					minDate: new Date(new Date()*1+24*60*60*1000),
					disable:[this.details.startDate]
				});
				
				

				this.fromValidatePassport = new Validate({
					inputClassName:'js_validate_passport', //需要校验的input的className
					errorClassName:'valError',  //报错时，会自动在input上添加的className
					stopFocus: true
				});
			});


			this.codeListHot = [
				{"country_name": "United States","prefix": "1"},
				{"country_name": "United Kingdom","prefix": "44"},
				{"country_name": "China Mainland","prefix": "86"},
				{"country_name": "Canada","prefix": "1"},
				{"country_name": "Australia",	"prefix": "61"},
				{"country_name": "New Zealand","prefix": "64"}
			];


			
			if(this.details.activityInfo.pickup==0 && !this.details.activityInfo.venues){
				this.pandaPhoneLocation = false;
			}


		},
		watch:{
			'passportData':{
				handler: function(value, oldVal) {
					console.log(this.focusPassIndex);
					var val = value[this.focusPassIndex].Nationality;
					this.complete(val);
					
				},
				deep: true
			},
			venueAddress:function(){
				this.venueTip  = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
.orderDetails{
	.main{
		width: 1200px;
		margin: 0 auto;
		padding: 30px 0;
		
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
		a:hover{
			text-decoration: underline;
			color: #1bbc9d;
		}
	}

	h2{
		font-size: 24px;
		margin-top:20px;
	}
	.content_box{
		margin-top: 20px;
		border: 1px solid rgba(0,0,0,0.15);
		box-shadow: 0 0 20px rgba(0,0,0,0.1);
		h3{
			font-size: 18px;
			font-weight: bold;
			background-color: #eee;
			padding-left: 25px;
			height: 44px;
			line-height: 44px;
		}
		.content_detail{
			padding: 20px 25px;
			h4{
				font-size: 18px;
				margin-top: 20px;
				margin-bottom: 6px;
			}
			.mt0{
				margin-top: 0;
			}
			.img_box{
				float: right;
				width: 250px;
				text-align: center;
				img{
					width: 100%;
				}
				a{
					display: inline-block;
					margin-top: 5px;
					
					padding: 0 20px;
					height: 32px;
					line-height: 30px;
					border-radius: 16px;
					color: #fff;
					font-size: 16px;
					background-image: -webkit-gradient(linear, right top, left top, from(#009efd), to(#1bbc9d)), -webkit-gradient(linear, left top, left bottom, from(#1bbc9d), to(#1bbc9d));
					background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%), linear-gradient(#1bbc9d, #1bbc9d);
				}
			}
			.content_list{
				overflow: hidden;
				width: 830px;
				li{
					line-height: 22px;
					padding: 5px 0;
					font-size: 16px;
					b{
						margin-right: 10px;
					}
					a{
						color: #1bbc9d;
						&:hover{
							text-decoration: underline;
						}
					}
				}
			}
			.list_float{
				li{
					float: left;
					width: 400px;
				}
			}
			.content_btn{
				width: 360px;
				margin: 0 auto;
				cursor: pointer;
				height: 42px;
				line-height: 40px;
				border-radius: 21px;
				text-align: center;
				color: #fff;
				font-size: 16px;
				background-image: -webkit-gradient(linear, right top, left top, from(#009efd), to(#1bbc9d)), -webkit-gradient(linear, left top, left bottom, from(#1bbc9d), to(#1bbc9d));
				background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%), linear-gradient(#1bbc9d, #1bbc9d);
			}
		}
		
	}

	.pickup_info{
		margin-top: 15px;
		padding: 15px 10px 20px;
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
					width: 430px;
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
						margin-left: 60px;
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

	.content_passport_list{
		margin-bottom: 15px;
		border-top: #ddd dashed 1px;
		padding-top: 15px;
		&:nth-child(1){
			padding-top: 0;
			border:none;
		}
	}


	.passport_tip{
		font-size: 14px;
		margin-top: 10px;
		color: #f80;
	}
	.passport_list{
		border-top: 1px dashed #ddd;
		margin-top: 20px;
		&:nth-child(2){
			border:none;
		}
		dt{
			font-size: 18px;
			font-weight: bold;
			margin-top: 15px;
		}
		dd{
			margin-top: 10px;
			
			.passport_list_info{
				li{
					padding: 5px 0;
					float: left;
					width: 50%;
					position: relative;
					b{
						display: inline-block;
						width: 120px;
						text-align: right;
						margin-right: 10px;
						font-size: 14px;
						line-height: 32px;
					}
					.input{
						height: 32px;
						line-height: 30px;
						font-size: 16px;
						vertical-align: top;
						border: 1px solid;
						border-color: #858585 #c2c2c2 #c2c2c2;
						border-radius: 3px;
						box-shadow: inset 0 1px 0 rgba(0, 0, 0, .1), inset 0 1px 1px rgba(0, 0, 0, .05);
						width: 250px;
					}

					.countryCode {
						position: absolute;
						top: 37px;
						left: 130px;
						box-shadow: 0px 2px 10px 0px rgba(53, 58, 63, 0.2);
						background: #fff;
						z-index: 2;
						width: 250px;
						display: none;
						ul {
							max-height: 320px;
							overflow-y: auto;
							li {
								padding: 0 10px 0 30px!important;
								height: 40px;
								line-height: 40px;
								font-size: 14px;
								width: 100%!important;
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
						.empty{
							padding: 10px 5px;
						}
					}
					
				}
			}
		}
	}

	

	
}
</style>
<style lang="scss">
.orderDetails{
	#header{
		.heder-cont{
			.init,.search{
				display: none!important;
			}
		}
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

	.pickup_info_location{
		.radio_label {
			.radio_box {
				margin-top: 0!important;
				margin-left: -17px;
			}
			
		}
	}
	.passport_list{
		.radio_label {
			.radio_box {
				margin-top: 0!important;
				margin-left: -17px;
			}
			
		}
	}

	.date_box{
		position: relative;
		display: inline-block;
		vertical-align: top;
		.el-date-editor{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			border:none;
			overflow: hidden;
			.el-input__inner{
				height: 100%;
				opacity: 0;
			}
			span{
				display: none;
			}
		}
	}
	
}
</style>
