<template >
	<div class="MyBookings" >
		<HeaderCommon :logIn="logIn" :isAnonymity="1"></HeaderCommon>
		<div class="MyBookingslist" >
			<MenuTab :menu="menu=0" :logIn="logIn"></MenuTab>
			<div class="bookingsCont">
				<ul v-if="listData.length>0">
					<li :key="index" v-for="(item,index) in listData">
						<h3>{{item.title}}</h3>
						<div class="info clearfix">
							<div class="activitiesImg">
								<img v-lazy="'https://cloud.localpanda.com/pandaphone/list.jpg'" v-if="item.businessType == 'PHONE'">
								<img v-lazy="item.photoUrl" v-else>
							</div>

							<!-- 活动订单明细 -->
							<div class="activitiesText" v-if="item.businessType=='ACTIVITY'">
								<div class="dataId">
									<span>Booking ID: {{item.orderId}}</span>
									<span>Booking Time: {{formatDate(item.createTime.substring(0,10))}}{{item.createTime.substring(10)}} (EST)</span>
								</div>
								<p><b>Category:</b>{{item.category?item.category:'Panda Phone'}} </p>
								<p>
									<b>{{(item.adultNum+item.childrenNum)>1?'Travelers':'Traveler'}}:</b> 
									<span v-if="item.adultNum==1">1 Adult</span>
									<span v-else>{{item.adultNum}} Adults</span>
									<span v-if="item.childrenNum!=0">,</span>
									<span v-if="item.childrenNum!=0">
										<span v-if="item.childrenNum==1">1 Child</span>
										<span v-else>{{item.childrenNum}} Children</span>
									</span>
									
									
								</p>
								
								<p><b>Travel Date: </b>{{formatDate(item.startDate)}}&nbsp;&nbsp;&nbsp;&nbsp;{{formatDate(item.startTime)}}</p>
								<p v-if="item.phoneHire">Panda Phone Service {{item.phoneDepositPayOnline?'(deposit included)':''}}</p>

								<div class="tag">
									<a :href="'/user/order/details?orderId='+item.orderId+'&email='+item.email+'&type=ACTIVITY'">Order Details</a>

									<span  @click="goDetail('ACTIVITY',item.detailUrl)">Book Again</span>

									<span v-if="item.status=='PAYMENT_PENDING'" @click="goPay('ACTIVITY',item.orderId)">To Pay</span>
								</div>
							</div>

							<!-- panda phone 明细 -->
							<div class="activitiesText" v-else-if="item.businessType=='PHONE'">
								<div class="dataId">
									<span>Booking ID: {{item.orderId}}</span>
									<span>Booking Time: {{formatDate(item.createTime.substring(0,10))}}{{item.createTime.substring(10)}} (EST)</span>
								</div>
								
								<p><b>Duration : </b> {{getDays(item.startDate,item.endDate)}} {{getDays(item.startDate,item.endDate)>1?'Days':'Day'}} <span class="ml10">({{formatDate(item.startDate)}} - {{formatDate(item.endDate)}})</span></p>
								<p><b>Number of devices:</b>{{item.deviceNum}} Panda Phone</p>
								<p><b>Deposit payment options:</b>{{item.phoneDepositPayOnline?'Online':'Offline'}}</p>
								<div class="tag">
									<span  @click="goDetail('PHONE')">Book Again</span>

									<span v-if="item.status=='PAYMENT_PENDING'" @click="goPay('PHONE',item.orderId)">To Pay</span>
								</div>
							</div>

							<!-- 导游订单明细 -->
							<!-- <div class="activitiesText" v-else>
								<div class="dataId">
									<span>Booking ID: {{item.orderId}}</span>
									<span>Booking Time: {{item.createTime}} (EST)</span>
								</div>
								<p v-if="item.serviceType=='HIKING'"><b>Service Type:</b> Tour guide</p>
								<p v-else><b>Service Type:</b>Tour guide with a car</p>
								<p><b>Participants:</b> {{item.participants}}</p>
								<p v-if="item.fullDates"><b>Full day date:</b>{{item.fullDates.join(",")}}</p>
								<p v-if="item.halfDates"><b>Half day date:</b>{{item.halfDates.join(",")}}</p>
								<div class="tag">
									<span  @click="goGuideDatil(1,index)">Book Again</span>
									<span @click="downLoad(index)" v-if="item.status!='PAYMENT_PENDING'&&item.status!='REFUNDING'&&item.status!='REFUNDED'&&item.status!='CANCELED'">Download Contract</span>

									<span v-if="item.status=='PAYMENT_PENDING'" @click="goPay('GUIDE_SERVICE',item.orderId)">To Pay</span>
								</div>
							</div> -->



							<div class="bookagain">
								<b class="font-color" v-if="item.status=='PAYMENT_PENDING'">Payment pending</b>
								<b class="font-color" v-if="item.status=='PAYMENT_SUCCESS'||item.status=='CONFIRM_WAITING'">To be confirmed</b>
								<b class="font-color1" v-if="item.status=='BOOKING_SUCCESS'">Confirmed</b>
								<b class="font-color1" v-if="item.status=='COMPLETED'">Tour completed</b>
								<b class="font-color" v-if="item.status=='REFUNDING'">Refund in progress</b>
								<b class="font-color1" v-if="item.status=='REFUNDED'">Refund completed</b>
								<b class="font-color1" v-if="item.status=='CANCELED'">Canceled</b>
								<p>{{getPriceMark(item.currency)}}{{item.amount}}</p>

							</div>
						</div>
					</li>
				</ul>
				
				<!-- <ul v-if="activityList.length>0||phoneList.length>0||bookList.length>0">
					<li :key="index" v-for="(item,index) in activityList" v-if="activityList.length>0">
						<h3>{{item.activityInfo.title}}</h3>
						<div class="info clearfix">
							<div class="activitiesImg">
								<img :src="item.activityInfo.coverPhotoUrl">
							</div>
							<div class="activitiesText">
								<div class="dataId">
									<span>Booking ID: {{item.orderId}}</span>
									<span>Booking Time: {{formatDate(item.createTime.substring(0,10))}}{{item.createTime.substring(10)}} (EST)</span>
								</div>
								<p><b>Category:</b>{{item.activityInfo.category}} </p>
								<p>
									<b>{{(item.adultNum+item.childrenNum)>1?'Travelers':'Traveler'}}:</b> 
									<span v-if="item.adultNum==1">1 Adult</span>
									<span v-else>{{item.adultNum}} Adults</span>
									<span v-if="item.childrenNum!=0">,</span>
									<span v-if="item.childrenNum!=0">
										<span v-if="item.childrenNum==1">1 Child</span>
										<span v-else>{{item.childrenNum}} Children</span>
									</span>
									
									
								</p>
								
								<p><b>Travel Date: </b>{{formatDate(item.startDate)}}&nbsp;&nbsp;&nbsp;&nbsp;{{formatDate(item.startTime)}}</p>
								<div class="tag">
									<span  @click="goGuideDatil(0,index)">Book Again</span>

									<span v-if="item.status=='PAYMENT_PENDING'" @click="goPay('ACTIVITY',item.orderId)">To Pay</span>
								</div>
							</div>
							<div class="bookagain">
								<b class="font-color" v-if="item.status=='PAYMENT_PENDING'">Payment pending</b>
								<b class="font-color" v-if="item.status=='PAYMENT_SUCCESS'||item.status=='CONFIRM_WAITING'">To be confirmed</b>
								<b class="font-color1" v-if="item.status=='BOOKING_SUCCESS'">Confirmed</b>
								<b class="font-color1" v-if="item.status=='COMPLETED'">Tour completed</b>
								<b class="font-color" v-if="item.status=='REFUNDING'">Refund in progress</b>
								<b class="font-color1" v-if="item.status=='REFUNDED'">Refund completed</b>
								<b class="font-color1" v-if="item.status=='CANCELED'">Canceled</b>
								<p>{{getPriceMark(item.currency)}}{{item.amount}}</p>

							</div>
						</div>
					</li>

					<li :key="index" v-for="(item,index) in phoneList" v-if="phoneList.length>0">
						<h3>Panda Phone Service</h3>
						<div class="info clearfix">
							<div class="activitiesImg">
								<img v-lazy="'https://cloud.localpanda.com/pandaphone/list.jpg'">
							</div>
							<div class="activitiesText">
								<div class="dataId">
									<span>Booking ID: {{item.orderId}}</span>
									<span>Booking Time: {{formatDate(item.createTime.substring(0,10))}}{{item.createTime.substring(10)}} (EST)</span>
								</div>
								
								<p><b>Duration : </b> {{getDays(item.startDate,item.endDate)}} {{getDays(item.startDate,item.endDate)>1?'Days':'Day'}} <span class="ml10">({{formatDate(item.startDate)}} - {{formatDate(item.endDate)}})</span></p>
								<p><b>Number of devices:</b>{{item.deviceNum}} Panda Phone</p>
								<p><b>Deposit payment options:</b>{{item.phoneDepositPayOnline?'Online':'Offline'}}</p>
								<div class="tag">
									<span  @click="goDetail('PHONE')">Book Again</span>

									<span v-if="item.status=='PAYMENT_PENDING'" @click="goPay('PHONE',item.orderId)">To Pay</span>
								</div>
							</div>
							<div class="bookagain">
								<b class="font-color" v-if="item.status=='PAYMENT_PENDING'">Payment pending</b>
								<b class="font-color" v-if="item.status=='PAYMENT_SUCCESS'||item.status=='CONFIRM_WAITING'">To be confirmed</b>
								<b class="font-color1" v-if="item.status=='BOOKING_SUCCESS'">Confirmed</b>
								<b class="font-color1" v-if="item.status=='COMPLETED'">Tour completed</b>
								<b class="font-color" v-if="item.status=='REFUNDING'">Refund in progress</b>
								<b class="font-color1" v-if="item.status=='REFUNDED'">Refund completed</b>
								<b class="font-color1" v-if="item.status=='CANCELED'">Canceled</b>
								<p>{{getPriceMark(item.currency)}}{{item.amount}}</p>

							</div>
						</div>
					</li>

					<li :key="index" v-for="(item,index) in bookList" v-if="bookList.length>0">
						<h3 v-if="item.guideInfo.enName">{{item.guideInfo.enName}}</h3>
						<div class="info clearfix">
							<div class="activitiesImg">
								<img :src="item.guideInfo.headPortraitUrl">
							</div>
							<div class="activitiesText">
								<div class="dataId">
									<span>Booking ID: {{item.orderId}}</span>
									<span>Booking Time: {{item.createTime}} (EST)</span>
								</div>
								<p v-if="item.serviceType=='HIKING'"><b>Service Type:</b> Tour guide</p>
								<p v-else><b>Service Type:</b>Tour guide with a car</p>
								<p><b>Participants:</b> {{item.participants}}</p>
								<p v-if="item.fullDates"><b>Full day date:</b>{{item.fullDates.join(",")}}</p>
								<p v-if="item.halfDates"><b>Half day date:</b>{{item.halfDates.join(",")}}</p>
								<div class="tag">
									<span  @click="goGuideDatil(1,index)">Book Again</span>
									<span @click="downLoad(index)" v-if="item.status!='PAYMENT_PENDING'&&item.status!='REFUNDING'&&item.status!='REFUNDED'&&item.status!='CANCELED'">Download Contract</span>

									<span v-if="item.status=='PAYMENT_PENDING'" @click="goPay('GUIDE_SERVICE',item.orderId)">To Pay</span>
								</div>
							</div>
							<div class="bookagain">
								<b class="font-color" v-if="item.status=='PAYMENT_PENDING'">Payment pending</b>
								<b class="font-color" v-if="item.status=='PAYMENT_SUCCESS'||item.status=='CONFIRM_WAITING'">To be confirmed</b>
								<b class="font-color1" v-if="item.status=='BOOKING_SUCCESS'">Confirmed</b>
								<b class="font-color1" v-if="item.status=='COMPLETED'">Tour completed</b>
								<b class="font-color" v-if="item.status=='REFUNDING'">Refund in progress</b>
								<b class="font-color1" v-if="item.status=='REFUNDED'">Refund completed</b>
								<b class="font-color1" v-if="item.status=='CANCELED'">Canceled</b>
								<p>{{getPriceMark(item.currency)}}{{item.amount}}</p>

							</div>
						</div>
					</li>
				</ul> -->

				 <div class="empty" v-show="!bookList.length && !activityList.length && !phoneList.length && nobooking">

					<span>
						<svg class="icon" aria-hidden="true">
						    <use xlink:href="#icon-lvyou"></use>
						</svg>
					</span>
					<p>You have no booking here.</p>
				</div>
			</div>
			
		</div>
		<div id="downNode"></div>
		<FooterCommon v-if="logIn==1"></FooterCommon>
		<Refund :businessType="businessType" :isShowAlertTitle="isShowAlertTitle" :orderId="orderId" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlertFn="getIsShowAlertFn" v-on:setIsShowConfirmFn="getShowConfirmFn"></Refund>
	</div>
	
</template>

<script>
	import{GetQueryString,getPriceMark,formatDate} from '~/assets/js/plugin/utils';
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
    import FooterCommon from '~/components/FooterCommon/FooterCommon';
    
	import Refund from '~/components/pageComponents/myBookings/Refund';
    import MenuTab from "~/components/MenuTab";
    
	export default {
		name: 'MyBookings',
		async asyncData({ route, store, error, apiBasePath, redirect }) {
			let menu = route.query.menu || 0;
			let flag = route.query.flag || 1;
			let urlOrderId = route.query.orderid || '';
			let urlEmail = route.query.email || '';
			let urlCode = route.query.code || '';

			let data = {
				activityList:'',
				phoneList:'',
				logIn: '',
				bookList: '',
				listData:'',
				isShowAlertTitle: '',
				alertMessage: '',
				alertTitle: '',
				orderId: '',
				urlOrderId: urlOrderId,
				urlEmail:urlEmail,
				url: '',
				businessType:'',
				apiBasePath,
				nobooking : false,
				urlCode: urlCode
			}
			return data;
		},
		components: {
			MenuTab,
			HeaderCommon,
			FooterCommon,
			Refund
		},
		 head() {
			let title = 'My Orders - Localpanda.com ';
			let description = 'Review your order history with Local Panda '
			let keywords ='My Orders, Local Panda'
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
			formatDate:formatDate,
			getPriceMark:getPriceMark,
			getShowConfirmFn(val) {
				this.isShowAlertTitle = val;
			},
			getIsShowAlertFn(val) {
				this.isShowAlertTitle = val;
			},
			getDays(startDate,endDate){
				var startArr = startDate.split('-'),
					endArr = endDate.split('-');
				var dateS = new Date(startArr[0],startArr[1]-1,startArr[2]).getTime(),
          dateE = new Date(endArr[0],endArr[1]-1,endArr[2]).getTime();
				var days = (dateE - dateS)/1000/60/60/24+1;
				return days;
			},
			// goPay(type,orderId) {
			// 	if(type=='PHONE'){
			// 		window.location.href = "/activity/payment?objectId=" + orderId;
			// 	}else if(type=='ACTIVITY'){
			// 		window.location.href = "/guide/payment?orderId=" + orderId;
			// 	}
				
			// },
			goPay(type,orderId) {
				if(type=='PHONE'){
					window.location.href = "/product/phone/payment/?orderId=" + orderId;
				}else if(type=='ACTIVITY'){
					window.location.href = "/activity/payment/?objectId=" + orderId;
				}else if(type == 'GUIDE_SERVICE'){
					window.location.href = "/guide/payment?orderId=" + orderId;
				}
				
			},
			goGuideDatil(id,index) {
				if(id==0){
					window.location.href = "/activity/details/" + this.activityList[index].activityId
				}else{
					window.location.href = "/guide/detail/" + this.bookList[index].guideId
				}
				
			},
			goDetail(type,url){
				if(type=='PHONE'){
					window.location.href = 'https://www.localpanda.com/product/phone/details/';
				}else if(type=='ACTIVITY'){
					window.location.href = url;
				}else if(type == 'GUIDE_SERVICE'){
					window.location.href = "/guide/detail/" + url;
				}
				
			},
			downLoad(index) {
				var node = document.getElementById("downNode");
				var html = '<form method="POST" target="_blank" action="'+ this.apiBasePath + 'order/guide/contract/">' +
					'<input name="orderId" type="hidden"  value="' + this.bookList[index].orderId + '">' +
					'</form>';
				node.innerHTML = html;
				var fd = node.querySelector('form');
				fd.submit();
			},
			Refund(id,index) {
				let that = this
				if(id==0){
					that.orderId=that.activityList[index].orderId
					that.businessType="ACTIVITY"
					
				}else{
					that.orderId = that.bookList[index].orderId
					that.businessType="GUIDE_SERVICE"
				}
				
				//oderId:110134390
				that.isShowAlertTitle = true
				that.alertMessage = " You are currently requesting a refund. Please select confirm to proceed with your order refund request, otherwise press cancel to return."
			},
			getActivityOrders(obj){
				var that = this;
				that.axios.post(this.apiBasePath + "order/activity/list", JSON.stringify(obj), {
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					}
				}).then(function(response) {
					if(response.status==200 || response.status == 304){
						that.activityList = response.data
						that.nobooking = false;
						if(response.data.length<=0){
							that.nobooking = true
						}
					}else{
						that.nobooking = true;
					}
				}, function(response) {
					that.nobooking = true;
				})
			},
			getPhoneOrders(obj){
				var that = this;
				that.axios.post(this.apiBasePath + "order/phone/list", JSON.stringify(obj), {
					headers: {
						'Content-Type': 'application/json;'
					}
				}).then(function(response) {
					if(response.status==200 || response.status == 304){
						that.phoneList = response.data
						that.nobooking = false;
						if(response.data.length<=0){
							that.nobooking = true
						}
					}else{
						that.nobooking = true;
					}
				}, function(response) {
					that.nobooking = true;
				})
			},
			wxOrders(){
				//code用过或者没有code则从新获取
				var localWxCode = localStorage.getItem('localWxCode');
				if(this.urlCode==localWxCode){
					location.href = 'https://www.localpanda.cn/wx/getcode?link='+encodeURIComponent(location.href.replace('code','nostr'));
					return;
				}
				//本地存储code
				localStorage.setItem('localWxCode',this.urlCode);


				var self = this;
				self.axios.post("https://www.localpanda.cn/api/payment/query/openid?code=" + this.urlCode, {
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(function(response) {

					var openData = response.data;

					var obj ={
						openId: openData.openid
					};
					self.getActivityOrders(obj);

				}, function(response) {});
			},
			getOrders(obj){
				var that = this;
				that.axios.post(this.apiBasePath + "order/list", JSON.stringify(obj), {
					headers: {
						'Content-Type': 'application/json;'
					}
				}).then(function(response) {
					if(response.status==200 || response.status == 304){
						that.listData = response.data;
						that.nobooking = false;
						if(response.data.length<=0){
							that.nobooking = true;
						}
					}else{
						that.nobooking = true;
					}
				}, function(response) {
					that.nobooking = true;
				})
			}
		},
		mounted: function() {
			let that = this
			that.logIn = window.localStorage.getItem("logstate")
			var obj;
			
			if(this.urlOrderId && this.urlEmail){ //url匿名查询
				obj={
					orderId:this.urlOrderId,
					emailAddress:this.urlEmail
				}
			}else if(this.urlCode){  //微信openId查询
				this.wxOrders();
			}else if(localStorage.getItem("userid")!=null){ //用户登录查询
				 obj = {
					"userId": localStorage.getItem("userid")
					//userId:10024
				}
			}else if(GetQueryString("orderId")){  //orderid查询
				 obj={
					orderId:GetQueryString("orderId"),
					emailAddress:GetQueryString("emailAddress")
				}
			}else{
				 obj=JSON.parse(localStorage.getItem("obj"));
				 this.urlEmail = obj.emailAddress;
			}
			
			//微信code和openId查询，不走这个查询
			if(!this.urlCode){
				// this.getActivityOrders(obj);
				// this.getPhoneOrders(obj);
				this.getOrders(obj);
			}
			
			
			//非匿名查询、非微信openid查询的才去查导游订单
			if(this.urlOrderId && this.urlEmail || this.urlCode){
				return;
			}

			//查导游订单
			// that.axios.post(this.apiBasePath + "order/guide/list", JSON.stringify(obj), {
			// 	headers: {
			// 		'Content-Type': 'application/json; charset=UTF-8'
			// 	}
			// }).then(function(response) {
			// 	if(response.status==200 || response.status == 304){
			// 		that.bookList = response.data
			// 		that.nobooking = false;
			// 		if(response.data.length<=0){
			// 			that.nobooking = true
			// 		}
			// 	}else{
			// 		that.nobooking = true;
			// 	}
				
			// }, function(response) {
			// 	that.nobooking = true;
			// })


		}
	}
</script>
<style lang="scss">
	//@import '~/assets/scss/_main.scss';
	//@import '~/assets/font/iconfont.css';
	.MyBookings{
	#header {
			box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
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
	.icon {
		width: 196px;
		height: 196px;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
		
	}
	
	.MyBookings {
		.MyBookingslist {
			width: 1170px;
			margin: 0 auto;
			position: relative;
			min-height: 500px;
			.bookingsCont {
				min-height: 200px;
				margin-left: 250px;
				padding: 60px 0 100px 60px;
				box-shadow: -1px 0px 0px 0px rgba(53, 58, 63, 0.1);
				ul {
					li {
						padding: 30px 0;
						border-bottom: 1px solid #dde0e0;
						&:first-child {
							border-top: none;
							padding-top: 0;
						}
						h3 {
							font-size: 24px;
							font-weight: bold;
							margin-bottom: 22px;
						}
						.info {
							.activitiesImg {
								float: left;
								width: 230px;
								height: 186px;
								img {
									width: 100%;
									height: 100%;
								}
							}
							.activitiesText {
								float: left;
								margin-left: 24px;
								width: 460px;
								.dataId {
									font-size: 14px;
									margin-bottom: 10px;
									span {
										margin-right: 28px;
										&:last-child{
											margin-right: 0;
										}
									}
								}
								p {
									margin-bottom: 8px;
									font-size: 18px;
									color: #666;
									b {
										font-size: 18px;
										margin-right: 15px;
										color: #333;
									}
								}
								.tag {
									font-size: 16px;
									margin-top: 15px;
									span,a {
										color: #353a3f;
										position: relative;
										padding-right: 16px;
										text-decoration: underline;
										cursor: pointer;
										&:not(:last-child) {
											margin-right: 16px;
											&:after {
												content: '';
												position: absolute;
												height: 10px;
												width: 2px;
												background: #878e95;
												top: 7px;
												right: 0;
											}
										}
									}
								}
							}
							.bookagain {
								float: right;
								b {
									font-size: 16px;
									margin-top: 46px;
									&.font-color {
										color: #d87b65;
									}
									&.font-color1 {
										color: #878e95;
									}
								}
								p {
									margin-top: 40px;
									font-size: 22px;
									font-weight: bold;
									text-align: right;
								}
								.margin {
									margin-top: 68px;
								}
							}
						}
					}
				}
			}
		}
		.empty {
			text-align: center;
			margin: 90px 0 184px;
			p{
				font-size: 18px;
				font-weight: bold;
				margin-top: 34px;
			}
		}
	}
</style>

